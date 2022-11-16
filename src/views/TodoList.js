import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "../views/TodoList.module.css";
import TodoForm from "../components/TodoForm";
import Todos from "../components/Todos";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faEnvelope,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

const TodoList = () => {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([
    { id: "0", title: "Go grocery shopping" },
    { id: "1", title: "Take out Mico for a walk" },
    { id: "2", title: "Study" },
    { id: "3", title: "Workout" },
  ]);
  const [editTodo, setEditTodo] = useState(null);
  const [editingText, setEditingText] = useState("");
  // Show a new to-do form with an add button.
  const [showInput, setShowInput] = useState(false);
  const [hideTodos, setHideTodos] = useState([]);

  const searchIcon = <FontAwesomeIcon icon={faMagnifyingGlass} />;
  const houseIcon = <FontAwesomeIcon icon={faHouse} />;
  const emailIcon = <FontAwesomeIcon icon={faEnvelope} />;
  const githubIcon = <FontAwesomeIcon icon={faGithub} />;
  const linkedinIcon = <FontAwesomeIcon icon={faLinkedin} />;

  const navigate = useNavigate();

  // New todos are saved in the local storage.
  useEffect(() => {
    const temp = localStorage.getItem("todos");
    const loadedTodos = JSON.parse(temp);

    if (loadedTodos) {
      setTodos(loadedTodos);
    }
  }, [setTodos]);

  // People are not allowed to see to-do list page without a user_token.
  useEffect(() => {
    const getObj = localStorage.getItem("user_token");
    if (getObj === null) {
      navigate("/");
    }
  });

  // Clicking the logout button will log the user out.
  const logoutHandler = () => {
    localStorage.removeItem("user_token");
    navigate("/");
  };

  // Typing something in the searchbar filters the list.
  const searchHandler = (e) => {
    let hiddenItems = todos.filter(
      (i) => !i.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    let hiddenItemIds = hiddenItems.map((i) => i.id);
    setHideTodos(hiddenItemIds);
  };

  return (
    <div className={classes.mainContainer}>
      <button className={classes.logoutButton} onClick={logoutHandler}>
        Logout
      </button>
      <div className={classes.container}>
        <div className={classes.title}>Todos</div>
        <div className={classes.inputForm}>
          <span className={classes.inputIcon}>{searchIcon}</span>

          <input
            type="text"
            className={classes.searchInput}
            placeholder="Search"
            onChange={searchHandler}
          />
          <button
            className={classes.newButton}
            onClick={() => setShowInput(!showInput)}
          >
            New
          </button>
        </div>

        {showInput === true ? (
          <>
            <TodoForm
              input={input}
              setInput={setInput}
              todos={todos}
              setTodos={setTodos}
            />
          </>
        ) : (
          ""
        )}

        <Todos
          todos={todos}
          setTodos={setTodos}
          hideTodos={hideTodos}
          editTodo={editTodo}
          setEditTodo={setEditTodo}
          editingText={editingText}
          setEditingText={setEditingText}
        />
      </div>

      <footer className={classes.footer}>
        <div className={classes.divider} />
        <div className={classes.footerText}>&copy; 2022 SOOJIN PARK</div>

        <div className={classes.icons}>
          <a href="/" className={classes.icon}>
            {houseIcon}
          </a>
          <a href="mailto:soozin95@gmail.com" className={classes.icon}>
            {emailIcon}
          </a>
          <a href="https://github.com/sooparc" className={classes.icon}>
            {githubIcon}
          </a>
          <a
            href="https://www.linkedin.com/in/soojin-park-6bb373141"
            className={classes.icon}
          >
            {linkedinIcon}
          </a>
        </div>
      </footer>
    </div>
  );
};

export default TodoList;
