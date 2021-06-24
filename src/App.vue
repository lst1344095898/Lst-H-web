<template id="template_div">
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
  }
}
</script>
<style>
  body{
    margin: 0;
    width: 100%;
    height: 100%;
  }
  #app{
    position: absolute;
    margin: 0;
    width: 100%;
    height: 100%;
  }
</style>
