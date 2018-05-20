<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{on: showChoose}" @click='showChoose = true'>短信登录</a>
          <a href="javascript:;" :class="{on: !showChoose}" @click='showChoose = false'>密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form @submit.prevent='login' >
          <div :class="{on:showChoose}" >
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model='phone'>
              <button :disabled='!rightphone' class="get_verification"
                      :class='{right_phone:rightphone}' @click.prevent='getCode'>
                {{timeEnd>0? `已发送(${timeEnd}s)` : '获取验证码'}}
              </button>
            </section>
            <section class="login_verification">
              <input type="tel" maxlength="8" placeholder="验证码" v-model='code'>
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on:!showChoose}">
            <section>
              <section class="login_message">
                <input type="tel" maxlength="11" placeholder="手机/邮箱/用户名" v-model='name'>
              </section>
              <section class="login_verification">
                <input type="text" maxlength="8" placeholder="密码" v-model='pwd' v-if='showPwd' >
                <input type="password" maxlength="8" placeholder="密码" v-model='pwd' v-else >
                <div class="switch_button" :class="showPwd?'on':'off'"  @click='showPwd=!showPwd'>
                  <div class="switch_circle" :class='{right: showPwd}'></div>
                  <span class="switch_text">{{showPwd? 'abc' : '...'}}</span>
                </div>
              </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码" v-model='captcha'>
                <img class="get_verification" ref='captcha' src="http://localhost:4000/captcha" alt="captcha" @click='getCaptcha'>
              </section>
            </section>
          </div>
          <button class="login_submit" >登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back" @click='back'>
        <i class="iconfont icon-jiantou2"></i>
      </a>
    </div>
    <AlertTip :alertText='alertText' v-if='alertShow' @closeTip='closeTip'/>
  </section>
</template>

<script>
    import AlertTip from '../../components/AlertTip/AlertTip'
    import {reqSendCode,reqPwdLogin,reqSmsLogin,} from '../../api'
    export default {
      data () {
        return  {
          showChoose: true, // 点击切换  //true表示短信验证 false表示密码验证
          showPwd:false, // 是否显示密码
          phone: '', // 手机号
          code: '', // 短信验证码
          name: '', // 用户名
          pwd: '', // 用户密码
          captcha: '', //图片验证码
          timeEnd: 0,
          alertText: '',
          alertShow: false
        }
      },
      components: {
        AlertTip
      },
      computed: {
        rightphone: {
          get (){
            return /^1\d{10}$/.test(this.phone)
          },
        }
      },
        methods: {
          //当点击提示框确认时
          closeTip() {
            this.alertText=''
            this.alertShow=false
          },
          // 点击左上角箭头返回上一级
          back () {
            this.$router.back()
          },
          //获取验证码
          async getCode (){
            // 点击button按钮 会开启倒计时 暂时设置为30s倒计时
            if (!this.timeEnd){
              this.timeEnd = 30
              this.clearTime = setInterval(()=> {
                this.timeEnd--
                if (this.timeEnd <= 0){
                  clearInterval(this.clearTime)
                }
              },1000)
            }
            // 发送ajax请求
            const result = await reqSendCode(this.phone)
            console.log(this.phone)
            console.log(result)
            // 如果发送失败重新获取
            if (result.code === 1){
              // 失败并且 清除定时器
              if(this.timeEnd){
                clearInterval(this.clearTime)
                this.timeEnd=0
              }
              this.changeShow(result.msg)
            }

          },
          //组件 更改状态
          changeShow (Text){
            this.alertText= Text
            this.alertShow= true
          },
          // 点击登录就会触发 form表单的submit事件
          async login (){
            // 只要一点击验证码就需要换


            //分为短信验证和密码验证
              // 因为const let 都是块级作用域 所以需要在外边重新 用let
            let result
            if (this.showChoose){
                const {phone,code,rightphone} = this
              if (phone===''){
                this.changeShow ('请输入手机号')
                return
              }
              if (!/^\d{6}$/.test(code)){
                this.changeShow ('请输入正确的六位数验证码')
                return
              }
              if (!rightphone){
                this.changeShow ('请输入正确的手机号')
                return
              }
              // 点击登录发送ajax请求
               result = await reqSmsLogin({phone,code})

            } else {
              const {name,pwd,captcha} = this
              if (!name) {
                this.changeShow('用户名必须指定')
                return
              } else if (!pwd) {
                this.changeShow('请输入密码')
                return
              } else if (!captcha) {
                this.changeShow('验证码必须指定')
                return
              }
              // 点击 发送请求 密码登录
               result = await reqPwdLogin({name,pwd,captcha})

            }

            // 发送之后 清除定时器
            if(this.timeEnd){
              clearInterval(this.clearTime)
              this.timeEnd=0
            }
            // 进行判断
            if (result.code === 0 ){
              /*
              成功之后
                跳转到个人主页
                保存个人信息到state
               */
              const userInfo = result.data
              // 分发同步action
              this.$store.dispatch('recordUser',userInfo)

              this.$router.replace('/profile')
            }else {
              this.getCaptcha()
              // 失败 需要提示错误信息
              this.changeShow(result.msg)
            }



          },
          // 获取图形验证码
          getCaptcha (){
            //每次点击需要重新有一个url值， 所以采用加入时间戳的方法 解决
            this.$refs.captcha.src='http://localhost:4000/captcha?time'+Date.now()

          }
        }
    }
