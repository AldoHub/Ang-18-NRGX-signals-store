import { Component, inject, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatListModule } from '@angular/material/list';
import { TodosStore } from '../../store/todos.store';
import { CommonModule } from '@angular/common';
 

@Component({
  selector: 'app-todos-list',
  standalone: true,
  imports: [ MatFormFieldModule, MatIconModule, MatInputModule, MatButtonToggleModule, MatListModule, CommonModule ],
  templateUrl: './todos-list.component.html',
  styleUrl: './todos-list.component.scss'
})
export class TodosListComponent implements OnInit {

  //inject the store in order to display the data
  store = inject(TodosStore);


  async onAddTodo(title: string){
    await this.store.addTodo(title);
  }

  async onDeleteTodo(id: string, event: MouseEvent) {
      event.stopPropagation();

      await this.store.deleteTodo(id);
  }

  async onTodoToggle(id: string, completed: boolean) {
    await this.store.updateTodo(id, completed);
  }


  ngOnInit(): void {
    console.log(this.store.todos())
  }

} 
