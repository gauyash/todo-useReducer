import React from "react";
import { MdDarkMode } from "react-icons/md";
import { WiMoonAltNew } from "react-icons/wi";
import { globalTodos } from "../Context";

const Header = () => {
  const { addNewTodo, 
    } = globalTodos();
  return (
    <div className="header">
      <div className="container">
        <div className="head">
          <h1>Todo</h1>
          <span
            className={`theme`}
          >
            <MdDarkMode className="firstIcon" size={40} />
          </span>
        </div>

        <form onSubmit={addNewTodo} className="newTodoBox box">
          <span className="circle"></span>
          <input
            type="text"
            id="newTodo"
            placeholder="Create a new todo"
          />
        </form>
      </div>
    </div>
  );
};

export default Header;
