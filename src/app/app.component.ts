import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { TodosListComponent } from './components/todos-list/todos-list.component';
import { TodosStore } from './store/todos.store';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TodosListComponent, MatProgressSpinnerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
 
  title = 'ang-ngrx-signals-store';

  //inject the store
  store = inject(TodosStore);

  async loadTodos(){
      //load the data from the store
      await this.store.loadAll();
  }
    
  ngOnInit(): void {
    this.loadTodos().then(todos => {
        console.log("TODOS LOADED!!")
      }).catch(err => console.log("ERROR LOADING TODOS: ", err));
   
  }
   
  
}
