<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100vh;
}

html,
body {
  margin: 0;
  overflow-y: hidden;
}

.autocomplete-input {
  padding: 5px 5px 5px 50px !important;
  font-size: 14px;
  background-color: #fff;
}
</style>
