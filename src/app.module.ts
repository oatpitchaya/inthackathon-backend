import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { FirebaseConfig } from './config/firebase.config';
import { HealthModule } from './health/health.module';
import { PrismaModule } from './config/prisma/prisma.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    HealthModule,
    PrismaModule,
    UserModule,
  ],
  providers: [FirebaseConfig],
})
export class AppModule {}
