<template>
    <div class="trainClass">
        <header-fix :active-index="headerIndex"></header-fix>
        <!-- banner -->
        <div class="banner">
            <img src="../assets/trainBanner.png" alt="">
        </div>
        <div class="wrapper">
            <search-key 
                :title-name="titleName" 
                :search="clickSearch"
                :current-value="keyWord"
                @getKey="getKeyWord"
                @startDate="getStartDate"
                @endDate="getEndDate"
            ></search-key>
            <div class="gurd-data">
                <div class="gt-list clearfix">
                    <div class="gt-list-title l">
                        学校:
                    </div>
                    <ul class="l clearfix">
                        <li v-for="item in schoolList" :key="item.id" @click="schoolSearch(item, schoolList)"><p :class="{active:item.isClick}">{{item.text}}</p></li>
                    </ul>
                </div>
                <div class="gt-list2 clearfix">
                    <div class="gt-list-title l">
                        专业:
                    </div>
                    <ul class="l clearfix">
                        <li v-for="item in majorList" :key="item.id" @click="majorSearch(item, majorList)" >
                            <p :class="{active:item.isClick}">{{item.text}}</p>
                            <img src="../assets/hot-train-icon.png" alt="" class="hot-img" v-if="item.Type == 'Hot'">
                        </li>
                    </ul>
                </div>
            </div>
            <div class="data-table">
                <table v-if="this.classList.length > 0">
                    <thead>
                        <tr>
                            <th width="44">
                                <img src="../assets/per-square.png" alt="">
                            </th>
                            <th width="270">班级名称</th>
                            <th width="150">任教老师</th>
                            <th width="206">开课时间</th>
                            <th width="186">上课地点</th>
                            <th width="96">剩余名额</th>
                            <th width="90">详情</th>
                            <th width="98">操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in classList" :key="item.id">
                            <th >
                                <img
                                    src="../assets/per-checkout.png"
                                    @click="checkjugment(index)"
                                    v-show="jugement[index] == 0 ? true : false"
                                    alt
                                />
                                <img
                                    src="../assets/per-check.png"
                                    @click="checkjugment(index)"
                                    v-show="jugement[index] == 1 ? true : false"
                                    alt
                                />
                            </th>
                            <th>{{item.Name}}</th>
                            <th>{{item.TeacherName}}</th>
                            <th>{{item.StartTime | dateFilter('yyyy-MM-dd')}}~{{item.EndTime | dateFilter('yyyy-MM-dd')}}</th>
                            <th>{{item.Address}}</th>
                            <th><span class="reNum">{{item.UserLimit - item.CurrentUser}}</span>/{{item.UserLimit}}</th>
                            <th>
                                <router-link target="_blank" :to="{path: '/trainClassDetail', query:{id: item.Id}}" class="watch"> 
                                    查看
                                </router-link>
                            </th>
                            <th>
                                <p v-if="item.ApplyStatus == '' && item.UserLimit > item.CurrentUser" @click="batchReg2(item)"><a href="javascript:;" class="sign-btn">报名</a></p>
                                <p v-if="item.ApplyStatus == 'Normal'"><span>已报名</span></p>
                                <p v-if="item.ApplyStatus == 'UnAudit'"><span>未审核</span></p>
                                <p 
                                    v-if="item.UserLimit == item.CurrentUser && item.ApplyStatus == ''"
                                    @mousemove="item.tipShow = true"
                                    @mouseleave="item.tipShow = false"
                                >
                                    <span>已满员</span>
                                    <span class="tip" v-if="item.ApplyStatus == 'Normal' && item.tipShow">已报名</span>
                                </p>
                                <p v-if="item.ApplyStatus == 'UnApprove'"><span>审核未通过</span></p>
                            </th>
                        </tr>
                    </tbody>
                </table>
                <p class="noData1" v-if="this.noData1 == true">暂无数据,请选择您的培训班</p>
                <div class="handle clearfix">
                    <div class="check l" @click="selectAll()">
                        <p><img src="../assets/per-checkout.png" alt ref="checkall" />全选</p>
                    </div>
                    <div class="batch-reg" @click="batchReg()">
                        批量报名
                    </div>
                    <div class="page l">
                        <el-pagination
                            background
                            :page-size="this.rows"
                            @current-change="handleCurrentChange"
                            layout="prev, pager, next"
                            :total="this.totalPageNumber"
                        >
                        </el-pagination>
                    </div>
                </div>
            </div>
        </div>
        <footer-fix></footer-fix>
    </div>
</template>

