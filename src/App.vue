
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
        <h3 class="md-title">Filtri</h3>
      </div>
    </md-toolbar>

    <div class="side-filter">Tip zobozdravnika:
      <md-button-toggle>
        <md-button id="adult" class="md-icon-button md-toggle"><md-icon>child_care</md-icon></md-button>
        <md-button id="adult" class="md-icon-button md-toggle"><md-icon>face</md-icon></md-button>
      </md-button-toggle>
    </div>
    <div class="side-filter">
      Območna Enota:
      <ul>
        <li>
          <md-checkbox id="all-sidenav" name="all-sidenav" class="md-primary" @change="selectAll" v-bind:checked="isChecked">Izberi vse</md-checkbox>
        </li>
        <li v-for="item in OE">
          <md-checkbox @change="select(item.id)" :id="item.id" :value="item.id" :checked="isChecked">{{item.name}}</md-checkbox>
        </li>
      </ul>
    </div>
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
  methods: {
    select: function(OE){
      let index = this.selectedOE.indexOf(OE)
      if (index > -1){
        this.selectedOE.splice(index, 1);
      }
      else {
        this.selectedOE.push(OE)
      }
    },
    selectAll: function(){
      if (this.selectedOE.length < this.OE.length){
        this.selectedOE = []
        this.OE.forEach((currentValue) => {
          this.selectedOE.push(currentValue["id"])
        })
      } else {
        this.selectedOE = []
      }
    }
  },
  data(){
    return{
      OE: [
      {name: "Celje", id: "210000" },
      {name: "Koper", id: "220000" },
      {name: "Krško", id: "230000" },
      {name: "Kranj", id: "240000" },
      {name: "Ljubljana", id: "250000" },
      {name: "Maribor", id: "260000" },
      {name: "Murska Sobota", id: "270000" },
      {name: "Nova Gorica", id: "280000" },
      {name: "Novo Mesto", id: "290000" },
      {name: "Ravne na Koroškem", id: "300000" },
      ],
      allSelected: true,
      selectedOE: [],
      isChecked: true
    }
  },
  mixins: [sidenav]
}
</script>

<style lang="scss">
$main-bg-color: (#15cabf !important);
$main-light-font-color: (#fafafa !important);
$main-dark-font-color: #263238;
@mixin flex-box {
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-flex-flow: row wrap;
  flex-flow: row wrap;
}
body {
  overflow-y: -moz-scrollbars-vertical;
  overflow-y: scroll;
}

#toolbar{
  background-color: $main-bg-color;
  color: $main-light-font-color;
  width: 100%;
}
.md-sidenav-content{
  .md-toolbar {
  background-color: $main-bg-color;
  color: $main-light-font-color;
  }
  .side-filter{ 
    @include flex-box;
    justify-content: space-evenly;
    align-items: center;
    ul{
      margin: 0;
      padding-left: 0px;
      li{
        margin-top: 0px;
      list-style-type: none;
      .md-checkbox{
      margin: 0px 8px 0px 0px;
      }
      .md-theme-default{
        &.md-checkbox{
          &.md-checked{
            .md-checkbox-container{
              background-color: $main-bg-color;
              border-color: $main-bg-color;
              .md-ink-ripple{
                color: $main-bg-color;
              }
            }
          }
        } 
      }
    }
    }
    
    
  }
}


 .wrapper {
  @include flex-box;
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
