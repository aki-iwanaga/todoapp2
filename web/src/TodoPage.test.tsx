import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import TodoPage from "./TodoPage";
import {TestIds} from "./tests/TestIds";
import {NetworkTodoRepository, TodoRepository} from "./TodoRepository";
import {act} from "react-dom/test-utils";
import {WASI} from "wasi";

describe('todoPage', ()=>{

    let spyTodoRepository:TodoRepository

    // const spyTodoRepository = {
    //     postTodo: jest.fn(),
    //     getTodos: jest.fn().mockResolvedValue(["hoge-todo","fuga-todo"])
    // }

    beforeEach(async ()=>{
        spyTodoRepository = {
            postTodo: jest.fn(),
            getTodos: jest.fn()
        }
        // await act(async () => {
        //     await render(<TodoPage todoRepository={spyTodoRepository}/>)
        // })
        render(<TodoPage todoRepository={spyTodoRepository} />)
        // await waitFor(() => {
        //     expect(spyTodoRepository.getTodos).toHaveBeenCalled()
        //     expect(screen.getByTestId("TodoList")).toBeInTheDocument()
        // })
    })
    it('input要素が表示される', ()=>{
        //Then
        expect(screen.getByRole('textbox')).toBeInTheDocument()
    })
    it('登録ボタンが表示される', ()=>{
        //Then
        expect(screen.getByRole('button', {name: '登録'})).toBeInTheDocument()
    })
    it('todoListが表示される', ()=>{
        //Then
        expect(screen.getByTestId(TestIds.TODO_LIST)).toBeInTheDocument()
    })
    it('インプットの中身があり、登録ボタンを押すと、repositoryのpostTodoにinputの中身を渡して呼ぶ', ()=>{
        //When
        fireEvent.input(screen.getByRole('textbox'),{ target: { value: 'hoge-todo'}})
        fireEvent.click(screen.getByRole('button', {name: '登録'}))
        //Then
        expect(spyTodoRepository.postTodo).toHaveBeenCalledWith('hoge-todo')
    })
    it('インプットの中身がなく、登録ボタンを押すと、repositoryを呼ばない', ()=>{
        //When
        fireEvent.input(screen.getByRole('textbox'),{ target: { value: ''}})
        fireEvent.click(screen.getByRole('button', {name: '登録'}))
        //Then
        expect(spyTodoRepository.postTodo).not.toHaveBeenCalled()
    })
    it('RepositoryのgetTodosを呼び,Todosの中身が表示される', async () => {
        (spyTodoRepository.getTodos as jest.Mock).mockReturnValue(["hoge-todo","fuga-todo"])
        // await waitFor(() =>expect(screen.getByText('hoge-todo')).toBeInTheDocument())
        // await act(async () => {
        //     await render(<TodoPage todoRepository={spyTodoRepository}/>)
        // })
        // await act(async () => {
        //     await render(<TodoPage todoRepository={spyTodoRepository}/>)
        // })
        render(<TodoPage todoRepository={spyTodoRepository} />)
        //Then
        expect(spyTodoRepository.getTodos).toHaveBeenCalled()
        // await waitFor(() => expect(screen.getByText('hoge-todo')).toBeInTheDocument())
        expect(screen.getByText('hoge-todo')).toBeInTheDocument()
    })
})
