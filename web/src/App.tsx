import React from 'react';
import './App.css';
import TodoPage from "./TodoPage";
import {NetworkTodoRepository} from "./TodoRepository";
import {NetworkHttpClient} from "./NetworkHttpClient";

function App() {
  const httpClient = new NetworkHttpClient('api')
  // const httpClient = new NetworkHttpClient(process.env.React_APP_API_HOST!)
  const todoRepository = new NetworkTodoRepository(httpClient)
  return (
    <TodoPage
      todoRepository ={todoRepository}/>
  );
}

export default App;
