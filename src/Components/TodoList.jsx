import React from "react";
import { AiFillEdit } from "react-icons/ai";
import { MdClose } from "react-icons/md";
import { globalTodos } from "../Context";

const TodoList = ({}) => {
  const { state, handleComplete, handleRemove,tab,clearCompleted,handleLinks,filterTodo } = globalTodos();


 
  // Rendering the elements
  const todoListElements = filterTodo.map(item => {
    return (
      <li
        key={item.id}
        className={`box ${item.isComplete === true ? "todoSelected" : ""}`}
      >
        <div onClick={() => handleComplete(item.id)} className="sub-box">
          <span className="circle"></span>
          <p className="todoText">{item.value}</p>
        </div>
        <div className="actionButtons">
          <AiFillEdit size={25} />
          <MdClose onClick={() => handleRemove(item.id)} size={25} />
        </div>
      </li>
    );
  });
  return (
    <div className="container">
      <div className="todo">
        <div className="todoSubBox">
          <ul className="todo-list">{todoListElements}</ul>
          <div className="status box">
            <h5 className="notCompleted">{`${
              state.todo.filter((item) => !item.isComplete).length
            } items left`}</h5>
            <button
            onClick={clearCompleted}
             className="clear">Clear Completed</button>
          </div>
        </div>

        <div className="tab box">
          <h4
          className={tab === "all" ? "active-link" : ""}
          onClick={()=>handleLinks("all")}
          >
            All
          </h4>
          <h4
          className={tab === "active" ? "active-link" : ""}
          onClick={()=>handleLinks("active")}
          >
            Active
          </h4>
          <h4
          className={tab === "completed" ? "active-link" : ""}
          onClick={()=>handleLinks("completed")}
          >
            Completed
          </h4>
        </div>

        <p className="instruction">Drag and drop to reorder list</p>
      </div>
    </div>
  );
};

export default TodoList;
