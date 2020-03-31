import React from "react";

export class TodoItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentId: "",
      currentValue: ""
    };
  }

  handleKeyDown = event => {
    console.log("press", event.key, event.keycode);
    if (event.keycode === "13") {
      this.props.handleeditenter(this.state.currentvalue, this.props.todo.id);
      this.setstate({ currentid: -1 });
    } else if (event.keycode === "27") {
      this.setstate({ currentid: -1 });
    }
  };

  handledoubleclicked = event => {
    event.preventdefault();
    this.setstate({
      currentid: this.props.todo.id,
      currentvalue: this.props.todo.title
    });
  };

  render() {
    return (
      <div className="todo-item-area" key={this.props.todo.id}>
        <label className="todo-item">
          <label className="todo-item-label">
            <label
              className="tick-label"
              onClick={this.props.handlechangecompletedstatus}
            >
              <i
                className="far fa-circle"
                style={{
                  display: this.props.todo.completed ? "none" : "block"
                }}
              ></i>
              <i
                className="far fa-check-circle"
                style={{
                  display: this.props.todo.completed ? "block" : "none"
                }}
              ></i>
            </label>
            <input
              className="todo-item-checkbox-input"
              type="checkbox"
              defaultChecked={this.props.todo.completed}
            />
            {this.state.currentId === this.props.todo.id ? (
              <input
                type="text"
                className="todo-item-input"
                value={this.state.currentValue}
                onChange={this.handleChange}
                handleKeyDown={this.handleKeyDown}
              />
            ) : (
              <label
                className="todo-item-text"
                onDoubleClick={this.handleDoubleClicked}
              >
                {this.props.todo.title}{" "}
              </label>
            )}
          </label>
          <label className="delete-label" onClick={this.props.handleDelete}>
            x
          </label>
        </label>
      </div>
    );
  }
}
