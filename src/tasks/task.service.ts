import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FindAllParameters, TaskDto } from './task.dto';

@Injectable()
export class TaskService {
  private tasks: TaskDto[] = [];

  create(task: TaskDto) {
    this.tasks.push(task);

    console.log(this.tasks);

    return this.tasks;
  }

  createMany(tasks: TaskDto[]) {
    this.tasks.push(...tasks);

    return this.tasks;
  }

  findById(id: string): TaskDto {
    const foundTask = this.tasks.find((task) => task.id === id);

    console.log('Service', foundTask);

    if (foundTask) {
      return foundTask;
    }

    throw new HttpException(
      `Task with id ${id} not found`,
      HttpStatus.NOT_FOUND,
    );
  }

  findAll(params: FindAllParameters): TaskDto[] {
    return this.tasks.filter((task) => {
      let match = true;

      if (params.title && !task.title.includes(params.title)) {
        match = false;
      }

      if (params.status && !task.status.includes(params.status)) {
        match = false;
      }

      return match;
    });
  }

  updateTask(id: string, task: TaskDto) {
    const foundTask = this.tasks.findIndex((task) => task.id === id);

    console.log('Service', foundTask);

    if (foundTask >= 0) {
      this.tasks[foundTask] = task;
      return task;
    }

    throw new HttpException(
      `Task with id ${id} not found`,
      HttpStatus.NOT_FOUND,
    );
  }

  removeTask(id: string) {
    const foundTask = this.tasks.findIndex((task) => task.id === id);

    if (foundTask >= 0) {
      this.tasks.splice(foundTask, 1);
      return this.tasks;
    }

    throw new HttpException(
      `Task with id ${id} not found`,
      HttpStatus.NOT_FOUND,
    );
  }
}
