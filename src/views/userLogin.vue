<template>
    <div class="login">
        <div class="login-header">
            <img src="../assets/icon-yxwg-logo1.png" alt="">
        </div>
        <div class="main">
            <div class="content">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="密码登录" name="first">
                        <form>
                            <p>账号</p>
                            <div class="form-group fg1">
                                <!-- <img src="../assets/account-img.png" alt=""> -->
                                <input type="text" placeholder="请输入账号" v-model="account">
                            </div>
                            <p>密码</p>
                            <div class="form-group fg2">
                                <!-- <img src="../assets/password-img.png" alt=""> -->
                                <input type="password" placeholder="请输入密码" v-model="password" @keydown="keysearch">
                            </div>
                        </form>
                        <div class="tab-handle clearfix">
                            <div class="remember l">
                                <label class="clearfix">
                                    <div class="option l">
                                        <input type="checkbox" class="hidden-input" v-model="remember">
                                        <span class=""></span>
                                    </div>
                                    <div class="option-val l">
                                        记住账号
                                    </div>   		
                                </label>  
                            </div>
                           
                        </div>
                        <el-button type="primary" @click.native="login">登录</el-button>
                        <div class="register clearfix">
                            <router-link to="/forgetPassword">忘记密码？</router-link>
                            <router-link to="/register"><img src="../assets/blue-arrow.png" alt=""> 立即注册</router-link>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="验证码登录" name="second">
                        <form>
                            <p>手机号</p>
                            <div class="form-group fg3">
                                <!-- <img src="../assets/account-img.png" alt=""> -->
                                <input type="tel" placeholder="请输入手机号" v-model="phone">
                            </div>
                            <p>验证码</p>
                            <div class="form-group fg4 clearfix">
                                <!-- <img src="../assets/password-img.png" alt=""> -->
                                <input  placeholder=""  v-model="phoneCode">
                                <p class="btn1" v-if="showGetCode" @click="getMsg">获取验证码</p>
                                <p class="btn2" v-else>{{countNum}}秒后重新获取</p>
                            </div>
                            <el-button type="primary" @click.native="login">登录</el-button>
                        </form>

                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
       <div class="login-footer">
           <p>Copyrights©最高人民检察院 All Rights Reserved. </p>
           <p>最高人民检察院 （100726）北京市东城区北河沿大街147号 010-65209114（查号台） 010-12309（检察服务热线）</p>
           <p>未经本网书面授权，请勿转载、摘编或建立镜像，否则视为侵权。备案序号: 京ICP备05026262号 建议使用1920*1080分辨率获得最佳浏览效果 </p>
       </div>
    </div>
</template>

