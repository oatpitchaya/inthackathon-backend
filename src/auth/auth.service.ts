/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor() {
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
      // Decode LINE id_token to check its contents
      const decoded = jwt.decode(idToken) as any;
      if (!decoded || !decoded.sub || !decoded.email) {
        throw new Error('Invalid LINE ID Token');
      }

      const lineUserId = decoded.sub;
      const email = decoded.email;
      const name = decoded.name;
      const picture = decoded.picture;

      // Log the decoded token to inspect
      console.log('Decoded Token:', decoded);

      let firebaseUser;
      try {
        // Check if the user exists in Firebase
        firebaseUser = await admin.auth().getUserByEmail(email);
      } catch (error: any) {
        if (error.code === 'auth/user-not-found') {
          // If user doesn't exist, create a new Firebase user
          firebaseUser = await admin.auth().createUser({
            uid: lineUserId,
          });
        } else {
          throw error;
        }
      }

      // Generate Firebase authentication token
      const firebaseToken = await admin
        .auth()
        .createCustomToken(firebaseUser.uid);

      return {
        firebaseToken,
        user: {
          uid: firebaseUser.uid,
          lineUserId,
          email,
          name,
          picture,
        },
      };
    } catch (error) {
      console.error('Authentication failed:', error.message);
      throw new Error(`Authentication failed: ${error.message}`);
    }
  }
}
