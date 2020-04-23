import React, { useState } from "react";
import { AddNewItemArea } from "./AddNewItemArea";
import { EditAndDeleteItemsArea } from "./EditAndDeleteItemsArea";
import { FilterAndClearItemsArea } from "./FilterAndClearItemsArea";

export const FILTER_STATUS = {
  ALL: "all",
  UNCOMPLETED: "uncompleted",
  COMPLETED: "completed",
};

export function TodoListApp() {
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

  const [filterKey, setFilterKey] = useState(FILTER_STATUS.ALL);

  const handleEditEnter = (currentValue, id) => {
    if (currentValue !== "") {
      setTodos(
        todos.map((todo) => {
          return { ...todo, title: todo.id === id ? currentValue : todo.title };
        })
      );
    }
  };

  const handleAddNewItemToTodos = (newId, currentNewTitle) => {
    setTodos([
      ...todos,
      {
        id: newId,
        title: currentNewTitle,
        completed: false,
      },
    ]);
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

  const handleClearCompleted = () =>
    setTodos(todos.filter((todo) => !todo.completed));

  const getTodosByFilterKey = () => {
    const isFilterCompleted = filterKey === FILTER_STATUS.COMPLETED;
    return filterKey === FILTER_STATUS.ALL
      ? todos
      : todos.filter((todo) => todo.completed === isFilterCompleted);
  };

  const handleChangeFilterKey = (filterRadio) => setFilterKey(filterRadio);

  return (
    <div className="todo-list-frame">
      <AddNewItemArea
        isAllCompleted={isAllCompleted}
        handleToggleAllItems={handleToggleAllItems}
        handleAddNewItemToTodos={handleAddNewItemToTodos}
      />
      {getTodosByFilterKey().map((todo) => (
        <EditAndDeleteItemsArea
          key={todo.id}
          todo={todo}
          handleItemDelete={handleItemDelete}
          handleEditEnter={handleEditEnter}
          handleChangeCompletedStatus={handleChangeCompletedStatus}
        />
      ))}
      <FilterAndClearItemsArea
        todos={todos}
        filterKey={filterKey}
        handleChangeFilterKey={handleChangeFilterKey}
        getTodosByFilterKey={getTodosByFilterKey}
        handleClearCompleted={handleClearCompleted}
      />
    </div>
  );
}
