import React from "react";
import classes from "./TodoForm.module.css";
import { v4 as uuidv4 } from "uuid";

const TodoForm = ({ input, setInput, todos, setTodos }) => {
  const changeHandler = (e) => {
    setInput(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const newTodos = [...todos, { id: uuidv4(), title: input }];
    setTodos(newTodos);
    setInput("");

    // Save new todos by using the local storage.
    const obj = JSON.stringify(newTodos);
    localStorage.setItem("todos", obj);
  };

  return (
    <div className={classes.container}>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          className={classes.inputTodo}
          value={input}
          onChange={changeHandler}
          minLength="1"
          maxLength="25"
          required
        />
        <button className={classes.saveButton}>save</button>
      </form>
    </div>
  );
};

export default TodoForm;
