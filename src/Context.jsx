import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useReducer,
} from "react";

const Todos = createContext(null);

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "ADD_TODO":
      return {
        ...state,
        todo: [action.payload, ...state.todo],
      };

    default:
      return state;
  }
};

const initialState = {
  todo: [],
};

const Context = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  function addNewTodo(e) {
    e.preventDefault();
    const value = e.target[0].value;
    console.log(value);
    const updatedArray = [...state.todo];
    
    console.log(updatedArray);
    const newTodo = {
      value: value,
      isComplete: false,
      isEdit: false,
    };
    updatedArray.unshift(newTodo);
    console.log(updatedArray);
    dispatch({ type: "ADD_TODO",payload: newTodo });
    e.target[0].value = "";
  }

  const contextValue = {
    state,
    dispatch,
    addNewTodo
  };

  return <Todos.Provider value={contextValue}>{children}</Todos.Provider>;
};

export const globalTodos = () => {
  return useContext(Todos);
};

export default Context;
