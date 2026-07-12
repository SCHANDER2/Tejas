import { prisma } from '@tejas/database';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class AuthService {
  private jwtSecret = process.env.JWT_SECRET || 'tejas_jwt_secret_fallback_key';

  async registerUser(email: string, password: string, fullName: string) {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      throw new Error('Email already registered.');
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        profile: {
          create: {
            fullName
          }
        }
      },
      include: {
        profile: true
      }
    });

    const token = this.generateToken(user.id, user.email, user.role);
    return { user: { id: user.id, email: user.email, role: user.role, fullName: user.profile?.fullName }, token };
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

    const token = this.generateToken(user.id, user.email, user.role);
    return { user: { id: user.id, email: user.email, role: user.role, fullName: user.profile?.fullName }, token };
  }

  private generateToken(id: string, email: string, role: string): string {
    return jwt.sign({ id, email, role }, this.jwtSecret, { expiresIn: '7d' });
  }
}
