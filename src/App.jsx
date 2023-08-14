import Header from "./Components/Header";
import TodoList from "./Components/TodoList";
import { useEffect, useState } from "react";
import "./scss/App.scss";

function App() {
  const [todo, setTodo] = useState([]);
  const [left, setLeft] = useState(todo.length);

  useEffect(()=>{
    const updatedArray=[...todo];

    const filteredArray=updatedArray.filter(item => item.isComplete!=true)
    console.log(filteredArray.length);
    setLeft(filteredArray.length)
  },[todo])

  function addNewTodo(e) {
    e.preventDefault();
    const newTodo = {
      value: e.target[0].value,
      isComplete: false,
    };

    const updatedArray = [...todo];
    updatedArray.unshift(newTodo);

    setTodo(updatedArray);
    e.target[0].value=""
  
  }

  function handleComplete(index) {
    setTodo((prevState) => {
      return prevState.map((item, id) => {
        if (id === index) {
          return {
            ...item,
            isComplete: !item.isComplete,
          };
        }
        return item;
      });
    });
  }

  function handleRemove(index) {
    const updatedArray=[...todo];
    updatedArray.splice(index,1)
    setTodo(updatedArray)
  }

  function clearCompleted(){
    const updatedArray=[...todo];

    const filteredArray=updatedArray.filter(item => item.isComplete!=true)
    setTodo(filteredArray)
  }


  return (
    <div>
      <Header addNewTodo={addNewTodo} />
      <TodoList
        handleRemove={handleRemove}
        handleComplete={handleComplete}
        clearCompleted={clearCompleted}
        todo={todo}
        left={left}
      />
    </div>
  );
}

export default App;
