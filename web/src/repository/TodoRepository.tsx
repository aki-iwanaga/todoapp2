import {HttpClient} from "../HttpClient";
import {Todo} from "../models/Todo";

export interface TodoRepository {
    postNewTodo(newTodo:string): void
    getTodos(): Promise<Todo[]>
}

export class NetworkTodoRepository implements TodoRepository {
    httpClient: HttpClient;

    constructor(httpClient: HttpClient) {
        this.httpClient = httpClient
    }

    async postNewTodo(newTodo:string){
        await this.httpClient.post('/todo', {todo: newTodo})
    }

    async getTodos():Promise<Todo[]> {
        const res = await this.httpClient.get('/todo')
        return res.todos
    }
}
