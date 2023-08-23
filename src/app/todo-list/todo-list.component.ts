import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';
import { Todo } from '../todo.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];
  newTodoTitle: string = '';
  
  constructor(private todoService: TodoService) {}
  
  ngOnInit(): void {
    this.todos = this.todoService.getTodos();
  }
  
  addTodo(): void {
    if (this.newTodoTitle.length >= 4 && this.newTodoTitle.length <= 200 && /^[a-zA-Z0-9 ]*$/.test(this.newTodoTitle)) {
      const newTodo: Todo = { id: Date.now(), title: this.newTodoTitle, completed: false };
      if (this.todoService.addTodo(newTodo)) {
        this.todos = this.todoService.getTodos();
        this.newTodoTitle = '';
      } else {
        alert('Duplicate todo!');
      }
    } else {
      alert('Please enter a valid task between 4 and 200 characters without special characters.');
    }
  }
  
  deleteTodo(todoId: number): void {
    this.todoService.deleteTodo(todoId);
    this.todos = this.todoService.getTodos();
  }
}