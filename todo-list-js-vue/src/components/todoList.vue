<template>
  <div class="main-frame">
    <h1>{{ msg }}</h1>
    <div class="todo-list-frame">
      <div class="add-item-area">
        <input
          class="add-item-input"
          type="text"
          :value="newItem"
          @keyup.enter="addTodo"
          placeholder="input here to add a todo-item"
        />
      </div>
      <div class="todo-item" v-for="item in todosFilterd" :key="item.id">
        <label class="todo-item-checkbox-label">
          <input
            class="todo-item-checkbox-input"
            type="checkbox"
            :checked="item.completed"
            @change="changeCompleteStatus(item.id)"
          />
          <span class="todo-item-checkbox-span"></span>
        </label>
        <label class="todo-item-label" v-if="item.id !== currentId">
          <label class="todo-item-text" @dblclick="editTodo(item.id)">{{ item.title }}</label>
          <label class="delete-label" v-if="!item.completed" @click="deleteTodo(item.id)">x</label>
        </label>
        <input
          v-else
          type="text"
          class="todo-item-input"
          :value="item.title"
          @blur="doneEdit"
          @keyup.enter="$event.target.blur()"
          @keyup.esc="cancelTodo"
          v-focus
        />
      </div>
      <div class="filter-item-area">
        <span class="remaining-span">{{ remaining }}</span>
        <span class="filter-span">
          <li
            class="filter-li"
            :class="{ filterd: filter === filterRadio }"
            v-for="(filterRadio, index) in filterRadios"
            :key="index"
            :value="filterRadio"
            @click="changeFilterKey(filterRadio)"
          >{{ filterRadio }}</li>
        </span>
        <span
          class="clear-span"
          :style="{ visibility: needClear ? 'visible' : 'hidden' }"
          @click="clearCompleted"
        >clear completed</span>
      </div>
    </div>
  </div>
</template>

<script>
import * as Actions from "../store/mutation-types";
import { FILTER_STATUS } from "../store/store";

export default {
  data() {
    return {
      newItem: ""
    };
  },
  directives: {
    focus: {
      inserted: function(el) {
        el.focus();
      }
    }
  },
  computed: {
    msg() {
      return this.$store.state.msg;
    },
    allTodosLength() {
      return this.$store.state.todos.length;
    },
    todosFilterd() {
      return this.$store.getters.getTodosByFilterKey;
    },
    filter() {
      return this.$store.state.filterKey;
    },
    currentId() {
      return this.$store.getters.getCurrentId;
    },
    needClear() {
      return this.$store.state.todos.filter(todo => todo.completed).length > 0;
    },
    remaining() {
      const allInfo = `${FILTER_STATUS.ALL} items:${this.allTodosLength}`;
      const notAllInfo =
        this.filter === FILTER_STATUS.ALL
          ? ""
          : `${this.filter} items:${this.todosFilterd.length}`;
      return `${allInfo} ${notAllInfo}`;
    },
    filterRadios() {
      return Object.values(FILTER_STATUS);
    }
  },
  methods: {
    addTodo(e) {
      if (!!e.target.value.length) {
        this.$store.commit(Actions.ADD_TODO, e.target.value);
      }
      this.newItem = "";
    },
    editTodo(id) {
      this.$store.commit(Actions.EDIT_TODO, id);
    },
    updateEdit(e) {
      this.$store.commit(Actions.UPDATE_EDIT, e.target.value);
    },
    doneEdit(e) {
      this.$store.commit(Actions.DONE_EDIT, e.target.value);
    },
    cancelTodo(e) {
      this.$store.commit(Actions.CANCEL_TODO, e.target.value);
    },
    deleteTodo(id) {
      this.$store.commit(Actions.DELETE_TODO, id);
    },
    changeFilterKey(key) {
      this.$store.commit(Actions.CHANGE_FILTER_KEY, key);
    },
    changeCompleteStatus(id) {
      this.$store.commit(Actions.CHANGE_COMPLETE_STATUS, id);
    },
    clearCompleted() {
      this.$store.commit(Actions.CLEAR_COMPLETED);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  box-sizing: border-box;
}
h1 {
  font-weight: normal;
}

.main-frame {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.todo-list-frame {
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  border: 2px solid #ccc;
}

.add-item-area {
  width: 100%;
  font-size: 25px;
  outline: none;
  border-bottom: 1px solid #ccc;
}

.add-item-input {
  width: 100%;
  font-size: 25px;
  padding: 8px;
  color: #2c3e50;
  outline: none;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  border: none;
}

.filter-item-area {
  display: inline-flex;
  justify-content: space-between;
  width: 100%;
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ccc;
  font-size: 16px;
}

.remaining-span {
  width: 40%;
  margin-left: 12px;
  color: grey;
}

.filter-span {
  width: 40%;
}

.filter-li {
  display: inline;
  margin-right: 10px;
  padding: 1px 8px 2px 8px;
}

.filter-li:hover {
  border: 1px solid #ccc;
  border-radius: 5px;
}

.filterd {
  border: 1px solid grey;
  border-radius: 5px;
}

.clear-span {
  width: 20%;
}

.clear-span:hover {
  text-decoration-line: underline;
}

.todo-item {
  width: 100%;
  font-size: 25px;
  display: inline-flex;
  overflow-wrap: break-word;
  border-bottom: 1px solid #ccc;
  /* border: solid red 1px; */
}

.todo-item-checkbox-label {
  display: inline-block;
  /* position: relative;
  padding-left: 35px;
  margin-bottom: 12px; */
  width: 25px;
  height: 25px;
  margin: 11.5px;
  cursor: pointer;
  /* font-size: 25px; */
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  border: 1px solid grey;
  border-radius: 5px;
}

.todo-item-checkbox-input {
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.todo-item-checkbox-span {
  position: relative;
  top: -32px;
  left: 7px;
}

.todo-item-checkbox-input:checked ~ .todo-item-checkbox-span {
  display: block;
  content: "";
  width: 8px;
  height: 16px;
  border: solid grey;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}

.todo-item-checkbox-input:checked .todo-item-label {
  color: lightgrey;
}

.todo-item-label {
  width: 100%;
  display: inline-flex;
  justify-content: space-between;
}

.todo-item-text {
  padding: 8px;
}

.todo-item:hover .delete-label {
  visibility: visible;
}

.delete-label {
  visibility: hidden;
  padding: 8px 25px 8px 8px;
}

.todo-item-input {
  font-size: 25px;
  width: 100%;
  padding: 8px;
  border: solid grey 1px;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
}

.todo-item-input:focus {
  font-size: 25px;
  width: 100%;
  padding: 8px;
  border: none;
  color: #2c3e50;
  font-weight: inherit;
  outline: none;
}

input:checked + label {
  color: lightgrey;
}
</style>
