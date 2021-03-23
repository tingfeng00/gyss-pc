<template>
    <div class="personaltestcenter">
        <div class="per_bodytitle">
            <div class="per_bodytitleL">
                <span>考试中心</span>
            </div>
            <div class="per_bodytitleR">
                <div class="exam-title2-check l">
                    <el-select v-model="beforeSearchType" placeholder="考试类型">
                        <el-option
                            v-for="item in selectOptions"
                            :key="item.value"
                            :label="item.Name"
                            :value="item.Id">
                        </el-option>
                    </el-select>
                </div>
                <input type="text" name="" id="" value="" placeholder="输入考试名称" v-model="beforeSearchName" @keydown="keysearch()">
                <span @click="random()"><img src="../assets/glass.png"></span>
            </div>
        </div>
        <div class="per_textbodycontent">
            <table>
                <thead>
                    <tr>
                        <th>编号</th>
                        <th>考试名称</th>
                        <th>类别</th>
                        <th>考试时间</th>
                        <th>学分</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in testList" :key="index">
                        <td v-text="item.Id"></td>
                        <td v-text="item.Name" :title="item.Name"></td>
                        <td v-text="item.ExamType == undefined ? '无' : item.ExamType.Name" :title="item.ExamType"></td>
                        <td v-text="item.StartTime" :title="item.StartTime"></td>
                        <td v-text="item.CreditHour"></td>
                        <td><button class="per_testbutton" type="button" @click="linkTo(item.Id)">开始考试</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="per_bodyBottom clearFix">
            <div class="per_singlepage pull-right">
                <el-pagination
                    type="danger"
                    background
                    :current-page.sync="currentPage"
                    @current-change="currentchange()"
                    layout="prev, pager, next"
                    :total="totalpage">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import { ExamListItem, GetExamType } from '../service/getData'
import { calculatetolPage } from '../service/calculatePage'
export default {
    name: 'TestCenter',
    data: function () {
        return {
            TestInput: '请输入内容',
            testList: [],
            beforeSearchType: '',
            beforeSearchName: '',
            examType: '',
            selectOptions: [],
            examName: '',
            currentPage: 1,
            totalpage: 0
        }
    },
    mounted () {
        this.$emit('getchildvalue', '6')
        this.random()
    },
    methods: {
        linkTo (index) {
            const { href } = this.$router.resolve({ path: '/examInfor', query: { Id: index } })
            window.open(href, '_blank')
        },
        keysearch (evt) {
            let theEvent = window.event || evt
            let code = theEvent.keyCode || theEvent.which || theEvent.charCode
            if (code == 13) {
                this.search()
            }
        },
        search () {
            this.examType = this.beforeSearchType
            this.examName = this.beforeSearchName
            this.random()
        },
        async random () {
            let data = null
            if (this.examType != undefined && this.examName != undefined) {
                data = await ExamListItem({
                    page: 1,
                    ExamTypeId: this.examType,
                    keyword: this.examName
                })
            } else if (this.examType == undefined && this.examName != undefined) {
                data = await ExamListItem({
                    page: 1,
                    keyword: this.examName
                })
            } else if (this.examType != undefined && this.examName == undefined) {
                data = await ExamListItem({
                    page: 1,
                    ExamTypeId: this.examType
                })
            } else {
                data = await ExamListItem({
                    page: 1
                })    
            }
            let type = await GetExamType({})
            type.Data.unshift({ Id: 0, Name: '全部考试' })
            this.selectOptions = type.Data
            let result = data.Data.ListData
            for (let i = 0; i < result.length; i++) {
                result[i]['isclick'] = false
                result[i]['StartTime'] = result[i]['StartTime'].substr(0, 16)
            }
            this.testList = result  
            this.totalpage = calculatetolPage(data.Data.ViewBag.Count, data.Data.ViewBag.Rows)
        },
        async currentchange () {
            let data = null
            if (this.examType != undefined && this.examName != undefined) {
                data = await ExamListItem({
                    page: this.currentPage,
                    ExamTypeId: this.examType,
                    keyword: this.examName
                })
            } else if (this.examType == undefined && this.examName != undefined) {
                data = await ExamListItem({
                    page: this.currentPage,
                    keyword: this.examName
                })
            } else if (this.examType != undefined && this.examName == undefined) {
                data = await ExamListItem({
                    page: this.currentPage,
                    ExamTypeId: this.examType
                })
            } else {
                data = await ExamListItem({
                    page: this.currentPage
                })    
            }
            let result = data.Data.ListData
            for (let i = 0; i < result.length; i++) {
                result[i]['isclick'] = false
                result[i]['StartTime'] = result[i]['StartTime'].substr(0, 16)
            }
            this.testList = result  
        }
    }
}
</script>

