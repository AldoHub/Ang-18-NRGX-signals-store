import { inject, signal } from "@angular/core";
import { Todo } from "../model/todo.model";
import { signalStore, withMethods, withState, patchState } from "@ngrx/signals";
import { TodosService } from "../services/todos.service";


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

            //define the store methods
            async loadAll(){
                
                patchState(store, {loading: true})
                const todos = await todosService.getTodos();
                patchState(store, {todos, loading: false});

            }

            //TODO: 39:18


        })
    )
        
);
