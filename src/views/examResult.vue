<template>
    <div class="exam_resultpage">
        <header-fix :active-index="headerIndex"></header-fix>
        <div class="exam_resultexamcenter">
            <div class="exam_examcenter_left">
                <h1 v-text="examTitle"></h1>
                <p class="exam_examcenter_course">(所属课程：<span v-text="courseBelong"></span>)</p>
                <div class="exam_examcenter_infor">
                    <div class="exam_examcenter_inforleft">
                        考试题目共：<span v-text="topicNum"></span>题,
                        满分分值：<span v-text="examScore"></span>,
                        及格分值：<span v-text="passScore"></span>
                    </div>
                    <div class="exam_examcenter_inforright">
                        <span>得分：</span>
                        <span class="exam_examscores" v-text="textScore"></span><span class="exam_examscores">分</span>
                    </div>
                </div>
                <div class="exam_examcenter_singletest" v-if="havesingle">
                    <p class="exam_examcenter_singletitle">单选题（共<span v-text="singleTopicNum"></span>题，每题<span v-text="singleTopicScore"></span>分）</p>
                    <ul>
                        <li v-for="(item, faindex) in singleTopicList" :key="faindex">
                            <div class="exam_examcenter_singleques">
                                <p><span class="exam_examcenter_singlelabel" v-text="faindex+1"></span><span v-text="item.Question.Name"></span></p>
                            </div>
                            <div class="exam_examcenter_singlechoose">
                                <el-radio-group v-model="singleAnswer[faindex]">
                                    <el-radio 
                                    v-for="(sonItem, index) in item.Question.QuestionsItems" 
                                    :key="index"
                                    :label="sonItem.ItemFlag + '. ' + sonItem.Name"
                                    ></el-radio>
                                </el-radio-group>
                            </div>
                            <div class="exam_examcenter_singleresult">
                                <span>正确答案：</span>
                                <span class="exam_examcenter_yourchoose" v-text="item.Question.Answer"></span>
                                <span>你的答案：</span>
                                <span v-text="item.UserAnswer"></span>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="exam_examcenter_moretest" v-if="havemore">
                    <p class="exam_examcenter_moretitle">多选题（共<span v-text="moreTopicNum"></span>题，每题<span v-text="moreTopicScore"></span>分）</p>
                    <ul>
                        <li v-for="(item, index) in moreTopicList" :key="index">
                            <div class="exam_examcenter_moreques">
                                <p><span v-text="index+1" class="exam_examcenter_morelabel"></span><span v-text="item.Question.Name"></span></p>
                            </div>
                            <div class="exam_examcenter_morechoose">
                                <el-checkbox-group v-model="moreTopicList[index].result">
                                    <el-checkbox v-for="(itemSon, index) in item.Question.QuestionsItems" :key="index" :label="itemSon.ItemFlag + '. ' + itemSon.Name"></el-checkbox>
                                </el-checkbox-group>
                            </div>
                            <div class="exam_examcenter_singleresult">
                                <span>正确答案：</span>
                                <span class="exam_examcenter_yourchoose" v-text="item.Question.Answer"></span>
                                <span>你的答案：</span>
                                <span v-text="item.UserAnswer"></span>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="exam_examcenter_shorttest" v-if="haveshort">
                    <p class="exam_examcenter_shorttitle">简答题（共<span v-text="shortTopicNum"></span>题，每题<span v-text="shortTopicScore"></span>分）</p>
                    <ul>
                        <li v-for="(item, index) in shortTopicList" :key="index">
                            <p class="exam_examcenter_shortques"><span class="exam_examcenter_shortlabel" v-text="index+1"></span><span v-text="item.Question.Name"></span></p>
                            <el-input type="textarea" v-model="item.UserAnswer"></el-input>
                            <div class="exam_examcenter_shortresult">
                                <span>正确答案：</span>
                                <span v-text="item.Question.Answer"></span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="exam_examcenter_right" ref="moveBox">
                <div class="exam_examcenter_example">
                    <p class="exam_examcenter_exampletitle"><span class="exam_examcenter_examplelabel"></span>图例</p>
                    <div class="exam_examcenter_showlist">
                        <span class="exam_examcenter_showbox"></span>
                        <span class="exam_examcenter_showexpl">已答</span>
                        <span class="exam_examcenter_showbox"></span>
                        <span class="exam_examcenter_showexpl">未答</span>
                    </div>
                </div>
                <div class="exam_examcenter_thumb">
                    <div class="exam_examcenter_thumbinner">
                        <ul>
                            <li class="exam_examcenter_topictype" v-if="havesingle">
                                <p>单选题</p>
                                <ul>
                                    <li v-for="(item, index) in singleTopicList" :key="index">
                                        <div class="exam_listbox_gray" v-text="index + 1" v-if="item.UserAnswer == '未填' ? 1 : 0"></div>
                                        <div class="exam_listbox_blue" v-text="index + 1" v-else-if="item.UserAnswer != '未填' ? 1 : 0"></div>
                                    </li>
                                </ul>
                            </li>
                            <li class="exam_examcenter_topictype" v-if="havemore">
                                <p>多选题</p>
                                <ul>
                                    <li v-for="(item, index) in moreTopicList" :key="index">
                                        <div class="exam_listbox_gray" v-text="index + 1" v-if="item.UserAnswer == '未填' ? 1 : 0"></div>
                                        <div class="exam_listbox_blue" v-text="index + 1" v-else-if="item.UserAnswer != '未填' ? 1 : 0"></div>
                                    </li>
                                </ul>
                            </li>
                            <li class="exam_examcenter_topictype" v-if="haveshort">
                                <p>简答题</p>
                                <ul>
                                    <li v-for="(item, index) in shortTopicList" :key="index">
                                        <div class="exam_listbox_gray" v-text="index + 1" v-if="item.UserAnswer == '未填' ? 1 : 0"></div>
                                        <div class="exam_listbox_blue" v-text="index + 1" v-else-if="item.UserAnswer != '未填' ? 1 : 0"></div>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="exam_examcenter_resulttable">
                    <p class="exam_examcenter_resulttitle">考试详情记录</p>
                    <div class="exam_examcenter_resultinfor">
                        <p class="exam_examcenter_resinfortitle">考试时间：</p>
                        <p class="exam_examcenter_resulwords" v-text="textTime"></p>
                        <p class="exam_examcenter_resulwords"><span class="exam_examcenter_resinfortitle">考试耗时：</span><span v-text="textUsemin"></span>分<span v-text="textUsesec"></span>秒</p>
                        <p><span class="exam_examcenter_resinfortitle">考试得分：</span><span v-text="textScore"></span><span>分</span></p>
                    </div>
                </div>
            </div>
        </div>
        <footer-fix></footer-fix>
    </div>
