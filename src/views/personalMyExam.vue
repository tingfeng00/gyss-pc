<template>
    <div class="per_myexam">
        <div class="per_bodytitle">
            <div class="per_bodytitleL">
                <span>我的考试</span>
            </div>
            <div class="per_bodytitleR">
                <div class="exam-title2-check l">
                    <el-select v-model="beforeSearchType" placeholder="请选择">
                        <el-option
                            v-for="item in selectOptions"
                            :key="item.value"
                            :label="item.Name"
                            :value="item.Id">
                        </el-option>
                    </el-select>
                </div>
                <input type="text" name="" id="" value="" placeholder="输入考试名称" v-model="beforeSearchName" @keydown="keysearch()">
                <span @click="search()"><img src="../assets/glass.png"></span>
            </div>
        </div>
        <div class="per_bodycontent">
            <ul class="per_bodycontent_examtitle">
                <li class="per_bodycontent_examname">考试名称</li>
                <li class="per_bodycontent_examtype">考试种类</li>
                <li class="per_bodycontent_examplays">考试次数</li>
                <li class="per_bodycontent_heighter">最高分</li>
                <li class="per_bodycontent_lower">最低分</li>
                <li class="per_bodycontent_button">查看详情</li>
            </ul>
            <ul class="per_bodycontent_exambody">
                <li v-for="(item, index) in itemList" :key="index">
                    <ul class="per_bodycontent_examitem">
                        <li class="per_bodycontent_examname" v-text="item.Name"></li>
                        <li class="per_bodycontent_examtype" v-text="item.ExamTypeName"></li>
                        <li class="per_bodycontent_examplays" v-text="item.UserExamDetail.length"></li>
                        <li class="per_bodycontent_heighter" v-text="item.MaxScore"></li>
                        <li class="per_bodycontent_lower" v-text="item.MinScore"></li>
                        <li class="per_bodycontent_button">
                            <a class="per_testbutton" href="javascript:;" @click="changes(index)">查看</a>
                        </li>
                    </ul>
                    <el-collapse-transition>
                        <ul class="per_bodycontent_detailinfor" v-show="itemShow[index]">
                            <li class="per_bodycontent_detailtitle">
                                <div class="per_bodycontent_sequence">序列</div>
                                <div class="per_bodycontent_detailname">考试名称</div>
                                <div class="per_bodycontent_createtime">考试时间</div>
                                <div class="per_bodycontent_examscore">考试分数</div>
                                <div class="per_bodycontent_detaillink">详细内容</div>
                            </li>
                            <li class="per_bodycontent_detailinfor" v-for="(itemson,indexs) in item.UserExamDetail" :key="indexs">
                                <div class="per_bodycontent_sequence" v-text="indexs+1"></div>
                                <div class="per_bodycontent_detailname" v-text="item.Name"></div>
                                <div class="per_bodycontent_createtime" v-text="itemson.CreateDate"></div>
                                <div class="per_bodycontent_examscore" v-text="itemson.Score"></div>
                                <div class="per_bodycontent_detaillink">
                                    <a href="javascript:;" @click="linkto(itemson.ExamId,itemson.Id)">答题详情</a>
                                </div>
                            </li>
                        </ul>
                    </el-collapse-transition>
                </li>
            </ul>
        </div>
        <div class="per_myexambottom">
            <el-pagination
                :current-page.sync="currentPage"
                @current-change="render(this.selectOptionsValue, this.examName)"
                type="danger"
                background
                layout="prev, pager, next"
                :total="totalPage">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import { GetExamType, MyExamStat } from '../service/getData'
