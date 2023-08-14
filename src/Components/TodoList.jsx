import React,{useState} from "react";
import { AiFillEdit } from "react-icons/ai";
import { MdClose } from "react-icons/md";

const TodoList = () => {

  const[active,setActive]=useState("all")

  function handleLink(link){
    setActive(link)
  }

  return (
    <div className="container">
      <div className="todo">
        <div className="todoSubBox">
          <ul className="todo-list">
            <li className="box">
              <div className="sub-box">
                <span className="circle"></span>
                <p className="todoText">helllllllo</p>
              </div>
              <div className="actionButtons">
                <AiFillEdit size={25} />
                <MdClose size={25} />
              </div>
            </li>
            <li className="box">
              <div className="sub-box">
                <span className="circle"></span>
                <p className="todoText">helllllllo</p>
              </div>
              <div className="actionButtons">
                <AiFillEdit size={25} />
                <MdClose size={25} />
              </div>
            </li>
            <li className="box">
              <div className="sub-box">
                <span className="circle"></span>
                <p className="todoText">helllllllo</p>
              </div>
              <div className="actionButtons">
                <AiFillEdit size={25} />
                <MdClose size={25} />
              </div>
            </li>
          </ul>
          <div className="status box">
            <h5 className="notCompleted">5 items left</h5>
            <button className="clear">Clear Completed</button>
          </div>
        </div>

        <div className="tab box">
            <h4
            onClick={()=>handleLink("all")}
             className={active==="all" ? "active-link" :""}>All</h4>
            <h4
            onClick={()=>handleLink("active")}
            className={active==="active" ? "active-link" : ""}
            >Active</h4>
            <h4
            onClick={()=>handleLink("completed")}
            className={active==="completed" ? "active-link" :""}
            >Completed</h4>
        </div>

        <p className="instruction">Drag and drop to reorder list</p>
      </div>
    </div>
  );
};

export default TodoList;
