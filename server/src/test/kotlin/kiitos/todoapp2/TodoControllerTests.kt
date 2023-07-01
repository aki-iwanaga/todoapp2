package kiitos.todoapp2

import com.ninjasquad.springmockk.MockkBean
import io.mockk.*
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders
import org.springframework.test.web.servlet.result.MockMvcResultMatchers

@SpringBootTest
@AutoConfigureMockMvc
class TodoControllerTests {
    @Autowired
    private lateinit var mockMvc: MockMvc

    @MockkBean
    private lateinit var spyTodoService: TodoService

    @Test
    fun `post要求された場合、serviceのpostTodoにBodyを渡して呼び、200OKを返す`() {
        // Given
        every { spyTodoService.postNewTodo(any()) } just Runs

        // When
//
        mockMvc.perform(
            MockMvcRequestBuilders.post("/api/todo")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""{"todo": "hoge-newTodo"}""")
            )
            // Then
            .andExpect(MockMvcResultMatchers.status().isOk)

        verify { spyTodoService.postNewTodo("hoge-newTodo") }
    }
    @Test
    fun `get要求された場合、200OKと受け取ったTodosを返す`() {
        // Given
        every { spyTodoService.getTodos() } returns listOf(
            Todo(1,"hoge-todo"),
            Todo(2,"fuga-todo")
        )

        // When
        mockMvc.perform(
                MockMvcRequestBuilders.get("/api/todo")
            )
            // Then
            .andExpect(MockMvcResultMatchers.status().isOk)
            .andExpect(MockMvcResultMatchers.jsonPath("$.todos[0].id").value(1))
            .andExpect(MockMvcResultMatchers.jsonPath("$.todos[0].todo").value("hoge-todo"))
            .andExpect(MockMvcResultMatchers.jsonPath("$.todos[1].id").value(2))
            .andExpect(MockMvcResultMatchers.jsonPath("$.todos[1].todo").value("fuga-todo"))

        verify { spyTodoService.getTodos() }
    }
}
