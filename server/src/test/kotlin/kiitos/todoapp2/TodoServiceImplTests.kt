// package kiitos.todoapp2
//
// import io.mockk.verify
// import org.junit.jupiter.api.Test
// import org.springframework.boot.test.context.SpringBootTest
//
// @SpringBootTest
// class TodoServiceImplTests {
//    val todoService = TodoServiceImpl()
//    @SpykBean
//
//    @Test
//    fun `postTodoが呼ばれた時、リポジトリにsaveを依頼する`(){
//        //When
//        todoService.postTodo("hoge-newTodo")
//        //Then
//        verify { spyTodoRepository.save }
//    }
// }
