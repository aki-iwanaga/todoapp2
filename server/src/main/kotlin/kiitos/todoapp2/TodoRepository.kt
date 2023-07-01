package kiitos.todoapp2

import kiitos.todoapp2.models.TodoRecord
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface TodoRepository : JpaRepository<TodoRecord, Long>
