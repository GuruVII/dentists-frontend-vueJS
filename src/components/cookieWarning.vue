<template>
<div id="cookie-warning">
    <div class="cookie-text">
        <p>Za boljše delovanje ta stran uporablja piškotke. Dovolite uporabo piškotkov? <router-link  to="/cookies/">Več o piškotkih</router-link></p> 
        <md-button class="md-raised allow" @click="allowCookies">Dovolim</md-button> 
        <md-button class="md-raised forbid" @click="forbidCookies">Ne Dovolim</md-button>
    </div>                    

</div>
</template>
<script>
export default {
    name: 'cookieWarning',
    methods: {
        allowCookies: function () {
            document.cookie = `dentistsPageUserAllowsCookies=true; expires=${this.expiryDate}`;
            this.$emit('allowCookiesEvent', true)
        },
        forbidCookies: function () {
            this.$emit('allowCookiesEvent', false)
        },
    },
    computed: {
        expiryDate: function () {
            //expiry time on the cookie will be 1 year
            let d = new Date();
            d.setTime(d.getTime() + (365*24*60*60*1000))
            return d.toUTCString();
        }
    }
}
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
#cookie-warning {
    width: 60%;
    margin-left: 20%;
    background-color: rgba(21, 202, 191, 0.1);    
    .cookie-text {
        padding: 10px;
        color: $main-dark-font-color;
        .allow {
            color: $main-light-font-color;
            background-color: #18e171;
        }
        .forbid {
            background-color: #e11824;
            color: $main-light-font-color;
        }
    }
}
</style>