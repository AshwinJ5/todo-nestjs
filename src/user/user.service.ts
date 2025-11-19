import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async register(data: Partial<User>) {
    try {
      return await this.userModel.create(data);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async login(data: { identifier: string; password: string }) {
    const { identifier, password } = data;

    if (!identifier || !password) {
      throw new NotFoundException('Please provide email/username and password');
    }
    console.log(identifier);
    
    const user = await this.userModel
      .findOne({
        $or: [{ email: identifier }, { username: identifier }],
      })
      .select('+password');
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const isMatch = await user.matchPasswords(password);
    if (!isMatch) {
      throw new NotFoundException('Invalid password');
    }
    const token = await this.jwtService.signAsync({
      id: user._id,
      email: user.email,
      username: user.username,
    });

    return { token };
  }
}
