// src/user/user.controller.ts
/* eslint-disable */
import {
  Controller,
  Get,
  Body,
  Put,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@prisma/client';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Get user by ID
  @Get()
  async getUser(@Query('id') id: string): Promise<User | null> {
    const userId = parseInt(id, 10);
    if (isNaN(userId)) {
      throw new Error('Invalid user ID');
    }
    return this.userService.findById(userId);
  }

  // Update user by ID
  @Put()
  async updateUser(
    @Body() updateUserDto: { userId: number; username: string },
  ): Promise<User> {
    return this.userService.updateUser(
      updateUserDto.userId,
      updateUserDto.username,
    );
  }
}
