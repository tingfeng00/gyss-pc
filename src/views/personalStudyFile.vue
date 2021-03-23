<template>
    <div class="per_studyFile">
        <div class="per_bodytitle">
            <div class="per_titleleft">学习档案</div>
            <div class="per_titleright">
                <div class="per_getmonth">
                    <el-date-picker
                        v-model="minday"
                        type="date"
                        placeholder="选择日期"
                    >
                    </el-date-picker>
                    至
                    <el-date-picker
                        v-model="maxday"
                        type="date"
                        placeholder="选择日期"
                    >
                    </el-date-picker>
                </div>
                <button type="button" @click="render()">查询</button>
            </div>
        </div>
        <div class="per_bodytopdepart">
            <div class="per_pandect">
                <ul>
                    <li>
                        <div class="per_pandectinnerl">
                            <p>选修课程总量</p>
                            <p><span v-text="lessonNum"></span>门</p>
                        </div>
                        <div class="per_pandectinnerr">
                            <div class="per_passforgroup">
                                <div class="per_passSpanTitle">已完成</div>
                                <span class="per_passSpan" v-text="lessonPass"></span>
                            </div>
                            <div class="per_failforgroup">
                                <div class="per_failSpanTitle">未完成</div>
                                <span class="per_failSpan" v-text="lessonFail"></span>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="per_pandectinnerl">
                            <p>累计测试</p>
                            <p><span v-text="examTimes"></span>次</p>
                        </div>
                    </li>
                    <li>
                        <div class="per_pandectinnerl">
                            <p>web端学习获得</p>
                            <p><span v-text="webStudyTime"></span>学分</p>
                        </div>
                    </li>
                    <li>
                        <div class="per_pandectinnerl">
                            <p>移动端学习获得</p>
                            <p><span v-text="mobileStudyTime"></span>学分</p>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="per_variousData">
                <ul>
                    <li v-for="(item, index) in learnStatic" :key="index">
                        <div class="per_varioustop" v-text="item.project"></div>
                        <div class="per_variousbody">
                            <span v-text="item.getItem"></span> 
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="per_bodyLessonDepart">
            <div class="per_bodyLessoninner">
                <p class="per_bodyLessonTitle">学习课程获得学分</p>
                <div class="per_corusefortime">
                    <ul>
                        <li>
                            <div>选择课程数</div>
                            <div v-text="selectCourseNum"></div>
                        </li>
                        <li>
                            <div>完成课程数</div>
                            <div v-text="finishLesson"></div>
                        </li>
                        <li>
                            <div>获得总学分</div>
                            <div v-text="gotLessonScore"></div>
                        </li>
                        <li>
                            <div>内容</div>
                            <div>
                                <a class="per_tocheckwork" href="javascript:;" @click="overWatch(0)">查看</a>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="per_corusefortable">
                    <table v-if="lessonForTime.length > 0">
                        <thead>
                            <tr>
                                <th>课程名称</th>
                                <th>开始时间</th>
                                <th>完成时间</th>
                                <th>学习状态</th>
                                <th>学习进度</th>
                                <th>获得学分</th>
                                <th>来源</th>
                                <th>评论学分</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item,index) in lessonForTime" :key="index">
                                <td v-text="item.CourseName"></td>
                                <td v-text="item.StartDate ? item.StartDate.substr(0, 10) : ''"></td>
                                <td v-text="item.FinishDate ? item.FinishDate.substr(0, 10) : ''"></td>
                                <td v-text="item.Status"></td>
                                <td v-text="item.BrowseScore"></td>
                                <td v-text="item.Credit"></td>
                                <td v-text="item.CreditSource"></td>
                                <td v-text="item.CommentCredit"></td>
                            </tr>
                        </tbody>
                    </table>
                    <div v-else class="perc-nd">
                        暂无数据
                    </div>
                    <div class="per_coruseforTB">
                        <el-pagination
                        :current-page.sync="courseCurrent"
                        @current-change="currentchange('Course')"
                        :total="courseTotal"
                        layout="prev, pager, next"
                        background
                        >
                        </el-pagination>
                    </div>
                </div>
            </div>
        </div>
        <!-- <div class="per_bodyVideoDepart">
            <div class="per_bodyVideoInner">
                <p class="per_bodyVideoTitle">参加考试获得学分</p>
                <div class="per_videoForTime">
                    <ul>
                        <li>
                            <div>总成绩</div>
                            <div v-text="totalScore"></div>
                        </li>
                        <li>
                            <div>平均分</div>
                            <div v-text="averageScore"></div>
                        </li>
                        <li>
                            <div>总学分</div>
                            <div v-text="totalStudytime"></div>
                        </li>
                        <li>
                            <div>平均学时</div>
                            <div v-text="averageStudytime"></div>
                        </li>
                        <li>
                            <div>内容</div>
                            <div>
                                <a class="per_tocheckwork" href="javascript:;" @click="overWatch(1)">查看</a>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="per_corusefortable">
                    <table>
                        <thead>
                            <tr>
                                <th>考试名称</th>
                                <th>参与次数</th>
                                <th>获得学分</th>
                                <th>平均分</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item,index) in textForTime" :key="index">
                                <td v-text="item.ExamName"></td>
                                <td v-text="item.FinishCount"></td>
                                <td v-text="item.Credit"></td>
                                <td v-text="item.ScoreAvg ? item.ScoreAvg : 0"></td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="per_coruseforTB">
                        <el-pagination
                        :current-page.sync="examCurrent"
                        @current-change="currentchange('Exam')"
                        :total="examTotal"
                        background
                        layout="prev, pager, next"
                        >
                        </el-pagination>
                    </div>
                </div>
            </div>
        </div> -->
        <div class="per_bodyTrainsDepart">
            <div class="per_bodyTrainsInner">
                <p class="per_bodyTrainsTitle">培训获得学分</p>
                <div class="per_trainsForTime">
                    <ul>
                        <li>
                            <div>选学培训项目数</div>
                            <div v-text="trainsProduct"></div>
                        </li>
                        <li>
                            <div>完成培训项目数</div>
                            <div v-text="finishProduct"></div>
                        </li>
                        <li>
                            <div>总学分</div>
                            <div v-text="totalStudytime"></div>
                        </li>
                        <li>
                            <div>内容</div>
                            <div>
                                <a class="per_tocheckwork" href="javascript:;" @click="overWatch(1)">查看</a>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="per_corusefortable">
                    <table v-if="transForTime.length > 0">
                        <thead>
                            <tr>
                                <th>培训班名称</th>
                                <th>开始时间</th>
                                <th>结束时间</th>
                                <th>培训类别</th>
                                <th>培训项目分</th>
                                <th>获得学时</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item,index) in transForTime" :key="index">
                                <td v-text="item.TrainName"></td>
                                <td v-text="item.StartDate ? item.StartDate.substr(0, 10) : ''"></td>
                                <td v-text="item.EndDate ? item.EndDate.substr(0, 10) : ''"></td>
                                <td v-text="item.TrainType"></td>
                                <td v-text="item.Score"></td>
                                <td v-text="item.Credit"></td>
                            </tr>
                        </tbody>
                    </table>
                    <div v-else class="perc-nd">
                        暂无数据
                    </div>
                    <div class="per_coruseforTB">
                        <el-pagination
                        :current-page.sync="trainsCurrent"
                        @current-change="currentchange('Trains')"
                        :total="trainsTotal"
                        background
                        layout="prev, pager, next"
                        >
                        </el-pagination>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { StudyStatistics } from '../service/getData'
