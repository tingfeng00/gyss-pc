<template>
    <div class="forgetPassword">
        <header-fix :active-index="headerIndex"></header-fix>
        <div class="main">
            <div class="title">
                找回密码
            </div>
            <div class="op-box">
                <el-form ref="form1" :model="form1" :rules="rules1">
                        <el-form-item  prop="Account">
                            <el-input
                                v-model="form1.Account"
                                class="form-control"
                                type="text"
                                placeholder="请输入您的账号"
                                clearable
                            />
                        </el-form-item>
                        <el-form-item prop="Email">
                            <el-input
                                v-model="form1.Email"
                                class="form-control"
                                type="text"
                                placeholder="请输入您的邮箱"
                                clearable
                            />
                        </el-form-item>
                </el-form>
                <el-button class="submit-btn" type="primary" @click.native="submit">提交</el-button>
            </div>
        </div>
        <footer-fix></footer-fix>
    </div>
</template>

<script>
import Vue from 'vue'
import { FindPasswordEmail } from '../service/getData'
// import { mapActions, mapState } from 'vuex'
// import { getStore } from '../plugins/utils'
import { MessageBox, Message } from 'element-ui'
Vue.prototype.$confirm = MessageBox.confirm
// CheckValidateCode, 验证验证码
export default {
    data () {
        var checkEmail = (rule, value, callback) => {
          if (value === '') {
              callback(new Error('请输入邮件地址'))
          } else {
              let regEmail = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
              if (regEmail.test(value)) {
                  this.isPassEmail = true
                  callback()
              } else {
                return callback(new Error('请输入正确的邮件地址'))
              }
          }
      }
        return {
          headerIndex: '0',
          isPassEmail: false, // 电子邮箱是否通过
          form1: {
              Account: '',
              Email: ''
          },
          rules1: {
            Email: [
                { required: true, validator: checkEmail, trigger: 'blur' }
            ]
          }
        }
    },
    created () {
        
    },
    mounted () {
        
    },
    computed: {
        
    },
    methods: {
        handleClick (tab, event) {
            // console.log(tab, event);
        },
        // keysearch (evt) {
        //     let theEvent = window.event || evt
        //     let code = theEvent.keyCode || theEvent.which || theEvent.charCode
        //     if (code == 13) {
        //         this.login()
        //     }
        // }
         submit () {
            if (!this.isPassEmail) {
                Message('请填写符合规范的电子邮箱')
            } else {
                this.findPasswordEmail()
            }
        },
        async findPasswordEmail () {
            let data = await FindPasswordEmail({
                account: this.form1.Account,
                email: this.form1.Email
            })
            if (data.IsSuccess) {
                this.$alert(data.Message, '提示', {
                    confirmButtonText: '确定',
                    callback: action => {
                        // console.log("跳转登录")
                        this.$router.push({ name: 'userLogin' })
                    }
                })
            } else {
               Message(data.Message)
            }
        }
    }
}
</script>

<style lang="scss" rel="stylesheet/scss">
    @import "../style/mixin";

    .forgetPassword{
        background: #fff;
        .main{
            width: 1200px;
            margin: 30px auto;
            .title{
                display: block;
                height: 40px;
                padding: 40px;
                font-size: 30px;
                line-height: 40px;
                text-align: center;
                border-bottom: 1px solid #eee;
                overflow: hidden;
                background: #fff;
                width: 300px;
                margin: 0 auto;
            }
            .op-box{
                .form-control{
                    border: none;
                    // margin: 40px 0 0 0;
                    background: #fff;
                    line-height: 26px;
                    width: 300px;
                    margin: 30px auto 0;
                }
                .el-form-item{
                    width: 300px;
                    margin: 0 auto;
                }
                .submit-btn{
                    width: 150px;
                    height: 50px;
                    margin: 30px auto;
                    font-size: 18px;
                    display: block;
                    background-image: linear-gradient(to right, #368474, #4dbe7a);
                }
            }
        }
        .bottom{
            margin-top: 45px!important;
        }
    }
</style>
