package kiitos.todoapp2

import org.springframework.stereotype.Service

interface TodoService {
    fun postTodo(todo: String)
}

@Service
class TodoServiceImpl : TodoService {
    override fun postTodo(todo: String) {
    }
}
