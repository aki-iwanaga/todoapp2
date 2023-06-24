package kiitos.todoapp2

import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

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
}
