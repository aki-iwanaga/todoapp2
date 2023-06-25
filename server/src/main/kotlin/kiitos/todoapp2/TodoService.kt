package kiitos.todoapp2

import org.springframework.stereotype.Service

interface TodoService {
    fun postTodo(todo: String)
    fun getTodos(): Todos
}

@Service
class TodoServiceImpl(val todoRepository: TodoRepository): TodoService {
    override fun postTodo(todo: String) {
        todoRepository.save(TodoRecord(todo=todo))
    }

    override fun getTodos(): Todos {
        val res = todoRepository.findAll()
        return Todos(res.map {it.todo})
    }
}
