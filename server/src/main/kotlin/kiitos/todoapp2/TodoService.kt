package kiitos.todoapp2

import kiitos.todoapp2.models.Todo
import kiitos.todoapp2.models.TodoRecord
import org.springframework.stereotype.Service

interface TodoService {
    fun postNewTodo(todo: String)
    fun getTodos(): List<Todo>
}

@Service
class TodoServiceImpl(val todoRepository: TodoRepository): TodoService {
    override fun postNewTodo(todo: String) {
        todoRepository.save(TodoRecord(todo=todo))
    }

    override fun getTodos(): List<Todo> {
        val res = todoRepository.findAll()
        return res.map { Todo(it.id, it.todo) }
    }
}
