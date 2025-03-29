import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async lineLogin(@Body() body: { idToken: string }) {
    return this.authService.signInWithLine(body.idToken);
  }
}
