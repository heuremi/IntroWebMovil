import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/user.schema';
import { mongoErrorHandler } from 'src/utils/mongo-error-handler';
import { MongoError } from 'mongodb';
import { DeleteResult } from 'mongodb';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto) {
    try {
      
      if (!createUserDto.password) {
        throw new Error('Password is required');
      }

      
      const saltOrRounds = 10;
      const hashedPassword = await bcrypt.hash(createUserDto.password, saltOrRounds);

      // Reemplaza la contraseña con la encriptada antes de guardar el usuario
      const newUser = { ...createUserDto, password: hashedPassword };

      return await this.userModel.create(newUser);
      
    } catch (error) {
      if ((error as Record<string, number>)?.code)
        mongoErrorHandler(error as MongoError);
      throw new Error(error as string);
    }
  }

  async findAll() {
    return await this.userModel.find().exec();
  }

  async findOne(id: string) {
    return await this.userModel.findById(id).exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      return await this.userModel.updateOne({ _id: id }, updateUserDto);
    } catch (error: unknown) {
      if ((error as Record<string, number>)?.code)
        mongoErrorHandler(error as MongoError);
      throw new Error(error as string);
    }
  }

  async remove(id: string):Promise<DeleteResult> {
    return await this.userModel.deleteOne({ _id: id });
  }
}
