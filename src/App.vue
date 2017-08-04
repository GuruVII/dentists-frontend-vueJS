
<template>
  <div id="app">
      <md-toolbar id="toolbar">
      <md-button class="md-icon-button" @click="toggleLeftSidenav" v-if="currentPage != 'about'">
        <md-icon>menu</md-icon>
      </md-button>
      <h2 class="md-title" style="flex: 1">Najdi Zobozdravnika</h2>
      <router-link tag="md-button" to="/">Domov</router-link>
      <router-link tag="md-button" to="/about/">O strani</router-link>
    </md-toolbar>

  
  <md-sidenav class="md-left" ref="leftSidenav" @open="open('Left')" @close="close('Left')">
    <md-toolbar class="md-small sidenav">
      <div class="md-toolbar-container">
        <h3 class="md-title">Sidenav content</h3>
      </div>
    </md-toolbar>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi cupiditate esse necessitatibus beatae nobis, deserunt ut est fugit, tempora deleniti, eligendi commodi doloribus. Nemo, assumenda possimus, impedit inventore perferendis iusto!</p>
  </md-sidenav>
    <router-view></router-view>
    </div>
  </div>
</template>

<script>
import sidenav from "./mixins/sidenav"
export default {
  name: 'app',
  computed: {
    currentPage: function(){
      return this.$route.name
    }
  },
  mixins: [sidenav]
}
</script>

<style lang="scss">
$main-bg-color: (#15cabf !important);
$main-light-font-color: (#fafafa !important);
$main-dark-font-color: #263238;
body {
  overflow-y: -moz-scrollbars-vertical;
  overflow-y: scroll;
}

#toolbar{
  background-color: $main-bg-color;
  color: $main-light-font-color;
  width: 100%;
}
.md-toolbar {
  background-color: $main-bg-color;
  color: $main-light-font-color;
}
 .wrapper {
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-flex-flow: row wrap;
  flex-flow: row wrap;
  justify-content: space-evenly;
  @media(min-width: 600px){
    width: 80%;
    margin: 50px auto 0 auto;
  }
  .md-card {
    height: 150px;
    width: 500px;
    margin: 0px 50px 25px 50px;
    justify-content: space-evenly;
    @media (max-width: 600px){
      width: 310px;
      height: 200px;
    }
  }
}



</style>
