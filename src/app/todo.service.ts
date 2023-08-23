import { Injectable } from '@angular/core';
import { Todo } from './todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todos: Todo[] = [];

  addTodo(todo: Todo): boolean {
    if (this.todos.some(t => t.title === todo.title)) {
      return false; // Duplicate todo
    }
    this.todos.push(todo);
    return true;
  }

  deleteTodo(todoId: number): void {
    const index = this.todos.findIndex(todo => todo.id === todoId);
    if (index !== -1) {
      this.todos.splice(index, 1);
    }
  }

  getTodos(): Todo[] {
    return [...this.todos];
  }
}