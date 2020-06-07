import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ApplicationFormsModule } from './application-forms/application-forms.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [AuthModule, UsersModule, ApplicationFormsModule, MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb://localhost:27017/rating-tracker-db')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
