import React, { useState, useEffect, useRef } from "react";
import { AiFillEdit } from "react-icons/ai";
import { MdClose } from "react-icons/md";

const TodoList = ({
  todo,
  handleComplete,
  handleRemove,
  clearCompleted,
  left,
  handleEdit,
  D_Start,
  D_End,
  D_Enter,
}) => {
  const [active, setActive] = useState("all");
  const [filtered, setFiltered] = useState(todo);

  useEffect(() => {
    if (active === "all") {
      setFiltered(todo);
    } else if (active === "active") {
      const newArray = [...todo];
      const updatedArray = newArray.filter((item) => item.isComplete != true);
      setFiltered(updatedArray);
    } else {
      const newArray = [...todo];
      const updatedArray = newArray.filter((item) => item.isComplete == true);
      setFiltered(updatedArray);
    }
  }, [todo, active]);

  function handleLink(link) {
    setActive(link);
  }

 

  const todoListElements = filtered.map((item, index) => {
    return (
      <li
        draggable
        onDragStart={() => D_Start(index)}
        onDragEnter={() => D_Enter(index)}
        onDragEnd={() => D_End(index)}
        key={index}
        className={`box ${item.isComplete === true ? "todoSelected" : ""}`}
      >
        <div onClick={() => handleComplete(index)} className="sub-box">
          <span className="circle"></span>
          <p className="todoText">{item.value}</p>
        </div>
        <div className="actionButtons">
          <AiFillEdit onClick={() => handleEdit(index)} size={25} />
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
            <button onClick={clearCompleted} className="clear">
              Clear Completed
            </button>
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
