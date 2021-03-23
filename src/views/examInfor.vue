<template>
    <div class="exam_examinfor" ref="windowbox" oncontextmenu="window.event.returnValue=false" onselectstart="return false" oncopy="return false;" oncut="return false;">
        <div class="exam_windowshadow" v-show="windowshadow">
            <div class="exam_windowshadow_center">
                <p>是否确定提交试卷？<span v-if="checkFlag">(该类考试为手动阅卷，请等待批改)</span></p>
                <div class="exam_windowshadow_buttondepart">
                    <button type="button" @click.once="submitInfor()">是</button>
                    <button type="button" @click="reback()">否</button>
                </div>
            </div>
        </div>
        <header-fix :active-index="headerIndex"></header-fix>
        <div class="exam_exambody">
            <div>
                <img src="../assets/exam-banner.png" alt="">
            </div>
            <div class="exam_examcenter">
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
                            <span class="exam_examcenter_clock"></span>
                            <span v-text="minutesLimited"></span>：<span v-text="secoundLimited"></span>
                        </div>
                    </div>
                    <div class="exam_examcenter_singletest" v-if="havesingle">
                        <p class="exam_examcenter_singletitle">单选题（共<span v-text="singleTopicNum"></span>题，每题<span v-text="singleTopicScore"></span>分）</p>
                        <ul>
                            <li v-for="(item, faindex) in singleTopicList" :key="faindex">
                                <div class="exam_examcenter_singleques">
                                    <p><span class="exam_examcenter_singlelabel" v-text="faindex+1"></span><span v-text="item.Name"></span></p>
                                </div>
                                <div class="exam_examcenter_singlechoose">
                                    <el-radio-group v-model="singleAnswer[faindex]">
                                        <el-radio 
                                        v-for="(sonItem, index) in item.QuestionsItems" 
                                        :key="index"
                                        :label="sonItem.ItemFlag + '. ' + sonItem.Name"
                                        ></el-radio>
                                    </el-radio-group>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="exam_examcenter_moretest" v-if="havemore">
                        <p class="exam_examcenter_moretitle">多选题（共<span v-text="moreTopicNum"></span>题，每题<span v-text="moreTopicScore"></span>分）</p>
                        <ul>
                            <li v-for="(item, index) in moreTopicList" :key="index">
                                <div class="exam_examcenter_moreques">
                                    <p><span v-text="index+1" class="exam_examcenter_morelabel"></span><span v-text="item.Name"></span></p>
                                </div>
                                <div class="exam_examcenter_morechoose">
                                    <el-checkbox-group v-model="moreTopicList[index].result">
                                        <el-checkbox v-for="(itemSon, index) in item.QuestionsItems" :key="index" :label="itemSon.ItemFlag + '. ' + itemSon.Name"></el-checkbox>
                                    </el-checkbox-group>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="exam_examcenter_shorttest" v-if="haveshort">
                        <p class="exam_examcenter_shorttitle">简答题（共<span v-text="shortTopicNum"></span>题，每题<span v-text="shortTopicScore"></span>分）</p>
                        <ul>
                            <li v-for="(item, index) in shortTopicList" :key="index">
                                <p class="exam_examcenter_shortques"><span class="exam_examcenter_shortlabel" v-text="index+1"></span><span v-text="item.Name"></span></p>
                                <el-input type="textarea" v-model="shortAnswer[index]"></el-input>
                                <div class="exam_examcenter_shortbutton">
                                    <button type="button" @click="localSave(index)">保存答案</button>
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
                            <el-scrollbar>
                                <ul>
                                    <li class="exam_examcenter_topictype" v-if="havesingle">
                                        <p>单选题</p>
                                        <ul>
                                            <li v-for="(item, index) in singleTopicList" :key="index">
                                                <div class="exam_listbox_gray" v-text="index + 1" v-if="singleAnswer[index] == null ? 1 : 0"></div>
                                                <div class="exam_listbox_blue" v-text="index + 1" v-else-if="singleAnswer[index] != null ? 1 : 0"></div>
                                            </li>
                                        </ul>
                                    </li>
                                    <li class="exam_examcenter_topictype" v-if="havemore">
                                        <p>多选题</p>
                                        <ul>
                                            <li v-for="(item, index) in moreTopicList" :key="index">
                                                <div class="exam_listbox_gray" v-text="index + 1" v-if="moreTopicList[index].result.length == 0 ? 1 : 0"></div>
                                                <div class="exam_listbox_blue" v-text="index + 1" v-else-if="moreTopicList[index].result.length != 0 ? 1 : 0"></div>
                                            </li>
                                        </ul>
                                    </li>
                                    <li class="exam_examcenter_topictype" v-if="haveshort">
                                        <p>简答题</p>
                                        <ul>
                                            <li v-for="(item, index) in shortTopicList" :key="index">
                                                <div class="exam_listbox_gray" v-text="index + 1" v-if="shortAnswer[index] == undefined || shortAnswer[index].length == 0 || shortAnswer[index] == null ? 1 : 0"></div>
                                                <div class="exam_listbox_blue" v-text="index + 1" v-else-if="shortAnswer[index].length > 0 ? 1 : 0"></div>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </el-scrollbar>
                        </div>
                        <div class="exam_examcenter_submit" @click="submitAnswer()">提交试卷</div>
                    </div>
                </div>
            </div>
        </div>
        <footer-fix></footer-fix>
    </div>
