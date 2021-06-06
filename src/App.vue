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
    margin-top: 0;
    margin-left: 0;
    width: 100%;
    height: 100%;
  }
  #app{
    position: absolute;
    margin-left: 0;
    margin-top: 0;
    width: 100%;
    height: 100%;
  }
</style>
