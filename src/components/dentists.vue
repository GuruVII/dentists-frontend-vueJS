
<template>
  <div>
    <!--columns in the DB are id, sifra_oe, naziv_obmocne_enote_ali_izpostave, sifra_izvajalca, naziv_izvajalca, naslov_izvajalca_prvi_del, naslov_izvajalca_drugi_del, sifra_zdravnika,
      priimek_in_ime_zdravnika, ZZZS_dejavnost, doseganje_povprecja, sifra_izpostave       -->
    <div  class="wrapper">
      <div v-for="item in masterArray">
        <md-card>
          <md-card-header>
            <md-card-header-text>
              <div class="md-title">{{item.priimek_in_ime_zdravnika}}</div>
              <div class="md-subhead">{{item.naslov_izvajalca_prvi_del}}</div>
              <div class="md-subhead">{{item.naslov_izvajalca_drugi_del}}</div>
            </md-card-header-text>
            <md-card-media>
              <p>Doseganje povprečja:</p>
              <h2>{{item.doseganje_povprecja.toFixed(2)}}%</h2>
            </md-card-media>
          </md-card-header>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
import getData from "./../mixins/getData";
import infiniteScroll from "./../mixins/infiniteScroll";
import _ from 'lodash';
import throttle from 'lodash.throttle';

export default {
  name: 'dentist',
  data() {
    return {
      infiniteScrollCurrentOffset:0,
      infiniteScrollOffset: 100,
      infiniteScrollPage: 0,
      infiniteScrollPerPage: 20, //how many items are loaded per page
      masterArray: [], //holds all the entires that are visible.
      tempArray: [], //holds all the entries of a single GET.
      //parameters for the rest API
      filters: {
        oe: "all",
        dentistType: "404101+404103",
        sortColumn: "priimek_in_ime_zdravnika",
        sortType: "ASC"
      }     
    }
  },
  methods: {
    scrolling: function(){
                window.addEventListener('scroll', this.infiniteScroll);
            }
  },
  mixins: [getData, infiniteScroll],
  mounted(){
    //oe, offset, maxAvg,dentist_type,sortColumn, orderBy
    this.getData(this.filters.oe, this.infiniteScrollCurrentOffset, 100, this.filters.dentistType, this.filters.sortColumn, this.filters.sortType);
    this.scrolling();

    console.log()
  }
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
