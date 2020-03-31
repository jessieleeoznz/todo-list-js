import React from "react";
import { TodoItem } from "./TodoItem";

export class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newId: 3,
      currentTitle: "",
      todos: [
        {
          id: 1,
          title: "this is the first example, double click to edit it",
          completed: false,
          editing: false
        },
        {
          id: 2,
          title: "this is the second example, double click to edit it",
          completed: false,
          editing: false
        }
      ]
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    this.setState(state => ({
      todos: [
        ...state.todos,
        {
          id: this.state.newId,
          title: this.state.currentTitle,
          completed: false,
          editing: false
        }
      ],
      newId: state.newId + 1,
      currentTitle: ""
    }));
  };

  handleEditEnter = (currentValue, id) => {
    this.setState(state => {
      const todos = state.todos.map(item => {
        return { ...item, title: item.id === id ? currentValue : item.title };
      });
      return { todos };
    });
  };

  isAllCompleted = state => {
    return state.todos.filter(item => !item.completed).length === 0;
  };

  handleToggleAllItems = () => {
    this.setState(state => {
      const todos = state.todos.map(item => {
        return {
          ...item,
          completed:
            state.todos.filter(item => !item.completed).length === 0
              ? false
              : true
        };
      });
      return { todos };
    });
  };

  handleChangeCompletedStatus = (currentCompletedStatus, id) => {
    this.setState(state => {
      const todos = state.todos.map(item => {
        return {
          ...item,
          completed: item.id === id ? !currentCompletedStatus : item.completed
        };
      });
      return { todos };
    });
  };

  handleDelete = id => {
    console.log(this.state.todos.filter(item => item.id !== id));
    this.setState(state => ({
      todos: state.todos.filter(item => item.id !== id)
    }));
  };

  render() {
    return (
      <div className="todo-list-frame">
        <form className="add-item-area" onSubmit={this.handleSubmit}>
          <label className="tick-label" onClick={this.handleToggleAllItems}>
            <i
              className="far fa-circle"
              style={{
                display: this.isAllCompleted(this.state) ? "none" : "block"
              }}
            ></i>
            <i
              className="fas fa-check"
              style={{
                display: this.isAllCompleted(this.state) ? "block" : "none"
              }}
            ></i>
          </label>
          <input
            type="text"
            className="add-item-input"
            value={this.state.currentTitle}
            onChange={event =>
              this.setState({ currentTitle: event.target.value })
            }
            placeholder="enter to add a todolist"
            required
          />
        </form>
        {this.state.todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            handleDelete={() => this.handleDelete(todo.id)}
            handleEditEnter={this.handleEditEnter}
            handleChangeCompletedStatus={() =>
              this.handleChangeCompletedStatus(todo.completed, todo.id)
            }
          />
        ))}
      </div>
    );
  }
}
