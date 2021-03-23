<template>
    <div class="trainClassDetail">
        <header-fix :active-index="headerIndex"></header-fix>
        <div class="banner">
            <img src="../assets/trainBanner.png" alt="">
        </div>
        <div class="wrapper">
            <div class="brief clearfix">
                <div class="face l">
                     <error-img :src="classInfo.Image"></error-img>
                </div>
                <div class="text l">
                    <h4>{{classInfo.SchoolName}}简介</h4>
                    <div class="con clearfix">
                        <div class="hd l">
                            学校简介
                        </div>
                        <div class="bd l">
                            {{classInfo.SchoolDesc || '暂无简介'}}
                        </div>
                    </div>
                </div>
            </div>
            <div class="class-info">
                <div class="title">
                    教学班信息
                </div>
                <table>
                    <tr>
                        <th>所属学校名称</th>
                        <th>{{classInfo.SchoolName}}</th>
                        <th>所属专业</th>
                        <th>{{classInfo.TrainingTypeName}}</th>
                    </tr>
                    <tr>
                        <th>班级名称</th>
                        <th>{{classInfo.Name}}</th>
                        <th>任教老师</th>
                        <th>{{classInfo.TeacherName}}</th>
                    </tr>
                    <tr>
                        <th>开课时间</th>
                        <th>{{classInfo.StartDate | dateFilter('yyyy-MM-dd')}} ~ {{classInfo.EndDate | dateFilter('yyyy-MM-dd')}}</th>
                        <th>上课地点</th>
                        <th>{{classInfo.Address}}</th>
                    </tr>
                    <tr>
                        <th>上课时间</th>
                        <th>{{classInfo.ClassTime}}</th>
                        <th>剩余名额</th>
                        <th>{{classInfo.LastCount}}</th>
                    </tr>
                    <tr>
                        <th>操作</th>
                        <th colspan="3">
                            <p class="signInfo" @click="innerVisible = true" v-if="classInfo.ApplyStatus == 'UnAudit'">报名</p>
                            <p v-if="classInfo.ApplyStatus == 'Normal'">已报名</p>
                            <p v-if="classInfo.ApplyStatus == 'UnApprove'">审核未通过</p>
                            <p v-else>未报名</p>
                        </th>
                        <!-- /已报名 -->
                    </tr>
                </table>
            </div>
            <div class="class-brief">
                <div class="title">
                    教学班简介
                </div>
                <div class="text" v-html="classInfo.ClassDescription">
                    
                </div>
            </div>
        </div>
        <el-dialog
            width="600px"
            :visible.sync="innerVisible"
            class="dialog1"
        >
            <div class="sign-info">
                <div class="course-info clearfix">
                    <div class="title l">
                        课程信息
                    </div>
                    <div class="con l">
                        <ul>
                            <li><span>【{{classInfo.SchoolName}} - {{classInfo.TrainingTypeName}}】</span>{{classInfo.Name}}</li>
                        </ul>
                    </div>
                </div>
                <div class="person-info clearfix">
                    <div class="title">
                        个人信息
                    </div>
                    <div class="con">
                        <ul>
                            <li>姓名<span>{{userInfo.Name}}</span></li>
                            <li>账号<span>{{userInfo.Account}}</span></li>
                            <li>手机号<span>{{userInfo.Mobile}}</span></li>
                            <li>身份证<span>{{userInfo.IdCard}}</span></li>
                            <li>邮箱<span>{{userInfo.Email}}</span></li>
                            <li>出生日期<span>{{userInfo.Birthday | dateFilter3('yyyy-MM-dd') }}</span></li>
                        </ul>
                    </div>
                </div>
                <div class="tip">
                    您已经报名成功！
                    <!-- 温馨提示：报名信息可点击<a href="javascript:;">"我的班级"</a>按钮，进入个人中心查看！ -->
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="innerVisible = false, innerVisible2 = true">确 定</el-button>
                <el-button @click="innerVisible = false">取 消</el-button>
            </span>
        </el-dialog>
        <el-dialog
            width="400px"
            :visible.sync="innerVisible2"
            class="dialog2"
        >
            <div class="sign-suc clearfix">
                <img src="../assets/close-w.png" alt="" class="close" @click="innerVisible2 = false">
                <img src="../assets/sign-success.png" alt="" class="success-img">
                <div class="con l">
                    <h5>报名成功!</h5>
                    <div class="text">
                        <!-- 你的报名信息可在个人中心查看<a href="javascript:;">去查看>></a>  -->
                        恭喜您!
                    </div>
                </div>
            </div>
        </el-dialog>
        <footer-fix></footer-fix>
    </div>
</template>

<script>
import { GetTrainingById } from '../service/getData'
import { mapActions, mapState } from 'vuex'
export default {
    data () {
        return {
            headerIndex: '8',
            innerVisible: false,
            innerVisible2: false,
            classInfo: '',
            id: ''
        }
    },
    created () {
        this.id = this.$route.query.id
        this.getUserInformation()
    },
    computed: {
        ...mapState(['userAgent', 'userInfo'])
    },
    mounted () {
        this.getTrainingById()
    },
    methods: {
        ...mapActions(['getUserInformation', 'saveUserInfo']),
        async getTrainingById () {
            let arr = []
            arr.push(this.id)
            let data = await GetTrainingById({ ids: arr })
            if (data.IsSuccess) {
                this.classInfo = data.Data[0]
            }
        }
    }
}
</script>

