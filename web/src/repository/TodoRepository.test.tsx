import {NetworkTodoRepository} from "./TodoRepository";
import {mockedHttpClient} from "../tests/testUtils";

describe('NetworkTodoRepository', ()=>{
    const repos = new NetworkTodoRepository(mockedHttpClient)

    it('postNewTodoが呼ばれたら,backendにpostする', async ()=>{
        //When
        await repos.postNewTodo("hoge-newTodo")
        //Then
        expect(mockedHttpClient.post).toHaveBeenCalledWith('/todo', {todo: 'hoge-newTodo'})
    })
    it('getTodosが呼ばれたら,backendからgetし,string[]型のPromiseを返す', async ()=>{
        //Given
        mockedHttpClient.get.mockResolvedValue({todos: ["hoge-todo", "fuga-todo"]})
        //When
        const todos = await repos.getTodos()
        //Then
        expect(mockedHttpClient.get).toHaveBeenCalled()
        expect(todos).toEqual(["hoge-todo", "fuga-todo"])
    })
})
