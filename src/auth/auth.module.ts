import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { FirebaseConfig } from '../config/firebase.config';

@Module({
  imports: [ConfigModule],
  controllers: [AuthController],
  providers: [AuthService, FirebaseConfig],
  exports: [AuthService],
})
export class AuthModule {}
