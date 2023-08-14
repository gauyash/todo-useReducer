import React, { useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { MdClose } from "react-icons/md";

const TodoList = ({ todo, handleComplete, handleRemove,clearCompleted,left }) => {
  // console.log(todo);

  const [active, setActive] = useState("all");
  // const [filtered, setActive] = useState("all");

  function handleLink(link) {

    if(link==="all"){
      
    }

      
    setActive(link);


  }

  const todoListElements = todo.map((item, index) => {
    return (
      <li
        key={index}
        className={`box ${item.isComplete === true ? "todoSelected" : ""}`}
      >
        <div onClick={() => handleComplete(index)} className="sub-box">
          <span className="circle"></span>
          <p className="todoText">{item.value}</p>
        </div>
        <div className="actionButtons">
          <AiFillEdit size={25} />
          <MdClose onClick={() => handleRemove(index)} size={25} />
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
            <h5 className="notCompleted">{`${left} items left`}</h5>
            <button 
            onClick={clearCompleted}
            className="clear">Clear Completed</button>
          </div>
        </div>

        <div className="tab box">
          <h4
            onClick={() => handleLink("all")}
            className={active === "all" ? "active-link" : ""}
          >
            All
          </h4>
          <h4
            onClick={() => handleLink("active")}
            className={active === "active" ? "active-link" : ""}
          >
            Active
          </h4>
          <h4
            onClick={() => handleLink("completed")}
            className={active === "completed" ? "active-link" : ""}
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
