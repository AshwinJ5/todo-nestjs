import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { GetUser } from 'src/common/decorators/get-user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  create(@GetUser('id') userId: string, @Body() body: { title: string }) {
    try {
      return this.todoService.create(userId, body);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Get()
  findAll(
    @GetUser('id') userId: string,
    @Query('sort') sort: string,
    @Query('completed') completed: string,
    @Query('search') search: string,
  ) {
    return this.todoService.findAll(userId, sort, completed, search);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todoService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.todoService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.todoService.delete(id);
  }
}
