import {NetworkTodoRepository} from "./TodoRepository";


describe('NetworkTodoRepository', ()=>{
    const mockHttpClient = {
        post: jest.fn(),
        get: jest.fn(),
        patch: jest.fn(),
        delete: jest.fn(),
    };
    const repos = new NetworkTodoRepository(mockHttpClient)

    it('postNewTodoが呼ばれたら,backendにpostする', async ()=>{
        //When
        await repos.postNewTodo("hoge-newTodo")
        //Then
        expect(mockHttpClient.post).toHaveBeenCalledWith('/todo', {todo: 'hoge-newTodo'})
    })
    it('getTodosが呼ばれたら,backendからgetし,string[]型のPromiseを返す', async ()=>{
        //Given
        mockHttpClient.get.mockResolvedValue({todos: ["hoge-todo", "fuga-todo"]})
        //When
        const todos = await repos.getTodos()
        //Then
        expect(mockHttpClient.get).toHaveBeenCalled()
        expect(todos).toEqual(["hoge-todo", "fuga-todo"])
    })
})