</template>

<script>
import { GetExamReviewInfo } from '../service/getData.js' 
import { mapState } from 'vuex'
export default {
    name: 'courseResult',
    data: function () {
        return {
            headerIndex: '5',
            examTitle: '',
            courseBelong: '',
            topicNum: 0,
            examScore: 0,
            passScore: 0,
            singleTopicNum: 0,
            singleTopicScore: 0,
            singleTopicList: [],
            singleAnswer: [],
            moreTopicNum: 0,
            moreTopicScore: 0,
            moreTopicList: [],
            shortTopicNum: 0,
            shortTopicScore: 0,
            shortTopicList: [],
            textScore: 0,
            textTime: '',
            textUsemin: 0,
            textUsesec: 0,
            havesingle: false,
            havemore: false,
            haveshort: false
        }
    },
    created () {
        this.random()
    },
    beforeDestroy () {
        sessionStorage.removeItem('TMLM')
    },
    methods: {
        formatDate (date) {  
            let y = date.getFullYear()
            let m = date.getMonth() + 1
            m = m < 10 ? ('0' + m) : m
            let d = date.getDate()
            d = d < 10 ? ('0' + d) : d
            let h = date.getHours()
            let minute = date.getMinutes()
            minute = minute < 10 ? ('0' + minute) : minute
            let second = date.getSeconds()
            second = second < 10 ? ('0' + second) : second
            return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second
        },
        async random () {
            let exam = JSON.parse(sessionStorage.getItem('fade'))
            let msg = null
            if (exam) {
                msg = await GetExamReviewInfo({
                    Exam_id: exam.EXAMID, // 最后修改为exam.EXAMID
                    ExamDetailId: exam.EXAMRESULT
                })
            } else {
                msg = await GetExamReviewInfo({
                    Exam_id: this.$route.query.EXAMID, // 最后修改为exam.EXAMID
                    ExamDetailId: this.$route.query.EXAMRESULT
                })
            }
            // 基础信息
            console.log(msg)
            if (msg.Type == 0) {
                this.$alert(msg.Message, '提示：', {
                    confirmButtonText: '确定',
                    callback: action => {
                        window.close()
                    }
                })
            }
            this.examTitle = msg.Data.Exam.Name
            this.courseBelong = msg.Data.Exam.CourseName ? msg.Data.Exam.CourseName : '无'
            this.topicNum = msg.Data.Type0Questions.length + msg.Data.Type1Questions.length + msg.Data.Type2Questions.length + msg.Data.Type3Questions.length + msg.Data.Type4Questions.length
            this.examScore = msg.Data.Exam.TotalScore
            this.passScore = msg.Data.Exam.PassingScore
            this.textScore = msg.Data.UserExamDetail.Score
            // 题目信息
            this.singleTopicList = msg.Data.Type1Questions
            if (this.singleTopicList.length != 0) {
                this.singleTopicList.forEach((item, index) => {
                    if (!item.UserAnswer) {
                        item.UserAnswer = '未填'
                    }
                })
                this.singleTopicNum = this.singleTopicList.length
                this.singleTopicScore = this.singleTopicList[0].Question.Score
                this.havesingle = true
            }
            
            this.moreTopicList = msg.Data.Type2Questions
            if (this.moreTopicList.length != 0) {
                this.moreTopicList.forEach((item, index) => {
                    this.$set(item, 'result', [])
                    if (!item.UserAnswer) {
                        item.UserAnswer = '未填'
                    }
                })
                this.moreTopicNum = this.moreTopicList.length
                this.moreTopicScore = this.moreTopicList[0].Question.Score
                this.havemore = true
            }
            
            this.shortTopicList = msg.Data.Type3Questions
            if (this.shortTopicList.length != 0) {
                this.shortTopicList.forEach((item, index) => {
                    this.$set(item, 'result', [])
                    if (!item.UserAnswer) {
                        item.UserAnswer = '未填'
                    }
                })
                this.shortTopicNum = this.shortTopicList.length
                this.shortTopicScore = this.shortTopicList[0].Question.Score
                this.haveshort = true
            }            
            
            this.textUsemin = Math.floor(msg.Data.UserExamDetail.Time / 60)
            this.textUsesec = msg.Data.UserExamDetail.Time % 60
            let endTime = Math.floor(new Date(msg.Data.UserExamDetail.CreateDate).getTime() / 1000)
            let spend = (endTime - msg.Data.UserExamDetail.Time) * 1000
                spend = new Date(spend)
                spend = this.formatDate(spend)
            let submitTime = new Date(msg.Data.UserExamDetail.CreateDate)
                submitTime = this.formatDate(submitTime)
                submitTime = submitTime.substr(11, 8)
            this.textTime = spend + ' - ' + submitTime  
        }
    },
    computed: {
        ...mapState(['examId', 'examResultValue'])
    },
    beforeRouteLeave (to, from, next) {
        if (to.path == '/examInfor') {
            this.$message({
                message: '您已经完成这次考试了！',
                type: 'error'
            })
            this.$router.push({ path: '/examResult' })
        } else {
            next()
        }
    }
}
</script>

