import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

export type User = any;

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<User>) {

  }
  async getUsers(): Promise<User[] | undefined> {
    return await this.userModel.find().populate({ path: 'positionId' }).exec();
  }


  async getCurrentUser(username: string): Promise<User | undefined> {
    const user = await this.findOne(username);
    delete user.password;
    return user;
  }
  async findOne(username: string): Promise<User | undefined> {
    return (await this.userModel.findOne({ username }).populate({ path: 'positionId' }).exec()).toObject();
  }
}
