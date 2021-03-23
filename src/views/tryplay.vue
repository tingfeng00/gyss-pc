<template>
    <div class="tryplay">
         <div style="display:none" class="getToken"></div>
        <div class="main clearfix">
            <div class="video l" id="video">
                <div id="myplayer" ref="myplayer" v-if="showPlayMp4"></div>
                <div id="h5" v-if="showPlayH5">
                    <iframe v-if="isH5" frameborder="0" :src="H5src"></iframe>
                    <img v-if="!isH5" :src="H5src" alt="">
                </div>
                <div id="JY" v-if="showPlayJy">
                    <iframe frameborder="0" :src="jyIframeSrc"></iframe>
                </div>
                <div id="multiMedia" v-if="showPlayMultiMedia">
                    <iframe frameborder="0" :src="multiMediaSrc"></iframe>
                </div>
                <div id="nativeCourse" v-if="showPlayNative">
                    <iframe frameborder="0" :src="nativeSrc" ></iframe>
                </div>
                <div id="pdfCourse" v-if="showPlayPdf">
                    <div class="pdfVideo">
                        <iframe :src="pdfSrc" frameborder="0"></iframe>
                    </div>
                </div>
                <div id="Scorm" v-if="showPlayScorm">
                    <iframe frameborder="0" :src="scormIframeSrc"></iframe>
                </div>
                <div id="JyScorm" v-if="showPlayJyScorm">
                    <iframe frameborder="0" :src="jyScormSrc"></iframe>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Play, PlayJY, PlayJwplay, AntiForgeryToken } from '../service/getData'
import Api from '../service/api'
// import Axios from 'axios'
// import Vue from 'vue'
import fetch from '../service/fetch'
// import { formatDate, rsaEnscrypt } from '../plugins/utils'

