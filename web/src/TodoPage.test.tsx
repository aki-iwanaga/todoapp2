import {fireEvent, render, screen} from "@testing-library/react";
import TodoPage from "./TodoPage";
import {TodoRepository} from "./TodoRepository";
import {act} from "react-dom/test-utils";

describe('todoPage', ()=>{

    let spyTodoRepository:TodoRepository

    beforeEach(async ()=>{ spyTodoRepository = {
            postNewTodo: jest.fn(),
            getTodos: jest.fn().mockResolvedValueOnce([
                {id: 1, todo:"hoge-todo"},
                {id: 2, todo:"fuga-todo"},
            ])
        }

        await act(async () => {
            await render(<TodoPage todoRepository={spyTodoRepository}/>)
        })
    })
    describe('レンダリング時', ()=>{
        it('タイトルが表示される', ()=>{
            //Then
            expect(screen.getByText('TodoApp チュートリアル')).toBeInTheDocument();
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
            expect(screen.getByRole('list')).toBeInTheDocument()
        })
        it('RepositoryのgetTodosを呼び,Todoリストの中身が表示される', async () => {
            //Then
            expect(spyTodoRepository.getTodos).toHaveBeenCalled()
            expect(screen.getByText('hoge-todo')).toBeInTheDocument()
            expect(screen.getByText('fuga-todo')).toBeInTheDocument()
        })
    })
    describe('登録ボタンを押した時', ()=>{
        describe('インプットの中身があれば', ()=>{
            it('repositoryのpostNewTodoにinputの中身を渡して呼ぶ', async () => {
                //When
                await act(async() => {
                    fireEvent.input(screen.getByRole('textbox'), {target: {value: 'new-todo'}})
                    fireEvent.click(screen.getByRole('button', {name: '登録'}))
                })
                //Then
                expect(spyTodoRepository.postNewTodo).toHaveBeenCalledWith('new-todo')
            })
            it('getTodosを呼ぶ', async () => {
                expect(spyTodoRepository.getTodos).toHaveBeenCalledTimes(1)
                //When
                await act(async() => {
                    fireEvent.input(screen.getByRole('textbox'), {target: {value: 'new-todo'}})
                    fireEvent.click(screen.getByRole('button', {name: '登録'}))
                })
                //Then
                expect(spyTodoRepository.getTodos).toHaveBeenCalledTimes(2)
            })
        })
        it('インプットの中身がなければ、repositoryを呼ばない', async () => {
            //When
            await act(() => fireEvent.input(screen.getByRole('textbox'), {target: {value: ''}}))
            await act(() => fireEvent.click(screen.getByRole('button', {name: '登録'})))
            //Then
            expect(spyTodoRepository.postNewTodo).not.toHaveBeenCalled()
        })
    })

})
