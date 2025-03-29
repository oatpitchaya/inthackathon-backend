import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from '../../auth/auth.service';
import { AuthController } from '../../auth/auth.controller';
import { FirebaseConfig } from '../firebase.config';

@Module({
  imports: [ConfigModule],
  controllers: [AuthController],
  providers: [AuthService, FirebaseConfig],
  exports: [AuthService],
})
export class AuthModule {}
