import React from "react";

export class TodoItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editStatus: false,
      currentValue: "",
    };
  }

  handleEditChange = (event) => {
    event.preventDefault();
    this.setState({ currentValue: event.target.value });
  };

  handleEditKeyDown = (event) => {
    const enterKey = 13;
    const escapeKey = 27;
    if (event.keyCode === enterKey) {
      this.handleEditKeyEnter();
    } else if (event.keyCode === escapeKey) {
      this.setState({ editStatus: false });
    }
  };

  handleEditKeyEnter = () => {
    this.props.handleEditEnter(this.state.currentValue, this.props.todo.id);
    this.setState({ editStatus: false });
  };

  handleItemDoubleClicked = (event) => {
    event.preventDefault();
    this.setState({
      editStatus: true,
      currentValue: this.props.todo.title,
    });
  };

  buildCheckIcon() {
    const className = this.props.todo.completed
      ? "far fa-check-circle"
      : "far fa-circle";
    return <i className={className}></i>;
  }

  render() {
    const DELETE = "x";
    const itemLabelStyle = {
      color: this.props.todo.completed ? "lightgrey" : "black",
    };
    return (
      <div className="todo-item-area" key={this.props.todo.id}>
        <label className="todo-item">
          <label className="todo-item-label">
            <label
              className="tick-label"
              onClick={this.props.handleChangeCompletedStatus}
            >
              <CheckIcon todo={this.props.todo} />
            </label>
            <input className="todo-item-checkbox-input" type="checkbox" />
            {this.state.editStatus ? (
              <input
                type="text"
                className="todo-item-input"
                value={this.state.currentValue}
                onChange={this.handleEditChange}
                onKeyDown={this.handleEditKeyDown}
                onBlur={this.handleEditKeyEnter}
                autoFocus="true"
              />
            ) : (
              <label
                className="todo-item-text"
                onDoubleClick={this.handleItemDoubleClicked}
                style={itemLabelStyle}
              >
                {this.props.todo.title}
              </label>
            )}
          </label>
          <label className="delete-label" onClick={this.props.handleItemDelete}>
            {DELETE}
          </label>
        </label>
      </div>
    );
  }
}
function CheckIcon(props) {
  const className = props.todo.completed
    ? "far fa-check-circle"
    : "far fa-circle";
  return <i className={className}></i>;
}
