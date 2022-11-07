import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoInterface, TodoSchema } from './entities/todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectModel('Todo') private readonly todoModel: Model<TodoInterface>,
  ) {}

  async create(createTodoDto: CreateTodoDto) {
    const todo = await new this.todoModel(createTodoDto);
    const res = await todo.save();
    return res;
  }

  async findAll() {
    const todos = await this.todoModel.find().exec();
    return todos;
    // return todos.map((todo) => ({
    //   id: todo.id,
    //   title: todo.title,
    //   statu: todo.statu,
    //   tag: todo.tag,
    //   discription: todo.discription,
    //   due_date: todo.due_date,
    // }));
  }

  async FindByPagination(documentsToSkip = 0, limitOfDocuments = 2) {
    const todosPaginat = await this.todoModel
      .find()
      .skip(documentsToSkip)
      .limit(limitOfDocuments)
      .exec();

    return todosPaginat;
  }

  async getSingleTodo(id: string) {
    const todo = await this.findOne(id);
    if (!todo) {
      throw new NotFoundException('Could not find this todo');
    }
    return todo;
  }

  async getSingleTodoByTag(tag: string) {
    const todos = await this.todoModel.find({ tag: tag });
    return todos;
  }

  async getSingleTodoByStatu(statu: string) {
    const todos = await this.todoModel.find({ statu: statu });
    return todos;
  }

  async findOne(id: string): Promise<TodoInterface> {
    const todo = await this.todoModel.findById(id);
    if (!todo) {
      throw new NotFoundException('Could not find this todo');
    }
    return todo;
  }

  async update(id: string, updateTodoDto: UpdateTodoDto, userId?: string) {
    const todo = await this.findOne(id);
    if (updateTodoDto.title) {
      todo.title = updateTodoDto.title;
    }
    if (updateTodoDto.discription) {
      todo.discription = updateTodoDto.discription;
    }
    if (updateTodoDto.tag) {
      todo.tag = updateTodoDto.tag;
    }
    if (updateTodoDto.due_date) {
      todo.due_date = updateTodoDto.due_date;
    }
    if (updateTodoDto.statu) {
      todo.statu = updateTodoDto.statu;
    }
    if (userId) {
      todo.user = userId;
    }
    todo.save();
    return todo;
  }

  async remove(id: string) {
    //const statu = await this.todoModel.deleteOne({ id: id }).exec();
    return this.todoModel.findByIdAndDelete(id);
    //return statu;
  }
}
