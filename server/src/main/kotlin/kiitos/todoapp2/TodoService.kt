package kiitos.todoapp2

import org.springframework.stereotype.Service

interface TodoService {
    fun postTodo(todo: String)
}

@Service
class TodoServiceImpl(val todoRepository: TodoRepository): TodoService {
    override fun postTodo(todo: String) {
        todoRepository.save(TodoRecord(todo=todo))
    }
}
