import './App.css';
import Header from './components/Headers/Header';
import React, { useState } from "react";
import TableList from './components/List/TableList';
import { data } from './Assets/Data';
import { Button, message, Space } from 'antd';
import { saveDataToLocalStorage } from './commons/LocalStorageHanlder';

function App() {
  const [todos, setTodos] = useState(data);

  const [messageApi, contextHolder] = message.useMessage();

  const success = (msg) => {
    messageApi.open({
      type: 'success',
      content: msg,
    });
  };

  const error = (msg) => {
    messageApi.open({
      type: 'error',
      content: msg,
    });
  };

  const addTodos = (tName) => {
    if (!tName) {
      error('Please enter a valid todo name!!');
      return;
    }

    let temp = [...todos];
    let obj = {
      key: todos.length + 2,
      name: tName,
      tags: ["incomplete"],
    }
    temp.push(obj);
    setTodos(temp);
    success("Todo added successfully");
    saveDataToLocalStorage('todos', temp);
  }

  return (
    <div className="App">
      {contextHolder}
      <h1>Todos App</h1>
      <Header addTodos={addTodos} />
      <TableList todos={todos} setTodos={setTodos} success={success} />
    </div>
  );
}

export default App;
