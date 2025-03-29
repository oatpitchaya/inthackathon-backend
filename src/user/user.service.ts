// src/user/user.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  // Create a new user
  async createUser(email: string, username: string): Promise<User> {
    return this.prisma.user.create({
      data: {
        email,
        username,
        createdAt: new Date(),
      },
    });
  }

  // Find user by ID
  async findById(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        id: id, // Ensure this is an integer
      },
    });
  }

  // Find user by email
  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  // Update user details
  async updateUser(
    id: number,
    email?: string,
    username?: string,
  ): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data: {
        email,
        username,
      },
    });
  }

  // Delete user by ID
  async deleteUser(id: number): Promise<User> {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
