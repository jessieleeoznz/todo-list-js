import React from "react";

export class TodoItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentId: "",
      currentValue: ""
    };
  }

  handleChange = event => {
    event.preventDefault();
    this.setState({ currentValue: event.target.value });
  };

  handleKeyDown = event => {
    if (event.keyCode === 13) {
      this.handleKeyEnter();
    } else if (event.keyCode === 27) {
      this.setState({ currentId: -1 });
    }
  };

  handleKeyEnter = () => {
    this.props.handleEditEnter(this.state.currentValue, this.props.todo.id);
    this.setState({ currentId: -1 });
  };

  handleDoubleClicked = event => {
    event.preventDefault();
    this.setState({
      currentId: this.props.todo.id,
      currentValue: this.props.todo.title
    });
  };

  render() {
    return (
      <div className="todo-item-area" key={this.props.todo.id}>
        <label className="todo-item">
          <label className="todo-item-label">
            <label
              className="tick-label"
              onClick={this.props.handleChangeCompletedStatus}
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
            <input className="todo-item-checkbox-input" type="checkbox" />
            {this.state.currentId === this.props.todo.id ? (
              <input
                type="text"
                className="todo-item-input"
                value={this.state.currentValue}
                onChange={this.handleChange}
                onKeyDown={this.handleKeyDown}
                onBlur={this.handleKeyEnter}
              />
            ) : (
              <label
                className="todo-item-text"
                onDoubleClick={this.handleDoubleClicked}
                style={{
                  color: this.props.todo.completed ? "lightgrey" : "black"
                }}
              >
                {this.props.todo.title}
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
