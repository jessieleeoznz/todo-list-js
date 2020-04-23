import React, { useState } from "react";

export function AddNewItemArea(props) {
  const [newId, setNewId] = useState(3);
  const [currentNewTitle, setCurrentNewTitle] = useState("");

  const handleAddChange = (e) => {
    e.preventDefault();
    setCurrentNewTitle(e.target.value);
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    props.handleAddNewItemToTodos(newId, currentNewTitle);
    setNewId(newId + 1);
    setCurrentNewTitle("");
  };

  return (
    <form className="add-item-area" onSubmit={(e) => handleAddSubmit(e)}>
      <ToggleCheckAllItemsIcon
        isAllCompleted={props.isAllCompleted}
        handleToggleAllItems={props.handleToggleAllItems}
      />
      <input
        type="text"
        className="add-item-input"
        value={currentNewTitle}
        onChange={(e) => handleAddChange(e)}
        placeholder="enter to add a todo list"
        required
      />
    </form>
  );
}

function ToggleCheckAllItemsIcon(props) {
  const className = props.isAllCompleted() ? "fas fa-check" : "far fa-circle";
  return (
    <label className="tick-label" onClick={() => props.handleToggleAllItems()}>
      <i className={className}></i>
    </label>
  );
}
