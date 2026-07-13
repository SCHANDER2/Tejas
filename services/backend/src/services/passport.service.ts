import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GitHubStrategy } from 'passport-github2';
import { prisma } from '@tejas/database';

export function initializePassport() {
  const googleClientId = process.env.GOOGLE_CLIENT_ID || 'mock_google_id';
  const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET || 'mock_google_secret';
  const googleCallbackUrl = process.env.GOOGLE_CALLBACK_URL || 'http://localhost:3001/api/v1/auth/google/callback';

  const githubClientId = process.env.GITHUB_CLIENT_ID || 'mock_github_id';
  const githubClientSecret = process.env.GITHUB_CLIENT_SECRET || 'mock_github_secret';
  const githubCallbackUrl = process.env.GITHUB_CALLBACK_URL || 'http://localhost:3001/api/v1/auth/github/callback';

  // 1. Google OAuth Strategy
  passport.use(new GoogleStrategy({
    clientID: googleClientId,
    clientSecret: googleClientSecret,
    callbackURL: googleCallbackUrl,
    passReqToCallback: true
  }, async (req: any, accessToken: string, refreshToken: string, profile: any, done: any) => {
    try {
      const email = profile.emails?.[0]?.value;
      if (!email) {
        return done(new Error('No email found in Google profile payload.'), false);
      }

      // Check if user already exists
      let user: any = await prisma.user.findUnique({
        where: { email },
        include: { profile: true }
      });

      if (!user) {
        // Create new user with defaults
        user = await prisma.user.create({
          data: {
            email,
            role: 'free_learner',
            profile: {
              create: {
                fullName: profile.displayName || email.split('@')[0],
                dailyStudyGoalMinutes: 60,
                preferredLanguage: 'en'
              }
            }
          },
          include: { profile: true }
        });
      }

      return done(null, user);
    } catch (err) {
      return done(err, false);
    }
  }));

  // 2. GitHub OAuth Strategy
  passport.use(new GitHubStrategy({
    clientID: githubClientId,
    clientSecret: githubClientSecret,
    callbackURL: githubCallbackUrl,
    passReqToCallback: true
  }, async (req: any, accessToken: string, refreshToken: string, profile: any, done: any) => {
    try {
      const email = profile.emails?.[0]?.value || `${profile.username}@github.mock`;
      
      // Check if user already exists
      let user: any = await prisma.user.findUnique({
        where: { email },
        include: { profile: true }
      });

      if (!user) {
        user = await prisma.user.create({
          data: {
            email,
            role: 'free_learner',
            profile: {
              create: {
                fullName: profile.displayName || profile.username || email.split('@')[0],
                dailyStudyGoalMinutes: 60,
                preferredLanguage: 'en'
              }
            }
          },
          include: { profile: true }
        });
      }

      return done(null, user);
    } catch (err) {
      return done(err, false);
    }
  }));

  passport.serializeUser((user: any, done: any) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id: string, done: any) => {
    try {
      const user = await prisma.user.findUnique({ where: { id } });
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });
}
export default passport;
