import React from "react";
import { MdDarkMode } from "react-icons/md";
import { WiMoonAltNew } from "react-icons/wi";
import { globalTodos } from "../Context";

const Header = () => {
  const { addNewTodo, inputRef, handleTheme, theme } = globalTodos();

  return (
    <div className="header">
      <div className="container">
        <div className="head">
          <h1>Todo</h1>
          <span
            onClick={handleTheme}
            className={`theme ${theme === "light" ? "halfMoon" : "fullMoon"}`}
          >
            <MdDarkMode className="firstIcon" size={40} />
            <WiMoonAltNew className="secondIcon" size={40} />
          </span>
        </div>

        <form onSubmit={addNewTodo} className="newTodoBox box">
          <span className="circle"></span>
          <input
            ref={inputRef}
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
