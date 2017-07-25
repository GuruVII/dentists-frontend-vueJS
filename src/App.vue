
<template>
  <div id="app">
    <div v-if="tempArray.length > 0">
    <div v-for="item in masterArray">
      <div class="box">
      <p>{{item.id}}</p>
      <p>{{item.priimek_in_ime_zdravnika}}</p>
      <p>{{item.naslov_izvajalca_prvi_del}}</p>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import {getData} from "./mixins/getData";
import {infiniteScroll} from "./mixins/infiniteScroll";
import _ from 'lodash';
import throttle from 'lodash.throttle';

export default {
  name: 'app',
  data() {
    return {
      infiniteScrollCurrentOffset:100,
      infiniteScrollOffset: 100,
      infiniteScrollPage: 0,
      infiniteScrollPerPage: 20, //how many items are loaded per page
      masterArray: [], //holds all the entires that are visible.
      tempArray: [], //holds all the entries of a single GET.
    }
  },
  methods: {
    scrolling: function(){
                window.addEventListener('scroll', this.infiniteScroll);
            }
  },
  mixins: [getData, infiniteScroll],
  mounted(){
    //oe, offset, maxAvg,type,sortColumn, orderBy
    this.getData("all", this.infiniteScrollCurrentOffset, 100, "404101+404103", "id", "ASC");
    this.scrolling();

    console.log()
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.box {
  width: 25%;
  height: 150px;
  display: inline-block;
  border: 1px solid black;
}
</style>