<script>
import Vue from 'vue'
import { LoginCode, KickOut, SendMsg } from '../service/getData'
import { mapActions, mapState } from 'vuex'
import { getStore, setStore } from '../plugins/utils'
import { MessageBox, Message } from 'element-ui'
Vue.prototype.$confirm = MessageBox.confirm
// CheckValidateCode, 验证验证码
export default {
    data () {
        return {
          headerIndex: '0',
          activeName: 'first',
          account: '',
          password: '',
          remember: '',
          backUrl: '',
          backPath: '',
          phoneCode: '',
          phone: '',
          countNum: 60,
          showGetCode: true,
          timer: null
        }
    },
    created () {
        // this.getUserAgent()
        // 首先在这里获取用户登录信息 因为点确定去修改密码页面以后 回退会依然带着用户信息 如果有用户信息 跳去首页
    },
    mounted () {
        let backUrl = this.$route.query.currentUrl || this.$route.query.page
        // console.log(backUrl)
        if (backUrl) {
            this.backUrl = backUrl
        } else {
            this.backUrl = { name: 'home' }
        }
        this.account = localStorage.getItem('account')
        this.password = localStorage.getItem('password')
        this.remember = getStore('remember')
    },
    computed: {
        ...mapState(['userAgent'])
    },
    methods: {
        ...mapActions(['getUserAgent', 'getUserInformation', 'saveUserInfo']),
        handleClick (tab, event) {
            console.log(tab, event, this.activeName)
        },
        keysearch (evt) {
            let theEvent = window.event || evt
            let code = theEvent.keyCode || theEvent.which || theEvent.charCode
            if (code == 13) {
                this.login()
            }
        },
    //  获取手机验证码
        async getMsg () {
           let data = await SendMsg({
               mobileNo: this.phone
           })
           if (data.IsSuccess) {
             this.showGetCode = false
             let time = parseInt(this.countNum)
             this.timer = setInterval(() => {
                time -= 1
                this.countNum = time
                if (time <= 0) {
                    clearInterval(this.timer)
                    this.showGetCode = true
                    this.countNum = 60
                }
            }, 1000)
           }
        },
        async kickOut (kickUserId) {
            let res = await KickOut({ kickUserId: kickUserId })
            if (res.Type == 1) {
                this.login()
            }
        },
        // 登录
        async login () {
            if (this.activeName == 'first') {
                if (!this.account || !this.password) {
                    this.$message('用户名或密码不能为空')
                    return
                } 
            } else {
                if (!this.phone || !this.phoneCode) {
                    this.$message('手机号或验证码不能为空')
                    return
                }
            }
            let loginParams
            let loginParams1 = {
                Account: this.account,
                PassWord: this.password

            }
            let loginParams2 = {
                Account: this.phone,
                TelCode: this.phoneCode
            }
            loginParams = this.activeName == 'first' ? loginParams1 : loginParams2

            let data = await LoginCode(loginParams)
            if (data.Type == 1) {
                if (this.remember) {
                    this.getUserInformation()
                    localStorage.setItem('account', this.account)
                    localStorage.setItem('password', this.password)
                    setStore('remember', true)
                } else {
                    localStorage.setItem('account', '')
                    localStorage.setItem('password', '')
                    setStore('remember', true)
                }
                // if (this.backUrl == "admin") {
                //     window.location.href = 'http://test46.jy365.net/admin'
                // } else {
                //     this.$router.replace(this.backUrl)
                // }
                this.$router.replace(this.backUrl)
            } else if (data.Type == 3) {
              if (window.confirm('帐号在别的地方登录，是否踢出？')) {
                this.kickOut(data.Message)
                return true
              } else {
                return false
              }
            } else if (data.Type == 4) {
              Message('此电脑已经有用户登录，您不能用其他帐号再次登录！')
            } else if (data.Type == 5) {
              Message('平台当前在线人数到达上限，请稍后再试！')
            } else if (data.Type == 6) {
              Message(data.Message)
            } else if (data.Type == 10) {
              Message('您还不是本平台成员，将为您转向您所在的平台：' + data.Message, 2)
            } else if (data.Type == 11) {
              Message(data.Message)
            } else if (data.Type == 12 || data.Type == 13) {
              Message(data.Message)
            //   $scope.getVerifyCode();
            } else if (data.Type == 14) {
                this.$confirm(data.Message + ',请修改密码', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$router.replace({ path: '/personalCenter/personalPassword' })
                }).catch(() => {
                    // 点击取消的操作
                    if (this.remember) {
                        this.getUserInformation()
                        localStorage.setItem('account', this.account)
                        localStorage.setItem('password', this.password)
                        setStore('remember', true)
                    } else {
                        localStorage.setItem('account', '')
                        localStorage.setItem('password', '')
                        setStore('remember', true)
                    }
                    if (this.backUrl == "admin") {
                        window.location.href = 'http://test46.jy365.net/admin'
                    } else {
                        this.$router.replace(this.backUrl)
                    }
                })
            } else {
              Message(data.Message)
            }
        }
    },
    beforeDestroy () {
        clearInterval(this.timer)
    }
}
</script>

