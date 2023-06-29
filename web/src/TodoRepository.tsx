import {HttpClient} from "./HttpClient";
import Todo from "./Todo";

export interface TodoRepository {
    postTodo(newTodo:string): void
    getTodos(): Promise<string[]>
}

export class NetworkTodoRepository implements TodoRepository {
    httpClient: HttpClient;

    constructor(httpClient: HttpClient) {
        this.httpClient = httpClient
    }

    async postTodo(newTodo:string){
        await this.httpClient.post('/todo', {todo: newTodo})
    }

    async getTodos():Promise<string[]> {
        const res = await this.httpClient.get('/todo')
        return res.todos
    }
}
