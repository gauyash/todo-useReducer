import Header from "./Components/Header";
import TodoList from "./Components/TodoList";
import { useEffect, useState, useRef } from "react";
import "./scss/App.scss";
let editId = null;

function App() {
  const [todo, setTodo] = useState([]);
  const [left, setLeft] = useState(todo.length);
  const inputRef = useRef(null);
  const [theme, setTheme] = useState("light");

  function handleTheme() {
    setTheme((prevState) => (prevState === "light" ? "dark" : "light"));
  }

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    const updatedArray = [...todo];

    const filteredArray = updatedArray.filter(
      (item) => item.isComplete != true
    );
    setLeft(filteredArray.length);
  }, [todo]);

  function addNewTodo(e) {
    e.preventDefault();
    const updatedArray = [...todo];

    if (editId == null) {
      const newTodo = {
        value: e.target[0].value,
        isComplete: false,
        isEdit: false,
      };
      updatedArray.unshift(newTodo);
      setTodo(updatedArray);
    }

    if (editId != null) {
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

      editId = null;
      setTodo(updatedArray);
    }

    e.target[0].value = "";
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
    const updatedArray = [...todo];
    updatedArray.splice(index, 1);
    setTodo(updatedArray);
  }

  function clearCompleted() {
    const updatedArray = [...todo];

    const filteredArray = updatedArray.filter(
      (item) => item.isComplete != true
    );
    setTodo(filteredArray);
  }

  function handleEdit(index) {
    setTodo((prevState) => {
      return prevState.map((item, id) => {
        if (item.isComplete === false && id === index) {
          inputRef.current.value = item.value;
          editId = index;
          return {
            ...item,
            isEdit: true,
          };
        }
        return item;
      });
    });
  }

  let todoItemDrag = useRef();
  let todoItemDragOver = useRef();

  function D_Start(index) {
    todoItemDrag.current = index;
    document.body.style.cursor = "grabbing";
  }
  function D_Enter(index) {
    todoItemDragOver.current = index;
    const cpArr = [...todo];

    let finalArr = [];
    cpArr.forEach((item) => {
      finalArr.push({
        value: item.value,
        isComplete: item.isComplete,
        isEdit: item.isEdit,
      });
    });

    setTodo(finalArr);
  }
  function D_End(index) {
    const arr1 = [...todo];
    const todo_item_main = arr1[todoItemDrag.current];
    arr1.splice(todoItemDrag.current, 1);
    arr1.splice(todoItemDragOver.current, 0, todo_item_main);

    todoItemDrag.current = null;
    todoItemDragOver.current = null;

    document.body.style.cursor = "auto";
    setTodo(arr1);
  }

  return (
    <div>
      <Header
        addNewTodo={addNewTodo}
        handleTheme={handleTheme}
        inputRef={inputRef}
        theme={theme}
      />
      <TodoList
        handleRemove={handleRemove}
        handleComplete={handleComplete}
        clearCompleted={clearCompleted}
        todo={todo}
        left={left}
        handleEdit={handleEdit}
        D_Start={D_Start}
        D_Enter={D_Enter}
        D_End={D_End}
      />
    </div>
  );
}

export default App;
