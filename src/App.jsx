import Header from "./Components/Header";
import TodoList from "./Components/TodoList";
import { useEffect, useState ,useRef } from "react";
import "./scss/App.scss";

function App() {
  const [todo, setTodo] = useState([]);
  const [left, setLeft] = useState(todo.length);
  const inputRef = useRef(null);

  let editId=null;

  useEffect(()=>{
    const updatedArray=[...todo];

    const filteredArray=updatedArray.filter(item => item.isComplete!=true)
    setLeft(filteredArray.length)
  },[todo])

  function addNewTodo(e) {
    e.preventDefault();

    

    const newTodo = {
      value: e.target[0].value,
      isComplete: false,
      isEdit:false
    };

    const updatedArray = [...todo];
    updatedArray.unshift(newTodo);

    if(editId!=null){
      const updatedArray = todo.map((item, index) => {
        if (index === editId) {
          return {
            ...item,
            isEdit: false,
            value: newTodo.value,
          };
        }
        return item;
      });
  
      // setTodo(updatedArray);
      editId = null;   
      console.log("todo",updatedArray);

    }

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

  function handleEdit(index){
      console.log(index);
    setTodo(prevState=>{
      return prevState.map((item,id)=>{
        if(id===index){
          inputRef.current.value=item.value;
          editId=index;
          return {
            ...item,
            isEdit:true
          }
        }
        return item
      })
    })
  }

console.log(todo,editId);
  return (
    <div>
      <Header addNewTodo={addNewTodo} inputRef={inputRef} />
      <TodoList
        handleRemove={handleRemove}
        handleComplete={handleComplete}
        clearCompleted={clearCompleted}
        todo={todo}
        left={left}
        handleEdit={handleEdit}
      />
    </div>
  );
}

export default App;
