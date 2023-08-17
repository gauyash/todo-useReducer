import React from "react";
import { AiFillEdit } from "react-icons/ai";
import { MdClose } from "react-icons/md";
import { globalTodos } from "../Context";

const TodoList = ({}) => {
  const {
    state,
    dispatch
  } = globalTodos();



  console.log(state);

  // Rendering the elements
  // const todoListElements = state.todo.map((item, index) => {
  //   return (
  //     <li
  //       key={index}
  //       // className={`box ${item.isComplete === true ? "todoSelected" : ""}`}
  //       className="box"
  //     >
  //       <div 
  //        className="sub-box">
  //         <span className="circle"></span>
  //         <p className="todoText">hellp</p>
  //       </div>
  //       <div className="actionButtons">
  //         <AiFillEdit 
  //          size={25} />
  //         <MdClose 
  //          size={25} />
  //       </div>
  //     </li>
  //   );
  // });

  return (
    <div className="container">
      <div className="todo">
        <div className="todoSubBox">
          {/* <ul className="todo-list">{todoListElements}</ul> */}
          <div className="status box">
            <h5 className="notCompleted">{`items left`}</h5>
            <button
             className="clear">
              Clear Completed
            </button>
          </div>
        </div>

        <div className="tab box">
          <h4
            // className={active === "all" ? "active-link" : ""}
          >
            All
          </h4>
          <h4
            // className={active === "active" ? "active-link" : ""}
          >
            Active
          </h4>
          <h4
            // className={active === "completed" ? "active-link" : ""}
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
