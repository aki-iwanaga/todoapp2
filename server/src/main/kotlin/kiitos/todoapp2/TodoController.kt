package kiitos.todoapp2

import org.springframework.http.HttpStatus
import org.springframework.http.HttpStatusCode
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.server.ResponseStatusException
import java.lang.Exception

data class TodoBody(
    val todo: String
)

@RestController
@RequestMapping("/api/todo")
class TodoController(
    val todoService: TodoService
) {
    @PostMapping()
    fun postTodo(
        @RequestBody param: TodoBody
    ) {
        todoService.postTodo(param.todo)
    }

    @GetMapping
    fun getTodos(): Todos{
        try {
            return todoService.getTodos()
        } catch(e: Exception) {
            throw ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
