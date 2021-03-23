<template>
    <div class="unDoneClue">
       <div class="head clearFix">
           <div class="title l">
             <p>待评估线索</p>
           </div>
           <div class="search r clearFix">
               <input type="text" v-model="searchkey" placeholder="请输入搜索内容">
               <el-button @click.native="search">搜索</el-button>
           </div>
       </div>
       <div class="list">
           <ul>
               <li v-for="item in unfinshClubList" :key="item.id">
                   <div class="time">
                       <p class="time1" v-if="item.expireHour >=24">
                           志愿者评估线索剩余时间：<span>{{item.expireHour |timeFileter }}</span> 
                       </p>
                       <p class="time2" v-if="item.expireHour <24 && item.expireHour>0">
                           志愿者评估线索剩余时间：<span>{{item.expireHour |timeFileter }}</span> 
                       </p>
                   </div>
                   <div class="table">
                       <div class="cell">
                           <div class="title">
                               提供线索区域
                           </div>
                           <div class="text">
                               {{item.provinceFullName}} {{item.address}}
                           </div>
                       </div>
                       <div class="cell">
                           <div class="title">
                               提供涉及区域
                           </div>
                           <div class="text">
                               {{item.industry.name}}-{{item.subIndustry.name}}
                           </div>
                       </div>
                       <div class="cell">
                           <div class="title">
                               线索描述
                           </div>
                           <div class="text">
                               {{item.description | wordLimit(50)}}
                           </div>
                       </div>
                       <div class="cell">
                           <el-button class="cell-btn1" @click.native="goRoute(item.id)">评估线索</el-button>
                           <!-- <el-button class="cell-btn2" disabled>评估线索</el-button> -->
                       </div>
                   </div>
               </li>
              
           </ul>
           <el-pagination
                background
                :current-page.sync="currentPage"
                layout="prev, pager, next"
                :page-size='10'
                @current-change="handleCurrentChange"
                :total="totalCount">
            </el-pagination>
       </div>
    </div>
</template>

<script>
import { GetUnfinshClubList } from '../service/getData'
export default {
    data () {
        return {
            unfinshClubList: [],
            keyWord: '',
            page: '1',
            currentPage: 1,
            totalCount: null,
            searchkey: ''
        }
    },
    created () {

    },
    mounted () {
        this.getUnfinshClubList()
    },
    methods: {
        async getUnfinshClubList () {
            let data = await GetUnfinshClubList({ page: this.page, rows: '10', content: this.searchkey })
            if (data.msg == 'OK') {
                this.unfinshClubList = data.data
                this.totalCount = data.count
            }
        },
        handleCurrentChange (val) {
            this.unfinshClubList = []
            this.page = val
            this.currentPage = val 
            this.getUnfinshClubList()
        },
        search () {
            this.getUnfinshClubList()
        },
        goRoute (id) {
            this.$router.push({ path: '/assessClue', query: { id: id } })
        }
    }
}
</script>

<style lang="scss">
    .unDoneClue{
        background: #fff;
        padding: 30px 20px;
        .head{
            .title{
                border-left: 7px solid #066cc4;
                height: 30px;
                p{
                    margin-left: 35px;
                    border-bottom: 4px solid #066cc4;
                    height: 26px;
                    line-height: 26px;
                    font-size: 16px;
                    font-weight: bold;
                    color: #066cc4;
                }
            }
            .search{
                width: auto;
                input{
                    width: 130px;
                    height: 18px;
                    border: 1px solid #ccc;
                    padding: 4px 10px;
                   float: left;
                }
                button{
                    margin-left: 3px;
                    border: 1px solid #ddd;
                    background: #f5f5f5;
                    width: 60px;
                    height: 28px;
                    color: #333;
                    font-size: 14px;
                    padding: 0;
                    border-radius: 0;
                    float: left;
                }
            }
        }
        .list{
            margin-top: 30px;
            ul{
                li{
                    margin-bottom: 20px;
                    border: 1px solid #ddd;
                    .time{
                        background: #f5f5f5;
                        height: 42px;
                        line-height: 42px;
                        text-indent: 20px;
                        color: #999;
                        font-size: 14px;
                        .time1{
                            span{
                                color: #066fc4;
                            }
                        }
                        .time2{
                            span{
                                color: #fea93a;
                            }
                        }
                    }
                }
                .table{
                    display: table;
                    margin-bottom: 0;
                    .cell{
                        display: table-cell;
                        height: 90px;
                        padding: 15px;
                        position: relative;
                        .title{
                            height: 18px;
                            line-height: 18px;
                            color: #666;
                        }
                        .text{
                            line-height: 22px;
                            color: #333;
                            margin-top: 5px;
                        }
                        button{
                            text-align: center;
                            background: #066fc4;
                            color: #fff;
                            width: 120px;
                            height: 36px;
                            position: absolute;
                            top: 40px;
                        }
                        &:nth-child(1){
                            width: 153px;
                            border-right: 1px solid #ddd;
                        }
                        &:nth-child(2){
                            width: 200px;
                            border-right: 1px solid #ddd;
                        }
                        &:nth-child(3){
                            width: 259px;
                            border-right: 1px solid #ddd;
                        }
                        &:nth-child(4){
                            width: 157px;
                        }
                    }
                }
            }
            .el-pagination{
                margin: 0 auto;
                text-align: center;
            }
        }
    }
</style>
