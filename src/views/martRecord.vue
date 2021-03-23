<template>

    <div class="martRecord">
        <header-fix :active-index="headerIndex"></header-fix>
            <div class="mart-nav">
                <div class="mw-position clearfix">
                    <p class="text l">您所在的位置:</p>
                    <el-breadcrumb separator-class="el-icon-arrow-right">
                        <el-breadcrumb-item :to="{ path: '/' }"><img src="../assets/home.png" alt="">首页</el-breadcrumb-item>
                        <el-breadcrumb-item :to="{ path: '/martCenter' }">积分商城</el-breadcrumb-item>
                        <el-breadcrumb-item>兑换记录</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
            </div>
        <div class="mall_record_container">
            <div class="module_title">
                <span class="module_name">兑换记录</span>
            </div>

            <ul class="record_list">
                <li class="title_bar list">
                    <span class="list1-5 text-center">订单编号</span>
                    <span class="list1 text-center list18">商品名称</span>
                    <span class="list0-75 text-center">消耗积分</span>
                    <span class="list1 text-center">领取方式</span>
                    <!-- <span class="list2 text-center">查看详情</span> -->
                    <span class="list1 text-center">订单状态</span>
                    <span class="list1-5 text-center">备注</span>
                    <span class="list1 text-center">兑换时间</span>
                </li>
                <li class="record_item list" v-for="item in recordList" :key="item.Id">
                    <span class="list1-5 text-center">{{item.RecordNo}}</span>
                    <span class="list1 list18 text-center">
                    <router-link to="{path: '/martDetail', query:{Id: item.ProductId}" target="_blank">{{item.ProductName || '无'}}</router-link>
                    </span>
                    <span class="list0-75 text-center">-{{item.Credit}}/分</span>
                    <span class="list1 text-center">{{item.ReceiveType || '暂无'}}</span>
                    <!-- <span class="list2 text-left text-center" ng-click="showTicketDetail(item.Id, 1)">点击查看详情</span> -->
                    <span class="list1 text-center">{{item.Status}}</span>
                    <span class="list1-5 text-center">{{item.Remark || '无'}}</span>
                    <span class="list1 text-center">{{item.CreateDate.substr(0, 10)}}</span>
                </li>
            </ul>
            <div class="pagination-container text-center ">
                <el-pagination
                    background
                    :current-page.sync="currentPage"
                    layout="prev, pager, next"
                    :page-size="10"
                    @current-change="handleCurrentChange"
                    :total="this.totalPageNumber"
                    >
                </el-pagination>
            </div>
        </div>
        <!-- <div class="modal fade ticketListModel" tabindex="-1" role="dialog" style="display:none;">
            <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                    aria-hidden="true">X</span></button>
                <h4 class="modal-title">代金券详情</h4>
                </div>
                <div class="modal-body">
                    <table>
                    <thead>
                        <tr>
                        <th width="33%">卡号</th>
                        <th width="33%">卡密</th>
                        <th width="33%">过期时间</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr ng-repeat="item in ticketList">
                            <th>{{item.RecordNo}}</th>
                            <th>{{item.CardPwd}}</th>
                            <th>{{item.EndDate}}</th>
                        </tr>
                    </tbody>
                    </table>
                    
                </div>
            </div>
            </div>
        </div> -->
        <footer-fix></footer-fix>
    </div>
</template>

<script>
import { MyProductRecordList } from '../service/getData'
export default {
    data () {
        return {
            headerIndex: '9',
            recordList: [],
            ticketList: [],
            totalPageNumber: 0,
            page: 1,
            currentPage: 1
        }
    },
    mounted () {
        this.getMyProductRecordList()
    },
    methods: {
        async getMyProductRecordList () {
            let data = await MyProductRecordList({
                page: this.page,
                rows: 10,
                sort: 'CreateDate',
                order: 'desc'
            })
            this.recordList = data.Data.List
            this.totalPageNumber = data.Data.TotalCount
            console.log(this.totalPageNumber)
        },
        handleCurrentChange (val) {
            this.recordList = []
            this.page = val
            this.currentPage = val 
            this.getMyProductRecordList()
        }
    }
}
</script>

<style lang="scss">
    @import "../style/mixin";
    .martRecord{
        width: 100%;
        background: url("../assets/body-bg.png") no-repeat;
        .mart-nav {
            width: 1200px;
            margin: 10px auto 0;
            .mw-position{
                height: 28px;
                .text{
                    margin-right: 15px;
                }
                .el-breadcrumb__item{
                    height: 19px;
                    line-height: 19px;
                    display: block;
                    img{
                        // vertical-align: sub;
                        margin-right: 3px
                    }
                }
            }
        }
        .mall_record_container{
            width: 1200px;
            margin: 0 auto;
        }
        .module_title {
            position: relative;
            height: 50px;
            line-height: 50px;
            border-bottom: 1px solid #d9d9d9;

            &:after {
            position: absolute;
            left: 0;
            bottom: -1px;
            content: "";
            display: block;
            //   .wh(80px, 3px);
            width: 80px;
            height: 3px;
            background-color:#B2000C;
            }
            .module_name {
                font-size: 20px;
                font-weight: bold;
            }

            .course_nav {
            position: absolute;
            left: 100px;
            top: 0;
            //   .ht-lineHt(50px);
            height: 50px;
            line-height: 50px;
            & > div {
                cursor: pointer;

                &.active {
                //   color: @primary-color;
                }
            }
            }
        }

        .record_list {
            .title_bar {
                font-weight: bold;
                background-color: #edf3fc;
                @extend %clearFix;
            }
            .list1-s{
                float: left;
                line-height: 37px;
                padding-left: 10px;
                padding-right: 10px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
            .list1-5{
                width: 17%;
            }
            .list1{
                width: 12%;
            }
            .list18{
                width: 18%;
            }
            .list0-75{
                width: 9.5%;
            }
        }

        .record_item {
            @extend %clearFix;
            border-bottom: 1px dashed #ddd;
            .list2{
                cursor: pointer;
            }
        }
        .pagination-container{
            margin-top: 15px;

        }
    }
</style>