<script>
import Vue from 'vue'
import { formatDate } from '../plugins/utils'
import { Pagination, Message } from 'element-ui'
import { GetTrainingSchoolList, TrainingSign, GetTrainingClassTypeList, TrainingClass } from '../service/getData'
import { mapActions, mapState } from 'vuex'
Vue.use(Pagination)
export default {
    data () {
        return {
           headerIndex: '8',
           titleName: '班级名称',
           keyWord: '',
           mid: '0',
           sid: '0',
           rows: 12,
           totalPageNumber: 1,
           schoolList: [],
           majorList: [],
           classList: [],
           noData1: false,
           page: 1,
           jugement: [],
           checkAll: false
        }
    },
    created () {
        this.getUserInformation()
    },
    computed: {
        ...mapState(['userAgent', 'userInfo'])
    },
    mounted () {
        this.getTrainingSchoolList()
        this.getTrainingClassTypeList()
        this.getTrainingClass()
    },
    methods: {
        ...mapActions(['getUserInformation', 'saveUserInfo']),
        getEndDate (val) {
            this.endDate = formatDate(val, 'yyyy-MM-dd')
        },
        getStartDate (val) {
            this.startDate = formatDate(val, 'yyyy-MM-dd')
        },
        getKeyWord (val) {
            this.keyWord = val
        },
        clickSearch () {
            this.getTrainingClass()
        },
        handleCurrentChange (val) {
            this.page = val
            this.getCourseList()
        },
        // 学校列表
        async getTrainingSchoolList () {
            let data = await GetTrainingSchoolList({ Page: 1, Rows: 100, Sort: 'Id', Order: 'desc' }) 
            if (data.IsSuccess) {
                this.schoolList = data.Data.ListData
            }
        },
        async getTrainingClassTypeList () {
            let data = await GetTrainingClassTypeList({ Page: 1, Rows: 100, Sort: 'Id', Order: 'desc' })
            if (data.IsSuccess) {
                this.majorList = data.Data.ListData
            }
        },
        async getTrainingClass () {
            let data = await TrainingClass({
                SchoolId: this.sid,
                MajorId: this.mid,
                Start: this.startDate,
                End: this.endDate,
                Page: this.page,
                Rows: 12,
                Sort: 'Id',
                Order: 'desc',
                ClassName: this.keyWord
            })
            if (data.IsSuccess) {
                this.classList = data.Data.ListData
                this.totalPageNumber = Number(data.Data.totalCount)
                this.classList.forEach((item, index) => {
                    item.tipShow = false
                    return item
                })
                // eslint-disable-next-line
                this.noData1 = this.classList.length > 0 ? false : true
                // console.log(this.noData1, this.classList.length)
                if (this.classList.length > 0) {
                    this.jugement = []
                    for (let i = 0; i < this.classList.length; i++) {
                        this.jugement.push(0)
                    }
                }
            }
        },
        checkjugment (index) {
            if (this.jugement[index] == 0) {
                this.jugement.splice(index, 1, 1)
            } else {
                this.jugement.splice(index, 1, 0)
                if (this.checkAll == true) {
                    this.checkAll = false
                    this.$refs.checkall.src = require('../assets/per-checkout.png')
                }
            }
        },
        selectAll () {
            if (this.checkAll == false) {
                for (let i = 0; i < this.jugement.length; i++) {
                    this.jugement.splice(i, 1, 1)
                }
                this.checkAll = true
                this.$refs.checkall.src = require('../assets/per-check.png')
            } else {
                this.checkAll = false
                this.$refs.checkall.src = require('../assets/per-checkout.png')
            }
        },
        async batchReg () {
            let classIds = []
            this.jugement.forEach((item, index) => {
                if (item == 1) {
                    classIds.push(this.classList[index].Id)
                }
            })
            let data = await TrainingSign({
                TrainingId: classIds,
                Tel: this.userInfo.Mobile,
                IdCard: this.userInfo.IdCard
            })
            if (data.IsSuccess) {
                Message(data.Message)
            }
        },
        async batchReg2 (item) {
            let now = new Date().getTime()
            let signEndTime = new Date(item.SignEnd)
            let signStartTime = new Date(item.SignStartTime)
            if (now > signEndTime) {
                Message('报名已结束,请选择其他班级')
            } else if (signStartTime > now) {
                 Message('报名尚未开始')
            } else {
                let classIds = []
                classIds.push(item.Id)
                let data = await TrainingSign({
                    TrainingId: classIds,
                    Tel: this.userInfo.Mobile,
                    IdCard: this.userInfo.IdCard
                })
                if (data.IsSuccess) {
                    Message(data.Message)
                }
            }
        },
        schoolSearch (item, arr) {
            arr.forEach((itemS) => {
                this.$set(itemS, 'isClick', false)
            })
            this.$set(item, 'isClick', true)
            this.classList = []
            this.sid = item.id
            // console.log(this.sid)
            this.getTrainingClass()
        },
        majorSearch (item, arr) {
            arr.forEach((itemS) => {
                this.$set(itemS, 'isClick', false)
            })
            this.$set(item, 'isClick', true)
            this.classList = []
            this.mid = item.id
            this.getTrainingClass()
        }
    }
}
</script>

