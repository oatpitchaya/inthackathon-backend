// src/user/user.controller.ts
import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@prisma/client';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Create a user
  @Post()
  async createUser(
    @Body() createUserDto: { email: string; username: string },
  ): Promise<User> {
    return this.userService.createUser(
      createUserDto.email,
      createUserDto.username,
    );
  }

  // Get user by ID
  @Get(':id')
  async getUser(@Param('id') id: string): Promise<User | null> {
    // Convert the id from string to number
    const userId = parseInt(id, 10);
    if (isNaN(userId)) {
      throw new Error('Invalid user ID');
    }
    return this.userService.findById(userId);
  }

  // Update user by ID
  @Put(':id')
  async updateUser(
    @Param('id') id: number,
    @Body() updateUserDto: { email?: string; username?: string },
  ): Promise<User> {
    return this.userService.updateUser(
      id,
      updateUserDto.email,
      updateUserDto.username,
    );
  }

  // Delete user by ID
  @Delete(':id')
  async deleteUser(@Param('id') id: number): Promise<User> {
    return this.userService.deleteUser(id);
  }
}
