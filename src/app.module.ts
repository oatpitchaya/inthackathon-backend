import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { FirebaseConfig } from './config/firebase.config';
import { HealthModule } from './health/health.module';
import { PrismaModule } from './config/prisma/prisma.module';
import { UserModule } from './user/user.module';
import { QuestionModule } from './question/question.module';
import { LessonModule } from './lesson/lesson.module';
import { CareerModule } from './career/career.module';
import { RewardModule } from './reward/reward.module';
import { TopicModule } from './topic/topic.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    HealthModule,
    PrismaModule,
    UserModule,
    QuestionModule,
    LessonModule,
    CareerModule,
    RewardModule,
    TopicModule,
  ],
  providers: [FirebaseConfig],
})
export class AppModule {}
