<template>
    <div class='SearchList' >
      <ul>
        <li class='Search_item '>
            <div class='item_left'>
              <img src="http://cangdu.org:8001/img/16265a70fe27854.jpg" alt="">
            </div>
            <div class='item_right'>
              <div class='right_top'>
                <span class='shopName'>aaa</span>
              </div>
              <div class='right_middle'>
                <span class='shopSellCount'>月售671单</span>
              </div>
              <div class='right_bottom'>
                <span class='shopSellPrice'>
                  20元起送/
                </span>
                <span class='shopDistance'>
                  距离1058.2公里
                </span>
              </div>
            </div>
        </li>
        <li class='Search_item '>
            <div class='item_left'>
              <img src="http://cangdu.org:8001/img/16265a70fe27854.jpg" alt="">
            </div>
            <div class='item_right'>
              <div class='right_top'>
                <span class='shopName'>aaa</span>
              </div>
              <div class='right_middle'>
                <span class='shopSellCount'>月售671单</span>
              </div>
              <div class='right_bottom'>
                <span class='shopSellPrice'>
                  20元起送/
                </span>
                <span class='shopDistance'>
                  距离1058.2公里
                </span>
              </div>
            </div>
        </li>
      </ul>
      <div class='errMsg' style='display: none'>
        <p>没有此商品</p>
      </div>
    </div>
</template>

<script>
  import {mapState} from 'vuex'
    export default {
        props: {
          searchMsg: String
        },
        computed: {
          ...mapState(['searchShops'])
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus" type="text/stylus">
  @import "../../common/stylus/mixins.styl"
  .SearchList
    margin-top 2px
    ul
      display inline-block
      width 100%
      font-size 0
      .Search_item
        bottom-border-1px(#f1f1f1)
        width 100%
        display inline-block
        background white
        padding 10px
        border 0

        .item_left
          float left
          margin-right 10px
          img
            width 50px
            height 50px

        .item_right
          float left
          font-size 12px
          .right_top
            margin-bottom 6px
          .right_middle
            margin-bottom 6px
    .errMsg
      background white
      text-align center
      color #333


</style>
