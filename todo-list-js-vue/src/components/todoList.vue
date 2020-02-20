<template>
  <div class="main-frame">
    <h1>{{ msg }}</h1>
    <div class="todo-list-frame">
      <div class="add-item-area">
        <label class="toggle-all-label" @click="toggleAllItems()">
          <i class="far fa-circle" :style="{display:isAllCompleted ?'none':'block'}"></i>
          <i class="fas fa-check" :style="{display:isAllCompleted?'block':'none'}"></i>
        </label>
        <input
          class="add-item-input"
          type="text"
          :value="newItem"
          @keyup.enter="addTodo"
          placeholder="input here to add a todo-item"
        />
      </div>
      <div class="todo-item-area" v-for="item in todosFilterd" :key="item.id">
        <label class="todo-item">
          <label class="todo-item-label">
            <label class="todo-item-checkbox-label" @click="changeCompleteStatus(item.id)">
              <i class="far fa-circle" :style="{display:item.completed?'none':'block'}"></i>
              <i class="far fa-check-circle" :style="{display:item.completed?'block':'none'}"></i>
            </label>
            <input class="todo-item-checkbox-input" type="checkbox" :checked="item.completed" />
            <label
              v-if="item.id !== currentId"
              class="todo-item-text"
              @dblclick="editTodo(item.id)"
            >{{ item.title }}</label>
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
          </label>
          <label class="delete-label" v-if="!item.completed" @click="deleteTodo(item.id)">x</label>
        </label>
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
        <span class="clear-span">
          <li
            class="clear-li"
            :style="{ visibility: needClear ? 'visible' : 'hidden' }"
            @click="clearCompleted"
          >clear completed</li>
        </span>
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
    },
    isAllCompleted() {
      return this.$store.getters.isAllCompleted;
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
    },
    toggleAllItems() {
      this.$store.commit(Actions.TOGGLE_ALL_ITEMS);
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
  margin: 30px;
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
  display: inline-flex;
  width: 100%;
  font-size: 25px;
  outline: none;
  border-bottom: 1px solid #ccc;
}

.toggle-all-label {
  width: 25px;
  height: 25px;
  margin: 11.5px;
  cursor: pointer;
}

.add-item-input {
  width: 100%;
  font-size: 25px;
  color: #2c3e50;
  outline: none;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  border: none;
}

.todo-item-area {
  width: 100%;
  display: inline-flex;
}

.todo-item {
  width: 100%;
  font-size: 25px;
  display: inline-flex;
  overflow-wrap: break-word;
  border-bottom: 1px solid #ccc;
}

.todo-item-label {
  width: 100%;
  display: inline-flex;
  justify-content: space-between;
}

.todo-item-checkbox-label {
  width: 25px;
  height: 25px;
  margin: 11.5px;
  cursor: pointer;
}

.far {
  color: gray;
}

.fas {
  color: gray;
}

.todo-item-checkbox-input {
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
  margin: 0px;
}

.todo-item-text {
  width: 100%;
  padding: 8px 8px 8px 1px;
  text-align: left;
}

.todo-item-input {
  font-size: 25px;
  width: 100%;
  border: none;
  padding: 0px;
  padding: 7px 7px 7px 0px;
  border: solid grey 1px;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
}

.todo-item-input:focus {
  color: #2c3e50;
  font-weight: inherit;
  outline: none;
}

input:checked + label {
  color: lightgrey;
}

.delete-label {
  visibility: hidden;
  padding: 8px 25px 8px 8px;
  cursor: pointer;
}

.todo-item:hover .delete-label {
  visibility: visible;
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
  cursor: pointer;
}

.filterd {
  border: 1px solid grey;
  border-radius: 5px;
}

.clear-span {
  width: 20%;
}

.clear-li {
  display: inline;
  border: 1px solid grey;
  border-radius: 5px;
  padding: 1px 8px 2px 8px;
}

.clear-li:hover {
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
}
</style>
