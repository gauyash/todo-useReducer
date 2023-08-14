import React from "react";
import { MdDarkMode } from "react-icons/md";
const Header = () => {
  return (
    <div className="header">
      <div className="container">
        <div className="head">
          <h1>Todo</h1>
          <MdDarkMode size={40} />
        </div>

        <div className="newTodoBox box">
          <span className="circle"></span>
          <input type="text" id="newTodo" placeholder="Create a new todo" />
        </div>
      </div>
    </div>
  );
};

export default Header;
