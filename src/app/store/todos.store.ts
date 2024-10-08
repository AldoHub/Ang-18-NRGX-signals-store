import { computed, inject, signal } from "@angular/core";
import { Todo } from "../model/todo.model";
import { signalStore, withMethods, withState, patchState, withComputed } from "@ngrx/signals";
import { TodosService } from "../services/todos.service";

//filter
export type TodosFilter = "all" | "pending" | "completed";

type TodosState = {
    todos: Todo[];
    loading: boolean;
    filter: TodosFilter;
}

//define the initial state of the store
const initialState: TodosState = {
    todos: [],
    loading: false,
    filter: "all"
}

//define the store
export const TodosStore = signalStore(
    {providedIn: 'root'},
    withState(initialState),
    withMethods(
        (store, todosService = inject(TodosService)) => ({

            //--- DEFINE THE STORE METHODS
            async loadAll(){
                //get all todos
                patchState(store, {loading: true})
                const todos = await todosService.getTodos();
                patchState(store, {todos, loading: false});

            },

            async addTodo(title: string){
                //save todo
                const todo = await todosService.addTodo({title, completed: false});

                patchState(store, (state) => ({
                    todos: [...state.todos, todo]    
                })
                )
            },
            
            async deleteTodo(id: string) {
                //delete todo
                await todosService.deleteTodo(id);

                patchState(store, (state) => ({
                   todos: state.todos.filter(todo => todo.id !== id)
                }))
            },
   
            async updateTodo(id: string, completed: boolean) {
                //update todo
                await todosService.updateTodo(id, completed);
               
                patchState(store, (state) => ({
                    todos: state.todos.map((todo) => 
                    todo.id === id ? {...todo, completed: completed} : todo )
                }))
               
            
            },

            //filter todos list
            updateFilter(filter: TodosFilter){
               console.log("PATCH FILTER")
                patchState(store, {filter})
            }
        })
    ),
    withComputed((state) => ({
        
        filteredTodos: computed(() => {
           
            const todos = state.todos();
            let filteredTodos;
            
            switch(state.filter()) {
                case "all":
                    return filteredTodos = todos;
                case "pending":
                    return filteredTodos = todos.filter(todo => !todo.completed)
                case "completed":
                    return filteredTodos = todos.filter(todo => todo.completed)   
            }

        })
    
    }))
        
);
