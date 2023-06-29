import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import TodoPage from "./TodoPage";
import {TestIds} from "./tests/TestIds";
import {NetworkTodoRepository, TodoRepository} from "./TodoRepository";
import {act} from "react-dom/test-utils";
import {WASI} from "wasi";

describe('todoPage', ()=>{

    let spyTodoRepository:TodoRepository

beforeEach(async ()=>{       spyTodoRepository = {
            postTodo: jest.fn(),
            getTodos: jest.fn().mockResolvedValue(["hoge-todo","fuga-todo"])
        }

        await act(async () => {
            await render(<TodoPage todoRepository={spyTodoRepository}/>)
        })
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
    it('インプットの中身があり、登録ボタンを押すと、repositoryのpostTodoにinputの中身を渡して呼ぶ', async () => {
        //When
        await act(() => fireEvent.input(screen.getByRole('textbox'), {target: {value: 'hoge-todo'}}))
        await act(()=> fireEvent.click(screen.getByRole('button', {name: '登録'})))
        //Then
        expect(spyTodoRepository.postTodo).toHaveBeenCalledWith('hoge-todo')
    })
    it('インプットの中身がなく、登録ボタンを押すと、repositoryを呼ばない', async () => {
        //When
        await act(() => fireEvent.input(screen.getByRole('textbox'), {target: {value: ''}}))
        await act(() => fireEvent.click(screen.getByRole('button', {name: '登録'})))
        //Then
        expect(spyTodoRepository.postTodo).not.toHaveBeenCalled()
    })
    it('RepositoryのgetTodosを呼び,Todosの中身が表示される', async () => {
        //Then
        expect(spyTodoRepository.getTodos).toHaveBeenCalled()
        expect(screen.getByText('hoge-todo')).toBeInTheDocument()
        expect(screen.getByText('fuga-todo')).toBeInTheDocument()
    })
})
