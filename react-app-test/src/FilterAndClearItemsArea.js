import React from "react";
import { FILTER_STATUS } from "./TodoListApp";

export function FilterAndClearItemsArea(props) {
  return (
    <div className="filter-item-area">
      <RemainingInfoSpan
        filterKey={props.filterKey}
        getTodosByFilterKey={props.getTodosByFilterKey}
        todos={props.todos}
      />
      <FilterRadioSpan
        filterKey={props.filterKey}
        handleChangeFilterKey={props.handleChangeFilterKey}
      />
      <ClearButtonSpan
        todos={props.todos}
        handleClearCompleted={props.handleClearCompleted}
      />
    </div>
  );
}

function RemainingInfoSpan(props) {
  const notAllItemInfo =
    props.filterKey === FILTER_STATUS.ALL
      ? ""
      : `${props.filterKey} items:${props.getTodosByFilterKey().length}`;

  const jointedItemInfo = `${FILTER_STATUS.ALL} items:${props.todos.length} ${notAllItemInfo}`;

  return <span className="remaining-span">{jointedItemInfo}</span>;
}

function FilterRadioSpan(props) {
  const filterRadios = Object.values(FILTER_STATUS);

  const getButtonStyleByFilterKey = (filterRadio) => {
    return props.filterKey === filterRadio ? "filtered" : "filter-li";
  };

  return (
    <span className="filter-span">
      {filterRadios.map((filterRadio, index) => (
        <li
          className={getButtonStyleByFilterKey(filterRadio)}
          key={index}
          value={filterRadio}
          onClick={() => props.handleChangeFilterKey(filterRadio)}
        >
          {filterRadio}
        </li>
      ))}
    </span>
  );
}

function ClearButtonSpan(props) {
  const CLEAR_BUTTON = "clear completed";

  const isNeededClear = () => {
    return props.todos.filter((todo) => todo.completed).length > 0;
  };

  const showClearButton = {
    visibility: isNeededClear() ? "visible" : "hidden",
  };

  return (
    <span className="clear-span">
      <li
        className="clear-li"
        style={showClearButton}
        onClick={() => props.handleClearCompleted()}
      >
        {CLEAR_BUTTON}
      </li>
    </span>
  );
}
