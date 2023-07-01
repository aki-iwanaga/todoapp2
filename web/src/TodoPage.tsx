import {TodoRepository} from "./repository/TodoRepository";
import {useEffect, useRef, useState} from "react";
import {Todo} from "./models/Todo";

type Props = {
    todoRepository: TodoRepository
}
export default function TodoPage({
    todoRepository
}: Props){
    const [newTodo, setNewTodo] = useState('')
    const [todos, setTodos] = useState<Todo[]>([])
    const inputRef = useRef<HTMLInputElement>(null)

    const getTodos = async () => {
        try {
            const res = await todoRepository.getTodos()
            setTodos(res)
        } catch (e) {
            console.log("エラーが発生しました", e)
        }
    }

    useEffect(()=>{
        getTodos()
    },[newTodo])

    const onClick = async () => {
        const inputValue = inputRef.current?.value;
        if(inputValue){
            await todoRepository.postNewTodo(inputValue)
            setNewTodo(inputValue)
        } else {
           console.log("inputが空です")
       }
    }

    return (
        <>
            <p>TodoApp チュートリアル</p>
            <input
                ref={inputRef}
            ></input>
            <button
                onClick={onClick}
                    >登録
            </button>
            <ul>
                {todos && todos.map((elem, key) => (
                    <li key={`todoPage ${key}`}>{elem.todo}</li>
                ))}
            </ul>
        </>
    )
}
