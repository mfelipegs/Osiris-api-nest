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

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { password, email, ...userData } = createUserDto;

    const emailDatabase = await this.userModel.findOne({ email }).exec();

    if (emailDatabase) {
      throw new BadRequestException(`This email already exists.`);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new this.userModel({
      ...userData,
      email,
      password: hashedPassword,
    });

    return newUser.save();
  }

  async list(page: number, itemsPerPage: number) {
    const totalItems = await this.userModel.countDocuments().exec();
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const data = await this.userModel
      .find()
      .skip((page - 1) * itemsPerPage)
      .limit(itemsPerPage);

    return {
      data,
      page,
      itemsPerPage,
      totalItems,
      totalPages,
    };
  }

  async findOne(id: string): Promise<User> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException(`'${id}' is not a valid id`);
    }

    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
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
