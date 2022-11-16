import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./views/Login";
import TodoList from "./views/TodoList";

function App() {
  return (
    <div className="todo-app">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<TodoList />} exact />
      </Routes>
    </div>
  );
}

export default App;
