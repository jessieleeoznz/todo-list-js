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
      currentNewTitle: "",
      filterKey: FILTER_STATUS.ALL,
      todos: [
        {
          id: 1,
          title: "this is the first example, double click to edit it",
          completed: false
        },
        {
          id: 2,
          title: "this is the second example, double click to edit it",
          completed: false
        }
      ]
    };
  }

  handleAddChange = event => {
    event.preventDefault();
    this.setState({ currentNewTitle: event.target.value });
  };

  handleAddSubmit = event => {
    event.preventDefault();
    this.setState(state => ({
      todos: [
        ...state.todos,
        {
          id: this.state.newId,
          title: this.state.currentNewTitle,
          completed: false
        }
      ],
      newId: state.newId + 1,
      currentNewTitle: ""
    }));
  };

  handleEditEnter = (currentValue, id) => {
    if (currentValue !== "") {
      this.setState(state => {
        const todos = state.todos.map(todo => {
          return { ...todo, title: todo.id === id ? currentValue : todo.title };
        });
        return { todos };
      });
    }
  };

  isAllCompleted = state => {
    return state.todos.filter(todo => !todo.completed).length === 0;
  };

  handleToggleAllItems = () => {
    this.setState(state => {
      const isAllCompleted = this.isAllCompleted(state);
      const todos = state.todos.map(todo => {
        return {
          ...todo,
          completed: !isAllCompleted
        };
      });
      return { todos };
    });
  };

  handleChangeCompletedStatus = (currentCompletedStatus, id) => {
    this.setState(state => {
      const todos = state.todos.map(todo => {
        return {
          ...todo,
          completed: todo.id === id ? !currentCompletedStatus : todo.completed
        };
      });
      return { todos };
    });
  };

  handleItemDelete = id => {
    this.setState(state => ({
      todos: state.todos.filter(todo => todo.id !== id)
    }));
  };

  getTodosByFilterKey = filterKey => {
    const isFilterCompleted = filterKey === FILTER_STATUS.COMPLETED;
    return filterKey === FILTER_STATUS.ALL
      ? this.state.todos
      : this.state.todos.filter(todo => todo.completed === isFilterCompleted);
  };

  handleChangeFilterKey = filterRadio => {
    this.setState({ filterKey: filterRadio });
  };

  isNeededClear = state => {
    return state.todos.filter(todo => todo.completed).length > 0;
  };

  clearCompleted = () => {
    this.setState(state => {
      const todos = state.todos.filter(todo => !todo.completed);
      return { todos };
    });
  };

  getButtonClassByFilterKey(filterRadio) {
    return this.state.filterKey === filterRadio ? "filtered" : "filter-li";
  }

  buildCheckIcon() {
    const className = this.isAllCompleted(this.state)
      ? "fas fa-check"
      : "far fa-circle";
    return <i className={className}></i>;
  }

  render() {
    const CLEAR_BUTTON = "clear completed";
    const notAllItemInfo =
      this.state.filterKey === FILTER_STATUS.ALL
        ? ""
        : `${this.state.filterKey} items:${
            this.getTodosByFilterKey(this.state.filterKey).length
          }`;
    const itemInfo = `${FILTER_STATUS.ALL} items:${this.state.todos.length} ${notAllItemInfo}`;
    const showClearButton = {
      visibility: this.isNeededClear(this.state) ? "visible" : "hidden"
    };
    return (
      <div className="todo-list-frame">
        <form className="add-item-area" onSubmit={this.handleAddSubmit}>
          <label className="tick-label" onClick={this.handleToggleAllItems}>
            {this.buildCheckIcon()}
          </label>
          <input
            type="text"
            className="add-item-input"
            value={this.state.currentNewTitle}
            onChange={this.handleAddChange}
            placeholder="enter to add a todo list"
            required
          />
        </form>
        {this.getTodosByFilterKey(this.state.filterKey).map(todo => (
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
          <span className="remaining-span">{itemInfo}</span>
          <span className="filter-span">
            {filterRadios.map((filterRadio, index) => (
              <li
                className={this.getButtonClassByFilterKey(filterRadio)}
                key={index}
                value={filterRadio}
                onClick={() => this.handleChangeFilterKey(filterRadio)}
              >
                {filterRadio}
              </li>
            ))}
          </span>
          <span className="clear-span">
            <li
              className="clear-li"
              style={showClearButton}
              onClick={this.clearCompleted}
            >
              {CLEAR_BUTTON}
            </li>
          </span>
        </div>
      </div>
    );
  }
}
