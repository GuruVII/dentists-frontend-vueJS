
<template>
<div id="app">
    <!-- TOP TOOLBAR-->
    <md-toolbar id="toolbar">
        <md-button class="md-icon-button smaller-screen-display" @click="toggleLeftSidenav" v-if="currentPage != 'about'">
            <md-icon>menu</md-icon>
        </md-button>
        <h2 class="md-title" style="flex: 1">Najdi Zobozdravnika</h2>
        <div class="router-link-wrapper">
            <router-link tag="md-button" to="/">Domov</router-link>
            <md-button class="larger-screen-display" @click="toggleLeftSidenav">Filtri</md-button>
            <router-link tag="md-button" to="/about/">O strani</router-link>
        </div>
    </md-toolbar>
    <!-- SIDENAV -->
    <md-sidenav class="md-left" ref="leftSidenav" @open="open('Left')" @close="close('Left')">
        <md-toolbar class="md-small sidenav">
            <div class="md-toolbar-container">
                <h3 class="md-title">Filtri</h3>
                <md-button  @click="toggleLeftSidenav">
                    <md-icon>arrow_back</md-icon>
                </md-button>
            </div>
        </md-toolbar>
        <div class="side-filter">
            <div class="description">
                Tip zobozdravnika:
            </div>
            <md-button-toggle>
                <md-button id="child" class="md-icon-button"  @click="toggleType(0)">
                    <md-icon>child_care</md-icon>
                    <md-tooltip md-direction="left">za mladino</md-tooltip>
                </md-button>
                <md-button id="adult" class="md-icon-button" @click="toggleType(1)">
                    <md-icon>face</md-icon>
                    <md-tooltip md-direction="right">za odrasle</md-tooltip>
                </md-button>
            </md-button-toggle>
        </div>
        <div class="side-filter">
            <div class="description OE-position">
                Območna Enota:
            </div>
            <ul>
                <li>
                    <md-checkbox id="all-sidenav" name="all-sidenav" class="md-primary" @change="selectAll" v-model="allSelected">Izberi vse</md-checkbox>
                </li>
                <li v-for="item in OE" v-if="!allSelected">
                    <!-- having an array of object, each having a checked property isn't the suggested way of doing this, but the way from the documentation didn't work -->
                    <md-checkbox :id="item.id" :value="item.id" v-model="item.checked" @change="select(item.id)">{{item.name}}</md-checkbox>
                </li>
            </ul>
        </div>
        <div class="side-filter">
            <div class="description">
                Max povprečja:
            </div>
            <input class="number-input" type="text" maxlength="3" v-model="maxAverage">&nbsp%
        </div>
        <div class="side-filter">
            <div class="description sort-by">
                Razvrsti po:
            </div>
            <ul>
                <li>
                    <md-radio v-model="sortBy" id="filter-by-surname" name="" md-value="priimek_in_ime_zdravnika">Priimku</md-radio>
                </li>
                <li>
                    <md-radio v-model="sortBy" id="filter-by-place" name="my-test-group1" md-value="naslov_izvajalca_drugi_del">Kraju</md-radio>
                </li>
                <li>
                    <md-radio v-model="sortBy" id="filter-by-average" name="my-test-group1" md-value="doseganje_povprecja">Doseganju Povprečja</md-radio>
                </li>
            </ul>
        </div>
        <div class="side-filter">
            <div class="description">
                Tip razvrstitve:
            </div>
            <md-button-toggle md-single>
                <md-button class="md-icon-button md-toggle" @click="ascOrDesc = 'ASC'">
                    <md-icon>arrow_upward</md-icon>
                    <md-tooltip md-direction="left">Naraščujoče</md-tooltip>
                </md-button>
                <md-button class="md-icon-button" @click="ascOrDesc = 'DESC'">
                    <md-icon>arrow_downward</md-icon>
                    <md-tooltip md-direction="left">Padajoče</md-tooltip>
                </md-button>
            </md-button-toggle>
        </div>
        <div class="filter-button-wrapper">
            <md-button class="" @click="defaultSettings">Ponastavi filtre</md-button>
            <md-button class="md-raised" @click="createHTTPGETparameters">Filtriraj</md-button>
            <md-button  @click="toggleLeftSidenav">
                <md-icon>arrow_back</md-icon>
            </md-button>          
        </div>
    </md-sidenav>
    <!-- COOKIE WARNING -->
    <cookie-warning class="cookie-warning-position" v-if="cookieWarningShow" @allowCookiesEvent="allowCookies"></cookie-warning>
    <!--ROUTER VIEW -->
    <router-view :HTTPGETparameters = "HTTPGETparameters"></router-view>