</template>

<script>
import { GetExamInfo, PostExam } from '../service/getData'
import { mapState, mapMutations } from 'vuex'
export default {
    name: 'courseInfor',
    data: function () {
        return {
            headerIndex: '5',
            EXAM_ID: this.$route.query.Id,
            examTitle: '',
            courseBelong: '',
            // 题目数
            topicNum: 0,
            // 总分
            examScore: 0,
            // 及格分
            passScore: 0,
            // 限制时间
            TimeLimits: '',
            minutesLimited: '00',
            secoundLimited: '00',
            timerRobot: '',
            // 单选题内容
            singleTopicNum: 0,
            singleTopicScore: 0,
            // 多选题内容
            moreTopicNum: 0,
            moreTopicScore: 0,
            // 简答题内容
            shortTopicNum: 0,
            shortTopicScore: 0,
            // 单选题列表
            singleTopicList: [],
            // 单选题答案
            singleAnswer: [],
            // 多选题列表
            moreTopicList: [],
            // 多选题答案
            moreAnswer: [],
            // 简答题题目
            shortTopicList: [],
            // 简答题答案
            shortAnswer: [],
            timer: null,
            windowshadow: 0,
            Ticket: '',
            timeStore: 0,
            havesingle: false,
            havemore: false,
            haveshort: false,
            checkFlag: ''
        }
    },
    created () {
        this.random()
    },
    mounted () {
        window.addEventListener('scroll', this.scrollToTop)
        window.addEventListener('beforeunload', this.reloadTest)
        this.scrollToTop()   
    },
    beforeDestroy () {
        clearInterval(this.timerRobot)
        this.timer = null
        this.deleteStorage()  
        window.removeEventListener('beforeunload', this.reloadTest)
        window.removeEventListener('scroll', this.scrollToTop)
    },
    methods: {
        ...mapMutations(['GET_EXAMID', 'GET_EXAMRESULT', 'SET_EXAMVALUE']),
        makedouble () {
            let secound = this.secoundLimited - 1
            if (secound < 10) {
                this.secoundLimited = '0' + secound 
                return false
            }
            this.secoundLimited = secound
        },
        scrollToTop () {
            if (document.documentElement.scrollTop > 283) {
                this.$refs.moveBox.style.cssText = 'position:absolute;top:' + (document.documentElement.scrollTop - 283 + 25) + 'px;right:0;'
            } else if (document.documentElement.scrollTop < 283) {
                this.$refs.moveBox.style.cssText = ''
            }
            if (document.documentElement.scrollTop + document.documentElement.clientHeight >= document.body.clientHeight - 125) {
                this.$refs.moveBox.style.cssText = 'position:absolute; bottom:0; right:0;'
            }
        },
        deleteStorage () {
            sessionStorage.removeItem('examId')
        },
        localSave (index) {
            let historys = JSON.parse(localStorage.getItem('answer'))
            if (historys == undefined) {
                const arr = []
                this.shortTopicList.forEach((item, index) => {
                    arr.push({ result: '#nothing!' })
                })
                arr[index].result = this.shortAnswer[index]
                localStorage.setItem('answer', JSON.stringify(arr))
            } else {
                historys[index].result = this.shortAnswer[index]
                localStorage.setItem('answer', JSON.stringify(historys))
            }
            this.$message({
                message: '答案保存成功！',
                type: 'success'
            })
        },
        localGet () {
            let historys = JSON.parse(localStorage.getItem('answer'))
            if (historys == undefined) {
                return
            }
            historys.forEach((item, index) => {
                if (item != '#nothing!') {
                    this.shortAnswer[index] = item.result
                }
            })
        },
        stopMove (event) {
            const e = window.event || event
            e.preventDefault()
        },
        submitAnswer () {
            this.windowshadow = 1
            let body = document.querySelector('.exam_examinfor')
            body.addEventListener('mousewheel', this.stopMove, false)
        },
        reback () {
            this.windowshadow = 0
            let body = document.querySelector('.exam_examinfor')
            body.removeEventListener('mousewheel', this.stopMove, false)
        },
        reloadTest (event) {
            let e = window.event || event
            e.returnValue = '刷新网页之后会导致未保存的答案消失！！'
            return '刷新网页之后会导致未保存的答案消失！！'
        },
        makeTimeLimited () {
            let timer = sessionStorage.getItem('TMLM')
            let endTimer
            if (timer) {
                endTimer = timer
            } else {
                endTimer = new Date().getTime()
                endTimer = this.TimeLimits * 60 * 1000 + endTimer
                endTimer = new Date(endTimer)
                sessionStorage.setItem('TMLM', endTimer)
            }
            let now = new Date().getTime()
            endTimer = new Date(endTimer).getTime()
            let remain = (endTimer - now) / 1000
            if (remain >= 0) {
                this.minutesLimited = Math.floor(remain / 60 % 60)
                this.secoundLimited = Math.floor(remain % 60)
                if (this.minutesLimited < 10) {
                    this.minutesLimited = '0' + this.minutesLimited
                }
                if (this.secoundLimited < 10) {
                    this.secoundLimited = '0' + this.secoundLimited
                } 
            } else {
                clearInterval(this.timerRobot)
                this.$message({
                    message: '时间到！自动提交试卷！',
                    type: 'warning'
                })
                this.submitInfor()
            }
        },
        async random () {
            let msg = await GetExamInfo({
                Exam_id: this.EXAM_ID
            })
            console.log(msg)
            if (msg.IsSuccess == false) {
                this.$alert(msg.Message, '错误', {
                confirmButtonText: '确定',
                callback: action => {
                    window.removeEventListener('beforeunload', this.reloadTest)
                    window.close()
                }
                })
                return
            }
            this.examTitle = msg.Data.Exam.Name
            this.Ticket = msg.Data.Ticket
            this.checkFlag = msg.Data.Exam.CheckFlag
            this.courseBelong = msg.Data.Exam.CourseName == undefined ? '无' : msg.Data.Exam.CourseName
            this.topicNum = msg.Data.Type0Questions.length + msg.Data.Type1Questions.length + msg.Data.Type2Questions.length + msg.Data.Type3Questions.length + msg.Data.Type4Questions.length
            this.examScore = msg.Data.Exam.TotalScore
            this.passScore = msg.Data.Exam.PassingScore
            this.TimeLimits = msg.Data.Exam.TimeLimit
            this.singleTopicList = msg.Data.Type1Questions
            if (this.singleTopicList.length != 0) {
                this.singleTopicNum = this.singleTopicList.length
                this.singleTopicScore = this.singleTopicList[0].Score
                this.havesingle = true
            }
            
            this.moreTopicList = msg.Data.Type2Questions
            if (this.moreTopicList.length != 0) {
                this.moreTopicList.forEach((item, index) => {
                    this.$set(item, 'result', [])
                })
                this.moreTopicNum = this.moreTopicList.length
                this.moreTopicScore = this.moreTopicList[0].Score
                this.havemore = true
            }
            
            this.shortTopicList = msg.Data.Type3Questions
            if (this.shortTopicList.length != 0) {
                this.shortTopicNum = this.shortTopicList.length
                this.shortTopicScore = this.shortTopicList[0].Score
                this.haveshort = true
            }
            
            this.localGet()
            if (this.TimeLimits > 0) {
                this.timerRobot = setInterval(this.makeTimeLimited, 1000) 
            } else {
                this.minutesLimited = '∞'
                this.secoundLimited = '∞'
            }
        },
        async submitInfor () {
            const arr = []
            const single = []
            const more = []
            const short = []
            this.singleTopicList.forEach((item, index) => {
                if (this.singleAnswer[index]) {
                    single[index] = this.singleAnswer[index].substr(0, 1)
                } else {
                    single[index] = ''
                }
                arr.push({
                    QuestionId: item.Id,
                    Answer: single[index]
                })
            })
            this.moreTopicList.forEach((item, index) => {
                item.result.sort()
                if (item.result) {
                    item.result.forEach((item, sonIndex) => {
                        if (sonIndex == 0) {
                            more[index] = item.substr(0, 1)
                        } else {
                            more[index] = more[index] + item.substr(0, 1)
                        }
                    })
                } else {
                    more[index] = ''
                }
                arr.push({
                    QuestionId: item.Id,
                    Answer: more[index] == undefined ? '' : more[index]
                })
            })
            this.shortTopicList.forEach((item, index) => {
                if (this.shortAnswer[index]) {
                    short[index] = this.shortAnswer[index]
                } else {
                    short[index] = ''
                }
                arr.push({
                    QuestionId: item.Id,
                    Content: short[index]
                })
            })
            let now = new Date().getTime()
            let end = sessionStorage.getItem('TMLM')
                end = new Date(end).getTime()  
            let spendTime = (end - now) / 1000
            if (spendTime > 0) {
                spendTime = Math.floor(this.TimeLimits * 60 - spendTime)
            } else if (spendTime <= 0) {
                spendTime = this.TimeLimits * 60
            }
            let msg = await PostExam({
                ExamId: this.EXAM_ID, // this.EXAM_ID最后修改
                Ticket: this.Ticket,
                PassExam: '',
                Time: spendTime,
                Data: arr
            })
            console.log(msg)
            if (msg.Type == 1) {
                console.log(msg.Value)
                this.windowshadow = 0

                if (msg.Value == 0) {
                    this.$alert('交卷成功,该试卷不显示结果', '提示：', {
                        confirmButtonText: '确定',
                        callback: action => {
                            window.removeEventListener('beforeunload', this.reloadTest)
                            window.close()
                        }
                    })
                    return false
                } 

                if (!this.checkFlag) {
                    this.GET_EXAMID(this.EXAM_ID)
                    this.GET_EXAMRESULT(msg.Value) // 获取后端返回状态码
                    let textmsg = {
                        EXAMID: this.examId,
                        EXAMRESULT: this.examResultValue
                    }
                    localStorage.removeItem('answer')
                    sessionStorage.setItem('fade', JSON.stringify(textmsg))
                    window.removeEventListener('beforeunload', this.reloadTest) // 取消属性提醒监听
                    this.$router.push({ path: '/examResult' })
                } else {
                    this.$alert('交卷成功,请等待阅卷', '提示：', {
                        confirmButtonText: '确定',
                        callback: action => {
                            window.removeEventListener('beforeunload', this.reloadTest)
                            window.close()
                        }
                    })
                }
            } else {
                this.$message.warning(msg.Message)
                // return
            }
        }
    },
    computed: {
        ...mapState(['examId', 'examResultValue'])
    },
    beforeRouteLeave (to, from, next) {
        if (to.path == '/examResult' || to.path == '/userLogin') {
            next()
        } else {
            this.$confirm('是否离开本次考试界面？离开将会上交考试答案', '提示', {
                confirmButtonText: '离开',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                sessionStorage.removeItem('TMLM')
                next()
            })
        }
    }
}
</script>

