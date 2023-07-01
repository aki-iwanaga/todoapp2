package kiitos.todoapp2

import kiitos.todoapp2.models.Todo
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.server.ResponseStatusException
import java.lang.Exception

data class NewTodoBody(
    val todo: String
)

data class TodosResponse(
    val todos: List<Todo>
)

@RestController
@RequestMapping("/api/todo")
class TodoController(
    val todoService: TodoService
) {
    @PostMapping()
    fun postNewTodo(
        @RequestBody param: NewTodoBody
    ) {
        todoService.postNewTodo(param.todo)
    }

    @GetMapping
    fun getTodos(): TodosResponse{
        try {
            return TodosResponse(todoService.getTodos())
        } catch(e: Exception) {
            throw ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
