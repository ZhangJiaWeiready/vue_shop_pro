<template>
  <div id='App'>
    <router-view/>
    <FooterGuide/>
  </div>
</template>

<script>
  import FooterGuide from './components/FooterGuide/FooterGuide'

    export default {
        mounted () {
          this.$store.dispatch('getAddress')


        },
        components: {
          FooterGuide
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
  #app
    width 100%
    height 100%
    background #f5f5f5


</style>
