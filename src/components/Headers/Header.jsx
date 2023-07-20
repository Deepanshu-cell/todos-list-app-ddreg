import "./Header.css";
import React, { useState } from "react";
import { Input } from "antd";
const { Search } = Input;

const Header = ({ addTodos }) => {
  const [inp, setInp] = useState("");
  return (
    <div className="header-main">
      <div className="search-bar-container">
        <Search
          placeholder="Add Todo Name"
          value={inp}
          allowClear
          enterButton="Add"
          size="large"
          onChange={(e) => setInp(e.target.value)}
          onSearch={(v) => {
            addTodos(v);
            setInp("");
          }}
        />
      </div>
    </div>
  );
};

export default Header;
