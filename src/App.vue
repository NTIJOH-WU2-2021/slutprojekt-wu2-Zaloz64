<template>
    <nav>
      <img src="@\assets\dog.png" alt="logo">
      <h3>The Dog Whisperer</h3>
      <router-link to="/">Home</router-link>
      <router-link to="/Colection">Collection</router-link>
      <router-link to="/Profile">Favorites</router-link>
    </nav>
  <router-view/>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style scoped>
a {
  color: #2c3e50;
  background: none;
}

</style>