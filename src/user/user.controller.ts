import {
  Body,
  Controller,
  InternalServerErrorException,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.schema';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  register(@Body() body: User) {
    try {
      return this.userService.register(body);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
    @Patch()
    login(@Body() body: any) {
      return this.userService.login(body);
    }
}
