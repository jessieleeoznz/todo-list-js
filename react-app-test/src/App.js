import React from "react";
import "./App.css";
import { TodoList } from "./TodoList";

class App extends React.Component {
  render() {
    const appName = "TodoList";
    return (
      <div className="App">
        <h1>{appName}</h1>
        <div className="main-frame">
          <TodoList />
        </div>
      </div>
    );
  }
}

export default App;
