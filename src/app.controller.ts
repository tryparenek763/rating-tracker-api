import { Controller, Get, Post, Request, UseGuards, Body } from '@nestjs/common';
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
  @Get('users/me')
  getCurrentUser(@Request() req) {
    return this.usersService.getCurrentUser(req.user.username);
  }
  @UseGuards(JwtAuthGuard)
  @Get('users')
  getUsers(@Request() req) {
    return this.usersService.getUsers();
  }
  @UseGuards(JwtAuthGuard)
  @Post('forms')
  async createApplicationForms(@Body() form: any) {
    return this.applicationFormsService.createForm(form);
  }

  @UseGuards(JwtAuthGuard)
  @Get('template')
  getTemplate() {
    return this.applicationFormsService.getTemplate();
  }

}