import { calculatetolPage } from '../service/calculatePage'
// GetUserInfo,
export default {
    name: 'studyFile',
    data: function () {
        return {
            minday: '',
            maxday: '',
            mindaySave: '',
            maxdaySave: '',
            lessonNum: 0,
            lessonPass: 0,
            lessonFail: 0,
            examTimes: 0,
            webStudyTime: 0,
            mobileStudyTime: 0,
            selectCourseNum: 0,
            finishLesson: 0,
            gotLessonScore: 0,
            totalScore: 0,
            averageScore: 0,
            totalStudytime: 0,
            averageStudytime: 0,
            trainsProduct: 18, 
            finishProduct: 13,
            totalTraingtime: 0,
            learnStatic: [
                {
                    project: '已修总学分',
                    getItem: 0
                },
                {
                    project: '指定获得学分',
                    getItem: 0
                },
                {
                    project: '文章获得学分',
                    getItem: 0
                },
                // {
                //     project: '考试获得学分',
                //     getItem: 0
                // },
                {
                    project: '评论获得学分',
                    getItem: 0
                },
                {
                    project: '培训获得学分',
                    getItem: 0
                }
            ],
            lessonForTime: [],
            textForTime: [],
            transForTime: [],
            clickStyle: [0, 0, 0],
            courseCurrent: 1,
            courseTotal: 0,
            examCurrent: 1,
            examTotal: 0,
            trainsCurrent: 1,
            trainsTotal: 0
        }
    },
    mounted: function () {
        this.$emit('getchildvalue', '5')
        this.render()
    },
    methods: {
        overWatch (index) {
            let controlBox = document.getElementsByClassName('per_corusefortable')
            let boxtext = document.getElementsByClassName('per_tocheckwork')

            if (this.clickStyle[index] == 0) {
                controlBox[index].style.height = 'auto'
                boxtext[index].innerText = '收起'
                this.clickStyle[index] = 1
            } else {
                controlBox[index].style.height = '0px'
                boxtext[index].innerText = '查看'
                this.clickStyle[index] = 0
            }
        },
        async currentchange (str) {
            if (str == 'Course') {
                let study = null
                if ((this.mindaySave == false || this.mindaySave == null) && (this.maxdaySave == false || this.maxdaySave == null)) {
                    study = await StudyStatistics({
                        Type: "study",
                        Sort: "Id",
                        Order: "desc",
                        Page: this.courseCurrent,
                        Rows: 10
                    })
                } else if (this.mindaySave != false && this.maxdaySave != false) {
                    study = await StudyStatistics({
                        Type: "study",
                        Sort: "Id",
                        Order: "desc",
                        StartDate: this.mindaySave,
                        EndDate: this.maxdaySave,
                        Page: this.courseCurrent,
                        Rows: 10
                    })
                }
                this.lessonForTime = study.Model.StudyCourseModel
            } else if (str == 'Exam') {
                let exam = null
                if ((this.mindaySave == false || this.mindaySave == null) && (this.maxdaySave == false || this.maxdaySave == null)) {
                    exam = await StudyStatistics({
                        Type: "exam",
                        Sort: "Id",
                        Order: "desc",
                        Page: this.examCurrent,
                        Rows: 10
                    })
                } else if (this.mindaySave != false && this.maxdaySave != false) {
                    exam = await StudyStatistics({
                        Type: "exam",
                        Sort: "Id",
                        StartDate: this.mindaySave,
                        EndDate: this.maxdaySave,
                        Order: "desc",
                        Page: this.examCurrent,
                        Rows: 10
                    })
                }
                this.textForTime = exam.Model.ExamCreditModel
            } else if (str == 'Trains') {
                let traning = null
                if ((this.mindaySave == false || this.mindaySave == null) && (this.maxdaySave == false || this.maxdaySave == null)) {
                    traning = await StudyStatistics({
                        Type: "training",
                        Sort: "Id",
                        Order: "desc",
                        Page: this.trainsCurrent,
                        Rows: 10
                    })
                } else if (this.mindaySave != false && this.maxdaySave != false) {
                    traning = await StudyStatistics({
                        Type: "training",
                        Sort: "Id",
                        Order: "desc",
                        StartDate: this.mindaySave,
                        EndDate: this.maxdaySave,
                        Page: this.trainsCurrent,
                        Rows: 10
                    })
                }
                this.transForTime = traning.Model.TrainCreditModel
            }
        },
        async render () {
            let msg = null
            let study = null
            let exam = null
            let traning = null
            this.mindaySave = this.minday
            this.maxdaySave = this.maxday
            if ((this.mindaySave == false || this.mindaySave == null) && (this.maxdaySave == false || this.maxdaySave == null)) {
                msg = await StudyStatistics({
                    Type: "userinfo",
                    Sort: "Id",
                    Order: "desc",
                    Page: 1,
                    Rows: 5
                })
                study = await StudyStatistics({
                    Type: "study",
                    Sort: "Id",
                    Order: "desc",
                    Page: 1,
                    Rows: 10
                })
                exam = await StudyStatistics({
                    Type: "exam",
                    Sort: "Id",
                    Order: "desc",
                    Page: 1,
                    Rows: 10
                })
                traning = await StudyStatistics({
                    Type: "training",
                    Sort: "Id",
                    Order: "desc",
                    Page: 1,
                    Rows: 10
                })
            } else if ((this.mindaySave == undefined && this.maxdaySave != undefined) || (this.mindaySave != undefined && this.maxdaySave == undefined)) {
                this.$message({
                    message: '请输入完整的查询时间',
                    type: 'warning'
                })
                return
            } else if (this.mindaySave != false && this.maxdaySave != false) {
                let mini = this.mindaySave.getTime()
                let max = this.maxdaySave.getTime()
                if (mini > max) {
                    this.mindaySave = new Date(max)
                    this.maxdaySave = new Date(mini)
                }
                msg = await StudyStatistics({
                    Type: "userinfo",
                    Sort: "Id",
                    Order: "desc",
                    StartDate: this.mindaySave,
                    EndDate: this.maxdaySave,
                    Page: 1,
                    Rows: 5
                })
                study = await StudyStatistics({
                    Type: "study",
                    Sort: "Id",
                    Order: "desc",
                    StartDate: this.mindaySave,
                    EndDate: this.maxdaySave,
                    Page: 1,
                    Rows: 10
                })
                exam = await StudyStatistics({
                    Type: "exam",
                    Sort: "Id",
                    Order: "desc",
                    StartDate: this.mindaySave,
                    EndDate: this.maxdaySave,
                    Page: 1,
                    Rows: 10
                })
                traning = await StudyStatistics({
                    Type: "training",
                    Sort: "Id",
                    Order: "desc",
                    StartDate: this.mindaySave,
                    EndDate: this.maxdaySave,
                    Page: 1,
                    Rows: 10
                })
            }
            this.lessonNum = msg.Model.ElectiveCount
            this.lessonPass = msg.Model.FinishCount
            this.lessonFail = msg.Model.UnFinishCount
            this.examTimes = msg.Model.TestCount
            this.webStudyTime = msg.Model.PcCredit
            this.mobileStudyTime = msg.Model.MobileCredit
            this.learnStatic[0].getItem = msg.Model.SumCredit
            this.learnStatic[1].getItem = msg.Model.AppointCredit
            this.learnStatic[2].getItem = msg.Model.ArticleCredit
            this.learnStatic[3].getItem = msg.Model.ExamCredit
            this.learnStatic[4].getItem = msg.Model.CommentCredit
            // this.learnStatic[5].getItem = msg.Model.TrainingCredit
            this.selectCourseNum = study.StudyCount
            this.finishLesson = study.StudyFinishCount
            this.gotLessonScore = study.StudyCreditSum
            this.lessonForTime = study.Model.StudyCourseModel
            this.totalScore = exam.ExamScoreSum
            this.averageScore = exam.ExamScoreAvg
            this.totalStudytime = exam.StudyCreditSum
            this.averageStudytime = exam.ExamCreditAvg
            this.textForTime = exam.Model.ExamCreditModel
            this.trainsProduct = traning.TrainingCount 
            this.finishProduct = traning.TrainingFinishCount
            this.totalTraingtime = traning.Model.TrainingCredit
            this.transForTime = traning.Model.TrainCreditModel
            this.courseCurrent = 1
            this.examCurrent = 1
            this.trainsCurrent = 1
            this.courseTotal = calculatetolPage(study.StudyCount, 10)
            this.examTotal = calculatetolPage(exam.ExamFinishCount, 10)
            this.trainsTotal = calculatetolPage(traning.TrainingCount, 10)
        }
    }
}
</script>