<style lang="scss">
@import "../style/mixin";
.personaltestcenter{
    .per_bodytitle{
        @extend %clearFix;
        border-bottom: 1px solid #efefef;
        .per_bodytitleL{
            @extend %pull-left;
            height: 66px;
            line-height: 66px;
            font-size: 20px;
            font-weight: bold;
            color:#555;
            padding-left: 19px;
        }
        .per_bodytitleR{
            @extend %pull-right;
            margin-right: 20px;
            margin-top: 14px;
            width: 316px;
            height: 34px;
            line-height: 34px;
            border-radius: 5px;
            border: 1px solid #dddddd;
            .exam-title2-check {
                .el-select {
                    .el-input{
                        width: 95px;
                    }
                    .el-input__inner{
                        width: 75px;
                        height: 34px;
                        line-height:34px;
                        border: none;
                        text-indent: 5px;
                        text-align: center;
                        padding: 0;
                    }
                    .el-input__suffix{
                        right: 3px;
                        .el-input__icon{
                            width: 12px;
                        }
                    }
                    .el-select__caret{
                        line-height: 34px; 
                    }               
                }
            }
            input {
                width: 180px;
                height:34px;
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
    .per_textbodycontent{
        width:856px;
        height:841px;
        margin:0 auto;
        padding-top: 25px;
        table{
            width:inherit;
            thead{
                tr{
                    height:40px;
                    background:#efefef;
                    th{
                        &:first-of-type{
                            width:41px;
                        }
                        &:nth-of-type(4){
                            width:175px;
                        }
                        &:nth-of-type(5){
                            width:42px;
                        }
                        &:last-of-type{
                            width:127px;
                        }
                    }
                }
            }
            tbody{
                tr{
                    height:40px;
                    border-bottom: 1px dashed #efefef;
                    transition: 0.5s;
                    &:hover{
                        box-shadow: 0 0 10px #555;
                        border-bottom:1px solid #fff;
                    }
                    td{
                        text-align: center;
                        .per_coin{
                            display: inline-block;
                            width:15px;
                            height:14px;
                            margin-right:3px;
                            background: url('../assets/coin.png');
                            position: relative;
                            top:1px;
                        }
                        .per_testbutton{
                            width:86px;
                            height:32px;
                            border-radius: 3px;
                            font-weight: bold;
                            color:#368474;
                            background: none;
                            border: none;
                            cursor: pointer;
                            &:hover{
                                background: #58d7fb;
                                background:linear-gradient(to left,#58d7fb,#2cabfa);
                                color:#fff;   
                            }
                        }
                    }
                }
            }
        }
    }
    .per_bodyBottom{
        height:75px;
        line-height: 75px;
        .per_selectall{
            display: inline-block;
            padding-left:31px;
            img{
                margin-right: 12px;
            }
            span{
                margin-right: 16px;
            }
        }
        .per_delete{
            border: 0;
            width: 56px;
            height: 28px;
            color: #fff;
            border-radius: 3px;
            background:#368474;
            line-height: 28px;
        }
        .per_singlepage{    
            position: relative;
            top:50%;
            right:35px;
            margin-top:-14px;
            .el-pager {
                height:28px;
                li {
                    width:auto;
                }
            }
        }
    }
}
</style>
