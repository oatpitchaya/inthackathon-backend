import { Module } from '@nestjs/common';
import { AuthModule } from './config/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { FirebaseConfig } from './config/firebase.config';
import { HealthModule } from './health/health.module';
import { PrismaModule } from './config/prisma/prisma.module';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, HealthModule, PrismaModule],
  providers: [FirebaseConfig],
})
export class AppModule {}
