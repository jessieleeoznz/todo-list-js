import React, { useState } from "react";
import { TodoItem } from "./TodoItem";

export const FILTER_STATUS = {
  ALL: "all",
  UNCOMPLETED: "uncompleted",
  COMPLETED: "completed",
};

export const filterRadios = Object.values(FILTER_STATUS);

export function TodoList() {
  const CLEAR_BUTTON = "clear completed";
  const [newId, setNewId] = useState(3);
  const [currentNewTitle, setCurrentNewTitle] = useState("");
  const [filterKey, setFilterKey] = useState(FILTER_STATUS.ALL);
  const [todos, setTodos] = useState([
    {
      id: 1,
      title: "this is the first example, double click to edit it",
      completed: false,
    },
    {
      id: 2,
      title: "this is the second example, double click to edit it",
      completed: false,
    },
  ]);

  const handleAddChange = (e) => {
    e.preventDefault();
    setCurrentNewTitle(e.target.value);
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    setTodos([
      ...todos,
      {
        id: newId,
        title: currentNewTitle,
        completed: false,
      },
    ]);
    setNewId(newId + 1);
    setCurrentNewTitle("");
  };

  const handleEditEnter = (currentValue, id) => {
    if (currentValue !== "") {
      setTodos(
        todos.map((todo) => {
          return { ...todo, title: todo.id === id ? currentValue : todo.title };
        })
      );
    }
  };

  const getCheckIcon = () => {
    const className = isAllCompleted() ? "fas fa-check" : "far fa-circle";
    return <i className={className}></i>;
  };

  const isAllCompleted = () => {
    return todos.filter((todo) => !todo.completed).length === 0;
  };

  const handleToggleAllItems = () => {
    const isAllCompletedResult = isAllCompleted();
    setTodos(
      todos.map((todo) => {
        return {
          ...todo,
          completed: !isAllCompletedResult,
        };
      })
    );
  };

  const handleChangeCompletedStatus = (currentCompletedStatus, id) =>
    setTodos(
      todos.map((todo) => {
        return {
          ...todo,
          completed: todo.id === id ? !currentCompletedStatus : todo.completed,
        };
      })
    );

  const handleItemDelete = (id) =>
    setTodos(todos.filter((todo) => todo.id !== id));

  const getButtonStyleByFilterKey = (filterRadio) => {
    return filterKey === filterRadio ? "filtered" : "filter-li";
  };

  const handleChangeFilterKey = (filterRadio) => setFilterKey(filterRadio);

  const getTodosByFilterKey = (filterKey) => {
    const isFilterCompleted = filterKey === FILTER_STATUS.COMPLETED;
    return filterKey === FILTER_STATUS.ALL
      ? todos
      : todos.filter((todo) => todo.completed === isFilterCompleted);
  };

  const isNeededClear = () => {
    return todos.filter((todo) => todo.completed).length > 0;
  };

  const handleClearCompleted = () =>
    setTodos(todos.filter((todo) => !todo.completed));

  const notAllItemInfo =
    filterKey === FILTER_STATUS.ALL
      ? ""
      : `${filterKey} items:${getTodosByFilterKey(filterKey).length}`;

  const jointedItemInfo = `${FILTER_STATUS.ALL} items:${todos.length} ${notAllItemInfo}`;

  const showClearButton = {
    visibility: isNeededClear ? "visible" : "hidden",
  };

  return (
    <div className="todo-list-frame">
      <form className="add-item-area" onSubmit={(e) => handleAddSubmit(e)}>
        <label className="tick-label" onClick={() => handleToggleAllItems()}>
          {getCheckIcon()}
        </label>
        <input
          type="text"
          className="add-item-input"
          value={currentNewTitle}
          onChange={(e) => handleAddChange(e)}
          placeholder="enter to add a todo list"
          required
        />
      </form>
      {getTodosByFilterKey(filterKey).map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          handleItemDelete={handleItemDelete}
          handleEditEnter={handleEditEnter}
          handleChangeCompletedStatus={handleChangeCompletedStatus}
        />
      ))}
      <div className="filter-item-area">
        <span className="remaining-span">{jointedItemInfo}</span>
        <span className="filter-span">
          {filterRadios.map((filterRadio, index) => (
            <li
              className={getButtonStyleByFilterKey(filterRadio)}
              key={index}
              value={filterRadio}
              onClick={() => handleChangeFilterKey(filterRadio)}
            >
              {filterRadio}
            </li>
          ))}
        </span>
        <span className="clear-span">
          <li
            className="clear-li"
            style={showClearButton}
            onClick={() => handleClearCompleted()}
          >
            {CLEAR_BUTTON}
          </li>
        </span>
      </div>
    </div>
  );
}