export default {
    data () {
        return {
            videoSrc: '',
            id: '',
            // valueStar: 0,
            // valueStar2: 0,
            // boxValue: 0,
            // colors: ['#ea544a', '#ea544a', '#ea544a'],
            // noteShow: true,
            // dialogVisible: false,
            // commentShow: false,
            noFullScreen: true,
            // noteTitle: '',
            // noteText: '',
            userId: '',
            allPlayInfo: {},
            // commentList: [],
            commentText: '',
            // noteList: [],
            loadOnce: 0,
            browseScore: 0,
            play: '',
            playType: '',
            playUrl: {},
            options: '',
            // resultCourseDetail: {},
            // resultCourseNote: {},
            player: null,
            playMp4Data: {},
            params: null,
            listStr: '',
            timeStack: [],
            // questionObj: {},
            // question: {},
            questionItem: [],
            MportalId: '',
            // MlastPosition: '',
            // MlastLocation: '',
            // checkedAnswer: 0,
            urls: '',
            MuserId: '',
            McourseId: '',
            // increaseTimer: null,
            // MprocessCheckTimer: null,
            trailTimer: null,
            playStatus: 'stop',
            // MtimePool: {
            //     startTime: 0,
            //     increaseTime: 0,
            //     totalTime: 0
            // },
            // k: 0,
            // timerI: null,
            // jwwarning: null,
            AntiForgeryToken: '',
            // courseCommentList: [],
            checkedIndex: '',
            position1: '',
            showPlayMp4: false,
            showPlayJy: false,
            jyIframeSrc: '',
            showPlayScorm: false,
            scormIframeSrc: '',
            showPlayPdf: false,
            pdfSrc: '', // pdf文件地址
            showPlayJyScorm: false,
            jyScormSrc: '',
            showPlayMultiMedia: false,
            multiMediaSrc: '',
            showPlayNative: false,
            nativeSrc: false,
            showPlayH5: false,
            H5src: '',
            isH5: false,
            H5time: 0
        }
    },
     mounted () {
        this.getAntiForgeryToken()
        this.getVideo()
        // this.getCourseComment()
    },
    created () {
        this.id = this.$route.query.Id
        // this.pdfSrc = pdf.createLoadingTask(this.pdfSrc)
    },
    methods: {
         async getVideo () {
            let response = await Play({ id: this.id })
            if (response.Status == 200) {
                this.allPlayInfo = response.Data
                this.videoSrc = response.Data.PlayPage
                this.userId = response.Data.UserId
                this.noteList = response.Data.resultCourseNote
                // console.log(this.allPlayInfo, 11)
                // console.log(this.videoSrc, 22)
                // console.log(this.userId, 33)
                // console.log(this.noteList, 44)
                // this.beforeUnLoad(this.userId)
                if (response.Data && response.Data.Content == null) {
                    // console.log(45646)
                    if ((response.Data.PortalId) && (response.Data.UserId) && (response.Data.CourseId)) {
                        // refresh
                        // if (this.loadOnce == 0) {
                        //     this.refresh(this.allPlayInfo.PortalId, this.allPlayInfo.UserId, this.allPlayInfo.CourseId)
                        //     this.loadOnce = 1
                        // }
                        this.options = response.Data.PlayPage
                        this.playUrl.url = response.Data.PlayPage
                        this.playType = response.Data.PlayType
                        this.resultCourseDetail = response.Data.resultCourseDetail
                        this.resultCourseNote = response.Data.resultCourseNote
                        this.browseScore = Number(response.Data.resultCourseDetail.BrowseScore)
                        this.valueStar = response.Data.resultCourseDetail.StudentGrade
                        console.log(this.valueStar)
                        if (this.playType == 'Single') {
                            this.showPlayMp4 = true
                        } else if (this.playType == 'JYAicc') {
                            this.showPlayJy = true
                        } else if (this.playType == 'Scorm') {
                            this.showPlayScorm = true
                        } else if (this.playType == 'Office') {
                            this.showPlayPdf = true
                        } else if (this.playType == "JYScorm") {
                            this.showPlayJyScorm = true
                        } else if (this.playType == "VR" || this.playType == "H5RichCourse") {
                            this.showPlayMultiMedia = true
                        } else if (this.playType == "NativeRichCourse") {
                            this.showPlayNative = true
                        } else if (this.playType == "H5") {
                            this.showPlayH5 = true
                        }
                    } else {
                        alert('数据无效，请检查api')
                        window.close()
                    }
                } else if (response.Data && response.Data.Content) {
                    alert('同时只能打开一门课程,请关闭之前页面,并于' + response.Data.Content + '秒后重试！')
                    window.close()
                }
                this.getVideoData()
            } else {
                alert(response.Message)
                window.close()
            }
        },
        async getAntiForgeryToken () {
            let data = await AntiForgeryToken()
            let html = data.Data.html
            let anti = document.querySelectorAll('.getToken')
            anti[0].insertAdjacentHTML('beforeend', html)
            this.AntiForgeryToken = document.querySelectorAll('.getToken input')[0].value
        },
        beforeUnLoad (id) {
            fetch.post(Api.ClearPlayingCourse.url + '?' + Math.round(Math.random() * 10000), { userid: id }).then({
                function (response) {
                }
            })
        },
        initVideo (url) {
            console.log(url)
            // eslint-disable-next-line
            this.player = jwplayer('myplayer').setup({
                flashplayer: '../plugins/jwplayer/jwplayer.flash.swf',
                file: url,
                autostart: 'true',
                width: '100%',
                height: '100%'
            })
            setTimeout(() => {
                 this.player.play(true)
            }, 2000)
           
            // this.initPlay()
            // this.timerI = setInterval(this.func_, 1000)
        },
        getVideoData () {
            if (this.playType == 'Single') {
                this.getMp4Data()
            } else if (this.playType == 'JYAicc') {
                this.getJYData()
            } else if (this.playType == 'Scorm') {
                this.getScormData()
            } else if (this.playType == 'Office') {
                this.getPdfData()
            } else if (this.playType == "JYScorm") {
                this.getJYScormData()
            } else if (this.playType == "VR" || this.playType == "H5RichCourse") {
                this.getVRHCData()
            } else if (this.playType == "NativeRichCourse") {
                this.getNRCData()
            } else if (this.playType == "H5") {
                this.getH5Data()
            }
        },
        async getMp4Data () {
            let response = await PlayJwplay({ courseid: this.allPlayInfo.CourseId })
            this.playMp4Data = response.Data
            this.MportalId = response.Data.PortalId
            this.urls = response.Data.Urls
            this.MuserId = response.Data.UserId
            this.McourseId = response.Data.courseId
            this.MlastPosition = response.Data.LastPostion
            this.MlastLocation = response.Data.Location
            this.question = response.Data.Question
            this.question.map((item) => {
                this.timeStack.push(item.time)
                this.questionObj[item.time] = item
            })
            this.initVideo(this.playMp4Data.Url)
        },
        async getJYData () {
            let response = await PlayJY({ Id: this.allPlayInfo.CourseId })
            // let playMJyData = response.Data
            let BatchId = response.Data.BatchId
            let CourseId = response.Data.CourseId
            // let LastPostion = response.Data.LastPostion
            let PortalId = response.Data.PortalId
            let PortalURL = response.Data.PortalURL
            let Url = response.Data.Url
            let UserId1 = response.Data.UserId
            this.jyIframeSrc = Url + '?url=' + PortalURL + '/api/CourseProcess/JYProcess?batchId=' + BatchId + '&portalId=' + PortalId + '&UserId=' + UserId1 + '&courseId=' + CourseId
            console.log(this.jyIframeSrc)
            if (!PortalId || !UserId1 || !CourseId) {
                alert('数据无效，请检查api')
                window.close()
            } else if (!Url || !PortalURL) {
                alert('没有视频资源!')
                window.close()
            }
        },
        async getH5Data () {
            let response = await PlayJwplay({ courseid: this.allPlayInfo.CourseId })
            if (response.Data.Url.indexOf('.html') > -1) {
                this.isH5 = true
            } else {
                this.isH5 = false
            }
            this.H5src = response.Data.Url
            this.PortalId = response.Data.PortalId
            this.userId = response.Data.UserId
            this.courseid = response.Data.CourseId
            setInterval(() => {
                this.H5time++
                if (this.H5time % 15 === 0 && this.H5time > 0) {
                    this.sendH5Progress(this.H5time)
            }
            }, 1000)
        },
        async getScormData () {
            if (this.allPlayInfo) {
                this.scormIframeSrc = this.playUrl.url
            }
        },
        async getPdfData () {
            if (this.allPlayInfo) {
                this.pdfSrc = this.playUrl.url
                console.log(this.pdfSrc, 999)
            }
        },
        async getJYScormData () {
            if (this.allPlayInfo) {
                this.jyScormSrc = this.playUrl.url
            }
        },
        async getVRHCData () {
            if (this.allPlayInfo) {
                this.multiMediaSrc = this.playUrl.url
            }
        },
        async getNRCData () {
            if (this.allPlayInfo) {
                this.nativeSrc = this.playUrl.url
            }
        }
    }
}
</script>

