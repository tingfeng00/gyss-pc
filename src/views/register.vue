<template>
    <div class="register-page">
        <header-fix :active-index="headerIndex"></header-fix>
        <div class="main">
            <div class="title">
                用户注册
            </div>
            <div class="steps">
                <ul>
                    <li>
                        <img src="../assets/step1.png" alt="">
                    </li>
                    <li>
                        <img src="../assets/step2.png" alt="">
                    </li>
                    <li>
                        <img src="../assets/step3.png" alt="">
                    </li>
                </ul>
            </div>
            <div class="login-info">
                <h3>登录信息</h3>
                <div class="content">
                    <el-form ref="form1" :model="form1" label-width="90px" :rules="rules1">
                        <el-form-item label="用户名:" prop="account">
                            <el-input v-model="form1.account"></el-input>
                        </el-form-item>
                        <el-form-item label="身份证:" prop="idCard">
                            <el-input v-model="form1.idCard"></el-input>
                        </el-form-item>
                        <el-form-item label="密码:" prop="passWord">
                            <el-input v-model="form1.passWord" show-password></el-input>
                        </el-form-item>
                        <el-form-item label="确认密码:" prop="cerPassWord">
                            <el-input v-model="form1.cerPassWord" show-password></el-input>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <div class="person-info">
                <h3>个人信息</h3>
                <div class="content">
                    <el-form ref="form2" :model="form2" label-width="90px" :rules="rules2">
                        <el-form-item label="姓名:" prop="name">
                            <el-input v-model="form2.name"></el-input>
                        </el-form-item>
                        <el-form-item label="性别:" prop="sex">
                            <el-radio-group v-model="form2.sex">
                                <el-radio label="男"></el-radio>
                                <el-radio label="女"></el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="所在镇区:" prop="region">
                            <el-select  placeholder="请选择所在镇区" v-model="form2.region" collapse-tags style="height: auto" v-if="allGroupList.length>0">
                                <el-option v-model="mineStatusValue"  style="height: auto">
                                    <el-tree
                                        :data="allGroupList"
                                        show-checkbox 
                                        node-key="Id" 
                                        ref="tree" 
                                        :props="defaultProps"
                                        @check-change="handleCheckChange"
                                        @node-click="nodeClick"
                                    >
                                    </el-tree>
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="电话:" prop="phone">
                            <el-input v-model="form2.phone"></el-input>
                        </el-form-item>
                        <el-form-item label="邮件:" prop="Email">
                            <el-input v-model="form2.Email"></el-input>
                        </el-form-item>
                         <el-form-item label="验证码:" prop="cerCode" class="cerCode">
                            <el-input v-model="form2.cerCode" class="cerCodeInp l" style="width:120px;"></el-input>
                            <img :src="this.codeSrc" alt="" class="cerCodeImg l" style="width: 80px;margin-left:10px;; height: 22px; margin-top: 9px;">
                            <p class="codeChange l" style="margin-left:15px;cursor:pointer" @click="codeChange">看不清?<span style="color:#368474">换一张</span> </p>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <div class="agree">
                <label class="clearfix">
                    <div class="option l">
                        <input type="checkbox" class="hidden-input" v-model="agreeState">
                        <span class=""></span>
                    </div>
                    <div class="option-val l">
                        我已经阅读且同意 <router-link to="/userAgreement">《用户协议和隐私政策声明协议》</router-link> 
                    </div>
                </label>  
            </div>
             <el-button type="primary" @click="submitForm()">注册提交</el-button>
        </div>
        <footer-fix></footer-fix>
    </div>
</template>

