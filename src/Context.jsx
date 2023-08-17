import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useReducer,
} from "react";

const Todos = createContext(null);

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return {
        ...state,
        todo: [action.payload, ...state.todo],
      };

    case "CHECK_TODO":
      return {
        ...state,
        todo: action.payload, 
      };

    case "REMOVE_TODO":
      return {
        ...state,
        todo:action.payload
      }
    
    case "CLEAR_COMPLETED":
      return{
        ...state,
        todo:action.payload
      }


    default:
      return state;
  }
};

const initialState = {
  todo: [],
};

const Context = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [tab,setTab]=useState("all");
  const [filterTodo,setFilterTodo]=useState(state.todo);


  // Add a new object in the todo
  function addNewTodo(e) {
    e.preventDefault();
    const value = e.target[0].value;
    
    const newTodo = {
      id:Date.now(),
      value: value,
      isComplete: false,
      isEdit: false,
    };
    dispatch({ type: "ADD_TODO",payload: newTodo });
    e.target[0].value = "";
  }

  // Check whether the object in the todo is complete or not
  function handleComplete(id){
    const updatedTodo =state.todo.map(item =>
    item.id === id ? { ...item, isComplete: !item.isComplete } : item
  );
  dispatch({ type: "CHECK_TODO", payload: updatedTodo });
  }

  // To remove an object from the todo
  function handleRemove(id){
    const updatedTodo=state.todo.filter(item => item.id !=id)
    dispatch({type:"REMOVE_TODO",payload:updatedTodo})
  }

  function clearCompleted(){
    const updatedTodo=state.todo.filter(item => !item.isComplete)
    dispatch({type:"CLEAR_COMPLETED",payload:updatedTodo})
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
 function handleLinks(string){
    setTab(string)
}
  
  
  const contextValue = {
    state,
    dispatch,
    addNewTodo,
    handleComplete,
    handleRemove,
    clearCompleted,
    tab,handleLinks,filterTodo
  };

  return <Todos.Provider value={contextValue}>{children}</Todos.Provider>;
};

export const globalTodos = () => {
  return useContext(Todos);
};

export default Context;
