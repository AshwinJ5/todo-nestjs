import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Todo } from './todo.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class TodoService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<Todo>) {}

  async create(data: { title: string }) {
    try {
      return await this.todoModel.create(data);
    } catch (error: any) {
      throw new InternalServerErrorException(error.message || 'error');
    }
  }

  async findAll() {
    return await this.todoModel.find();
  }

  async findOne(id: string) {
    const todo = await this.todoModel.findById(id);
    if (!todo) throw new NotFoundException('Todo not found');
    return todo;
  }

  async update(id: string, data: any) {
    const todo = await this.todoModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!todo) throw new NotFoundException('Todo not found');
    return todo;
  }

  async delete(id: string) {
    const todo = await this.todoModel.findByIdAndDelete(id);
    if (!todo) throw new NotFoundException('Todo not found');
    return todo;
  }
}
