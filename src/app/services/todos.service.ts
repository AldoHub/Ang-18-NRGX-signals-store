import { Injectable } from '@angular/core';
import { TODOS } from "../model/mock-data";
import { Todo } from '../model/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  constructor() { }

  //-- GET ALL TODOS
  async getTodos(){
    await sleep(1000);
    //will just return the mock data
    return TODOS;
  }

  //ADD A TODO - CREATE -- is a partial since we will not be dealing with the id
  async addTodo(todo:Partial<Todo>): Promise<Todo> {
    await sleep(1000);

    return {
      id: Math.random().toString(36).substring(2, 9), //mocking up the generated id coming from the backend - hence using a partial
      ...todo
    } as Todo;

  }

  //DELETE A TODO -- DELETE
  async deleteTodo(id: string): Promise<void> {
    await sleep(1000);
  }


  //UPDATE A TODO --- UPDATE
  async updateTodo(id: string, completed: boolean) {
    await sleep(1000);
    
  }

}


async function sleep(delay: number){
  return new Promise(resolve => {
    //resolve the promise and continue after the set delay  
    setTimeout(resolve, delay);
  })
}