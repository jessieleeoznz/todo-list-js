import React, { useState } from "react";

export function TodoItem(props) {
  const [editStatus, setEditState] = useState(false);
  const [currentValue, setCurrentValue] = useState("");
  const itemLabelStyle = {
    color: props.todo.completed ? "lightgrey" : "black",
  };

  const handleItemDoubleClicked = (e) => {
    e.preventDefault();
    setEditState(true);
    setCurrentValue(props.todo.title);
  };

  const handleEditChange = (e) => {
    e.preventDefault();
    setCurrentValue(e.target.value);
  };

  const handleEditKeyDown = (e) => {
    const enterKey = 13;
    const escapeKey = 27;
    if (e.keyCode === enterKey) {
      handleEditKeyEnter();
    } else if (e.keyCode === escapeKey) {
      setEditState(false);
    }
  };

  const handleEditKeyEnter = () => {
    props.handleEditEnter(currentValue, props.todo.id);
    setEditState(false);
  };

  return (
    <div className="todo-item-area" key={props.todo.id}>
      <label className="todo-item">
        <label className="todo-item-label">
          <CheckItemIcon
            handleChangeCompletedStatus={props.handleChangeCompletedStatus}
            todo={props.todo}
          />
          <input className="todo-item-checkbox-input" type="checkbox" />
          {editStatus ? (
            <input
              type="text"
              className="todo-item-input"
              value={currentValue}
              onChange={(e) => handleEditChange(e)}
              onKeyDown={(e) => handleEditKeyDown(e)}
              onBlur={() => handleEditKeyEnter()}
              autoFocus={true}
            />
          ) : (
            <label
              className="todo-item-text"
              onDoubleClick={(e) => handleItemDoubleClicked(e)}
              style={itemLabelStyle}
            >
              {props.todo.title}
            </label>
          )}
        </label>
        <DeleteItemIcon
          handleItemDelete={props.handleItemDelete}
          id={props.todo.id}
        />
      </label>
    </div>
  );
}

function CheckItemIcon(props) {
  const className = props.todo.completed
    ? "far fa-check-circle"
    : "far fa-circle";
  return (
    <label
      className="tick-label"
      onClick={() =>
        props.handleChangeCompletedStatus(props.todo.completed, props.todo.id)
      }
    >
      <i className={className}></i>
    </label>
  );
}

function DeleteItemIcon(props) {
  const DELETE = "x";
  return (
    <label
      className="delete-label"
      onClick={() => props.handleItemDelete(props.id)}
    >
      {DELETE}
    </label>
  );
}
