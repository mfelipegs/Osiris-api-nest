import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/users.schema';
import { Model, isValidObjectId } from 'mongoose';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { password, ...userData } = createUserDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new this.userModel({
      ...userData,
      password: hashedPassword,
    });

    return newUser.save();
  }

  findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException(`'${id}' is not a valid id`);
    }

    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException(`'${id}' is not a valid id`);
    }

    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();

    if (!updatedUser) {
      throw new NotFoundException(`User ${id} not found`);
    }

    return updatedUser;
  }

  async remove(id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException(`'${id}' is not a valid id`);
    }

    const user = await this.userModel.findByIdAndDelete(id).exec();
    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }
  }
}
