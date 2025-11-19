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
} from '@nestjs/common';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  create(@Body() body: { title: string }) {
    try {
      return this.todoService.create(body);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Get()
  findAll(
    @Query('sort') sort: string,
    @Query('completed') completed: string,
    @Query('search') search: string,
  ) {
    return this.todoService.findAll(sort, completed, search);
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
