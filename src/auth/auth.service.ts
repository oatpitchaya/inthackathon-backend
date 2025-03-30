/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as jwt from 'jsonwebtoken';
import { PrismaService } from 'src/config/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {
    if (admin.apps.length === 0) {
      admin.initializeApp({
        credential: admin.credential.cert(
          'src/config/inthackathon-firebase-adminsdk-fbsvc-bb93a52e4a.json',
        ),
      });
    }
  }
  async signInWithLine(idToken: string) {
    try {
      const decoded = jwt.decode(idToken) as any;
      if (!decoded || !decoded.sub || !decoded.email) {
        throw new Error('Invalid LINE ID Token');
      }

      const lineUserId = decoded.sub;
      const email = decoded.email;
      const name = decoded.name;
      const picture = decoded.picture;

      let firebaseUser;
      try {
        firebaseUser = await admin.auth().getUserByEmail(email);
      } catch (error: any) {
        if (error.code === 'auth/user-not-found') {
          firebaseUser = await admin.auth().createUser({
            uid: lineUserId,
            email,
            displayName: name,
            photoURL: picture,
          });
        } else {
          throw error;
        }
      }

      let existingUser = await this.prisma.user.findUnique({
        where: { email },
        include: { character: true }, // Fetch character if exists
      });

      if (!existingUser) {
        try {
          existingUser = await this.prisma.user.create({
            data: {
              email,
              username: '',
              createdAt: new Date(),
              character: {
                create: {},
              },
            },
            include: { character: true },
          });
        } catch (dbError) {
          console.error('Failed to insert user into the database:', dbError);
          throw new Error('Database user creation failed');
        }
      }

      const firebaseToken = await admin
        .auth()
        .createCustomToken(firebaseUser.uid, {
          lineUserId,
          email,
          name,
          picture,
          username: existingUser.username,
          characterData: existingUser.character
            ? {
                level: existingUser.character.level,
                exp: existingUser.character.exp,
                coin: existingUser.character.coin,
                ticket: existingUser.character.ticket,
              }
            : null,
        });

      return {
        message: 'Authentication successful',
        user: {
          email: existingUser.email,
          username: existingUser.username,
          lineUserId,
          name,
          picture,
          character: existingUser.character
            ? {
                level: existingUser.character.level,
                exp: existingUser.character.exp,
                coin: existingUser.character.coin,
                ticket: existingUser.character.ticket,
              }
            : null,
        },
        firebaseToken,
      };
    } catch (error) {
      console.error('Authentication failed:', error.message);
      throw new Error(`Authentication failed: ${error.message}`);
    }
  }
}
