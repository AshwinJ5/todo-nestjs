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

  async create(userId, data) {
    try {
      data.user = userId;
      return await this.todoModel.create(data);
    } catch (error) {
      throw new InternalServerErrorException(error || 'error');
    }
  }

  async findAll(userId, sortBy, completed, search) {
    try {
      let sortQuery = {};
      let searchQuery = {};
      let completedQuery = {};
      console.log(process.env.JWT_SECRET);

      if (search) {
        searchQuery = { title: new RegExp(search, 'i') };
      }

      completed === 'yes'
        ? (completedQuery = { completed: true })
        : completed === 'no'
          ? (completedQuery = { completed: false })
          : {};

      if (sortBy === 'created') {
        sortQuery = { createdAt: -1 };
      } else {
        sortQuery = { toBeCompletedBy: -1 };
      }

      const userQuery = { user: userId };

      const todos = await this.todoModel
        .find(
          { ...searchQuery, ...completedQuery, ...userQuery },
          { title: 1, completed: 1, toBeCompletedBy: 1, createdAt: 1 },
        )
        .sort(sortQuery);

      return todos.length ? todos : { message: 'No data found' };
    } catch (error) {
      console.error('Error in findAll:', error);
      throw new Error('Failed to fetch tasks');
    }
  }

  async findOne(userId, id: string) {
    const todo = await this.todoModel.findOne({ _id: id, user: userId });
    if (!todo) throw new NotFoundException('Todo not found');
    return todo;
  }

  async update(userId, id: string, data: any) {
    const todo = await this.todoModel.findOneAndUpdate(
      { _id: id, user: userId },
      data,
      {
        new: true,
      },
    );
    if (!todo) throw new NotFoundException('Todo not found');
    return todo;
  }

  async delete(userId, id: string) {
    const todo = await this.todoModel.findOneAndDelete({
      user: userId,
      _id: id,
    });
    if (!todo) throw new NotFoundException('Todo not found');
    return todo;
  }
}
