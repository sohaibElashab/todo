import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  async create(
    @Body() createTodoDto: CreateTodoDto,
  ) {
    return await this.todoService.create(createTodoDto);
  }

  @Get()
  async findAll() {
    return await this.todoService.findAll();
  }

  @Get('/pagination')
  async findAllByPagination(@Query() { skip, limit }) {
    return await this.todoService.FindByPagination(skip, limit);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.todoService.getSingleTodo(id);
  }

  @Get('/statu/:statu')
  async findStatu(@Param('statu') statu: string) {
    return await this.todoService.getSingleTodoByStatu(statu);
  }

  @Get('/tag/:tag')
  async findTag(@Param('tag') tag: string) {
    return await this.todoService.getSingleTodoByTag(tag);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto, @Body() userId?: string) {
    return await this.todoService.update(id, updateTodoDto ,userId);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.todoService.remove(id);
  }
}
