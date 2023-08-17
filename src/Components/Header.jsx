import React from "react";
import { MdDarkMode } from "react-icons/md";
import { WiMoonAltNew } from "react-icons/wi";
import { globalTodos } from "../Context";

const Header = () => {
  const { state, handleTodo, handleTheme, inputRef } = globalTodos();
  return (
    <div className="header">
      <div className="container">
        <div className="head">
          <h1>Todo</h1>
          <span
            onClick={handleTheme}
            className={`theme ${state.isDark ? "fullMoon" : "halfMoon"}`}
          >
            <MdDarkMode className="firstIcon" size={40} />
            <WiMoonAltNew className="secondIcon" size={40} />
          </span>
        </div>

        <form onSubmit={handleTodo} className="newTodoBox box">
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