</div>
</template>

<script>
import sidenav from './mixins/sidenav';
import cookieWarning from './components/cookieWarning.vue'
export default {
    name: 'app',
    components: {
        cookieWarning,
    },
    computed: {
        currentPage: function () {
            return this.$route.name;
        },
    },
    methods: {
        //if not checkboxes are selected, select all of them, if all of them are selected, deselect them
        selectAll: function () {
            if (this.allSelected === false) {
                this.OE.forEach((currentValue) => {
                    currentValue.checked = true;
                    this.selectedOE.push(currentValue.id);
                });
            } else {
                this.OE.forEach((currentValue) => {
                    currentValue.checked = false;
                });
                this.selectedOE = [];
            }
        },
        select: function (OE) {
            //checks if entry in the selectedOE is there, if it is, it removes it from the array, if not, it pushes it in.
            let index = this.selectedOE.indexOf(OE);
            if (index > -1) {
                this.selectedOE.splice(index, 1);
            } else {
                this.selectedOE.push(OE);
            }
            //if the number of entries in the slectedOE array is the same as in OE array, then all have been selected
            if (this.selectedOE.length < this.OE.length) {
                this.allSelected = false;
            } else {
                this.allSelected = true;
            }
        },
        toggleType: function (type) {
            this.dentistType[type]['checked'] = !this.dentistType[type]['checked'];
        },
        createHTTPGETparameters: function () {
            //resets the parameter object. oe and dentists type are set, becuase of +=, as to avoid adding a string to undefined
            this.HTTPGETparameters = {
                oe: '',
                dentistType: ''
            };
            //cretes the parameter for the selected OEs
            if ((this.allSelected === true) || (this.selectedOE.length === 0)) {
                this.HTTPGETparameters["oe"] = 'all';
            } else {
                this.selectedOE.forEach((currentValue) => {
                    this.HTTPGETparameters['oe'] += `${currentValue}+`;
                });
            }
            //creates the parameter for the dentist Type. If none are selected it assumes we want them all
            if ((this.dentistType[0].checked) === false && (this.dentistType[1].checked === false)) {
                this.HTTPGETparameters['dentistType'] = '404101+404103';
            } else {
                this.dentistType.forEach((currentValue) => {
                    if (currentValue.checked === true) {
                        this.HTTPGETparameters['dentistType'] += `${currentValue['id']}+`;
                    }
                });
            }
            // creates paramater for the highest average we wish to display
            this.HTTPGETparameters['maxAvg'] = this.maxAverage;
            // creates paramater for the sort by
            this.HTTPGETparameters['sortColumn'] = this.sortBy;
            //creates paramater for sort type
            this.HTTPGETparameters['sortType'] = this.ascOrDesc;
        },
        analytics: function () {
            (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
            })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
            ga('create', 'ID GOES HERE', 'auto');
            ga('send', 'pageview');
        },
        allowCookies : function (trueOrFalse) {
            if (trueOrFalse) {
                this.analytics();
                this.cookieWarningShow = false;
            } else {
                this.cookieWarningShow = false;
            }
        },
        checkForPreviousCookie: function () {
            //checks if the user has previously allowed cookies on this webpage
            if (document.cookie.indexOf('dentistsPageUserAllowsCookies') !== -1) {
                this.analytics();
                this.cookieWarningShow = false;
            }
        },
        defaultSettings: function () { //function sets all filters back to default
            //If allSelected is true, then selectAll uncheckes all fields, but doesn't set allSelected to false, which means we have to do it
            this.allSelected = true;
            this.selectAll();
            this.allSelected = false;
            this.dentistType[0].checked = false;
            this.dentistType[1].checked = false;
            this.maxAverage = '100';
            this.sortBy = 'priimek_in_ime_zdravnika';
            this.ascOrDesc = 'ASC';
            this.createHTTPGETparameters();
        }
    },
    mounted () {
        this.checkForPreviousCookie();
    },
    data() {
        return {
            cookieWarningShow: true,
            OE: [
                {
                    name: 'Celje',
                    id: '210000',
                    checked: false,
                },
                {
                    name: 'Koper',
                    id: '220000',
                    checked: false,
                },
                {
                    name: 'Krško',
                    id: '230000',
                    checked: false,
                },
                {
                    name: 'Kranj',
                    id: '240000',
                    checked: false,
                },
                {
                    name: 'Ljubljana',
                    id: '250000',
                    checked: false,
                },
                {
                    name: 'Maribor',
                    id: '260000',
                    checked: false,
                },
                {
                    name: 'Murska Sobota',
                    id: '270000',
                    checked: false,
                },
                {
                    name: 'Nova Gorica',
                    id: '280000',
                    checked: false,
                },
                {
                    name: 'Novo Mesto',
                    id: '290000',
                    checked: false,
                },
                {
                    name: 'Ravne na Koroškem',
                    id: '300000',
                    checked: false,
                },
      ],
            allSelected: false,
            selectedOE: [],
            dentistType: [
                {
                    type: 'child',
                    id: '404103',
                    checked: false
                },
                {
                    type: 'adult',
                    id: '404101',
                    checked: false
                },
      ],
            maxAverage: '100',
            sortBy: 'priimek_in_ime_zdravnika',
            ascOrDesc: 'ASC',
            HTTPGETparameters: {},
        };
    },
    watch: {
        maxAverage: function () {
            this.maxAverage = this.maxAverage.replace(/\D/g,'');
        },
    },
    mixins: [sidenav],
};

