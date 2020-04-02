import React from "react";
import { TodoItem } from "./TodoItem";

export const FILTER_STATUS = {
  ALL: "all",
  UNCOMPLETED: "uncompleted",
  COMPLETED: "completed"
};

export const filterRadios = Object.values(FILTER_STATUS);

export class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newId: 3,
      currentTitle: "",
      filterKey: FILTER_STATUS.ALL,
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

  handleAddChange = event => {
    event.preventDefault();
    this.setState({ currentTitle: event.target.value });
  };

  handleAddSubmit = event => {
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
    if (currentValue !== "") {
      this.setState(state => {
        const todos = state.todos.map(item => {
          return { ...item, title: item.id === id ? currentValue : item.title };
        });
        return { todos };
      });
    }
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

  handleItemDelete = id => {
    this.setState(state => ({
      todos: state.todos.filter(item => item.id !== id)
    }));
  };

  handleTodosByFilterKey = filterKey => {
    const isFilterCompleted = filterKey === FILTER_STATUS.COMPLETED;
    return filterKey === FILTER_STATUS.ALL
      ? this.state.todos
      : this.state.todos.filter(item => item.completed === isFilterCompleted);
  };

  handleChangeFilterKey = filterRadio => {
    this.setState({ filterKey: filterRadio });
  };

  needClear = state => {
    return state.todos.filter(item => item.completed).length > 0;
  };

  clearCompleted = () => {
    this.setState(state => {
      const todos = state.todos.filter(item => !item.completed);
      return { todos };
    });
  };

  render() {
    const allItemInfo = `${FILTER_STATUS.ALL} items:${this.state.todos.length}`;
    const notAllItemInfo =
      this.state.filterKey === FILTER_STATUS.ALL
        ? ""
        : `   ${this.state.filterKey} items:${
            this.handleTodosByFilterKey(this.state.filterKey).length
          }`;
    return (
      <div className="todo-list-frame">
        <form className="add-item-area" onSubmit={this.handleAddSubmit}>
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
            onChange={this.handleAddChange}
            placeholder="enter to add a todolist"
            required
          />
        </form>
        {this.handleTodosByFilterKey(this.state.filterKey).map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            handleItemDelete={() => this.handleItemDelete(todo.id)}
            handleEditEnter={this.handleEditEnter}
            handleChangeCompletedStatus={() =>
              this.handleChangeCompletedStatus(todo.completed, todo.id)
            }
          />
        ))}
        <div className="filter-item-area">
          <span className="remaining-span">
            {allItemInfo}
            {notAllItemInfo}
          </span>
          <span className="filter-span">
            {filterRadios.map((filterRadio, index) => {
              return (
                <li
                  className={
                    this.state.filterKey === filterRadio
                      ? "filterd"
                      : "filter-li"
                  }
                  key={index}
                  value={filterRadio}
                  onClick={() => this.handleChangeFilterKey(filterRadio)}
                >
                  {filterRadio}
                </li>
              );
            })}
          </span>
          <span className="clear-span">
            <li
              className="clear-li"
              style={{
                visibility: this.needClear(this.state) ? "visible" : "hidden"
              }}
              onClick={this.clearCompleted}
            >
              clear completed
            </li>
          </span>
        </div>
      </div>
    );
  }
}
