import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AppService } from '@/app.service';
import { LocalAuthGuard } from '@/auth/local-auth.guard';
import { AuthService } from '@/auth/auth.service';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    console.log(req);
    return this.authService.login(req.user);
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/register')
  async signup(@Request() req) {
    console.log(req);
    return this.authService.register(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Get('profile/getProfile')
  getHello(): string {
    return this.appService.getHello();
  }
}