<style lang="scss">
@import "../style/mixin";
.per_studyFile{
    // background: url("../assets/body-bg.png") no-repeat;
    .per_bodytitle{
        @extend %clearFix;
        border-bottom: 1px solid #efefef;
        .per_titleleft{
            float:left;
            height: 66px;
            line-height: 66px;
            font-size: 20px;
            font-weight: bold;
            color:#555;
            padding-left: 19px;

        }
        .per_titleright{
            float:right;
            height: 66px;
            &::before{
                content:'';
                display: inline-block;
                vertical-align: middle;
                height:100%;
            }
            .per_getmonth{
                display: inline-block;
                margin-right:16px;
                .el-date-editor{
                    display: inline-block;
                    width:145px!important;
                    .el-input__inner{
                        height:32px;
                        line-height: 32px;
                    }
                    .el-input__icon{
                        line-height: 32px;
                    }
                }
            }
            button{
                margin-right: 20px;
                width: 56px;
                height: 32px;
                color:#fff;
                border-radius: 3px;
                border:none;
                background:#368474;
                cursor: pointer;
            }
        }
    }
    .per_bodytopdepart{
        padding-top:30px;
        width:866px;
        margin:0 auto;
        .per_pandect{
            ul{
                @extend %clearFix;
                li{
                    float:left;
                    width:201px;
                    height:92px;
                    border-radius: 5px;
                    margin-right:20px;
                    .per_pandectinnerl{
                        float:left;
                        margin-top:19px;
                        margin-left:20px;
                        p{
                            &:last-of-type{
                                margin-top:8px;
                                span{
                                    font-size: 24px;
                                    font-weight: bold;
                                    margin-right:17px;
                                }
                            }
                        }
                    }
                    &:first-of-type{
                        background:#ebf5f0;
                        background:linear-gradient(to right, #ebf5f0, #fff);
                        @extend %clearFix;
                        color:#10ae60;
                        .per_pandectinnerr{
                            float:left;
                            color:#fff;
                            padding-left:57px;
                            padding-top:18px;
                            .per_passforgroup{
                                &:hover{
                                    .per_passSpanTitle{
                                        opacity: 1;
                                    }
                                }
                            }
                            .per_failforgroup{
                                &:hover{
                                    .per_failSpanTitle{
                                        opacity: 1;
                                    }
                                }
                            }
                            div{
                                position: relative;
                                text-align: center;
                                .per_passSpanTitle{
                                    width:56px;
                                    height:25px;
                                    line-height: 25px;
                                    box-shadow: 0 0 5px #233;
                                    border-radius: 5px;
                                    background:#fff;
                                    position: absolute;
                                    top:-14px;
                                    left:-53px;
                                    color:#10ae60;
                                    opacity: 0;
                                    transition: 1s;
                                }
                                .per_failSpanTitle{
                                    width:56px;
                                    height:25px;
                                    line-height: 25px;
                                    box-shadow: 0 0 5px #233;
                                    border-radius: 5px;
                                    background:#fff;
                                    position: absolute;
                                    top:0px;
                                    left:-53px;
                                    color:#ff4d38;
                                    opacity: 0;
                                    transition: 1s;
                                }
                            }
                            span{
                                display: inline-block;
                                width:20px;
                                height:20px;
                                border-radius: 20px;
                                text-align: center;
                                vertical-align: middle;
                                cursor:default;
                            }
                            .per_passSpan{
                                background:#10ae60;
                            }
                            .per_failSpan{
                                margin-top:16px;
                                background:#ff4d38;
                                &:hover .per_failSpanTitle{
                                    display:block;
                                }
                            }

                        }
                    }
                    &:nth-of-type(2){
                        color:#f99d00;
                        background:#f7f4ed;
                        background:linear-gradient(to right, #f7f4ed, #fff);
                    }
                    &:nth-of-type(3){
                        color:#2c79b1;
                        background:#f0f6fa;
                        background:linear-gradient(to right, #f0f6fa, #fff);
                    }
                    &:last-of-type{
                        color:#d85a00;
                        background:#faf4f0;
                        background:linear-gradient(to right, #faf4f0, #fff);
                        margin-right: 0;
                    }
                }
            }
        }
        .per_variousData{
            margin-top:30px;
            padding-bottom:12px;
            ul{
                @extend %clearFix;
                li{
                    float: left;
                    width:285px;
                    height:105px;
                    margin-right:3px;
                    .per_varioustop{
                        text-align: center;
                        height:53px;
                        line-height:53px;
                        background:#f5f5f5;
                        color:#888;
                    }
                    .per_variousbody{
                        text-align: center;
                        height: 53px;
                        line-height:53px;
                        font-weight: bolder;
                        font-size: 16px;
                        color:#666;
                    }
                }
            }
        }
    }
    .per_bodyLessonDepart{
        border-top:4px solid #10ae60;
        .per_bodyLessoninner{
            width:866px;
            margin:0 auto;
            .per_bodyLessonTitle{
                height:62px;
                line-height: 62px;
                font-weight: bold;
                color:#10ae60;
            }
            .per_corusefortime{
                ul{
                    @extend %clearFix;
                    li{
                        float:left;
                        width:213px;
                        text-align: center;
                        margin-right:3px;
                        div{
                            &:first-of-type{
                                height: 53px;
                                line-height: 53px;
                                background: #f5f5f5;
                                color: #888;
                            }
                            &:last-of-type{
                                height: 52px;
                                line-height: 52px;
                            }
                        }
                        .per_tocheckwork{
                            color:#ff4d38;
                        }
                    }
                }
            }
            .per_corusefortable{
                height:0;
                overflow: hidden;
                table{
                    width:100%;
                    text-align: center;
                    thead{
                        tr{
                            th{
                                height: 53px;
                                font-weight: normal;
                                color: #888;
                                border-right:3px solid #fff;
                                background:#f5f5f5;
                                &:first-child{
                                    width:285px; 
                                }
                            }
                        }
                    }
                    tbody{
                        tr{
                            td{
                                border-bottom:1px solid #f5f5f5;
                                &:first-child{
                                    width:285px;
                                    height:60px;
                                    line-height:60px;
                                    padding:0 14px;
                                    box-sizing: border-box;
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                    -webkit-line-clamp: 1;
                                    -webkit-box-orient: vertical;
                                    word-wrap: pre-wrap;
                                    display: -webkit-box;
                                } 
                            }
                        }
                    }
                }
                .per_coruseforTB{
                    height:76px;
                    @extend %clearFix;
                    .el-pagination{
                        float:right;
                        margin-top:22px;
                    }
                    .el-pager{
                        .active{
                            background: #10ae60;
                            &:hover{
                                color:#fff;
                            }
                        }
                        li{
                            &:hover{
                                color: #10ae60;
                            }
                        }
                    }
                }
            }
        }    
    }
    .per_bodyVideoDepart{
        border-top:4px solid #f99d00;
        .per_bodyVideoInner{
            width:866px;
            margin:0 auto;
            .per_bodyVideoTitle{
                height:62px;
                line-height: 62px;
                font-weight: bold;
                color:#f99d00;
            }
            .per_videoForTime{
                ul{
                    @extend %clearFix;
                    li{
                        float:left;
                        width: 170px;
                        text-align: center;
                        margin-right:3px;
                        div{
                            &:first-of-type{
                                height: 53px;
                                line-height: 53px;
                                background: #f5f5f5;
                                color: #888;
                            }
                            &:last-of-type{
                                height: 52px;
                                line-height: 52px;
                            }
                        }
                        .per_tocheckwork{
                            color:#ff4d38;
                        }
                    }
                }
            }
            .per_corusefortable{
                height:0;
                overflow: hidden;
                table{
                    width:100%;
                    text-align: center;
                    thead{
                        tr{
                            th{
                                height: 53px;
                                font-weight: normal;
                                color: #888;
                                border-right:3px solid #fff;
                                background:#f5f5f5;
                                &:first-child{
                                    width:285px; 
                                }
                            }
                        }
                    }
                    tbody{
                        tr{
                            td{
                                border-bottom:1px solid #f5f5f5;
                                &:first-child{
                                    width:285px;
                                    height:60px;
                                    line-height:60px;
                                    padding:0 14px;
                                    box-sizing: border-box;
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                    -webkit-line-clamp: 1;
                                    -webkit-box-orient: vertical;
                                    word-wrap: pre-wrap;
                                    display: -webkit-box;
                                } 
                            }
                        }
                    }
                }
                .per_coruseforTB{
                    height:76px;
                    @extend %clearFix;
                    .el-pagination{
                        float:right;
                        margin-top:22px;
                    }
                    .el-pager{
                        .active{
                            background: #f99d00;
                            &:hover{
                                color:#fff;
                            }
                        }
                        li{
                            &:hover{
                                color: #f99d00;
                            }
                        }
                    }
                }
            }
        }
    }
    .per_bodyTrainsDepart{
        border-top:4px solid #368474;
        .per_bodyTrainsInner{
            width:866px;
            margin:0 auto;
            .per_bodyTrainsTitle{
                height:62px;
                line-height: 62px;
                font-weight: bold;
                color:#368474;
            }
            .per_trainsForTime{
                ul{
                    @extend %clearFix;
                    li{
                        float:left;
                        width: 213px;
                        text-align: center;
                        margin-right:3px;
                        div{
                            &:first-of-type{
                                height: 53px;
                                line-height: 53px;
                                background: #f5f5f5;
                                color: #888;
                            }
                            &:last-of-type{
                                height: 52px;
                                line-height: 52px;
                            }
                        }
                        .per_tocheckwork{
                            color:#ff4d38;
                        }
                    }
                }
            }
            .per_corusefortable{
                height:0;
                overflow: hidden;
                table{
                    width:100%;
                    text-align: center;
                    thead{
                        tr{
                            th{
                                height: 53px;
                                font-weight: normal;
                                color: #888;
                                border-right:3px solid #fff;
                                background:#f5f5f5;
                                &:first-child{
                                    width:285px; 
                                }
                            }
                        }
                    }
                    tbody{
                        tr{
                            td{
                                border-bottom:1px solid #f5f5f5;
                                &:first-child{
                                    width:285px;
                                    height:60px;
                                    line-height:60px;
                                    padding:0 14px;
                                    box-sizing: border-box;
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                    -webkit-line-clamp: 1;
                                    -webkit-box-orient: vertical;
                                    word-wrap: pre-wrap;
                                    display: -webkit-box;
                                } 
                            }
                        }
                    }
                }
                .per_coruseforTB{
                    height:76px;
                    @extend %clearFix;
                    .el-pagination{
                        float:right;
                        margin-top:22px;
                    }
                }
                .perc-nd{
                    text-align: center;
                    font-size: 20px;
                    font-weight: bold;
                }
            }
        }
    }
}
</style>
