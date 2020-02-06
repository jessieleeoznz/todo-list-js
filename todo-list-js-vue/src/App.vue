<template>
  <div id="app">
    <todoList></todoList>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import todoList from './components/todoList'


export default {
  name: 'App',
  components: {
    HelloWorld,
    todoList,
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body{
  height: 2000px;
}
</style>