</script>

<style lang="scss">
$main-bg-color: (#15cabf !important);
$main-light-font-color: (#fafafa !important);
$main-dark-font-color: #263238;
@mixin flex-box($flex-flow) {
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-flex-flow: $flex-flow;
    flex-flow: $flex-flow;
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
body {
    overflow-y: -moz-scrollbars-vertical;
    overflow-y: scroll;
}

#toolbar {
    background-color: $main-bg-color;
    color: $main-light-font-color;
    width: 100%;
    .md-button {
        @media(max-width:414px) {
            padding: 0px;
            min-width: 0px;
        }
        &.smaller-screen-display {
            @media(min-width:990px) {
                display: none;
            }
        }
        &.larger-screen-display {
            @media(max-width:989px) {
                display: none;
            }
        }
    }
    .md-title {
        margin: 7px 0px 7px 8px;
        @media(max-width:414px) {
            margin-right: 50px;
        }
    }
}
.md-sidenav-content {
    .md-toolbar {
        background-color: $main-bg-color;
        color: $main-light-font-color;
        .md-toolbar-container {
            justify-content: space-between;
            .md-button{
                min-width: 0px;
            }
        }
    }
    .filter-button-wrapper {
        @include flex-box(row-reverse wrap);
        @include justify-content(space-between);
        margin-top: 16px;
        .md-button{
            &.md-raised{
            background-color: $main-bg-color;
            color: $main-light-font-color;
            }
        }
    }
    .side-filter { 
        @include flex-box(row wrap);
        @include justify-content(flex-start);
        @include align-items(center);
        align-items: center;
        .description {
            width: 120px;
            margin-left: 5px;
            &.OE-position {
                @include align-self(flex-start);
                margin-top: 14px;
            }
            &.sort-by {
                @include align-self(flex-start);
                margin-top: 14px;
            }
        }
        .number-input {
            border-radius: 2px;
            border: 2px solid rgba(0, 0, 0, 0.54);
            width: 35px;
            margin-left: 8px;
            padding: 3px;
            text-align: center;
            &:focus {
                border-color: $main-bg-color;
                transition: all 0.2s cubic-bezier(0.55, 0, 0.55, 0.2);
            }
        }
        ul {
            padding-left: 8px;
            li {
                //margin-top: 0px;
                list-style-type: none;
                .md-checkbox{
                margin: 0px 8px 0px 0px;
                } //this nesting is due to the framework used. The only reason this was done is because I'm using a custom colour.
                .md-theme-default {
                    &.md-checkbox {
                        &.md-checked {
                            .md-checkbox-container {
                                background-color: $main-bg-color;
                                border-color: $main-bg-color;
                            }
                        }
                        .md-ink-ripple{
                            color: $main-bg-color;
                            top: -12px;
                            right: -12px;
                            bottom: -12px;
                            left: -12px;
                        }
                    }
                    &.md-radio {
                        margin: 0px;
                        &.md-checked {
                            .md-radio-container {
                                border-color: $main-bg-color;
                                &:after {
                                    background-color: $main-bg-color;
                                }
                                .md-ink-ripple {
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
    @include flex-box(row wrap);
    //some browsers do not support space-evenlyjustify-content: space-around;
    justify-content: space-evenly;
    @media(min-width:600px) {
        width: 80%;
        margin: 50px auto 0 auto;
    }
    .md-card {
        height: 150px;
        width: 500px;
        margin: 0px 50px 25px 50px;
        justify-content: space-around;
        justify-content: space-evenly;
        @media (max-width:600px) {
            width: 310px;
            height: 200px;
        }
    }
}

</style>



