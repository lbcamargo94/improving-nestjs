import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { FindAllParameters, TaskDto } from './task.dto';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  create(@Body() task: TaskDto) {
    return this.taskService.create(task);
  }

  @Post('/create-many')
  createMany(@Body() tasks: TaskDto[]) {
    return this.taskService.createMany(tasks);
  }

  @Get('/:id')
  findById(@Param('id') id: string) {
    return this.taskService.findById(id);
  }

  @Get()
  findAll(@Query() params: FindAllParameters): TaskDto[] {
    return this.taskService.findAll(params);
  }

  @Put('/:id')
  update(@Body() task: TaskDto, @Param('id') id: string) {
    return this.taskService.updateTask(id, task);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.taskService.removeTask(id);
  }
}
