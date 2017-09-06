<template>
<div id="loadingScreen">
    <md-spinner :md-size="150" :md-stroke="1.5" md-indeterminate class="md-warn" :style="{visibility: visibility}"></md-spinner>
    <h3 class="loading-text" v-if="!errorInLoadingData">Nalagam Podatke</h3>
    <h3 class="loading-text" v-if="errorInLoadingData">Verjetno je prišlo do neke napake na serverju</h3>
    <md-button class="md-raised" @click="tryAgain" v-if="errorInLoadingData">Poskusi še enkrat</md-button>
</div>
</template>
<script>
export default {
    name: 'loadingScreen',
    props: ['errorInLoadingData'],
    methods: {
        tryAgain: function () {
            this.$emit('tryAgainEvent');
        }
    },
    computed: {
        visibility: function () { //we don't want to remove the spinner, only hide it so thatthe layout doesn't change
            if (this.errorInLoadingData) {
                return 'hidden';
            } else {
                return 'visible';
            }
        }
    }

}
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
#loadingScreen {
    @include flex-box(column wrap);
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 100;
    background-color: rgba(0, 0, 0, 0.54);
    transform: translate3d(0, 0, 0);
    transition: all 0.5s cubic-bezier(0.35, 0, 0.25, 1);
    .md-spinner {
        position: relative;
        z-index: 1000;
        left: 0;
        .md-spinner-path {
            stroke: #15cabf;
        }
    }
    .loading-text {
        position: relative;
        color: $main-light-font-color;
    }

}
</style>
