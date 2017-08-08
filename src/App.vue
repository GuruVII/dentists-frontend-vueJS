
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

    <div class="side-filter">
      <div class="description">Tip zobozdravnika:</div>
      <md-button-toggle>
        <md-button id="adult" class="md-icon-button">
          <md-icon>child_care</md-icon>
          <md-tooltip md-direction="left">za otroke</md-tooltip>
        </md-button>       
        <md-button id="adult" class="md-icon-button">
          <md-icon>face</md-icon>
          <md-tooltip md-direction="right">za odrasle</md-tooltip>
        </md-button>
       
      </md-button-toggle>
    </div>
    <div class="side-filter">
      <div class="description OE-position">Območna Enota:</div>
      <ul>
        <li>
          <md-checkbox id="all-sidenav" name="all-sidenav" class="md-primary" @change="selectAll" v-model="allSelected">Izberi vse</md-checkbox>
        </li>
        <li v-for="item in OE">
        <!-- having an array of object, each having a checked property isn't the suggested way of doing this, but the way from the documentation didn't work -->
          <md-checkbox :id="item.id" :value="item.id" v-model="item.checked" @change="select(item.id)">{{item.name}}</md-checkbox>
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
    //if not checkboxes are selected, select all of them, if all of them are selected, deselect them
    selectAll: function(){
      if (this.allSelected == false){
        this.OE.forEach((currentValue) =>{
          currentValue.checked = true;
          this.selectedOE.push(currentValue.id);
        })
      } else {
        this.OE.forEach((currentValue) =>{
          currentValue.checked = false;
        })
        this.selectedOE = [];
      }
    },
    select: function(OE){
      //checks if entry in the selectedOE is there, if it is, it removes it from the array, if not, it pushes it in.
      let index = this.selectedOE.indexOf(OE)
      if (index > -1){
        this.selectedOE.splice(index, 1);
      }
      else {
        this.selectedOE.push(OE)
      }
      //if the number of entries in the slectedOE array is the same as in OE array, then all have been selected
      if (this.selectedOE.length < this.OE.length ){
        this.allSelected = false;
      } else {
        this.allSelected = true;
      }
    }
  },
  data(){
    return{
      OE: [
      {name: "Celje", id: "210000", checked: false },
      {name: "Koper", id: "220000", checked: false },
      {name: "Krško", id: "230000", checked: false },
      {name: "Kranj", id: "240000", checked: false },
      {name: "Ljubljana", id: "250000", checked: false },
      {name: "Maribor", id: "260000", checked: false },
      {name: "Murska Sobota", id: "270000", checked: false },
      {name: "Nova Gorica", id: "280000", checked: false },
      {name: "Novo Mesto", id: "290000", checked: false },
      {name: "Ravne na Koroškem", id: "300000", checked: false },
      ],
      allSelected: false,
      selectedOE: []
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
    justify-content: flex-start;
    align-items: center;
    .description{
      width: 120px;
      margin-left: 5px;
      &.OE-position{
        align-self: flex-start;
        margin-top: 10px;
      }
    }
    ul{
      padding-left: 8px;
      li{
        //margin-top: 0px;
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
                top: -8px;
                right: -8px;
                bottom: -8px;
                left: -8px;
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