<style lang="scss" rel="stylesheet/scss">
    @import "../style/mixin";

    .trainClass{
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
            .searchKey{
                margin-top: 30px;
                .pc-key-show {
                    .key-show-title{
                        input{
                            width: 550px;
                        }
                    }
                }
            }
            .gurd-data{
                background: #ffffff;
                margin-top: 20px;
                .gt-list{
                    width: 1140px;
                    margin: 0 auto;
                    border-bottom: 1px dashed #e4e4e4;
                    padding: 20px 0;
                    .gt-list-title{
                        color: #999;
                        font-size: 16px;
                        margin-right: 15px;
                        height: 36px;
                        line-height: 36px;
                    }
                    ul{
                        width: 1085px;
                        li{
                            float: left;
                            p{
                                color: #555;
                                font-size: 16px;
                                padding: 0 15px;
                                height: 36px;
                                line-height: 36px;
                                border-radius: 5px;
                                cursor: pointer;
                                &:hover{
                                    background: linear-gradient(to right, #079dfa , #49d4fb);
                                    color: #fff;
                                }
                                &.active{
                                    background: linear-gradient(to right, #079dfa , #49d4fb);
                                    color: #fff;
                                }
                            }
                        }
                    }
                }
                .gt-list2{
                    width: 1140px;
                    margin: 0 auto;
                    padding: 20px 0;
                    .gt-list-title{
                        color: #999;
                        font-size: 16px;
                        margin-right: 15px;
                        height: 36px;
                        line-height: 36px;
                    }
                    ul{
                        width: 1085px;
                        li{
                            float: left;
                            position: relative;
                            p{
                                color: #555;
                                font-size: 16px;
                                padding: 0 15px;
                                height: 36px;
                                line-height: 36px;
                                border-radius: 5px;
                                cursor: pointer;
                                &:hover{
                                    color: #368474;
                                }
                                &.active{
                                    color: #368474;
                                }
                            }
                            .hot-img{
                                width: 42px;
                                height: 30px;
                                position: absolute;
                                top: -20px;
                                left: 50%;
                                margin-left: -21px; 
                            }
                        }
                    }
                }
            }
            .data-table{
                width: 100%;
                border-top: 1px solid #e4e4e4;
                background: #fff;
                table{
                    width: 1140px;
                    margin: 25px auto 0;
                    table-layout: fixed;
                    font-weight: normal;
                    thead{
                        tr{
                            background: #f5f5f5;
                            th{
                                height: 40px;
                                line-height: 40px;
                                color: #555; 
                            }
                        }
                    }
                    tbody{
                        tr{
                            border-bottom: 1px dashed #e4e4e4;
                            th{
                                height: 60px;
                                line-height: 60px;
                                font-size: 14px;
                                color: #555;
                                font-weight: normal;
                                overflow: hidden;
                                white-space: nowrap;
                                text-overflow: ellipsis;
                                .reNum{
                                    color: #368474;
                                    font-weight: bold;
                                }
                                .watch{
                                    color:#ff9c08;
                                }
                                .sign-btn{
                                    color: #368474;
                                    font-weight: bold;
                                }
                                p{
                                    position: relative;
                                    span{
                                        font-weight: bold;
                                        color: #999;
                                        &.tip{
                                            position: absolute;
                                            top: 0;
                                            left: 66px;
                                            width: 60px;
                                            height: 24px;
                                            text-align: center;
                                            line-height: 24px!important;
                                            font-weight: normal;
                                            border: 1px solid #e3e3e3;
                                            display: block;
                                            box-shadow: inset 0px 0px 3px #999;
                                        }
                                    }
                                }
                                &:nth-last-child(1){
                                    overflow: inherit
                                }
                            }
                        }
                    }
                }
                .handle{
                    margin-left: 40px;
                    margin-top: 25px;
                    padding-bottom: 25px;
                    .check{
                        height: 28px;
                        p{
                            margin-top: 4px;
                            img{
                                margin-right: 12px;
                            }
                        }
                    }
                    .batch-reg{
                        float: left;
                        width: 84px;
                        height: 28px;
                        text-align: center;
                        background:#368474;
                        color: #fff;
                        line-height: 28px;
                        border-radius: 5px;
                        margin-left: 16px;
                        cursor: pointer;
                    }
                    .page{
                        margin-left: 290px;
                        .el-pagination.is-background{
                            .el-pager{
                                li{
                                    &.active{
                                        background: #368474!important;
                                    }
                                }
                            }
                        }
                    }
                }
                .noData1{
                    text-align: center;
                    font-size: 16px;
                    padding: 20px 0;
                }
            }
        }
    }
</style>