<style lang="scss">
@import '../style/mixin.scss';
.exam_resultpage{
    .exam_resultexamcenter{
        width: 1202px;
        position: relative;
        margin: 20px auto 0;
        @extend %clearFix;
        .exam_examcenter_left{
            background: #fff;
            float: left;
            width: 895px;
            h1{
                text-align: center;
                margin:30px 0 15px;

            }
            .exam_examcenter_course{
                text-align: center;
                color: #888;
                margin-bottom:32px;
            }
            .exam_examcenter_infor{
                width: 853px;
                height: 53px;
                border-radius: 3px;
                background: #efefef;
                margin: 0 auto;
                @extend %clearFix;
                .exam_examcenter_inforleft{
                    float: left;
                    padding-left: 20px;
                    line-height: 53px;
                }
                .exam_examcenter_inforright{
                    float:right;
                    padding-right: 36px;
                    line-height: 53px;
                    .exam_examscores{
                        font-size: 22px;
                        color:#f00;
                    }
                }
            }
            .exam_examcenter_singletest{
                width: 815px;
                margin: 40px auto 0;
                .exam_examcenter_singletitle{
                    font-size: 16px;
                    font-weight: bold;
                    color:#0e6bd0;
                }
                ul{
                    li{
                        padding: 30px 0;
                        border-bottom: 1px dashed #cecece;
                        .exam_examcenter_singleques{
                            line-height: 22px;
                            padding-left: 29px;
                            position: relative;
                            .exam_examcenter_singlelabel{
                                width:22px;
                                height:22px;
                                line-height: 22px;
                                border-radius: 3px;
                                background:#4a96ed;
                                text-align: center;
                                color:#fff;
                                position: absolute;
                                top:0;
                                left:0;
                            }
                        }
                        .exam_examcenter_singlechoose{
                            margin: 16px 0 0 32px;
                        }
                        .exam_examcenter_singleresult{
                            margin-top: 20px;
                            margin-left: 30px;
                            color: #f00;
                            .exam_examcenter_yourchoose{
                                margin-right: 28px;
                            }
                        }
                        &:first-of-type{
                            padding-top:22px
                        }
                    }        
                }
            }
            .exam_examcenter_moretest{
                width: 815px;
                margin: 40px auto 0;
                .exam_examcenter_moretitle{
                    font-size: 16px;
                    font-weight: bold;
                    color:#0e6bd0;
                }
                ul{
                    li{
                        padding: 30px 0;
                        border-bottom: 1px dashed #cecece;
                        .exam_examcenter_moreques{
                            line-height: 22px;
                            padding-left: 29px;
                            position: relative;
                            .exam_examcenter_morelabel{
                                width:22px;
                                height:22px;
                                line-height: 22px;
                                border-radius: 3px;
                                background:#4a96ed;
                                text-align: center;
                                color:#fff;
                                position: absolute;
                                top:0;
                                left:0;
                            }
                        }
                        .exam_examcenter_morechoose{
                            margin: 16px 0 0 32px;
                        }
                        .exam_examcenter_singleresult{
                            margin-top: 20px;
                            margin-left: 30px;
                            color: #f00;
                            .exam_examcenter_yourchoose{
                                margin-right: 28px;
                            }
                        }
                        &:first-of-type{
                            padding-top:22px
                        }
                    }
                }
            }
            .exam_examcenter_shorttest{
                width: 815px;
                margin: 40px auto 0;
                padding-bottom: 16px;
                .exam_examcenter_shorttitle{
                    font-size: 16px;
                    font-weight: bold;
                    color:#0e6bd0;
                }
                ul{
                    li{
                        padding-top: 20px;
                        .exam_examcenter_shortques{
                            line-height: 22px;
                            padding-left: 29px;
                            position: relative;
                            margin-bottom: 20px;
                            .exam_examcenter_shortlabel{
                                width:22px;
                                height:22px;
                                line-height: 22px;
                                border-radius: 3px;
                                background:#4a96ed;
                                text-align: center;
                                color:#fff;
                                position: absolute;
                                top: 0;
                                left: 0;
                            }
                        }
                        .el-textarea__inner{
                            height: 115px;
                            padding: 20px 18px;
                            resize: none;
                        }
                        .exam_examcenter_shortbutton{
                            @extend %clearFix;
                            padding-top:20px;
                            button{
                                float: right;
                                width: 106px;
                                height: 32px;
                                border: 0;
                                color:#fff;
                                background:#4a96ed;
                                border-radius: 3px;
                                cursor:pointer
                            }
                        }
                        .exam_examcenter_shortresult{
                            margin-top: 20px;
                            margin-left: 15px;
                            color: #f00;
                            .exam_examcenter_yourchoose{
                                margin-right: 28px;
                            }
                        }
                    }
                }
            }
        }
        .exam_examcenter_right{
            float:left;
            margin-left:20px;
            transition: 0.3s;
            .exam_examcenter_example{
                width: 287px;
                background:#fff;
                padding: 30px 0;
                margin-bottom:20px;
                .exam_examcenter_exampletitle{
                    width: 247px;
                    margin:0 auto;
                    font-size: 16px;
                    font-weight: bold;
                    .exam_examcenter_examplelabel{
                        display: inline-block;
                        width: 17px;
                        height: 17px;
                        margin-right: 9px;
                        background:url('../assets/exam-moredepart.png');
                        position: relative;
                        top:3px;
                    }
                }
                .exam_examcenter_showlist{
                    margin: 19px 19px 0; 
                    @extend %clearFix;
                    span{
                        height: 24px;
                        line-height: 24px;
                        float:left;
                    }
                    .exam_examcenter_showexpl{
                        margin-right: 23px;
                    }
                    .exam_examcenter_showbox{
                        width: 24px;
                        border-radius: 3px;
                        margin-right: 9px;
                        display: inline-block;
                        &:first-of-type{
                            background:#4a96ed;
                        }
                        &:nth-of-type(3){
                            background:#ddd;
                        }
                    }
                }
            }
            .exam_examcenter_thumb{
                padding: 30px 20px 40px;
                width:287px;
                overflow: hidden;
                box-sizing: border-box;
                background:#fff;
                .exam_examcenter_thumbinner{
                    box-sizing: border-box;
                    .el-scrollbar{
                        height:100%;
                    }
                    .el-scrollbar__wrap {
                        overflow-x: hidden;
                    }
                    .el-scrollbar__thumb{
                        background:#368474;
                        width:4px;
                        border-radius: 0;
                    }
                    .is-horizontal{
                        display:none;
                    }
                    .exam_examcenter_topictype{
                        width:247px;
                        margin-bottom: 10px;
                        p{
                            font-size: 16px;
                            margin-bottom: 20px;
                        }
                        ul{
                            @extend %clearFix;
                            li{
                                float:left;
                                margin: 0 11px 20px 0;
                                .exam_listbox_gray{
                                    width: 24px;
                                    height: 24px;
                                    line-height: 24px;
                                    border-radius: 3px;
                                    text-align: center;
                                    background:#ddd;
                                    
                                }
                                .exam_listbox_blue{
                                    width: 24px;
                                    height: 24px;
                                    line-height: 24px;
                                    border-radius: 3px;
                                    text-align: center;
                                    background: #4a96ed;
                                    color:#fff;
                                }
                            }
                        }
                    }
                }
            }
            .exam_examcenter_resulttable{
                width:287px;
                margin-top: 20px;
                padding: 30px 20px 0;
                box-sizing: border-box;
                background:#fff;
                .exam_examcenter_resulttitle{
                    font-size: 16px;
                    margin-bottom: 20px;
                }
                .exam_examcenter_resultinfor{
                    padding-bottom: 30px;
                    .exam_examcenter_resinfortitle{
                        color: #acacac;
                    }
                    .exam_examcenter_resulwords{
                        color:#000;
                        margin-top: 3px;
                        margin-bottom: 16px;
                    }
                }
                
            }
        }
    }
}
</style>
