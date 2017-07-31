
<template>
  <div id="app">
    <div>
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/test/">FirstRoute</router-link></li>
      </ul>
    </div>
    <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
$main-bg-color: #15cabf;
$main-light-font-color: #fafafa;
$main-dark-font-color: #263238;

#toolbar{
  background-color: $main-bg-color;
  color: $main-light-font-color;
  width: 100%;
}
.sidenav {
  background-color: $main-bg-color;
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
