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
    } catch (error) {
      throw new InternalServerErrorException(error || 'error');
    }
  }

  async findAll(sortBy, completed, search) {
    try {
      const filter = { title: {}, completed: {} };
      let sortQuery = {};

      if (search) {
        filter.title = new RegExp(search, 'i');
      }

      if (completed === 'yes' || completed === 'no') {
        filter.completed = completed === 'yes';
      }

      if (sortBy === 'created') {
        sortQuery = { createdAt: -1 };
      } else {
        sortQuery = { toBeCompletedBy: -1 };
      }

      const todos = await this.todoModel.find(filter).sort(sortQuery);

      return todos.length ? todos : { message: 'No data found' };
    } catch (error) {
      console.error('Error in findAll:', error);
      throw new Error('Failed to fetch tasks');
    }
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
