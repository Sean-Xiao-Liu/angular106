import { Component, ElementRef, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
  // since this is a service instead of a component, 
  // we need to provide it in the providers array,
  //  instead of importing it in the imports array
  providers: [TasksService],
})
export class NewTaskComponent {
  private formEl = viewChild<ElementRef<HTMLFormElement>>('form');

  // this is the way to inject the service into the component
  // instead of creating new instance of the service
  constructor(private tasksService: TasksService) { }
  
  onAddTask(title: string, description: string) {
    console.log('trigger onAddTask:', title, description);
    this.tasksService.addTask({ title, description });
    console.log('tasksService.allTasks():', this.tasksService.allTasks());
    this.formEl()?.nativeElement.reset();
  }
}