import { calculatetolPage } from '../service/calculatePage'
export default {
    name: 'Myexam',
    data: function () {
        return {
            itemList: [],
            itemShow: [false, false],
            selectOptions: [],
            beforeSearchType: '',
            beforeSearchName: '',
            selectOptionsValue: '',
            examName: '',
            currentPage: 1,
            totalPage: 0,
            Rows: 12
        }
    },
    created () {
        this.renderGetType()
        this.render(this.selectOptionsValue, this.examName)
    },
    mounted: function () {
        this.$emit('getchildvalue', '7')
    },
    methods: {
        changes (index) {
            let msg = !this.itemShow[index]
            this.itemShow.splice(index, 1, msg)
        },
        linkto (examid, resultid) {
            const { href } = this.$router.resolve({ path: '/examResult', query: { EXAMID: examid, EXAMRESULT: resultid } })
            window.open(href, '_blank')
        },
        keysearch () {
            // eslint-disable-next-line
            let theEvent = window.event || evt
            let code = theEvent.keyCode || theEvent.which || theEvent.charCode
            if (code == 13) {
                this.search()
            }
        },
        // 当搜索考试时触发搜索设置搜索内容
        search () {
            this.selectOptionsValue = this.beforeSearchType
            this.examName = this.beforeSearchName
            this.currentPage = 1
            this.render(this.selectOptionsValue, this.examName)
        },
        // 获取考试种类列表
        async renderGetType () {
            let type = await GetExamType({})
            type.unshift({ Id: 0, Name: '全部考试' })
            this.selectOptions = type
        },
        // 初始渲染触发，页数更改时触发
        async render (typeOption, Keywords) {
            let infor = null
            if (typeOption == 0) {
                infor = await MyExamStat({
                    ExamName: Keywords,
                    Page: this.currentPage,
                    Rows: this.Rows,
                    Sort: 'CreateDate',
                    Order: 'desc'
                })
            } else {
                infor = await MyExamStat({
                    ExamName: Keywords,
                    ExamTypeId: typeOption,
                    Page: this.currentPage,
                    Rows: this.Rows,
                    Sort: 'CreateDate',
                    Order: 'desc'
                })
            }
            this.itemShow = []
            this.totalPage = calculatetolPage(infor.Data.Count, this.Rows)
            this.itemList = infor.Data.ListData
            this.itemList.forEach(item => {
                this.itemShow.push(false)
            })
        }
    }
}
</script>

<style lang="scss">
@import "../style/mixin";
.per_myexam{
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
            width: 300px;
            height: 34px;
            line-height: 34px;
            border-radius: 5px;
            border: 1px solid #dddddd;
            .exam-title2-check {
                .el-select {
                    width:78px;
                    .el-input__inner{
                        width: 60px;
                        height: 34px;
                        line-height: 34px;
                        border: none;
                        text-indent: 5px;
                        padding: 0;
                        text-align: center;
                    }
                    .el-input__suffix{
                        right:3px;
                        .el-input__icon{
                            width: 12px;
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
                    margin-left: 4px;
                    cursor: pointer;
                }
            }
        }
    }
    .per_bodycontent{
        width:856px;
        margin:0 auto;
        padding-top: 25px;
        .per_bodycontent_examitem, .per_bodycontent_examtitle{
            height: 40px;
            text-align: center;
            @extend %clearFix;
            li{
                float: left;
                height:40px;
                line-height: 40px;
            }
            .per_bodycontent_examname{
                width: 300px;
            }
            .per_bodycontent_examtype{
                width: 160px;
            }
            .per_bodycontent_examplays{
                width: 110px;
            }
            .per_bodycontent_heighter{
                width: 90px;
            }
            .per_bodycontent_lower{
                width: 90px;
            }
            .per_bodycontent_button{
                width: 106px;
                a{
                    display: inline-block;
                    width:86px;
                    height:32px;
                    line-height: 32px;
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
        .per_bodycontent_examtitle{
            background: #d1d1d1;
            div{
                font-weight: 600;
            }
        }
        .per_bodycontent_detailinfor, .per_bodycontent_detailtitle{
            @extend %clearFix;
            div{
                float: left;
                height:40px;
                line-height: 40px;
                text-align: center;
            }
            .per_bodycontent_sequence{
                width:60px;
            }
            .per_bodycontent_detailname{
                width:320px;
            }
            .per_bodycontent_createtime{
                width:290px;
            }
            .per_bodycontent_examscore{
                width:80px;
            }
            .per_bodycontent_detaillink{
                width:106px;
                a{
                    display: inline-block;
                    width:86px;
                    height:32px;
                    line-height: 32px;
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
        .per_bodycontent_detailtitle{
            background:#368474;
            color:#fff;
        }
        .per_bodycontent_detailinfor{
            background:#f2f5fa;
            color:#368474;
        }
        table{
            width:inherit;
            thead{
                tr{
                    height:40px;
                    background:#efefef;
                }
            }
            tbody{
                tr{
                    height:40px;
                    td{
                        text-align: center;
                        border-bottom: 1px dashed #efefef;
                        .per_testbutton{
                            display: inline-block;
                            width:86px;
                            height:32px;
                            line-height: 32px;
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
    .per_myexambottom{
        text-align: right;
        height:80px;
        padding-right:42px;
        &:before{
            content:'';
            height:100%;
            display: inline-block;
            vertical-align: middle;
        }
        .el-pagination{
            display: inline-block;
        }
    }
}
</style>
