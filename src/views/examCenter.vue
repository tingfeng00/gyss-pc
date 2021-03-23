<template>
    <div class="examCenter">
        <header-fix :active-index="headerIndex"></header-fix>
            <div class="exam-center-img">
                <img src="../assets/exam-banner.png"/>
            </div>
            <div class="main clearfix">
                <div class="pc-left l">
                    <div class="pc-left1">
                        <menu-list
                            :menu-icon="menuIcon"
                            :menu-list-title="menuListTitle"
                            :menu-data="menuData"
                            :sort-title="sortTitle"
                            :menu-list-show="menuListShow"
                            :go-menu-list="goMenuList"
                        ></menu-list>
                    </div>
                    <div class="pc-left2">
                        <el-tabs v-model="examSource">
                            <el-tab-pane label="最新考试" name="first">
                                <div class="pc-left2-con">
                                    <ul>
                                        <li class="on" v-for="(item, index) in newsExams" :key="index" @click="startExam(item.Id)">
                                            <div class="exam-lm-outerside">
                                                <div class="exam-lm-img"></div>
                                            </div>
                                            <div class="exam-lm-text">
                                                <div class="name" v-text="item.Name"></div>
                                                <div class="content clearfix">
                                                    <p class="classify l">类别:<span v-text="item.ExamType == undefined ? '无' : item.ExamType"></span></p>
                                                    <p class="time r" v-text="item.StartTime"></p>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="热点考试" name="second">
                                <div class="pc-left2-con">
                                    <ul>
                                        <li v-for="(item, index) in examHotList" :key="index" @click="startExam(item.Id)">
                                            <div class="exam-lm-outerside">
                                                <div class="exam-lm-img"></div>
                                            </div>
                                            <div class="exam-lm-text">
                                                <div class="name" v-text="item.Name"></div>
                                                <div class="content clearfix">
                                                    <p class="classify l">类别:<span v-text="item.ExamType == undefined ? '无' : item.ExamType"></span></p>
                                                    <p class="time r" v-text="item.StartTime"></p>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </el-tab-pane>
                        </el-tabs>
                    </div>
                </div>
                <div class="pc-right r">
                    <div class="exam-title clearfix">
                        <div class="exam-title1 l">
                            职技考试
                        </div>
                        <div class="exam-title2 r">
                            <div class="exam-title2-check l">
                                <el-select v-model="selectOptionsValue" placeholder="请选择">
                                    <el-option
                                    v-for="item in menuData"
                                    :key="item.value"
                                    :label="item.Name"
                                    :value="item.Id">
                                    </el-option>
                                </el-select>
                            </div>
                            <input type="text" name="" id="" value="" placeholder="输入要考试名称" v-model="examName">
                            <span @click="search()"><img src="../assets/glass.png"></span>
                        </div>
                    </div>
                    <div class="exam-con">
                        <table>
                            <thead>
                                <tr>
                                    <th class="exam-center-code">编号</th>
                                    <th class="exam-center-name">考试名称</th>
                                    <th class="exam-center-type">类别</th>
                                    <th class="exam-center-time">考试时间</th>
                                    <th class="exam-center-score">学分</th>
                                    <th class="exam-center-control">操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in textList" :key="index">
                                    <th v-text="(currentPage - 1) * rows + index + 1"></th>
                                    <th v-text="item.Name"></th>
                                    <th v-text="item.ExamType == undefined ? '无' : item.ExamType"></th>
                                    <th v-text="item.Time"></th>
                                    <th v-text="item.CreditHour"></th>
                                    <th>
                                        <button @click="startExam(item.Id)">开始考试</button>
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                        <div class="exam-con-hf clearfix">
                            <div class="exam-con-hf2 r">
                                <el-pagination
                                    background
                                    :current-page.sync="currentPage"
                                    @current-change="currentChange()"
                                    layout="prev, pager, next"
                                    :total="totalPage">
                                </el-pagination>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        <footer-fix></footer-fix>
    </div>
</template>

<script>
// import Vue from 'vue'
// import { Select, Button, Pagination } from 'element-ui'
import examIcon from '../assets/exam-icon.png'
import { ExamCenter, GetExamType } from '../service/getData'
// Vue.use(Select)
// Vue.use(Button)
// Vue.use(Pagination)

