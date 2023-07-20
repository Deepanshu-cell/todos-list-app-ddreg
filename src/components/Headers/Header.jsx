import "./Header.css";
import React, { useState } from "react";
import { Input } from "antd";
const { Search } = Input;

const Header = ({setTodoName}) => {
  const addTodo = (v) => {
    setTodoName(v);
  };

  return (
    <div className="header-main">
      <div className="search-bar-container">
        <Search
          placeholder="Add Todo Name"
          allowClear
          enterButton="Add"
          size="large"
          onSearch={addTodo}
        />
      </div>
    </div>
  );
};

export default Header;
