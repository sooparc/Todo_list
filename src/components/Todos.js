import React from "react";
import classes from "./Todos.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash, faCheck } from "@fortawesome/free-solid-svg-icons";

const TodoItems = ({
  todos,
  setTodos,
  hideTodos,
  editTodo,
  setEditTodo,
  editingText,
  setEditingText,
}) => {
  const editIcon = <FontAwesomeIcon size="lg" icon={faPencil} />;
  const saveIcon = <FontAwesomeIcon size="lg" icon={faCheck} />;
  const deleteIcon = <FontAwesomeIcon size="lg" icon={faTrash} />;

  // When finished editing, use this button to save.
  const saveHandler = (id) => {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.title = editingText;
      }
      return todo;
    });
    setTodos(updatedTodos);
    setEditTodo(null);
    setEditingText("");
  };

  // Edit todos.
  const editHandler = ({ id }) => {
    todos.map((todo) => {
      if (todo.id === id) {
        setEditTodo(todo.id);
        const showInput = todo.title;
        setEditingText(showInput);
      }
      return todo;
    });
  };

  // Delete todos.
  const deleteHandler = ({ id }) => {
    const temp = todos.filter((todo) => todo.id !== id);
    setTodos(temp);

    // Also delete todos in the local storage.
    const arr = JSON.parse(localStorage.getItem("todos"));
    const filtered = arr.filter((i) => i.id !== id);
    localStorage.setItem("todos", JSON.stringify(filtered));
  };

  return (
    <div className={classes.container}>
      {todos.map(
        (todo) =>
          !hideTodos.includes(todo.id) && (
            <div key={todo.id}>
              {editTodo === todo.id ? (
                <input
                  type="text"
                  onChange={(e) => setEditingText(e.target.value)}
                  className={classes.todoItems}
                  value={editingText}
                  minLength="1"
                  maxLength="25"
                />
              ) : (
                <div className={classes.todos}>{todo.title}</div>
              )}

              {editTodo === todo.id ? (
                <button
                  className={classes.saveButton}
                  onClick={() => saveHandler(todo.id)}
                >
                  {saveIcon}
                </button>
              ) : (
                <button
                  className={classes.editButton}
                  onClick={() => editHandler(todo)}
                >
                  {editIcon}
                </button>
              )}

              <button
                className={classes.deleteButton}
                onClick={() => deleteHandler(todo)}
              >
                {deleteIcon}
              </button>
            </div>
          )
      )}
    </div>
  );
};

export default TodoItems;
