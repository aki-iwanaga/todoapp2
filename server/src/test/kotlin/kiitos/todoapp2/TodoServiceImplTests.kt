 package kiitos.todoapp2

 import io.mockk.*
 import org.junit.jupiter.api.Test
 import org.springframework.boot.test.context.SpringBootTest

 @SpringBootTest
 class TodoServiceImplTests {
    private var spyTodoRepository = mockk <TodoRepository>()
     val todoService = TodoServiceImpl(spyTodoRepository)

    @Test
    fun `postTodoが呼ばれた時、リポジトリにsaveを依頼する`(){
        //Given
        val record = TodoRecord(
            todo = "hoge-newTodo"
        )
        every {spyTodoRepository.save(any())} returns record

        //When
        todoService.postTodo("hoge-newTodo")

        //Then
        verify { spyTodoRepository.save(record) }
    }
 }
