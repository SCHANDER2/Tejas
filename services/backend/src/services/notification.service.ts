import nodemailer from 'nodemailer';

export class NotificationService {
  private mailTransporter: any = null;

  constructor() {
    // Initialize SMTP Mail Transporter if credentials are set
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        this.mailTransporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: parseInt(process.env.SMTP_PORT || '587'),
          secure: process.env.SMTP_SECURE === 'true',
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });
        console.log('[NOTIFICATION SERVICE]: SMTP mail transporter initialized.');
      } catch (err: any) {
        console.error('[NOTIFICATION SERVICE]: SMTP initialization failed:', err.message);
      }
    }
  }

  /**
   * Dispatches email alerts. Falls back to console logger if SMTP not configured.
   */
  async sendEmail(to: string, subject: string, htmlContent: string) {
    if (this.mailTransporter) {
      try {
        const info = await this.mailTransporter.sendMail({
          from: process.env.SMTP_FROM || '"Tejas Learning OS" <no-reply@tejas-ai.in>',
          to,
          subject,
          html: htmlContent,
        });
        console.log(`[EMAIL DISPATCHED]: Message sent successfully to ${to}. MessageId: ${info.messageId}`);
        return { success: true, messageId: info.messageId };
      } catch (err: any) {
        console.error(`[EMAIL ERROR]: Failed to send email to ${to}:`, err.message);
        throw err;
      }
    } else {
      console.log(`[EMAIL LOGGER (STAGING/FALLBACK)]:
        TO: ${to}
        SUBJECT: ${subject}
        CONTENT: ${htmlContent.substring(0, 300)}...
      `);
      return { success: true, logged: true };
    }
  }

  /**
   * Dispatches SMS updates using Twilio or local fallback logging.
   */
  async sendSMS(phoneNumber: string, message: string) {
    const twilioSid = process.env.TWILIO_ACCOUNT_SID;
    const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
    const twilioFromNumber = process.env.TWILIO_FROM_NUMBER || '9079144245';

    if (twilioSid && twilioAuthToken && process.env.TWILIO_FROM_NUMBER) {
      try {
        // Dynamically import Twilio to avoid dependency issues if not installed
        const twilio = require('twilio');
        const client = twilio(twilioSid, twilioAuthToken);
        const response = await client.messages.create({
          body: message,
          from: twilioFromNumber,
          to: phoneNumber,
        });
        console.log(`[SMS DISPATCHED]: Twilio SMS sent to ${phoneNumber}. Sid: ${response.sid}`);
        return { success: true, sid: response.sid };
      } catch (err: any) {
        console.error(`[SMS ERROR]: Twilio SMS failed to ${phoneNumber}:`, err.message);
        throw err;
      }
    } else {
      console.log(`[SMS/WhatsApp Welcome Logger]:
        FROM: ${twilioFromNumber} (Tejas Welcome Sender)
        TO: ${phoneNumber}
        MESSAGE: ${message}
      `);
      return { success: true, logged: true };
    }
  }

  /**
   * Dispatches web push notifications to user client browsers.
   */
  async sendPushNotification(userSubscription: any, payload: string) {
    const webPush = process.env.VAPID_PUBLIC_KEY && process.env.VAPID_PRIVATE_KEY;
    if (webPush) {
      try {
        const webpushLib = require('web-push');
        webpushLib.setVapidDetails(
          process.env.VAPID_SUBJECT || 'mailto:admin@tejas-ai.in',
          process.env.VAPID_PUBLIC_KEY,
          process.env.VAPID_PRIVATE_KEY
        );
        await webpushLib.sendNotification(userSubscription, payload);
        console.log('[PUSH DISPATCHED]: Web push notification sent successfully.');
        return { success: true };
      } catch (err: any) {
        console.error('[PUSH ERROR]: Failed to send web push notification:', err.message);
        throw err;
      }
    } else {
      console.log(`[PUSH LOGGER (STAGING/FALLBACK)]:
        SUBSCRIPTION: ${JSON.stringify(userSubscription).substring(0, 100)}...
        PAYLOAD: ${payload}
      `);
      return { success: true, logged: true };
    }
  }
}
