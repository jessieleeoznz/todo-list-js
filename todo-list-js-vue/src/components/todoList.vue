<template>
  <div>
    <h1>{{ msg }}</h1>
    <div class="todo-list-main">
      <div class="add-item-area">
        <input
          class="add-input-area"
          type="text"
          v-model="newTodo"
          @keyup.enter="addTodo()"
          placeholder="input here to add a todo-item"
        />
        <button class="button" @click="addTodo()">add</button>
      </div>
      <div class="todo-list-area">
        <hr />
        <div class="list-button-area">
          <div class="todo-items">
            <div class="todo-item" v-for="(todo,index) in todosFilterd" :key="todo.id">
              <input type="checkbox" v-model="todo.completed" />
              <label
                v-if="!todo.editing"
                class="todo-item-label"
                @dblclick="editTodo(todo)"
              >{{ todo.title }}</label>
              <input
                v-else
                type="text"
                class="todo-item-input"
                v-model="todo.title"
                @blur="doneEdit(todo)"
                @keyup.enter="doneEdit(todo)"
                @keyup.esc="cancelTodo(todo)"
                ref="edit"
                v-focus
              />
              <button class="button" v-if="!todo.completed" @click="deleteTodo(todo,index)">x</button>
            </div>
          </div>
          <div class="clear-button">
            <button
              class="button"
              v-if="this.todos.filter(todo => todo.completed).length > 0"
              v-show="filter ==='completed'"
              @click="clearCompleted()"
            >clear completed</button>
          </div>
        </div>
        <hr />
        <div class="button-area">
          <div>
            <button class="filter-button" @click="filter='all'">All</button>
            <button class="filter-button" @click="filter='uncompleted'">uncompleted</button>
            <button class="filter-button" @click="filter='completed'">completed</button>
            <span class="remaining-span">{{this.filter}} items, {{remaining}} is left</span>
          </div>
        </div>
      </div>
    </div>;
  </div>
</template>

<script>
const status = {
  ALL: "all",
  COMPLETED: "completed",
  UNCOMPLETED: "uncompleted"
};

export default {
  name: "todo-list",
  data() {
    return {
      msg: "todo-list",
      todo: "",
      newTodo: "",
      formerTodo: "",
      newId: 2,
      filter: status.ALL,
      todos: [
        {
          id: 1,
          title: "this is a example, double click to edit it",
          completed: false,
          editing: false
        }
      ]
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
    todosFilterd() {
      // if (this.filter === "uncompleted")
      //   return this.todos.filter(todo => !todo.completed);
      // else if (this.filter === "completed")
      //   return this.todos.filter(todo => todo.completed);
      // else return this.todos;

      return this.filter === status.ALL
        ? this.todos
        : this.todos.filter(todo =>
            this.filter === status.COMPLETED ? todo.completed : !todo.completed
          );
    },
    remaining() {
      return this.todosFilterd.length;
      // if (this.filter === "uncompleted")
      //   return this.todos.filter(todo => !todo.completed).length;
      // else if (this.filter === "completed")
      //   return this.todos.filter(todo => todo.completed).length;
      // else return this.todos.length;
    }
  },
  methods: {
    setFocus: function() {
      this.$refs.edit.focus();
    },
    addTodo() {
      if (!!this.newTodo.length) {
        this.todos.push({
          id: this.newId,
          title: this.newTodo,
          completed: false,
          editing: false
        });
      }
      this.newTodo = "";
      this.newId++;
    },
    editTodo(todo) {
      this.formerTodo = todo.title;
      todo.editing = !todo.completed;
      // if (todo.completed === false) {
      //   todo.editing = true;
      // }
    },
    doneEdit(todo) {
      if (todo.title.trim() === "") {
        todo.title = this.formerTodo;
      }
      todo.editing = false;
    },
    cancelTodo(todo) {
      todo.title = this.formerTodo;
      todo.editing = false;
    },
    deleteTodo(todo, index) {
      this.todos.splice(index, 1);
    },
    clearCompleted() {
      this.todos = this.todos.filter(todo => !todo.completed);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  font-weight: normal;
}

hr {
  width: 100%;
  height: 2px;
  margin-top: 5px;
  margin-bottom: 5px;
  background-color: grey;
}

.todo-list-main {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.add-item-area {
  width: 70%;
  text-align: left;
  flex-grow: 1;
}

.add-input-area {
  width: 85%;
  font-size: 15px;
  padding: 3px;
}

.button {
  font-size: 13px;
  margin: 1px 6px 1px 6px;
}

.filter-button {
  font-size: 13px;
  margin: 1px 4px 1px 4px;
}

.todo-list-area {
  width: 70%;
  margin-top: 20px;
  text-align: left;
  flex-grow: 12;
}

.todo-item-label {
  font-size: 15px;
}

.todo-item-input {
  font-size: 15px;
  width: 70%;
}

input:checked + label {
  color: lightgrey;
}

.todo-items {
  overflow-y: scroll;
  overflow-wrap: break-word;
  height: 90%;
}

.list-button-area {
  height: 400px;
}

.clear-button {
  margin-bottom: 20px;
  font-size: 15px;
}

.remaining-span {
  margin-left: 12px;
  color: grey;
}
</style>
