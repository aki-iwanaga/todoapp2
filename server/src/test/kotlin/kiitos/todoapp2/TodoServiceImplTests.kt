 package kiitos.todoapp2

 import io.mockk.*
 import kiitos.todoapp2.models.Todo
 import kiitos.todoapp2.models.TodoRecord
 import org.junit.Assert
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
        todoService.postNewTodo("hoge-newTodo")

        //Then
        verify { spyTodoRepository.save(record) }
    }
    @Test
    fun `getTodosが呼ばれた時、リポジトリからTodosを受け取る`(){
     //Given
     val todoList: List<TodoRecord> = listOf(
         TodoRecord(1,"hoge-todo"),
         TodoRecord(2,"fuga-todo"),
     )
     val todos = listOf(
         Todo(1,"hoge-todo"),
         Todo(2,"fuga-todo")
     )
     every {spyTodoRepository.findAll()} returns todoList

     //When
     val res = todoService.getTodos()

     //Then
     verify { spyTodoRepository.findAll() }
     Assert.assertEquals(todos, res)
    }
 }