<style lang="scss" rel="stylesheet/scss">
    @import "../style/mixin";

    .login{
        background: url("../assets/main-login-bg.png") no-repeat;
        background-size: 100% 100%;
        .login-header{
            width: 1200px;
            margin: 0 auto;
            img{
               margin-top: 80px; 
               width: 221px;
               height: 43px;
            }
        }
        .main{
            width: 1200px;
            margin: 150px auto 15px;
            background: #fff url("../assets/login-bg2.png") 20px 20px no-repeat ;
            background-size: 700px 463px;
            border-top: 1px solid #fff;
            .content{
                width: 340px;
                height: 500px;
                margin: 20px 70px 50px 780px;
                .el-tabs {
                    .el-tabs__nav-wrap::after{
                        height: 1px;
                    }
                    .el-tabs__nav-scroll{
                        // .el-tabs__nav{
                        //     margin-left: 118px;
                        // }
                        .el-tabs__active-bar{
                            // background-color: #368474;
                            display: none;
                        }
                        .is-top{
                        // width: 108px!important;
                        }
                        .el-tabs__item{
                            font-size: 24px;
                            font-weight: bold;
                            color: #555;
                            height: 60px;
                            line-height: 60px;
                            padding: 0;
                            text-align: center;
                            &.is-active{
                                color: #066fc4;
                                font-size: 26px;
                            }     
                            &:nth-child(3) {
                                margin-left: 105px;
                            }                   
                        }
                    }
                    .el-tabs__content{
                        margin-top: 25px;
                        form{
                            p{
                                font-size: 18px;
                                margin-bottom: 5px;
                            }
                            .form-group{
                                height: 44px;
                                margin-bottom: 25px;
                                border: 1px solid #dcdcdc;
                                border-radius: 5px;
                                input{
                                    width: 252px;
                                    height: 44px;
                                    background: rgb(232,240,254);
                                    text-indent: 15px;
                                    margin-left: 30px;
                                }
                                
                                &.fg1{
                                    background: rgb(232,240,254) url("../assets/account-img.png") no-repeat 10px 10px;
                                    background-size: 18px 20px;
                                }
                                &.fg2{
                                    background: rgb(232,240,254) url("../assets/password-img.png") no-repeat 10px 10px;
                                    background-size: 18px 20px;
                                }
                                &.fg3{
                                    background: rgb(232,240,254) url("../assets/phone-icon.png") no-repeat 10px 10px;
                                    background-size: 15px 20px;
                                }
                                &.fg4{
                                    border: none;
                                    input{
                                      border: 1px solid #dcdfe6;
                                      border-radius: 5px;
                                      margin-left: 0;
                                      height: 42px;
                                      width: 198px;
                                      background: none;
                                      float: left;
                                      &:focus{
                                        border: 1px solid #066fc4;
                                      }
                                   }
                                   p.btn1{
                                       float: right;
                                       color: #6c6c6c;
                                       width: 130px;
                                       height: 42px;
                                       line-height: 42px;
                                       font-size: 16px;
                                       border: 1px solid #dcdfe6;
                                       text-align: center;
                                       border-radius: 5px;
                                       cursor: pointer;
                                       &:hover{
                                           border: 1px solid #066fc4;
                                           color: #066fc4;
                                       }
                                   }
                                   p.btn2{
                                       float: right;
                                       background: #ebebeb;
                                       color: #999;
                                       width: 130px;
                                       height: 42px;
                                       line-height: 42px;
                                       font-size: 16px;
                                       text-align: center;
                                       border: 1px solid #dcdfe6;
                                       border-radius: 5px;
                                       cursor: pointer;
                                   }
                                }
                            }
                        }
                        .tab-handle{
                            .remember{
                                color: #555;
                                position: relative;
                                label{
                                    .option{
                                       .hidden-input {
                                            opacity: 0;
                                            position: absolute;
                                            z-index: -1;
                                            height: 18px;
                                            width: 18px;
                                            top: 0px;
                                        }
                                        input[type=checkbox]+span {
                                            display: inline-block;
                                            height: 16px;
                                            width: 16px;
                                            background-color: transparent;
                                            border: 1px solid #2797f2;
                                            margin-right: 9px;
                                            vertical-align: middle;
                                        }
                                        input[type=checkbox]:checked+span {
                                            background: url(../assets/remember-dh.png) no-repeat 0px 0px;
                                        }
                                    }
                                }
                            }
                            
                        }
                        .el-button{
                            margin-top: 30px;
                            width: 340px;
                            height: 48px;
                            padding: 0;
                            background: #066fc4;
                            border: none;
                            font-size: 16px;
                            letter-spacing: 10px;
                        }
                        .register{
                            margin-top: 20px;
                            text-align: center;
                                a{
                                    color: #333;
                                    padding:0 5px;
                                    &:nth-child(1){
                                        float: left;
                                    }
                                    &:nth-child(2){
                                        float: right;
                                    }
                                    &:hover{
                                        color: #066fc4;
                                    }
                                }
                            }
                        .login-code{
                            display: block;
                            margin: 0 auto;
                        }
                    }
                }                
            }
        }
        .bottom{
            margin-top: 45px!important;
        }
        .login-footer{
            color: #fff;
            width: 1200px;
            margin: 130px auto 0px;
            padding-bottom: 20px;
            p{
                line-height: 36px;
                font-size: 16px;
            }
        }
    }
</style>
