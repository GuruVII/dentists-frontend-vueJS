
<template>
    <h2>{{decimalPointToComma}}</h2>
</template>
<script>
export default {
    name: 'average',
        props:['average'],
        computed: {
            decimalPointToComma: function () {
                const avgWithPoint = `${this.average.toFixed(2)}%`;
                const avgWithComma = avgWithPoint.replace('.', ',');
                return avgWithComma;
            },
    },
};

</script>

<style lang="scss">
</style>
