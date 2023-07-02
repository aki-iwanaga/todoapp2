import React from 'react';
import TodoPage from "./TodoPage";
import {NetworkTodoRepository} from "./repository/TodoRepository";
import {NetworkHttpClient} from "./NetworkHttpClient";
import "@testing-library/jest-dom/extend-expect";


function App() {
  const httpClient = new NetworkHttpClient('api')
  const todoRepository = new NetworkTodoRepository(httpClient)
  return (
    <TodoPage
      todoRepository ={todoRepository}/>
  );
}

export default App;
