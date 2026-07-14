import { prisma } from '@tejas/database';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { NotificationService } from './notification.service.js';

const notificationService = new NotificationService();

export class AuthService {
  private jwtSecret = process.env.JWT_SECRET || 'tejas_jwt_secret_fallback_key';

  validateEmailFormat(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  validatePasswordStrength(password: string): string[] {
    const errors: string[] = [];
    if (password.length < 8) {
      errors.push('Password must be at least 8 characters long.');
    }
    if (!/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter.');
    }
    if (!/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter.');
    }
    if (!/\d/.test(password)) {
      errors.push('Password must contain at least one number.');
    }
    if (!/[!@#$%^&*()_+\-=\[\]{};':",./<>?]/.test(password)) {
      errors.push('Password must contain at least one special character.');
    }
    return errors;
  }

  async registerInitiate(email: string, password: string, fullName: string) {
    if (!this.validateEmailFormat(email)) {
      throw new Error('Invalid email address format.');
    }

    const passwordErrors = this.validatePasswordStrength(password);
    if (passwordErrors.length > 0) {
      throw new Error(passwordErrors.join(' '));
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing && existing.emailVerified) {
      throw new Error('Email already registered.');
    }

    const passwordHash = await bcrypt.hash(password, 10);
    
    // Create user in unverified state or update existing unverified user
    if (existing) {
      await prisma.user.update({
        where: { email },
        data: {
          passwordHash,
          profile: {
            upsert: {
              create: { fullName },
              update: { fullName }
            }
          }
        }
      });
    } else {
      await prisma.user.create({
        data: {
          email,
          passwordHash,
          emailVerified: false,
          profile: {
            create: { fullName }
          }
        }
      });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

    // Save OTP to database
    await prisma.otpVerification.upsert({
      where: { email },
      update: { otp, expiresAt },
      create: { email, otp, expiresAt }
    });

    // Send OTP email
    const subject = 'Verify your Tejas account';
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #dbd7c7; border-radius: 12px;">
        <h2 style="color: #262a2b; font-family: 'Outfit', sans-serif;">Welcome to Tejas!</h2>
        <p style="font-size: 16px; color: #786e67;">Thank you for registering. Please use the following One-Time Password (OTP) to verify your email address:</p>
        <div style="font-size: 24px; font-weight: bold; color: #faa114; letter-spacing: 4px; padding: 15px; background-color: #fcfcfb; border: 1px dashed #dbd7c7; display: inline-block; margin: 10px 0;">
          ${otp}
        </div>
        <p style="font-size: 12px; color: #b3aa9e;">This code will expire in 10 minutes. If you did not request this, you can safely ignore this email.</p>
      </div>
    `;

    await notificationService.sendEmail(email, subject, htmlContent);

    return { message: 'OTP sent to your email address.' };
  }

  async registerVerify(email: string, otp: string) {
    const user = await prisma.user.findUnique({
      where: { email },
      include: { profile: true }
    });

    if (!user) {
      throw new Error('User not found.');
    }

    const record = await prisma.otpVerification.findUnique({
      where: { email }
    });

    if (!record) {
      throw new Error('No OTP request found. Please initiate sign up again.');
    }

    if (record.otp !== otp) {
      throw new Error('Invalid OTP code.');
    }

    if (record.expiresAt < new Date()) {
      throw new Error('OTP code has expired. Please request a new one.');
    }

    // Activate user email verification
    await prisma.user.update({
      where: { email },
      data: { emailVerified: true }
    });

    // Remove the OTP record
    await prisma.otpVerification.delete({
      where: { email }
    });

    const token = this.generateToken(user.id, user.email, user.role);

    return {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        fullName: user.profile?.fullName,
        emailVerified: true
      },
      token
    };
  }

  async registerResend(email: string) {
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      throw new Error('User not found.');
    }

    if (user.emailVerified) {
      throw new Error('Email is already verified.');
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    await prisma.otpVerification.upsert({
      where: { email },
      update: { otp, expiresAt },
      create: { email, otp, expiresAt }
    });

    const subject = 'Your new Tejas verification OTP';
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #dbd7c7; border-radius: 12px;">
        <h2 style="color: #262a2b; font-family: 'Outfit', sans-serif;">Tejas Email Verification</h2>
        <p style="font-size: 16px; color: #786e67;">Here is your requested new verification OTP:</p>
        <div style="font-size: 24px; font-weight: bold; color: #faa114; letter-spacing: 4px; padding: 15px; background-color: #fcfcfb; border: 1px dashed #dbd7c7; display: inline-block; margin: 10px 0;">
          ${otp}
        </div>
        <p style="font-size: 12px; color: #b3aa9e;">This code will expire in 10 minutes. If you did not request this, you can safely ignore this email.</p>
      </div>
    `;

    await notificationService.sendEmail(email, subject, htmlContent);

    return { message: 'New OTP sent to your email address.' };
  }

  async loginUser(email: string, password: string) {
    const user = await prisma.user.findUnique({
      where: { email },
      include: { profile: true }
    });

    if (!user || !user.passwordHash) {
      throw new Error('Invalid email or password.');
    }

    const matches = await bcrypt.compare(password, user.passwordHash);
    if (!matches) {
      throw new Error('Invalid email or password.');
    }

    if (!user.emailVerified) {
      throw new Error('EMAIL_NOT_VERIFIED');
    }

    const token = this.generateToken(user.id, user.email, user.role);
    return { user: { id: user.id, email: user.email, role: user.role, fullName: user.profile?.fullName }, token };
  }

  private generateToken(id: string, email: string, role: string): string {
    return jwt.sign({ id, email, role }, this.jwtSecret, { expiresIn: '7d' });
  }
}
