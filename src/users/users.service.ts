import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

export type User = any;

@Injectable()
export class UsersService {
  private readonly users: User[];

  constructor(@InjectModel('User') private userModel: Model<User>) {
    this.users = [
      {
        userId: 1,
        username: 'maxim',
        password: '1234',
        name: "Максим",
        surname: "Тимошенко",
        position: "Разработчик",
        type: "Техническое",
        level: "Младший",
        rating: 7
      },
      {
        userId: 2,
        username: 'chris',
        password: 'secret',
        name: "Максим",
        surname: "Тимошенко",
        position: "Разработчик",
        type: "Техническое",
        level: "Младший",
        rating: 7
      },
      {
        userId: 3,
        username: 'maria',
        password: 'guess',
        name: "Максим",
        surname: "Тимошенко",
        position: "Разработчик",
        type: "Техническое",
        level: "Младший",
        rating: 7
      },
    ];
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
}
