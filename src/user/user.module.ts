// src/user/user.module.ts
import { Module } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, PrismaService],
  exports: [UserService],
})
export class UserModule {}
