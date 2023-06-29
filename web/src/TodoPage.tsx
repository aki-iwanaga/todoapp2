import {TestIds} from "./tests/TestIds";
import {TodoRepository} from "./TodoRepository";
import {ChangeEvent, useEffect, useState} from "react";
import Todo from "./Todo";
import {useAsync} from "react-use";

type Props = {
    todoRepository: TodoRepository
}
export default function TodoPage({
    todoRepository
}: Props){
    const [newTodo, setNewTodo] = useState('')
    const [todos, setTodos] = useState<string[]>([])

    const getTodos = async () => {
        try {
            const res = await todoRepository.getTodos()
            console.log('res',res)
            setTodos(res)
        } catch (e) {
            console.log("エラーが発生しました", e)
        }
    }

    useAsync(async()=>{
        console.log("HKSJDFA")
        await getTodos()
    },[])

    useEffect(() => {
        console.log("todos",todos);
    }, [todos]);

    const onChange = (e:ChangeEvent<HTMLInputElement>) => {
        setNewTodo(e.target.value)
    }
    const onClick = async () => {
       if(newTodo){
          await todoRepository.postTodo(newTodo)
           getTodos()
       } else {
           console.log("inputが空です")
       }
    }

    return (
        <div data-testid = {TestIds.TODO_PAGE}>
            <input
                onChange={onChange}
            ></input>
            <button
                onClick={onClick}
                    >登録
            </button>
            <ul data-testid = {TestIds.TODO_LIST}>
                {todos && todos.map((elem, key) => (
                    <li key={`todoPage ${key}`}>{elem}</li>
                ))}
            </ul>
        </div>
    )
}
