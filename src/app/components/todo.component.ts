import { Component, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToDo } from '../models';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit{

  todoForm!: FormGroup
  taskArray!: FormArray 

  @Output()
  onNewTodo = new Subject<ToDo>()

  @Input()
  todo!: ToDo

  constructor(private fb: FormBuilder) {
    this.fb = fb
  }

  ngOnInit(): void {
      this.todoForm = this.createTodoForm()
  }

  processTodo() {
    const t: ToDo = this.todoForm.value
    t.dueDate = new Date(this.todoForm.get('dueDate')?.value)
    this.todoForm = this.createTodoForm()
    this.ngOnInit()
  }

  // Adds the task in the to do list
  addTask() {
    const task = this.createTask()
    this.taskArray.push(task)
  }

  // Deletes the task in the task array
  deleteTask(idx: number) {
    this.taskArray.removeAt(idx)
  }

  // Check if the control name is valid/invalid
  hasError(cn: string): boolean { // cn means control name
    return !!(this.todoForm.get(cn)?.invalid && this.todoForm.get(cn)?.dirty)
  }

  invalid(): boolean {
    return this.todoForm.invalid || this.taskArray.length <= 0
  }

  // Checks if the form is valid/invalid
  isFormInvalid(): boolean {
    return this.todoForm.invalid
  }

  // Define the Form Model for to do list
  private createTodoForm(): FormGroup {
    this.taskArray = this.fb.array([])
    return this.fb.group({
      name: this.fb.control<string>('', [ Validators.required]),
      dueDate: this.fb.control<string>('', [ Validators.required ]),
      taskList: this.taskArray
    })
  }

  // Define the Form Model for task list
  private createTask(): FormGroup {
    return this.fb.group({
      taskName: this.fb.control<string>('' , [ Validators.required ]),
      priority: this.fb.control<number>(1, [ Validators.required ])
    })
  }
}
