import { Component, effect, inject, OnInit, viewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonToggleChange, MatButtonToggleGroup, MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatListModule } from '@angular/material/list';
import { TodosFilter, TodosStore } from '../../store/todos.store';
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

  //signal-base viewchild
  filter = viewChild.required(MatButtonToggleGroup);


  constructor(){
    //signal side-effect for the button
    effect(() => {
      console.log("UPDATING FILTER SIGNAL")
      const filter = this.filter();
      filter.value = this.store.filter();
    })
  }


  async onAddTodo(title: string){
    await this.store.addTodo(title);
  }

  async onDeleteTodo(id: string, event: MouseEvent) {
      event.stopPropagation();
      await this.store.deleteTodo(id);
  }


  async onTodoToggle(id: string, completed: boolean) {
    console.log("TOGGLE TODO SELECT EVENT", id)
    await this.store.updateTodo(id, completed);
  }


  onFilterTodos(event: MatButtonToggleChange){
    console.log("FILTERING TODOS")
    const filter = event.value as TodosFilter;
    this.store.updateFilter(filter);
  }



  ngOnInit(): void {
    //do stuff
  }

} 
