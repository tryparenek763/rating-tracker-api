import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserSchema } from '../schemas/users';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Users', schema: UserSchema }])],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule { }
