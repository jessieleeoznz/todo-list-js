<template>
  <div class="hello">
    <div class="box blueBox"></div>
    <div class="box greenBox"></div>
    <h1>{{ msg }}</h1>
    <p>Essential Links Essential Links Essential Links Essential Links Essential Links Essential Links Essential Links Essential Links Essential Links Essential Links Essential Links Essential Links Essential Links Essential Links Essential Links Essential Links Essential Links Essential Links Essential Links Essential Links Essential Links Essential Links Essential Links Essential Links Essential Links Essential Links Essential Links Essential Links Essential Links Essential Links Essential Links Essential Links Essential Links Essential Links Essential Links Essential Links Essential Links Essential Links Essential Links Essential Links</p>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
p {
  font-weight: normal;
  clear: left;
}

.box {
  width: 100px;
  height: 100px;
  margin-bottom: 10px;
}

.blueBox {
  background: blue;
  float: left;
}

.greenBox {
  background: green;
  margin-top: 200px;
  float: right;
}
</style>
