import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { FirebaseConfig } from './config/firebase.config';
import { HealthModule } from './health/health.module';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, HealthModule],
  providers: [FirebaseConfig],
})
export class AppModule {}
