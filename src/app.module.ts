import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ApplicationFormsModule } from './application-forms/application-forms.module';

@Module({
  imports: [AuthModule, UsersModule, ApplicationFormsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
