<template>
  <section class="search">
    <Header title='搜索'/>
    <form class="search_form" action="#" @submit.prevent='searchShop(searchMsg)'>
      <input type="search" name="search" placeholder="请输入商家或美食名称" class="search_input" v-model='searchMsg'>
      <input type="submit" name="submit" class="search_submit" >
    </form>
    <SearchList :searchMsg='searchMsg'/>
  </section>
</template>

<script>
  import Header from '../../components/Header/Header'
  import SearchList from '../../components/SearchList/SearchList'
  export default {
    data (){
      return {
        searchMsg: ''
      }
    },
    components: {
      Header,
      SearchList
    },
    methods: {
      searchShop (keyword) {
        if (this.searchMsg){
          this.$store.dispatch('getSearchShops',{keyword})
        }

      }
    }
  }
</script>

<style  lang="stylus" rel="stylesheet/stylus" type="text/stylus">
  @import "../../common/stylus/mixins.styl"
  .search  //搜索
    width 100%
    height 100%
    overflow hidden
    .search_form
      clearFix()
      margin-top 45px
      background-color #fff
      padding 12px 8px
      input
        height 35px
        padding 0 4px
        border-radius 2px
        font-weight bold
        outline none
        &.search_input
          float left
          width 79%
          border 4px solid #f2f2f2
          font-size 14px
          color #333
          background-color #f2f2f2
        &.search_submit
          float right
          width 18%
          border 4px solid #02a774
          font-size 16px
          color #fff
          background-color #02a774
</style>
