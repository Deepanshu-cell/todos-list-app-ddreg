import './App.css';
import Header from './components/Headers/Header';
import React, { useState } from "react";
import TableList from './components/List/TableList';
import { data } from './Assets/Data';

function App() {
  const [todos, setTodos] = useState(data);

  const addTodos = (tName) => {
    let temp = [...todos];
    let obj = {
      key: todos.length + 2,
      name: tName,
      tags: ["incomplete"],
    }
    temp.push(obj);
    setTodos(temp);
  }

  return (
    <div className="App">
      <h1>Todos App</h1>
      <Header addTodos={addTodos} />
      <TableList todos={todos} setTodos={setTodos}/>
    </div>
  );
}

export default App;
