
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
                        <div class="md-subhead">
                            TIP: 
                            <span v-if="item.ZZZS_dejavnost == 404101">
                                ZOBOZDRAVNIK ZA ODRASLE
                                <md-icon>face</md-icon>
                            </span>
                            <span  v-if="item.ZZZS_dejavnost == 404103">
                                ZOBOZDRAVNIK ZA MLADINO
                                <md-icon>child_care</md-icon>
                            </span>
                        </div>
                    </md-card-header-text>
                    <md-card-media>
                        <div class="tooltip">
                            <md-icon>info_outline</md-icon>
                            <md-tooltip md-direction="top">Doseganje povprečja pove če je zobozdravnik že dosegel povprečjje, pir katerem mu ni potrebno več jemati novih pacientov.</md-tooltip>
                        </div>
                        <p>Doseganje povprečja:</p>
                        <average :average="item.doseganje_povprecja"></average>
                    </md-card-media>
                </md-card-header>
            </md-card>
        </div>
    </div>
</div>
</template>

<script>
import throttle from 'lodash.throttle';
import getData from './../mixins/getData';
import infiniteScroll from './../mixins/infiniteScroll';
import _ from 'lodash';
import average from './decimalPointToComma.vue';

export default {
    name: 'dentist',
    props: ['HTTPGETparameters'],
    data() {
    return {
      infiniteScrollCurrentOffset: 0,
      infiniteScrollOffset: 100,
      infiniteScrollPage: 0,
      infiniteScrollPerPage: 20, //how many items are loaded per page   
      masterArray: [], //holds all the entires that are visible.    
      tempArray: [], //holds all the entries of a single GET.   
      //parameters for the rest API 
      filters: {
        oe: 'all',
        dentistType: '404101+404103',
        maxAvg: '100',
        sortColumn: 'priimek_in_ime_zdravnika',
        sortType: 'ASC',
      },
    };
  },
  components: {
    average,
  },
  methods: {
    scrolling: function () {
        window.addEventListener('scroll', this.infiniteScroll);
    },
  },
  watch:{
    HTTPGETparameters: function () {
      //sets new filter parameters  
      this.filters.oe = this.HTTPGETparameters.oe;
      this.filters.dentistType = this.HTTPGETparameters.dentistType;
      this.filters.maxAvg = this.HTTPGETparameters.maxAvg;
      this.filters.sortColumn = this.HTTPGETparameters.sortColumn;
      this.filters.sortType = this.HTTPGETparameters.sortType;
      //resets the current visible data and calls new data using new filter parameters  
      this.infiniteScrollCurrentOffset = 0;
      this.infiniteScrollPage = 0;
      this.tempArray = [];
      this.masterArray = [];
      this.getData(this.filters.oe, this.infiniteScrollCurrentOffset, this.filters.maxAvg, this.filters.dentistType, this.filters.sortColumn, this.filters.sortType);
    },
  },
  mixins: [getData, infiniteScroll],
  mounted() {
    //oe, offset, maxAvg,dentist_type,sortColumn, orderBy   
    this.getData(this.filters.oe, this.infiniteScrollCurrentOffset, this.filters.maxAvg, this.filters.dentistType, this.filters.sortColumn, this.filters.sortType);
    this.scrolling();
  },
};

</script>

<style lang="scss">
$main-bg-color: #15cabf;
$main-light-font-color: #fafafa;
$main-dark-font-color: #263238;
@mixin icon-size($size) {
    font-size: $size;
    width: $size;
    min-width: $size;
    height: $size;
    min-height: $size;
}
@mixin flex-box {
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-flex-flow: row wrap;
    flex-flow: row wrap;
}
@mixin justify-content($position) {
    -webkit-justify-content: $position;
    justify-content: $position;
}
@mixin align-items($position) {
    -webkit-align-items: $position;
    align-items: $position;
}
@mixin align-self($position) {
    -webkit-align-self: $position;
    align-self: $position;
}
#toolbar {
    background-color: $main-bg-color;
    color: $main-light-font-color;
    width: 100%;
}
.sidenav {
    background-color: $main-bg-color;
}
.wrapper {
    @include flex-box;
    //some browsers do not support space-evenly
    @include justify-content(space-around);
    @include justify-content(space-evenly);
    @media(min-width: 600px) {
        width: 80%;
        margin: 50px auto 0 auto;
    }
    .md-card {
        height: 150px;
        width: 500px;
        margin: 0px 50px 25px 50px;
        @include justify-content(space-around);
        @include justify-content(space-evenly);
        @media (max-width: 600px) {
            width: 310px;
            height: 200px;
        }
        @media (max-width: 410px) {
            width: 300px;
            margin: 15px 10px 10px 10px;
        }
        .tooltip {
            @include flex-box;
            @include justify-content(flex-end);
            .md-icon {
                @include icon-size(13px);
                margin-right: 0px;
                margin-bottom: -5px;
            }
        }
        .md-card-media {
            p {
                margin-top: 0px;
            }
        }
    }
}



</style>