</script>

<style  lang="stylus" rel="stylesheet/stylus" type="text/stylus">
  @import "../../common/stylus/mixins.styl"
  .loginContainer
    width 100%
    height 100%
    background #fff
    .loginInner
      padding-top 60px
      width 80%
      margin 0 auto
      .login_header
        .login_logo
          font-size 40px
          font-weight bold
          color #02a774
          text-align center
        .login_header_title
          padding-top 40px
          text-align center
          >a
            color #333
            font-size 14px
            padding-bottom 4px
            &:first-child
              margin-right 40px
            &.on
              color #02a774
              font-weight 700
              border-bottom 2px solid #02a774
      .login_content
        >form
          >div
            display none
            &.on
              display block
            input
              width 100%
              height 100%
              padding-left 10px
              box-sizing border-box
              border 1px solid #ddd
              border-radius 4px
              outline 0
              font 400 14px Arial
              &:focus
                border 1px solid #02a774
            .login_message
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .get_verification
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                border 0
                color #ccc
                font-size 14px
                background transparent
                &.right_phone
                  color black
            .login_verification
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .switch_button
                font-size 12px
                border 1px solid #ddd
                border-radius 8px
                transition background-color .3s,border-color .3s
                padding 0 6px
                width 30px
                height 16px
                line-height 16px
                color #fff
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                &.off
                  background #fff
                  .switch_text
                    float right
                    color #ddd
                &.on
                  background #02a774
                >.switch_circle
                  //transform translateX(27px)
                  position absolute
                  top -1px
                  left -1px
                  width 16px
                  height 16px
                  border 1px solid #ddd
                  border-radius 50%
                  background #fff
                  box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                  transition transform .3s
                  &.right
                    transform translateX(30px)
            .login_hint
              margin-top 12px
              color #999
              font-size 14px
              line-height 20px
              >a
                color #02a774
          .login_submit
            display block
            width 100%
            height 42px
            margin-top 30px
            border-radius 4px
            background #4cd96f
            color #fff
            text-align center
            font-size 16px
            line-height 42px
            border 0
        .about_us
          display block
          font-size 12px
          margin-top 20px
          text-align center
          color #999
      .go_back
        position absolute
        top 5px
        left 5px
        width 30px
        height 30px
        >.iconfont
          font-size 20px
          color #999
</style>