export default {
    data () {
        return {
            headerIndex: '5',
            menuListTitle: '考试中心',
            menuData: [],
            examSource: 'first',
            examName: '',
            examType: '',
            textList: [],
            newsExams: [],
            menuIcon: examIcon,
            selectOptionsValue: '',
            menuListShow: true,
            sortTitle: false,
            examHotList: [],
            currentPage: 1,
            totalPage: 0,
            rows: 11
        }
    },
    created () {
        this.random()
    },
    methods: {
        goMenuList (item, menu) {
            menu.forEach((itemS) => {
                this.$set(itemS, 'isClick', false)
            })
            this.$set(item, 'isClick', true)
            this.random(item.Id)
        },
        startExam (index) {
            const { href } = this.$router.resolve({ path: 'examInfor', query: { Id: index } })
            window.open(href, '_blank')
        },
        defineTotalPage (Obj) {
            // eslint-disable-next-line
            let Count = Obj ? Obj : 0
            let Rows = this.rows
            if (Count % Rows != 0) {
                let Page = (((Count - Count % Rows) / Rows) + 1) * 10
                return Page
            } else {
                let Page = (Count / Rows) * 10
                return Page
            }
        },
        async random (type) {
            let msg = null
            if (type != undefined) {
                this.examType = type
                msg = await ExamCenter({
                    ExamTypeId: type,
                    examType: 'All',
                    Sort: 'Id',
                    Order: 'desc',
                    Page: 1,
                    Rows: this.rows
                })
            } else {
                msg = await ExamCenter({
                    examType: 'All',
                    Sort: 'Id',
                    Order: 'desc',
                    Page: 1,
                    Rows: this.rows
                })
                let news = await ExamCenter({
                    examType: 'All',
                    Sort: 'Id',
                    Order: 'desc',
                    Page: 1,
                    Rows: 4
                })
                let type = await GetExamType({})
                this.newsExams = news.Data.ExamAllModel

                this.menuData = type.Data
                this.newsExams.forEach((item, index) => {
                    item.StartTime = item.StartTime.substr(0, 10)
                })
            }
            let newsInfor = await ExamCenter({
                examType: 'All',
                ExamTypeId: 6,
                Sort: 'StartTime',
                Order: 'desc',
                Page: 1,
                Rows: this.rows
            })
            this.textList = msg.Data.ExamAllModel
            this.examHotList = newsInfor.Data.ExamAllModel
            // console.log(this.menuData)
            this.examHotList.forEach(item => {
                item.StartTime = item.StartTime.substr(0, 10)
            })
            this.textList.forEach((item, index) => {
                item.Time = item.StartTime.substr(0, 10)
            })
            this.currentPage = 1
            this.totalPage = this.defineTotalPage(msg.Data.ExamAllCount)
        },
        async currentChange () {
            if (this.examType != undefined && this.examName == undefined) {
                let msg = await ExamCenter({
                    examType: 'All',
                    Sort: 'Id',
                    Order: 'desc',
                    ExamTypeId: this.examType,
                    Page: this.currentPage,
                    Rows: this.rows
                })
                this.textList = msg.Data.ExamAllModel
                this.textList.forEach((item, index) => {
                    item.Time = item.StartTime.substr(0, 10)
                })
            } else if (this.examName != undefined && this.examType == undefined) {
                console.log(111)
                let msg = await ExamCenter({
                    examType: 'All',
                    Sort: 'Id',
                    Order: 'desc',
                    Page: this.currentPage,
                    title: this.examName,
                    Rows: this.rows
                })
                this.textList = msg.Data.ExamAllModel
                this.textList.forEach((item, index) => {
                    item.Time = item.StartTime.substr(0, 10)
                })
            } else if (this.examName != undefined && this.examType != undefined) {
                let msg = await ExamCenter({
                    examType: 'All',
                    Sort: 'Id',
                    Order: 'desc',
                    Page: this.currentPage,
                    title: this.examName,
                    Rows: this.rows
                })
                console.log(msg)
                this.textList = msg.Data.ExamAllModel
                this.textList.forEach((item, index) => {
                    item.Time = item.StartTime.substr(0, 10)
                })
            } else {
                let msg = await ExamCenter({
                    examType: 'All',
                    Sort: 'Id',
                    Order: 'desc',
                    Page: this.currentPage,
                    Rows: this.rows
                })
                this.textList = msg.Data.ExamAllModel
                this.textList.forEach((item, index) => {
                    item.Time = item.StartTime.substr(0, 10)
                })
            }
        },
        async search () {
            let msg = null
            console.log(this.selectOptionsValue)
            if (this.selectOptionsValue == '') {
                msg = await ExamCenter({
                    title: this.examName,
                    examType: "All",
                    ExamTypeId: 0,
                    Sort: "id",
                    Order: "desc",
                    Page: 1,
                    Rows: this.rows
                })
            } else if (this.examName == '') {
                msg = await ExamCenter({
                    title: '',
                    examType: "All",
                    ExamTypeId: this.selectOptionsValue,
                    Sort: "id",
                    Order: "desc",
                    Page: 1,
                    Rows: this.rows
                })
            } else {
                msg = await ExamCenter({
                    title: this.examName,
                    examType: "All",
                    ExamTypeId: this.selectOptionsValue,
                    Sort: "id",
                    Order: "desc",
                    Page: 1,
                    Rows: this.rows
                })
            }
            console.log(msg)
            this.textList = msg.Data.ExamAllModel
            this.textList.forEach((item, index) => {
                item.Time = item.StartTime.substr(0, 10)
            })
            this.currentPage = 1
            this.totalPage = this.defineTotalPage(msg.Data.ExamAllCount)
        }
    }
}
</script>

