<template>
  <!-- <img src="@/assets/logo.png"/>
  <el-image
      style="width: 100px; height: 100px"
      :src="require('./assets/logo.png')"
      fit="fill"></el-image> -->
 <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  -->
  <!-- 路由出口-->
  <router-view/>
</template>
<script>
  
</script>
<style>
  
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
  
body{
  margin:0;
}
nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
