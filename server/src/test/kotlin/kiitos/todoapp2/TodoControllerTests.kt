package kiitos.todoapp2

import io.mockk.*
import io.mockk.impl.annotations.SpyK
import org.junit.jupiter.api.Test
import org.springframework.boot.test.autoconfigure.web.client.AutoConfigureMockRestServiceServer
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders
import org.springframework.test.web.servlet.result.MockMvcResultMatchers
import org.springframework.test.web.servlet.setup.MockMvcBuilders

@SpringBootTest
@AutoConfigureMockRestServiceServer
@AutoConfigureMockMvc
class TodoControllerTests {
    private val spyTodoService: TodoService = mockk()

    private fun makeSubject(config: TodoService): MockMvc {
        return MockMvcBuilders.standaloneSetup(
            TodoController(config)
        ).build()
    }
    @Test
    fun `post要求された場合、serviceのpostTodoにBodyを渡して呼び、200OKを返す`() {
        // Given
        every { spyTodoService.postTodo(any()) } just Runs

        // When
        makeSubject(spyTodoService)
            .perform(
                MockMvcRequestBuilders.post("/api/todo")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content("""{"todo": "hoge-newTodo"}""")
            )
            // Then
            .andExpect(MockMvcResultMatchers.status().isOk)

        verify { spyTodoService.postTodo("hoge-newTodo") }
    }
}
