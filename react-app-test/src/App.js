import React from "react";
import "./App.css";
import { TodoListApp } from "./TodoListApp";

class App extends React.Component {
  render() {
    const appName = "TodoList";
    return (
      <div className="App">
        <h1>{appName}</h1>
        <div className="main-frame">
          <TodoListApp />
        </div>
      </div>
    );
  }
}

export default App;
