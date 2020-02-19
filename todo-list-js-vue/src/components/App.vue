<template>
  <div id="app">
    <todoList></todoList>
  </div>
</template>

<script>
import todoList from "./todoList";
export default {
  name: "App",
  components: {
    todoList
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  height: 2000px;
  background-color: whitesmoke;
}
</style>
