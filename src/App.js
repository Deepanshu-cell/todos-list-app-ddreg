import './App.css';
import Header from './components/Headers/Header';
import React, { useState } from "react";
import TableList from './components/List/TableList';

function App() {
  const [todoName, setTodoName] = useState('');

  return (
    <div className="App">
      <h1>Todos App</h1>
      <Header setTodoName={setTodoName} />
      <TableList />
    </div>
  );
}

export default App;
