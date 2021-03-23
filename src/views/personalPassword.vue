<template>
    <div class="per_fixPassword">
        <div class="per_bodytitle">
            <p>修改密码</p>
        </div>
        <div class="per_bodycontent">
            <ul>
                <li>
                    <label><span>*</span>旧密码：</label>
                    <input type="password" v-model="oldPassword">
                </li>
                <li>
                    <label><span>*</span>新密码：</label>
                    <input type="password" @focus="attention()" @blur="leave()" v-model="newPassword">
                    <p v-show="hint">6-20位字符，建议由字母，数字符号两种以上组合</p>
                </li>
                <li>
                    <label><span>*</span>确认密码：</label>
                    <input type="password" v-model="reword">
                </li>
                <li>
                    <button type="button" @click="updata()">确认修改</button>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { UpdatePwd, LoginOut } from '../service/getData'
import { mapActions, mapState } from 'vuex'
export default {
    name: 'personalPassword',
    data: function () {
        return {
            oldPassword: '',
            newPassword: '',
            reword: '',
            hint: false
        }
    },
    mounted () {
        this.$emit('getchildvalue', '8')
    },
    computed: {
        ...mapState(['userAgent', 'userInfo'])
    },
    methods: {
        ...mapActions(['getUserInformation', 'saveUserInfo']),
        attention () {
            this.hint = true
        },
        leave () {
            this.hint = false
        },
        async updata () {
            if (this.oldPassword == '' || this.newPassword == '' || this.reword == '') {
                this.$message.error('请填写完内容')
                return false
            } else if (this.newPassword != this.reword) {
                this.$message.error('确认密码输入错误')
                return false
            } else if (this.newPassword == this.oldPassword) {
                this.$message.error('新密码不能和老密码一样！')
                return false
            }
            var data = await UpdatePwd({
                OldPwd: this.oldPassword,
                NewPwd: this.newPassword
            })
            if (data.Type == 1) {
                let data1 = await LoginOut()
                if (data1.Type == 1) {
                    this.saveUserInfo({})
                    window.localStorage.removeItem('ASPXAUTH')
                    window.localStorage.removeItem('userInfo')
                }
                this.$alert('密码修改成功', '提示', {
                    confirmButtonText: '确定',
                    callback: action => {
                        this.$router.push({ name: 'userlogin' })
                    }
                })
                // this.$message.success('密码修改成功')
            } else {
                this.$message.error(data.Message)
            }
            this.oldPassword = ''
            this.newPassword = ''
            this.reword = ''
        }
    }
}
</script>

<style lang="scss">
.per_fixPassword{
    .per_bodytitle{
        p{
            height: 66px;
            border-bottom: 1px solid #efefef;
            line-height: 66px;
            font-size: 20px;
            font-weight: bold;
            color:#555;
            padding-left: 19px;
        }
    }
    .per_bodycontent{
        height:457px;
        text-align: center;
        &:before{
            content: '';
            display: inline-block;
            vertical-align: middle;
            height: 100%;
        }
        ul{
            margin-top:45px;
            display: inline-block;
            li{
                margin-bottom: 16px;
                label{
                    span{
                        color:#f00; 
                        margin-right: 10px;  
                        font-size: 20px;
                        position: relative;
                        top:5px;
                    }
                    margin-right: 8px;
                }
                input{
                    width: 260px;
                    height: 34px;
                    border:1px solid #efefef;
                    padding: 0 30px 0 10px;
                    &:focus{
                        border:1px solid #368474;
                    }
                }
                button{
                    width: 296px;
                    height: 48px;
                    border-radius: 48px;
                    border:0;
                    color:#fff;
                    background:#368474;
                    font-weight: bold;
                    background:linear-gradient(to right,#368474 ,#4dbe7a);
                    cursor: pointer;
                }
                p{
                    margin-top:12px;
                    width:331px;
                    height:32px;
                    line-height: 32px;
                    margin-left:110px;
                    color:#2cabfa;
                    background:#f0f4fa;
                }
                &:nth-of-type(3){
                    position: relative;
                    right:7px;
                }
            }
        }
    }
}
</style>
