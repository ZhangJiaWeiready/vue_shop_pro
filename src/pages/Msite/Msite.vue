<template>
  <section class="msite">
    <!--首页头部-->
    <Header :title='address.name'>
      <router-link class="header_search" slot='search' to='/search'>
        <i class="iconfont icon-sousuo"></i>
      </router-link>
      <router-link class="header_login" slot='login' :to="userInfo._id?'':'/login'">
        <span class="header_login_text" v-show='!userInfo._id'>登录|注册</span>
        <span class="header_login_text" v-show='userInfo._id'>
           <i class="iconfont icon-person"></i>
        </span>

      </router-link>
    </Header>
    <!--首页导航-->
    <nav class="msite_nav border-1px">
      <!--如果这个数据存在的话就显示不存在的话需要显示 初始化图片-->
      <div class="swiper-container" v-if='categorysArr.length'>
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for='(category, index) in categorysArr' :key='index'>
            <a href="javascript:" class="link_to_food" v-for="(cate, index) in category" :key='index'>
              <div class="food_container">
                <img :src="baseImgUrl + cate.image_url">
              </div>
              <span>{{cate.title}}</span>
            </a>
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
      <img src="./images/msite_back.svg" alt="back" v-else>
    </nav>
    <!--首页附近商家-->
    <div class="msite_shop_list border-1px">
      <div class="shop_header">
        <i class="iconfont icon-xuanxiang"></i>
        <span class="shop_header_title">附近商家</span>
      </div>
      <ShopLists />
    </div>
  </section>
</template>

<script>
  import {mapState} from 'vuex'
  import Swiper from 'swiper'
  import 'swiper/dist/css/swiper.min.css'
  import Header from '../../components/Header/Header'
  import ShopLists from '../../components/ShopLists/ShopLists'
    export default {

      data () {
        return {
          baseImgUrl: 'https://fuss10.elemecdn.com'
        }
      },
      mounted () {
        this.$store.dispatch('getFoodCategory')
        this.$store.dispatch('getShops')
      },
      computed: {
        ...mapState(['address', 'categorys','userInfo']),
        //根据categroys 生成一个二维数组
        categorysArr () {
          //获取从后台返回的信息 是一个数组
          const {categorys} = this

          // 准备一个空的2维数组
          let arr = []
          //准备一个小数组 最长长度为8
          let cateMiniArr = []
          //遍历 每8个放进去catemini中
          categorys.forEach( c => {
            if (cateMiniArr.length === 8 ){
              cateMiniArr = []
            }
            if (cateMiniArr.length === 0){
              arr.push(cateMiniArr)
            }
            cateMiniArr.push(c)
          })
          return arr
        }
      },
      watch : {
        categorys (value){
          //当数据发生改变的时候创建swiper函数
          this.$nextTick( () =>{
              new Swiper('.swiper-container',{
                loop: true,
                pagination: {
                  el: '.swiper-pagination',
                }
              })
          }
          )
        }
      },

      components: {
        Header,
        ShopLists
      }
    }
</script>

<style  lang="stylus" rel="stylesheet/stylus" type="text/stylus">
  @import "../../common/stylus/mixins.styl"
  .msite
    width 100%
    .msite_nav
      bottom-border-1px(#e4e4e4)
      margin-top 45px
      height 200px
      background #fff
      .swiper-container
        width 100%
        height 100%
        .swiper-wrapper
          width 100%
          height 100%
          .swiper-slide
            display flex
            justify-content center
            align-items flex-start
            flex-wrap wrap
            .link_to_food
              width 25%
              .food_container
                display block
                width 100%
                text-align center
                padding-bottom 10px
                font-size 0
                img
                  display inline-block
                  width 50px
                  height 50px
              span
                display block
                width 100%
                text-align center
                font-size 13px
                color #666
        .swiper-pagination
          >span.swiper-pagination-bullet-active
            background #02a774
    .msite_shop_list
      top-border-1px(#e4e4e4)
      margin-top 10px
      background #fff
      .shop_header
        padding 10px 10px 0
        .shop_icon
          margin-left 5px
          color #999
        .shop_header_title
          color #999
          font-size 14px
          line-height 20px

</style>
