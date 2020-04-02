import React from "react";

export class TodoItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentId: "",
      currentValue: ""
    };
  }

  handleEditChange = event => {
    event.preventDefault();
    this.setState({ currentValue: event.target.value });
  };

  handleEditKeyDown = event => {
    if (event.keyCode === 13) {
      this.handleEditKeyEnter();
    } else if (event.keyCode === 27) {
      this.setState({ currentId: -1 });
    }
  };

  handleEditKeyEnter = () => {
    this.props.handleEditEnter(this.state.currentValue, this.props.todo.id);
    this.setState({ currentId: -1 });
  };

  handleItemDoubleClicked = event => {
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
                onChange={this.handleEditChange}
                onKeyDown={this.handleEditKeyDown}
                onBlur={this.handleEditKeyEnter}
              />
            ) : (
              <label
                className="todo-item-text"
                onDoubleClick={this.handleItemDoubleClicked}
                style={{
                  color: this.props.todo.completed ? "lightgrey" : "black"
                }}
              >
                {this.props.todo.title}
              </label>
            )}
          </label>
          <label className="delete-label" onClick={this.props.handleItemDelete}>
            x
          </label>
        </label>
      </div>
    );
  }
}
