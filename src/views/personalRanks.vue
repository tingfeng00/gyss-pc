<template>
    <div class="per_ranksWeb">
        <div class="per_bodytitle">学习排名</div>
        <div class="per_bodytable">
            <table>
                <thead>
                    <tr>
                        <td v-for="(item, index) in ranksLabel" :key="index" v-text="item"></td>
                    </tr>
                </thead>
                <tbody>
                    <tr class="per_student" v-for="(item, index) in student" :key="index">
                        <td class="per_textranks" v-text="item.Index" ref="ranksItem"></td>
                        <td v-text="item.UserName"></td>
                        <td v-text="item.Credit"></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="per_bodybottom">
            <div class="per_singlepage">
                <el-pagination
                    :current-page.sync="currentPage"
                    @current-change="render()"
                    type="danger"
                    background
                    layout="prev, pager, next"
                    :total="totalPage">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import { RankUserList } from '../service/getData'
import { calculatetolPage } from '../service/calculatePage'

export default {
    name: 'personalRanks',
    data: function () {
        return {
            ranksLabel: ['名次', '姓名', '学分'],
            student: [],
            currentPage: 1,
            totalPage: 0,
            rows: 15
        }
    },
    mounted: function () {
        this.$emit('getchildvalue', '4')
        this.changestyle()
        this.render()
    },
    methods: {
        changestyle () {
            let student = document.getElementsByClassName('per_student')
                student = Array.prototype.slice.call(student, 0)
            student.forEach((item, index) => {
                if (index % 2 == 0) {
                    item.style.background = '#efefef'
                } else {
                    item.style.background = '#fff'
                }
            })
        },
        topApply () {
            let student = this.student  
            for (let i = 0; i < student.length; i++) {
                this.$nextTick(() => {
                    this.$refs.ranksItem[i].style.cssText = ''
                })   
                switch (student[i].Index) {
                    case '1':
                        student[i].Index = 'NO.1'
                        this.$nextTick(() => {
                            this.$refs.ranksItem[i].style.cssText = 'color:rgb(228,0,0);font-weight:bold;'
                        })     
                        continue
                    case '2':
                        student[i].Index = 'NO.2'
                        this.$nextTick(() => {
                            this.$refs.ranksItem[i].style.cssText = 'color:rgb(228,0,0);font-weight:bold;'
                        }) 
                        continue
                    case '3':
                        student[i].Index = 'NO.3'
                        this.$nextTick(() => {
                            this.$refs.ranksItem[i].style.cssText = 'color:rgb(228,0,0);font-weight:bold;'
                        }) 
                        continue
                }
                if (student[i].Index.length == 1) {
                    student[i].Index = '0' + student[i].Index
                }
            }        
        },
        async render () {
            let msg = await RankUserList({
                page: this.currentPage,
                rows: this.rows,
                sort: 'TotalCredit',
                order: 'desc'
            })
            this.student = msg.ListData
            this.student.forEach((item, index) => {
                item.Index = item.Index.toString()
            })
            this.topApply()
            this.totalPage = calculatetolPage(msg.ViewBag.Count, this.rows)
        }
    }
}
</script>

<style lang="scss">
.per_ranksWeb{
    .per_bodytitle{
        height: 66px;
        border-bottom: 1px solid #efefef;
        line-height: 66px;
        font-size: 20px;
        font-weight: bold;
        color:#555;
        padding-left: 19px;
    }

    .per_bodytable{
        width: 864px;
        margin: 0 auto;

        thead{
            tr{
                td{
                    height:48px;
                    text-align: center;

                    &:first-of-type{
                        width:218px;
                        padding-right:70px;
                    }
                    
                    &:nth-of-type(2){
                        width:428px;
                    }

                    &:last-of-type{
                        width:218px;
                        padding-left:70px;
                    }
                }
            }
        }

        tbody{
            tr{
                td{
                    text-align: center;
                    height:48px;

                    &:first-of-type{
                        width:218px;
                        padding-right:70px;
                        border-top-left-radius: 7px;
                        border-bottom-left-radius: 7px;
                    }
                    
                    &:nth-of-type(2){
                        width:428px;
                    }

                    &:last-of-type{
                        width:218px;
                        padding-left:70px;
                        border-top-right-radius: 7px;
                        border-bottom-right-radius: 7px;
                    }
                }
            }
        }
    }
    .per_bodybottom{
        height:81px;
        text-align: center;

        &:before{
            content:'';
            display: inline-block;
            height:100%;
            vertical-align: middle;
        }
        .per_singlepage{
            display: inline-block;
        }
    }
}
</style>