<style lang="scss" rel="stylesheet/scss">
    @import "../style/mixin";
    .examCenter{
        width: 100%;
        .exam-center-img{
            width: 100%;
            display: block;
            img{
                width:100%;
                min-width: 1349px;
            }
        }
        .main{
            width: 1200px;
            margin: 20px auto 0;
            .pc-left{
                width: 276px;
                .pc-left1{
                    width: 100%;
                    background: #fff;
                    padding-bottom: 50px;
                }
                .pc-left2{
                    width: 100%;
                    margin-top: 15px;
                    background: #fff;
                    border-top: 1px solid #fff;
                    padding-bottom: 35px;
                    .el-tabs{
                        margin-top: 10px;
                        .el-tabs__header{
                            .el-tabs__nav{
                               left:48px;
                                .el-tabs__active-bar{
                                    display:none;
                                }
                                .el-tabs__item{
                                    width: 80px;
                                    height: 30px;
                                    text-align: center;
                                    line-height: 30px;
                                    background: #f4f4f4;
                                    border-radius:5px;
                                    margin-right: 10px;
                                    color: #555;
                                    padding: 0 0;
                                    &.is-active{
                                        color: #fff;
                                        background: url(../assets/exam-tbg1.png) no-repeat;
                                        &:hover{
                                            color: #fff;
                                        }
                                    }
                                    &:hover{
                                        color: #555;
                                    }
                                }
                            }
                            .el-tabs__nav-wrap{
                                &::after{
                                    background-color:#fff;
                                }
                            }
                        }
                        .el-tabs__content{
                            .pc-left2-con{
                                width: 240px;
                                margin: 0 auto;
                                ul{
                                    li{
                                        border-bottom: 1px dashed #dfdfdf;
                                        padding: 15px 0;
                                        @extend %clearFix;
                                        cursor: pointer;
                                        .exam-lm-outerside{
                                            float:left;
                                            height:37px;
                                            width:27px;
                                            position: relative;
                                        }
                                        .exam-lm-img{
                                            width: 27px;
                                            height: 25px;                                            
                                            background: url('../assets/paper1.png');
                                            position: absolute;
                                            top:50%;
                                            margin-top:-12px;
                                        }
                                        .exam-lm-text{
                                            float: left;
                                            width: 200px;
                                            margin-left: 8px;
                                            .name{
                                                line-height: 21px;
                                                color: #555;
                                            }
                                            .content{
                                                color: #999;
                                                font-size: 12px;
                                            }
                                        }
                                        &:hover{
                                            .exam-lm-img{
                                                background: url('../assets/paper2.png');
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    .pc-left2-bottom{
                        width: 240px;
                        margin: 0 auto;
                        margin-top: 10px;
                        cursor: pointer;
                        p{
                            float: right;
                            img{
                                vertical-align: middle;
                                margin-right: 10px;
                            }
                        }
                    }
                }
            }
            .pc-right{
                width: 905px;
                background: #fff;
                .exam-title{
                    height: 65px;
                    line-height: 65px;
                    .exam-title1{
                        font-size: 20px;
                        font-weight: bold;
                        color: #555;
                        text-indent: 20px;
                    }
                    .exam-title2 {
                        width: 315px;
                        height: 34px;
                        line-height: 34px;
                        border-radius: 5px;
                        border: 1px solid #dddddd;
                        margin-right: 20px;
                        margin-top: 20px;
                        .el-input{
                            width:95px;
                        }
                        .exam-title2-check {
                            .el-select {
                                .el-input__inner{
                                    width: 66px;
                                    height:34px;
                                    line-height: 34px;
                                    text-align: center;
                                    border: none;
                                    padding: 0;
                                }
                                .el-input__suffix{
                                    .el-select__caret{
                                        line-height: 34px;
                                    }
                                }
                            }
                        }
                        input {
                            width: 180px;
                            height: 34px;
                            line-height: 34px;
                            border-left: 1px solid #dddddd;
                            border-right: 1px solid #dddddd;
                            text-indent: 10px;
                        }
                        span {
                            img{
                                vertical-align: middle;
                                margin-left: 8px;
                                cursor: pointer;
                            }
                        }
                    }
                }
                .exam-con{
                    width: 100%;
                    border-bottom: 1px solid #e8e8e8;
                    padding-bottom: 20px;
                    table{
                        border: none;
                        width: 850px;
                        margin: 0 auto;
                        thead{
                            tr{
                                background: #f5f5f5;
                                color: #555;
                                font-weight: bold;
                                height: 40px;
                                .exam-center-code{
                                    width:45px;
                                }
                                .exam-center-name{
                                    width:338px;
                                }
                                .exam-center-type{
                                    width:90px;
                                }
                                .exam-center-time{
                                    width:192px;
                                }
                                .exam-center-score{
                                    width:45px;
                                }
                                .exam-center-control{
                                    width:140px;
                                }
                            }
                        }
                        tbody{
                            tr{
                                height: 58px;
                                border-bottom: 1px solid #dfdfdf;
                                color: #555;
                                &:last-of-type{
                                    border-bottom: 0px;
                                }
                                th{
                                    font-weight: normal;
                                    position: relative;
                                    label{
                                        .hidden-input {
                                            opacity: 0;
                                            position: absolute;
                                            z-index: -1;
                                            height: 16px;
                                            width: 16px;
                                            top: 20px;
                                        }
                                        .option{
                                            input[type=checkbox]+span{
                                                display: inline-block;
                                                height: 14px;
                                                width: 14px;
                                                background-color: #f4f4f4;
                                                border: 1px solid #e4e4e4;
                                                margin-right: 9px;
                                                vertical-align: middle;
                                            }
                                            input[type=checkbox]:checked+span {
                                                background:#638be8 url(../assets/qs_dhg.png) no-repeat 1px 2px;
                                                border: 1px solid #3f68d4;
                                            }
                                        }
                                    }
                                    button{
                                        width: 86px;
                                        height: 32px;
                                        background:none;
                                        border:0px;
                                        border-radius: 3px;
                                        cursor: pointer;
                                        &:hover{
                                            background:#079dff;
                                            background:linear-gradient(to right, #079dff, #4ad4fb);
                                            color:#fff;
                                        }
                                    }
                                    
                                }
                                img{
                                    margin-right: 3px;
                                }
                                 a {
                                    color: #368474;
                                    font-size: 14px;
                                    font-weight: bold;
                                    width: 86px;
                                }
                            }
                        }
                    }
                    .exam-con-hf {
                        width: 100%;
                        border-top: 1px solid #e8e8e8;
                        padding-top: 20px;
                        .exam-con-hf1 {
                            margin-left: 40px;
                            .checkAll {
                                height: 28px;
                                line-height: 28px;
                                position: relative;
                                label{
                                    .hidden-input {
                                        opacity: 0;
                                        position: absolute;
                                        z-index: -1;
                                        height: 16px;
                                        width: 16px;
                                        top: 20px;
                                    }
                                    .option{
                                        input[type=checkbox]+span{
                                            display: inline-block;
                                            height: 14px;
                                            width: 14px;
                                            background-color: #f4f4f4;
                                            border: 1px solid #e4e4e4;
                                            margin-right: 9px;
                                            vertical-align: middle;
                                        }
                                        input[type=checkbox]:checked+span {
                                            background:#638be8 url(../assets/qs_dhg.png) no-repeat 1px 2px;
                                            border: 1px solid #3f68d4;
                                        }
                                    }
                                }
                            }
                            .delete {
                                margin-left: 15px;
                                width: 56px;
                                height: 27px;
                                line-height: 27px;
                                background:#368474;
                                color: #fff;
                                border-radius: 5px;
                                box-sizing: content-box;
                                padding: 0;
                            }
                        }
                        .exam-con-hf2{
                            margin-right: 100px;
                        }
                    }
                }
            }
        }
    }
</style>
