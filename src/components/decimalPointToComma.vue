
<template>
  <h2>{{decimalPointToComma}}</h2>
</template>
<script>
export default {
  name: 'average',
  props:["average"],
  computed: {
    decimalPointToComma: function(){
      let avgWithPoint = `${this.average.toFixed(2)}%`;
      let avgWithComma = avgWithPoint.replace(".", ",")
      return avgWithComma
    }
  }
}
</script>

<style lang="scss">
</style>
