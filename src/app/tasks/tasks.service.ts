import { Injectable, signal } from '@angular/core';
import { Task } from './task.model';

@Injectable({
  // this means that the service is provided in the root injector, 
  // so it can be injected into any component in the app
  // if we only want to provide the service in a specific module, we can use the following syntax:
  // providedIn: 'MyComponent'  
  providedIn: 'root'
})
export class TasksService {
  constructor() { }

  private tasks = signal<Task[]>([]);
  allTasks = this.tasks.asReadonly();

  private generateUniqueId(): string {
    let id: string;
    do {
      id = (Math.floor(Math.random() * 100) + 1).toString();
    } while (this.tasks().some(task => task.id === id));
    return id;
  }

  // Implementation
  addTask(taskOrData: Task | { title: string, description: string }) {
    if ('id' in taskOrData) {
      // It's a Task object
      this.tasks.update(tasks => [...tasks, taskOrData]);
    } else {
      // It's taskData object
      this.tasks.update(tasks => [...tasks, {
        id: this.generateUniqueId(),
        title: taskOrData.title,
        description: taskOrData.description,
        status: 'OPEN'
      }]);
    }
  }

}