<style lang="scss">
@import '../style/mixin.scss';
.exam_examinfor{
    .exam_windowshadow{
        position: fixed;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.3);
        z-index: 15;
        .exam_windowshadow_center{
            width: 331px;
            height: 190px;
            background: #fff;
            border-radius: 3px;
            padding-top: 55px;
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            margin: auto;
            box-sizing: border-box;
            p{
                text-align: center;
                font-size: 16px;
                margin-bottom:30px; 
            }
            .exam_windowshadow_buttondepart{
                width:208px;
                margin: 0 auto;
                button{
                    width:80px;
                    height:32px;
                    border:2px solid #0e6bd0;
                    border-radius: 3px;
                    line-height: 36px;
                    text-align: center;
                    cursor: pointer;

                    @extend %clearFix;

                    &:first-of-type{
                        background:#0e6bd0;
                        color:#fff;
                        float:left;
                    }
                    &:last-of-type{
                        background:#fff;
                        color:#0e6bd0;
                        float:right;
                    }
                }
            }
            
        }
    }
    .exam_exambody{
        .exam_examcenter{
            width: 1202px;
            min-height: 575px;
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
                        .exam_examcenter_clock{
                            width:20px;
                            height:20px;
                            margin-right: 8px;
                            background: url('../assets/exam-clock.png');
                            position: relative;
                            top:4px;
                            display: inline-block;
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
                        height: 305px;
                        box-sizing: border-box;
                        overflow: auto;
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
                    .exam_examcenter_submit{
                        width: 247px;
                        height: 46px;
                        line-height: 46px;
                        margin-top: 10px;
                        color:#fff;
                        text-align: center;
                        background:#4a96ed;
                        border-radius: 3px;
                        cursor:pointer;
                    }
                }
            }
        }
    }
}
</style>