<style lang="scss" rel="stylesheet/scss">
    @import "../style/mixin";
    .trainClassDetail{
        background: url("../assets/body-bg.png") no-repeat;
        .banner{
            width: 1200px;
            margin: 0 auto;
            height: 200px;
            img{
                width: 100%;
                height: 200px;
            }
        }
        .wrapper{
            width: 1200px;
            margin: 0 auto;
            .brief{
                width: 1140px;
                margin: 60px auto 0;
                .face{
                    width: 353px;
                    height: 180px;
                    border: 6px solid #e7e7e7;
                    img{
                        width: 353px;
                        height: 180px;
                    }
                }
                .text{
                    width: 745px;
                    margin-left: 15px;
                    margin-top: 15px;
                    h4{
                        height: 21px;
                        line-height: 21px;
                        color: #333;
                        font-size: 21px;
                        margin: 0;
                    }
                    .con{
                        margin-top: 15px;
                        .hd{
                            width: 56px;
                            font-size: 14px;
                            color: #999;
                            margin-right: 10px;
                            line-height: 26px;
                        }
                        .bd{
                            width: 675px;
                            color: #555;
                            line-height: 26px;
                        }
                    }
                }
            }
            .class-info{
                margin-top: 35px;
                margin-left: 30px;
                .title{
                    width: 118px;
                    height: 29px;
                    line-height: 29px;
                    background: url("../assets/message-tbg2.png") no-repeat;
                    color: #fff;
                    text-indent: 10px;
                }
                table{
                    table-layout: fixed;
                    border-collapse: collapse;
                    margin-top: 20px;
                    font-weight: normal;
                    tr{
                        th{
                            border: 1px solid #e5dbd9;
                            &:nth-child(2n-1) {
                                width: 143px;
                                height: 39px;
                                font-weight: bold;
                                font-size: 14px;
                                color: #555;
                            }
                            &:nth-child(2n) {
                                width: 424px;
                                height: 39px;
                                color: #333;
                                text-align: left;
                                text-indent: 20px;
                                font-weight: normal;
                                p{
                                    &.signInfo{
                                        height: 30px;
                                        line-height: 30px;
                                        width: 62px;
                                        text-align: center;
                                        color: #fff;
                                        text-indent: 0;
                                        background: linear-gradient(to right, #368474 , #4dbe7a);
                                        margin-left: 20px;
                                        border-radius: 5px;
                                        cursor: pointer;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            .class-brief{
                margin-top: 35px;
                margin-left: 30px;
                background: #f6f6f6;
                padding: 20px 0;
                width: 1140px;
                .title{
                    width: 118px;
                    height: 29px;
                    line-height: 29px;
                    background: url("../assets/message-tbg2.png") no-repeat;
                    color: #fff;
                    text-indent: 10px;
                    margin-left: 20px;
                }
                .text{
                    margin-left: 20px;
                    margin-top: 15px;
                    line-height: 28px;
                    width: 1100px;
                }
            }
        }
        .dialog1{
            .el-dialog__header{
                display: none;
            }
            .el-dialog__body{
                padding: 0 0px;
                .sign-info{
                    .course-info{
                        padding: 30px 0;
                        background: #3c7ef0;
                        .title{
                            width: 120px;
                            height: 40px;
                            font-size: 16px;
                            font-weight: bold;
                            line-height: 40px;
                            background: linear-gradient(to right, #079dfa , #49d4fb);
                            color: #fff;
                            text-indent: 30px;
                            border-radius: 0 20px 20px 0px;
                        }
                        .con{
                            margin-left: 20px;
                            ul{
                                li{
                                    color: #ffd800;
                                    margin-bottom: 15px;
                                    font-size: 16px;
                                    span{
                                        color: #fff;
                                    }
                                }
                            }
                        }
                    }
                    .person-info{
                        margin-top: 30px;
                        .title{
                            width: 120px;
                            height: 40px;
                            font-size: 16px;
                            font-weight: bold;
                            line-height: 40px;
                            background: linear-gradient(to right, #f3a725 , #fddb2e);
                            color: #fff;
                            text-indent: 30px;
                            border-radius: 0 20px 20px 0px;
                        }
                        .con{
                            ul{
                                @extend %clearFix;
                                li{
                                    width: 268px;
                                    height: 54px;
                                    line-height: 54px;
                                    background: #f4f4f4;
                                    float: left;
                                    margin-left: 20px;
                                    margin-top: 30px;
                                    border: 1px solid #eeeeee;
                                    border-radius: 5px;
                                    text-indent: 20px;
                                    span{
                                        color: #368474;
                                        margin-left: 15px;
                                    }
                                }
                            }
                        }
                    }
                    .tip{
                        margin-left: 20px;
                        margin-top: 15px;
                        a{
                            color: #e94445;
                        }
                    }
                }
            }
            .el-dialog__footer{
                margin-top: 20px;
                .el-button--primary{
                    background: linear-gradient(to right, #57d7fb, #1ba5fa);
                    border: none;
                    border-radius: 18px;
                    padding: 12px 30px;
                    font-weight: bold;
                    font-size: 16px;
                }
                .el-button--default{
                    border: none;
                    border-radius: 18px;
                    padding: 12px 30px;
                    font-weight: bold;
                    font-size: 16px;
                }
            }
        }
        .dialog2{
            .el-dialog{
                border-top: 4px solid #f4aa26;
                .el-dialog__header{
                    display: none;
                }
                .sign-suc{
                    position: relative;
                    .close{
                        width: 36px;
                        height: 37px;
                        position: absolute;
                        top:-48px;
                        right: -38px;
                        cursor: pointer;
                    }
                    .success-img{
                        float: left;
                        margin-left: 40px;
                    }
                    .con{
                        width: 170px;
                        margin-left: 24px;
                        h5{
                            margin: 0;
                            font-size: 20px;
                            color: #555;
                            font-weight: bold;
                        }
                        .text{
                            margin-top: 10px;
                            line-height: 24px;
                            a{
                                color: #e94445;
                                margin-left: 5px;
                            }
                        }
                    }
                }
            }
        }
    }
</style>
