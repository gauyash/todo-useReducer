import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useReducer,
} from "react";

const Todos = createContext(null);

let editId = null;

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return {
        ...state,
        todo: [action.payload, ...state.todo],
      };

    case "EDIT_TODO":
      console.log("ksdsal");
      return {
        ...state,
        todo: action.payload,
      };

    case "CHECK_TODO":
      return {
        ...state,
        todo: action.payload,
      };

    case "REMOVE_TODO":
      return {
        ...state,
        todo: action.payload,
      };

    case "CLEAR_COMPLETED":
      return {
        ...state,
        todo: action.payload,
      };

    case "DND":
      return {
        ...state,
        todo: action.payload,
      };

    case "toggle_theme":
      return {
        ...state,
        isDark: !state.isDark,
      };

    default:
      return state;
  }
};

const initialState = {
  todo: [],
  isDark: false,
};

const Context = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [tab, setTab] = useState("all");
  const [filterTodo, setFilterTodo] = useState(state.todo);
  const inputRef = useRef(null);

  // Add or Edit an object in the todo
  function handleTodo(e) {
    e.preventDefault();
    const value = e.target[0].value;

    if (editId == null) {
      const newTodo = {
        id: Date.now(),
        value: value,
        isComplete: false,
        isEdit: false,
      };
      dispatch({ type: "ADD_TODO", payload: newTodo });
    }
    if (editId) {
      console.log("hello");
      const updatedTodo = state.todo.map((item) => {
        if (item.id == editId) {
          return {
            ...item,
            value: value,
            isEdit: false,
          };
        }
        return item;
      });

      console.log(updatedTodo);
      editId = null;
      dispatch({ type: "EDIT_TODO", payload: updatedTodo });
    }
    e.target[0].value = "";
  }

  // Check whether the object in the todo is complete or not
  function handleComplete(id) {
    const updatedTodo = state.todo.map((item) =>
      item.id === id ? { ...item, isComplete: !item.isComplete } : item
    );
    dispatch({ type: "CHECK_TODO", payload: updatedTodo });
  }

  // To remove an object from the todo
  function handleRemove(id) {
    const updatedTodo = state.todo.filter((item) => item.id != id);
    dispatch({ type: "REMOVE_TODO", payload: updatedTodo });
  }

  // Clear the completed/checked object in the todo
  function clearCompleted() {
    const updatedTodo = state.todo.filter((item) => !item.isComplete);
    dispatch({ type: "CLEAR_COMPLETED", payload: updatedTodo });
  }

  useEffect(() => {
    if (tab === "all") {
      setFilterTodo(state.todo);
    } else if (tab === "active") {
      const updatedArray = state.todo.filter((item) => !item.isComplete);
      setFilterTodo(updatedArray);
    } else {
      const updatedArray = state.todo.filter((item) => item.isComplete);
      setFilterTodo(updatedArray);
    }
  }, [tab, state.todo]);

  // Filtering the todo based on the tab which is active
  function handleLinks(string) {
    setTab(string);
  }

  // Handling the theme of the website
  function handleTheme() {
    dispatch({ type: "toggle_theme", payload: state.isDark });
  }

  useEffect(() => {
    const theme = state.isDark ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
  }, [state.isDark]);

  // Editing the object in the todo
  function handleEdit(id) {
    editId = id;
    const updatedTodo = state.todo.map((item) => {
      if (!item.isComplete && item.id == id) {
        inputRef.current.value = item.value;
        return {
          ...item,
          isEdit: true,
        };
      }
      return item;
    });
  }

  // Drag and Drop Functionality
  let todoItemDrag = useRef();
  let todoItemDragOver = useRef();

  function D_Start(e, index) {
    todoItemDrag.current = index;
  }

  function D_Enter(e, index) {
    todoItemDragOver.current = index;
  }

  function D_End(e, index) {
    const arr1 = [...state.todo];
    const todo_item_main = arr1[todoItemDrag.current];
    arr1.splice(todoItemDrag.current, 1);
    arr1.splice(todoItemDragOver.current, 0, todo_item_main);
    todoItemDrag.current = null;
    todoItemDragOver.current = null;

    dispatch({ type: "DND", payload: arr1 });
  }

  const contextValue = {
    state,
    dispatch,
    handleTodo,
    handleComplete,
    handleRemove,
    clearCompleted,
    tab,
    handleLinks,
    filterTodo,
    handleTheme,
    handleEdit,
    inputRef,
    D_Enter,
    D_End,
    D_Start,
  };

  return <Todos.Provider value={contextValue}>{children}</Todos.Provider>;
};

export const globalTodos = () => {
  return useContext(Todos);
};

export default Context;