<style lang="scss">
    @import "../style/mixin";
    .tryplay{
        background: url("../assets/body-bg.png") no-repeat;
        height: 100vh;
        .main{
            width: 100%;
            font-size: 14px;
            height: 100%;
            .video{
                overflow: hidden;
                position: relative;
                height: 100%;
                width: 99%;
                #myplayer{
                    .jwgroup .jwrail .jwwarning {
                        display: none;
                        position: relative;
                        line-height: 30px;
                        border-radius: 5px;
                        margin-top: -35px;
                        margin-left: 30px;
                        padding: 0px 5px;
                        z-index: 1007;
                        left: 0;
                        color: #f0ad4e;
                        background-color: rgba(62, 62, 64, 0.8);
                        border: 1px solid #111;
                    }
                    .jwgroup .jwrail .jwwarningbuffer {
                        height: 30px;
                        width: 5px;
                        border-radius: 5px;
                        background-color: #f0ad4e;
                    }
                    .jwcontrolbar .jwcenter {
                        right: 150px !important;
                    }
                    .jwright .jwquality {
                        position: relative;
                        top: -4px;
                        width: 46px;
                        height: 34px;
                        font-size: 12px;
                        line-height: 36px;
                        color: rgb(210,210,210);
                        text-align: center;
                        cursor: pointer;
                    }
                    .jwright .jwquality i {
                        font-style: normal;
                    }
                    .jwright .jwquality:hover .urllist {
                        display: block;
                    }
                    .jwright .jwquality .urllist {
                        display: none;
                        position: absolute;
                        padding: 10px;
                        bottom: 34px;
                        background: #3c3c3f;
                        border-radius: 4px;
                    }
                    .jwquality .urllist li {
                        text-align: center;
                        color: rgb(210,210,210);
                        span{
                            color: #fff;
                        }
                    }
                    .jwquality .urllist li:hover span,
                    .jwquality .urllist li.active span{
                        color: #ec4747;
                    }
                }
                #h5 {
                    width: 100%;
                    height: 100%;
                    overflow-y: auto;
                    iframe {
                        width: 100%;
                        height: 100%;
                    }
                    img {
                        display: block;
                        margin: 0 auto;
                    }
                }
                #multiMedia {
                    width: 100%;
                    height: 100%;
                    iframe {
                        width: 100%;
                        height: 100%;
                    }
                }
                #JY {
                    width: 100%;
                    height: 100%;
                    iframe {
                        width: 100%;
                        height: 100%;
                    }
                }
                #nativeCourse {
                    width: 100%;
                    height: 100%;
                    iframe {
                        width: 100%;
                        height: 100%;
                    }
                }
                #JyScorm {
                    width: 100%;
                    height: 100%;
                    iframe {
                        width: 100%;
                        height: 100%;
                    }
                }
                #pdfCourse{
                    width: 100%;
                    iframe {
                        width: 100%;
                        height: 100vh;
                    }
                }
                #Scorm {
                    width: 100%;
                    height: 100%;
                    iframe {
                        width: 100%;
                        height: 100vh;
                    }
                }
            }  
            .videoW1{
                width: 74%;
                height: 625px;
            }
           
        }
        #tryPlayBg {
            display: block;
            position: absolute;
            top: 0%;
            left: 0%;
            width: 100%;
            height: 100%;
            background-color: black;
            z-index: 1002;
            opacity: 0.4;
        }

    }
</style>
