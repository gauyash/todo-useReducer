import React from "react";
import { AiFillEdit } from "react-icons/ai";
import { MdClose } from "react-icons/md";

const TodoList = () => {
  return (
    <div className="container">
      <ul>
        <li>
          <span className="circle"></span>
          <p className="todoText">helllllllo</p>
          <div className="actionButtons">
            <AiFillEdit />
            <MdClose />
          </div>
        </li>
        <li>
          <span className="circle"></span>
          <p className="todoText">helllllllo</p>
          <div className="actionButtons">
            <AiFillEdit />
            <MdClose />
          </div>
        </li>
        <li>
          <span className="circle"></span>
          <p className="todoText">helllllllo</p>
          <div className="actionButtons">
            <AiFillEdit />
            <MdClose />
          </div>
        </li>
      </ul>
      <div className="status">
        <h6 className="notCompleted">5 items left</h6>
        <button className="clear">Clear Completed</button>
      </div>
      
      <div className="tab">
        <h6>All</h6>
        <h6>Active</h6>
        <h6>Completed</h6>
      </div>

      <p className="instruction">Drag and drop to reorder list</p>
    </div>
  );
};

export default TodoList;