<script>
import { Message } from 'element-ui'
import { GetAllGroupList, GetLoginVC, Register } from '../service/getData'
export default {
    data () { 
      var checkAccount = (rule, value, callback) => {
          if (!value) {
            return callback(new Error('用户名不能为空'))
          } else {
              this.isPassAccount = true
              callback()
          }
      }
      var checkPhone = (rule, value, callback) => {
          if (!value) {
              return callback(new Error('手机号码不能为空'))
          } else {
            let regMobile = /^1[3|4|5|7|8]\d{9}$/
             if (regMobile.test(value)) {
                this.isPassPhone = true
                callback()
             } else {
                return callback(new Error('请输入有效的手机号码'))
             }
          }
      }
      var checkPassWord = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请输入密码'))
        } else if (this.form1.passWord.length > 20 || this.form1.passWord.length < 6) {
            this.isPassWord = false
            callback(new Error('6-20位字符，建议由字母，数字符号两种以上组合'))
        } else {
            this.isPassWord = true
            callback()
        }
      }
      var checkCerWord = (rule, value, callback) => {
        if (value === '') {
            callback(new Error('请输入确认密码'))
        } else if (value !== this.form1.passWord) {
            callback(new Error('两次输入密码不一致!'))
        } else {
            this.isPassCerWord = true
            callback()
        }
      }
      var checkIdCard = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入身份证号码'))
          } else {
            let regIdCard = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
            if (regIdCard.test(value)) {
                this.isPassIdCard = true
                callback()
            } else {
                return callback(new Error('请输入有效的身份证号码'))
            }
          }
      }
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
      var checkRegion = (rule, value, callback) => {
          if (value === '') {
              callback(new Error('请选择所在镇区'))
          } else {
              this.isPassRegion = true
              callback()
          }
      }
      var checkSex = (rule, value, callback) => {
          if (value === '') {
              callback(new Error('请选择您的性别'))
          } else {
              this.isPassSex = true
              callback()
          }
      }
      var checkName = (rule, value, callback) => {
          if (value === '') {
              callback(new Error('请输入您的姓名'))
          } else {
              this.isPassName = true
              callback()
          }
      }
      var checkCerCode = (rule, value, callback) => {
          if (!value) {
              callback(new Error('请输入验证码'))
          } else {
              this.isPassCode = true
              callback()
          }
      }
      return {
        headerIndex: '0',
        agreeState: false,
        form1: {
            account: '',
            idCard: '',
            passWord: '',
            cerPassWord: ''
        },
        rules1: {
          account: [
              { required: true, validator: checkAccount, trigger: 'blur' }
          ],
          idCard: [
              { required: true, validator: checkIdCard, trigger: 'blur' }
          ],
          passWord: [
              { required: true, validator: checkPassWord, trigger: 'blur' }
          ],
          cerPassWord: [
              { required: true, validator: checkCerWord, trigger: 'blur' }
          ]
        },
        form2: {
             name: '',
             sex: '',
             region: '',
             phone: '',
             Email: '',
             regionId: '',
             cerCode: ''
        },
        rules2: {
            name: [
                { required: true, validator: checkName, trigger: 'blur' }
            ],
            sex: [
                { required: true, validator: checkSex, trigger: 'change' }
            ],
            region: [
                { required: true, validator: checkRegion, trigger: 'change' }
            ],
            phone: [
                { required: true, validator: checkPhone, trigger: 'blur' }
            ],
            Email: [
                { required: true, validator: checkEmail, trigger: 'blur' }
            ],
            cerCode: [
                { required: true, validator: checkCerCode, trigger: 'blur' }
            ]
        },
        isPassAccount: false, // 用户名是否通过
        isPassIdCard: false, // 身份证是否通过
        isPassWord: false, // 密码是否通过
        isPassCerWord: false, // 校验密码是否通过
        isPassName: false, // 姓名是否通过
        isPassSex: false, // 性别是否通过
        isPassRegion: false, // 所选镇区是否通过
        isPassPhone: false, // 电话号码是否通过
        isPassEmail: false, // 电子邮箱是否通过
        isPassCode: false, // 验证码是否通过
        allGroupList: [], // 镇区列表
        mineStatusValue: '',
        codeSrc: '', // 验证码图片
        defaultProps: {
            children: 'Chirldren',
            label: (data, node) => data.UserGroupName ? data.UserGroupName : data.Name  
         }
      }
    },
    computed: {
    },
    mounted () {
        this.getAllGroupList()
        this.getCode()
    },
    methods: {
        async getAllGroupList () {
            let data = await GetAllGroupList({ ParentId: '1' })
            this.allGroupList = data.GroupInfoList
        },
        submitForm () {
            if (!this.isPassAccount) {
                this.$alert('请填写正确的用户名')
            } else if (!this.isPassIdCard) {
                Message('请填写正确的身份证号码')
            } else if (!this.isPassWord) {
                Message('请填写您的密码')
            } else if (!this.isPassCerWord) {
                Message('两次输入密码不一致')
            } else if (!this.isPassName) {
                Message('请填写符合规范的姓名')
            } else if (!this.isPassSex) {
                Message('请选择您的性别')
            } else if (!this.isPassRegion) {
                Message('请选择您的所在镇区')
            } else if (!this.isPassPhone) {
                Message('请填写符合规范的电话号码')
            } else if (!this.isPassEmail) {
                Message('请填写符合规范的电子邮箱')
            } else if (!this.isPassCode) {
                Message('您的验证码未通过')
            } else if (!this.agreeState) {
                Message('您还未同意我们的用户协议')
            } else {
                this.register()
            }
        },
        handleCheckChange (data, checked, node) {
            if (checked == true) {
                this.checkedId = data.Id
                this.$refs.tree.setCheckedNodes([data])
                this.form2.region = data.Name
                this.form2.regionId = data.Id
                // this.mineStatusValue = data.
                // console.log(data.Id)
	            // console.log(data.Name)
            }
        },
        nodeClick (data, checked, node) {
            this.checkedId = data.Id
            this.$refs.tree.setCheckedNodes([data])
        },
        async getCode () {
            let data = await GetLoginVC({ BoolRes: true })
            if (data.IsSuccess) {
                this.codeSrc = data.Data.Img
            }
        },
        codeChange () {
            this.getCode()
        },
        async register () {
             let obj = {
                   Account: this.form1.account,
                   Password: this.form1.passWord,
                   Name: this.form2.name,
                   GroupId: this.form2.regionId,
                   IdCard: this.form1.idCard,
                   Mobile: this.form2.phone,
                   Sex: this.form2.sex,
                   Email: this.form2.Email,
                   ValidateCode: this.form2.cerCode
               }
               let data = await Register(obj)
               if (data.IsSuccess) {
                   Message("您已注册成功")
                   this.$nextTick(() => {
                       this.$router.push('/userLogin')
                   })
               } else if (data.Type != 1) {
                  this.getCode()
                  Message(data.Message)
               }
        }
    }
}
</script>

