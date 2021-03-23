<template>
    <div class="per_inforfix">
        <div class="per_inforfixhead">
            <p>修改资料</p>
        </div>
        <div class="per_inforfixbody">
            <ul>
                <li>
                    <label for="username"><span class="per_special">*</span>姓名：</label>
                    <input type="text" name="username" v-model="userName">
                </li>
                <li>
                    <span class="per_special">*</span>性别：
                    <div class="per_checkSex">
                        <el-radio v-model="radio" label="男">男</el-radio>
                        <el-radio v-model="radio" label="女">女</el-radio>
                    </div>
                </li>
                <li>
                    <label for="username"><span class="per_special">*</span>所在镇区：</label>
                    <el-select v-model="Group" placeholder="请选择">
                        <el-option style="height: auto" v-model="groupResult">
                            <el-tree
                                :data="options"
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
                </li>
                <li>
                    <label for="username"><span class="per_special">*</span>电话：</label>
                    <input type="text" name="username" v-model="telephone">
                </li>
                <li>
                    <label for="username"><span class="per_special">*</span>工作职称：</label>
                    <input type="text" name="username" v-model="workRanck">
                </li>
                <li>
                    <label for="username"><span class="per_special">*</span>邮件：</label>
                    <input type="text" name="username" v-model="email">
                </li>
                <li>
                    <button type="button" @click="alertfor()">保存修改</button>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { GetUserInfo, GetAllGroupList, UpdateUserInfo } from '../service/getData'
// import { Message } from 'element-ui'
export default {
    name: 'personalInfor',
    data: function () {
        return {
            radio: '男',
            passName: '',   
            userName: '',
            localplact: 500,
            options: [],
            Group: '',
            GroupId: '',
            telephone: '',
            workRanck: '',
            email: '',
            groupResult: '',
            defaultProps: {
                children: 'Chirldren',
                label: (data, node) => data.UserGroupName ? data.UserGroupName : data.Name  
            }
        }
    },
    mounted () {
        this.$emit('getchildvalue', '9')
        this.random()
    },
    methods: {
        handleCheckChange (data, checked, node) {
            if (checked == true) {
                this.$refs.tree.setCheckedNodes([data])
                this.Group = data.Name
                this.GroupId = data.Id
                console.log(this.Group, this.GroupId)
            }
        },
        nodeClick (data, checked, node) {
            this.$refs.tree.setCheckedNodes([data])
        },
        async random () {
            let msg = await GetUserInfo()
            let group = await GetAllGroupList() 
            let arr = group.GroupInfoList
            this.options = arr
            this.Group = msg.Model.GroupName
            console.log(this.groupResult)
            this.userName = msg.Model.Name
            this.telephone = msg.Model.Tel
            this.workRanck = msg.Model.Business
            this.GroupId = msg.Model.GroupId
            this.email = msg.Model.Email
            if (msg.Model.Sex == '男') {
                this.radio = '男'
            } else if (msg.Model.Sex == '女') {
                this.radio = '女'
            }
        },
        async alertfor () {
            if (this.userName == '') {
                this.$message.error('请输入用户名')
            } else if (this.radio == '') {
                this.$message.error('请选择性别')
            } else if (this.GroupId == '') {
                this.$message.error('请选择所在镇区')
            } else if (this.telephone == '') {
                this.$message.error('请输入电话')
            } else if (this.workRanck == '') {
                this.$message.error('请输入工作职称')
            } else {
                let msg = await UpdateUserInfo({
                    Name: this.userName,
                    Tel: this.telephone,
                    Business: this.workRanck,
                    Email: this.email,
                    Sex: this.radio,
                    DepartmentId: this.GroupId
                })
                if (msg.Type == 1) {
                    this.$message.success('信息修改成功!')
                    this.$emit('makereload')
                    this.$router.push("/personalCenter")
                } else {
                    this.$message.error('信息修改失败!')
                }
            }
        }
    }
}
</script>

<style lang="scss">
.per_inforfix{
    .per_inforfixhead{
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
    .per_inforfixbody{
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
                text-align: right;
                padding-bottom:16px;
                input[type="text"]{
                    width:260px;
                    height:34px;
                    border:1px solid #efefef;
                    padding: 0 30px 0 10px;
                    box-sizing: border-box;
                    &:focus{
                        border:1px solid #368474;
                    }
                }
                .per_checkSex{
                    text-align: left;
                    display: inline-block;
                    width:257px;
                    height:34px;
                    line-height: 34px;
                }
                &:last-of-type{
                    text-align: center; 
                    button{
                        width:296px;
                        height:48px;
                        border:none;
                        border-radius: 48px;
                        color:#fff;
                        background:#368474;
                        font-weight: bold;
                        background:linear-gradient(to right,#368474,#4dbe7a);
                        margin-top:14px;
                        cursor:pointer;
                    }
                }
                .per_special{
                    color:#f00;
                    margin-right:8px;
                    font-size: 16px;
                    position: relative;
                    top:4px;
                }
            }
        }
    }
}
.el-select{
    .el-input__icon{
        line-height: 34px;
    }
}
.el-popper{
    .el-cascader-panel{
        .el-scrollbar{
            .el-scrollbar__wrap {
                overflow-x:hidden;
                .el-scrollbar__view{
                    height:200px;
                }
            }
        }
    }
}
</style>
