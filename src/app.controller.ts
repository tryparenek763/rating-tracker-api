import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users/users.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { ApplicationFormsService } from './application-forms/application-forms.service'

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService, private readonly usersService: UsersService, private readonly applicationFormsService: ApplicationFormsService) { }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return this.usersService.findOne(req.user.username);
  }

  @UseGuards(JwtAuthGuard)
  @Post('forms')
  async createApplicationForms(@Request() req) {
    return this.applicationFormsService.createForm();
  }

  @UseGuards(JwtAuthGuard)
  @Get('template')
  getTemplate() {
    return this.applicationFormsService.getTemplate();
  }

}