<style lang="scss"  rel="stylesheet/scss">
    @import "../style/mixin";

    .register-page{
        background: url("../assets/body-bg.png") no-repeat;
        .main{
            width: 640px;
            margin: 40px auto;
            padding-bottom: 40px;
            background: #fff;
            .title{
                width: 100%;
                height: 48px;
                line-height: 48px;
                background: #368474;
                color: #fff;
                text-align: center;
                font-size: 16px;
            }
            .steps{
                margin-top: 25px; 
                ul{
                    @extend %clearFix;
                    box-shadow: 0px 0px 8px #f4f4f4;
                    li{
                        float: left;
                        margin-left: 48px;
                        padding: 15px 0;
                        &:nth-child(0){
                            margin-left: 55px;
                        }
                    }
                }
            }
            .login-info{
                margin-top: 30px;
                h3{
                    width: 100%;
                    height: 36px;
                    line-height: 36px;
                    text-align: center;
                    background: #f0f4fa;
                    color: #368474;
                    margin: 0;
                }
                .content{
                    width: 100%;
                    .el-form{
                        width: 430px;
                        margin: 30px auto;
                        .el-form-item{
                            margin-bottom: 15px!important;
                            .el-input{
                            }
                            .el-form-item__error{
                                margin-top: 10px;
                                height: 32px;
                                line-height: 32px;
                                background: #f0f4fa;
                                color: #368474;
                                padding: 0 18px;
                                font-size: 14px;
                                position: inherit
                            }
                            
                        }
                    }
                }
            }
            .person-info{
                h3{
                    width: 100%;
                    height: 36px;
                    line-height: 36px;
                    text-align: center;
                    background: #f0f4fa;
                    color: #368474;
                    margin: 0;
                }
                .content{
                    width: 100%;
                    .el-form{
                        width: 430px;
                        margin: 30px auto;
                        .el-form-item{
                            margin-bottom: 15px!important;
                            .el-input{
                                input{
                                }
                            }
                            .el-form-item__error{
                                margin-top: 10px;
                                height: 32px;
                                line-height: 32px;
                                background: #f0f4fa;
                                color: #368474;
                                padding: 0 18px;
                                font-size: 14px;
                                position: inherit
                            }
                        }
                        .cerCode{
                            .el-form-item__error{
                                margin-top: 50px!important;
                            }
                        }
                    } 
                }
            }
            .agree{
                width: 430px;
                margin: 0 auto;
                label{
                    margin-left: 80px;
                    position: relative;
                    .option{
                        .hidden-input {
                            opacity: 0;
                            position: absolute;
                            z-index: -1;
                            height: 14px;
                            width: 14px;
                            top: 0px;
                        }
                        input[type=checkbox]+span {
                            display: inline-block;
                            height: 14px;
                            width: 14px;
                            background-color: transparent;
                            border: 1px solid #368474;
                            margin-right: 9px;
                            vertical-align: middle;
                        }
                        input[type=checkbox]:checked+span {
                            background: url(../assets/remember-dh.png) no-repeat 0px 2px;
                        }
                    }
                    a{
                        color: #368474;
                        &:hover{
                            text-decoration: underline;
                        }
                    }
                }
            }
            .el-button{
                width: 295px;
                height: 48px;
                line-height: 48px;
                padding: 0;
                background-image: linear-gradient(to right, #368474, #4dbe7a);
                border: none;
                border-radius: 25px;
                margin: 25px auto 0;
                display: block;
            }
        }
    }
</style>
