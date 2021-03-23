<template>
<!-- 学习圈详情页 -->
    <div class="studyCircleDetail">
        <header-fix :active-index="headerIndex"></header-fix>
        <!-- banner -->
        <div class="banner">
            <img src="../assets/study-circle-banner.png" alt="">
        </div>
        <!-- 所在位置 -->
        <div class="mw-position clearfix">
            <p class="text l">您所在的位置:</p>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }"><img src="../assets/home.png" alt="">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/studyCircleCenter' }">学习圈</el-breadcrumb-item>
                <el-breadcrumb-item>学习圈详情</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <!-- wrapper -->
        <div class="wrapper clearfix">
            <div class="wrapper-left l">
                <div class="present clearfix">
                    <div class="face l">
                        <img :src="circleDetail.Img" alt="">
                    </div>
                    <div class="con l">
                        <div class="info clearfix">
                            <div class="title l">
                               <span>{{circleDetail.Name || '暂无'}}</span> 
                            </div>
                            <div class="num r clearfix">
                                <div class="num-list l">
                                    <!-- 发布的主题或者文章数目 -->
                                    <img src="../assets/releases-icon.png" alt=""> {{circleDetail.ArticleCount}}
                                </div>
                                <div class="num-list l">
                                    <!-- 观看数量 -->
                                    <img src="../assets/eye-1.png" alt=""> {{circleDetail.ClickCount}}
                                </div>
                            </div>
                        </div>
                        <div class="time">
                            <span>{{circleDetail.UserName}}</span>{{circleDetail.CreateDate}}创建
                        </div>
                        <div class="text">
                            <span>{{circleDetail.Remark}}</span>
                        </div>
                    </div>
                </div>
                <div class="hot-trends">
                    <div class="title">
                    <p>全部动态</p> 
                    </div>
                    <div class="con">
                        <div class="trend-list clearfix" v-for="item in articleInfoList" :key="item.Id">
                            <div class="tl-detail clearfix">
                                <!-- 左侧头像 -->
                                <div class="face l">
                                    <img :src="item.UserImg" alt="">
                                </div>
                                <div class="detail l">
                                    <div class="info clearfix">
                                        <div class="name l">
                                        {{item.UserName}}
                                        </div>
                                        <div class="time r">
                                            {{item.CreateDate}}
                                        </div>
                                    </div>
                                    <div class="text" v-html="item.Content">
                                    </div>
                                    <div class="media-video" v-if="item.CircleEnclosure.length > 0 && item.CircleEnclosure[0].Type == 'Video' " >
                                        <div class="video-list" v-for="item1 in item.CircleEnclosure" :key="item1.Id">
                                            <video :src="item1.Url" controls ></video>
                                        </div>
                                    </div>
                                    <!-- 缩略图 -->
                                    <div class="media-thumb" v-if="item.showThumb && item.CircleEnclosure.length > 0 && item.CircleEnclosure[0].Type == 'Pic'">
                                        <ul>
                                            <li v-for="item1 in item.CircleEnclosure" :key="item1.Id">
                                                <img :src="item1.Url" alt="" @click="item.showThumb = false, item.showLb = true">
                                            </li>
                                        </ul>
                                    </div>
                                    <!-- 大图-轮播图 -->
                                    <div class="media-lb" v-if="item.showLb && item.CircleEnclosure.length > 0 && item.CircleEnclosure[0].Type == 'Pic'">
                                        <div class="show_box">
                                            <ul>
                                                <li>
                                                    <img :src="item.CurrentUrl" alt="" @click="item.showThumb = true, item.showLb = false">
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="choose_box">
                                            <ul>
                                                <li 
                                                    v-for="(item1, index) in item.CircleEnclosure"
                                                    :key="index"
                                                    @click="chooseScaleImg(index, item1.Url, item)" 
                                                    :class="{active: item1.isCurrentIndex }"
                                                    >
                                                    <img :src="item1.Url" alt="">
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="left-btn" @click="chooseScaleTab(item, -1)">
                                        &lt;
                                        </div>
                                        <div class="right-btn" @click="chooseScaleTab(item, 1)">
                                            &gt;
                                        </div>
                                    </div>
                                    <div class="handle">
                                        <ul class="clearfix">
                                            <!-- <li>
                                                <p><img src="../assets/share-icon.png" alt="">0</p>
                                            </li> -->
                                            <li @click="getCircleCommentList(item)">
                                                <p><img src="../assets/message-icon.png" alt="">{{item.CommentCount}}</p>
                                            </li>
                                            <li>
                                                <p v-show="item.IsAssist == 0" @click="addAssist(item)"><img src="../assets/praise-icon.png" alt="">{{item.AssistCount}}</p>
                                                <p v-show="item.IsAssist == 1" @click="deleteAssist(item)"><img src="../assets/praised-icon.png" alt="">{{item.AssistCount}}</p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <el-collapse-transition>
                                <div class="tl-comment" v-if="item.slowDown">
                                    <!--回复圈子评论-用限制300字数的评论框操作 -->
                                    <div class="tl-ct">
                                        <div class="c-box clearfix">
                                            <div class="face1 l">
                                                <img :src="item.UserImg" alt="">
                                            </div>
                                            <div class="area l">
                                                <input type="text" 
                                                    placeholder="请输入点评内容"
                                                    v-model.trim="item.commentTextArea"
                                                    maxlength="300"
                                                >
                                                <div class="ft">
                                                    <div class="ft-con">
                                                        <p class="num">{{item.commentTextArea.length || 0}}/300</p>
                                                        <el-button type="primary" @click.native="getAddComment3(item, 0)">发表评论</el-button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <!--  显示评论列表，每一条就是个一级评论-->
                                    <div class="tl-cb clearfix" v-for="item1 in item.commentList" :key="item1.Id">
                                        <div class="face l">
                                            <img :src="item1.Img" alt="">
                                        </div>
                                        <div class="cl-con l">
                                            <div class="cl-con-name">
                                                {{item1.UserName}}
                                            </div>
                                            <div class="cl-con-text">
                                                {{item1.Content}}
                                            </div>
                                            <div class="cl-con-handle clearfix">
                                                <span class="handle-time">
                                                    发表日期：{{item1.CreateDate}}
                                                </span>
                                                <span class="handle-reply" @click="spreadReplyBox(item1)">
                                                    回复
                                                </span>
                                            </div>
                                            <el-collapse-transition>
                                                <div class="kb-reply-wrapper" v-if="item1.Dflag">
                                                    <div class="fcshow_clist clearfix">
                                                        <div class="fcshow_clist2 l">
                                                            <div class="fcshow_clist2_replyLists" v-if="item1.List.length > 0">
                                                                <ul>
                                                                    <li v-for="item2 in item1.List" :key="item2.Id">
                                                                        <div class="replyList clearfix">
                                                                            <p class="replyList_p1 l">
                                                                                <template>
                                                                                    <div v-if="item2.UserName != item1.UserName">
                                                                                        <span>{{item2.UserName}}</span>回复<span>{{item1.UserName}}</span>：
                                                                                    </div>
                                                                                    <div v-if="item2.UserName == item1.UserName">
                                                                                        <span>{{item2.UserName}}</span>:
                                                                                    </div>
                                                                                </template>
                                                                            </p>
                                                                            <p class="replyList_p2 l">{{item2.Content}}</p>
                                                                        </div>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                            <div class="reply_box clearfix">
                                                                <input type="textarea" v-model.trim="textareaVal[item1.Id]" value="" placeholder="评论" class="reply_box_ta">
                                                                <div class="reply_box_act">
                                                                    <input type="button" class="reply_btn_confirm" value="回复" @click="getAddComment2(item1, item1.Id, item.Id, 0)">
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </el-collapse-transition>    
                                        </div>
                                    </div>
                                    <el-pagination
                                        background
                                        :current-page.sync="item.currentPage"
                                        layout="prev, pager, next"
                                        :page-size="item.rows"
                                        @current-change="currentChange(item, val)"
                                        :total="item.totalPageNumber"
                                        v-if="item.CommentCount > 0"
                                        >
                                    </el-pagination>
                                </div>
                            </el-collapse-transition>
                        </div>
                        <div class="bottom">
                            <p v-if="noData">没有更多数据啦</p>
                            <p v-if="noData1">该学习圈还没有文章发表,快来发表第一篇动态吧</p>
                            <p v-if="hasData" @click="getCircleArticleList()">查看更多 <i class="el-icon-arrow-down"></i></p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="wrapper-right r">
                <div class="publish">
                    <div class="publish-btn" @click="centerDialogVisible = true">
                       <img src="../assets/releases2-icon.png" alt=""> 发布动态
                    </div>
                </div>
                <div class="wise-con">
                    <div class="title clearfix">
                        <span class="span1 l"></span>
                        <span class="span2 l">圈内达人</span>   
                        <span class="span3 l"></span>
                    </div>
                    <div class="detail">
                        <ul class="clearfix">
                            <li v-for="(item, index) in circleHotList" :key="index">
                                <div class="top-img">
                                    <img :src="item.UserImg" alt="" class="img-wise" v-if="item.UserImg">
                                    <img src="../assets/headImg.png" class="img-wise" alt="" v-else>
                                    <img src="../assets/sc-NO1.png" alt="" class="wise-num" v-if="index == 0">
                                    <img src="../assets/sc-NO2.png" alt="" class="wise-num" v-if="index == 1">
                                    <img src="../assets/sc-NO3.png" alt="" class="wise-num" v-if="index == 2">
                                </div>
                                <p class="wise-name">{{item.UserName}}</p>
                                <p class="trend-num">{{item.UserArticleCount}}条动态</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <!-- 创建动态弹出框 -->
        <el-dialog
            title="发布动态"
            width="680px"
            class="mod"
            :visible.sync="centerDialogVisible"
            center
        >
        <textarea name="" id="" placeholder="有什么新鲜事？和大家一起分享吧！（200字以内）" v-model="trendData.textArea"></textarea>
        <div class="upload-mod">
            <div class="handle">
                <div class="handle-con">
                    <p class="p1"><input type="file" name="image" ref="attach" accept="image/*" @change='onchangeImgFun($event)'></p>
                    <p class="p2"><img src="../assets/pic-add.png" alt="">添加图片</p>
                </div>
                <div class="handle-con" @click.stop="picAdd = false; videoAdd = true">
                    <img src="../assets/video-add.png" alt="">上传视频
                </div>
            </div>
            
        </div>
        <div class="picAdd" v-if="picAdd">
            <ul>
                <li class="upload-item" v-for="(item,index) in picList" :key="index">
                    <img class="uploaded_attach" :src="item.Url" alt="upload">
                    <img class="delete_btn" src="../assets/hq-btn-delete.png" alt="delete" @click="deleteAttach(item, index)">
                </li>
                <li class="upload-btn">
                    <img 
                        class="uploaded_attach"
                        src="../assets/upload-cross.png" 
                        alt="upload"
                    >
                    <input type="file" ref="attach" @change="onchangeImgFun($event)">
                </li>
            </ul>
        </div>
        <div class="videoAdd" v-if="videoAdd">
             <!-- v-show="videoAdd" -->
            <h4>要求是zip压缩包，且压缩包只包含一层；压缩包名称要求是课程编码; 或mp4、mp3、flv文件</h4>
            <jy-upload :options="jyuploadOptions" @getVideoArr="getVideoArr"></jy-upload>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="getCircleArticleCreate()">确 定</el-button>
        </span>
       </el-dialog>
       <footer-fix></footer-fix>
    </div>
</template>

<script>
    import { 
        CircleArticleHotModel, 
        CircleDetail, 
        CircleArticleCreate, 
        UploadAttachment, 
        DelUserAssist,
        CircleArticleList,
        AddComment,
        CommentList,
        AddUserAssist
    } from '../service/getData'
    import { Message, MessageBox } from 'element-ui'
    // import { formatDate } from '../plugins/utils'
    export default {
        data () {
            let courseCode = this.$route.query.CourseCode || ""
            return {
                headerIndex: '10',
                centerDialogVisible: false,
                id: '',
                circleHotList: [],
                circleDetail: [],
                CreatedDate: '',
                picAdd: false,
                videoAdd: false,
                picList: [], // 上传图片的展示列表
                trendData: { // 发布时提交的数据
                    uploadPicList: [],
                    textArea: ''
                },
                textareaVal: {},
                textLength: '',
                showThumb: false,
                showLb: true,
                articleInfoList: [],
                pageNum: 1,
                noData: false,
                noData1: false,
                hasData: true,
                jyuploadOptions: {
                    mime_types: [{ title: "upload files", extensions: "zip,mp4,mp3,flv" }],
                    priUrl: "",
                    url: "/file/UploadWlFileCircle",
                    params: {
                    CourseCode: courseCode
                    },
                    //  view: true,
                    multi_selection: true,
                    success: function () {
                    // vue.reload();
                    }
                },
                videoArr: []
            }
        },
        created () {
            this.id = this.$route.query.id
        },
        mounted () {
            this.getCircleDetail()
            this.getCircleArticleHotModel()
            this.getCircleArticleList()
            // setTimeout(function(){
            //     $(this.$el).find(".videoAdd").slimScroll({
            //         allowPageScroll: true, // allow page scroll when the element scroll is ended
            //         size: "7px",
            //         color: "#bbb",
            //         wrapperClass: "slimScrollDiv",
            //         railColor: "#eaeaea",
            //         position: "right",
            //         height: window.innerHeight + "px",
            //         alwaysVisible: false,
            //         railVisible: false,
            //         disableFadeOut: true
            //     }) 
            // },5000)
        },
        methods: {
            // 获取学习圈详情
            async getCircleDetail () {
                let data = await CircleDetail({ Id: this.id })
                if (data.IsSuccess) {
                    this.circleDetail = data.Data
                }
            },
            // 获取圈内达人
            async getCircleArticleHotModel () {
                let data = await CircleArticleHotModel({ Id: this.id })
                if (data.IsSuccess) {
                    this.circleHotList = data.Data
                }
            },
            async getCircleArticleCreate () {
                // let time = new Date()
                // this.CreatedDate = formatDate(time, 'yyyy-MM-dd')
                if (!this.trendData.textArea) {
                    Message('请填写您的发布内容')
                    this.centerDialogVisible = false
                    setTimeout(() => {
                        this.centerDialogVisible = true
                    }, 3000)
                } else {
                    if (this.picAdd) {
                        // 图片上传
                        let data = await CircleArticleCreate({
                            CircleEnclosure: this.trendData.uploadPicList,
                            Content: this.trendData.textArea,
                            CircleId: this.id,
                            Title: this.trendData.textArea
                        })
                        if (data.Type == 1) {
                            this.centerDialogVisible = false
                            this.trendData = []
                            this.picList = []
                            this.$message({
                                type: 'success',
                                message: "动态发布成功,内容正在审核中"
                            })
                        }
                    } else {
                        // 视频上传
                        let data = await CircleArticleCreate({
                            CircleEnclosure: this.videoArr,
                            Content: this.trendData.textArea,
                            CircleId: this.id,
                            Title: this.trendData.textArea
                        })
                        if (data.Type == 1) {
                            this.centerDialogVisible = false
                            this.trendData = []
                            this.picList = []
                            this.videoArr = []
                            this.$message({
                                type: 'success',
                                message: "动态发布成功,内容正在审核中"
                            })
                        }
                    }
                }
            },
            async onchangeImgFun (e) {
                this.picAdd = true
                this.videoAdd = false
                var file = e.target.files[0]
                // console.log(file)
                let arr = file.name.split('.')
                let fileType = arr[arr.length - 1]
                let formData = new FormData()
                let fileName = `${+new Date()}.${fileType}`
                this.imgName = fileName
                formData.append('FileType', 'ImageCircle')
                formData.append('FileCode', fileName)
                formData.append('FileName', fileName)
                formData.append('file', file, fileName)
                let res = await UploadAttachment(formData)
                if (res.IsSuccess) {
                    let obj = {
                        Name: fileName,
                        Url: window.URL.createObjectURL(file),
                        Type: 'Pic'
                    }
                    let obj1 = {
                        Name: fileName,
                        Url: fileName,
                        Type: 'Pic'
                    }
                    this.picList.push(obj)
                    this.trendData.uploadPicList.push(obj1)
                }
                // console.log(this.picList)
            },
            deleteAttach (item, index) {
                this.$confirm('是否要删除该文件？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.picList.splice(index, 1)
                    this.trendData.uploadPicList.splice(index, 1)
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除!'
                    })
                })
            },
            chooseScaleImg (index, url, arr) {
                // 在获取的对象中 设置一个currentIndex 点击改变currentIndex 来区分不同数据的轮播图数据 点击左右键的时候 传入数组根据index去找图片路径 
                // 当前图片路径由一个对象中新添加的值来接收
                // console.log(index, url, arr)
                    arr.CurrentUrl = url
                    arr.CurrentNum = index
                    arr.CircleEnclosure.forEach((item) => {
                        item.isCurrentIndex = false
                    })
                    arr.CircleEnclosure[index].isCurrentIndex = true
            },
            // 获取热门动态
            async getCircleArticleList () {
                let data = await CircleArticleList({
                    Sort: "Id",
                    Order: "desc",
                    Page: this.pageNum,
                    Rows: 5,
                    CircleId: this.id
                })
                if (data.IsSuccess) {
                    let arr = data.Data
                    if (arr.length == 0 && this.pageNum > 1) {
                        this.noData = true
                        this.hasData = false
                        return
                    } 
                    if (arr.length == 0 && this.pageNum == 1) {
                        this.noData1 = true
                        this.hasData = false
                        return
                    }
                    arr.forEach((item) => {
                        let arr2 = item.CircleEnclosure
                        if (arr2.length > 0) {
                            arr2.forEach((item2, index2) => {
                            // eslint-disable-next-line
                            item2.isCurrentIndex = true ? index2 == 0 : index2 > 0
                            })
                            item.CurrentUrl = item.CircleEnclosure[0].Url
                        }
                        item.commentList = [] // 二级评论列表
                        item.slowDown = false //
                        item.currentPage = 1 // 二级列表分页当前页
                        item.rows = 4 // 二级列表分页rows
                        item.page = 1 // 二级列表翻页时候请求的page
                        item.CurrentNum = 0 // 轮播图的当前序号 
                        item.totalPageNumber = 0 // 二级列表分页页码总数
                        item.commentTextArea = '' // 一级评论框的内容
                        item.showThumb = true // 显示缩略图
                        item.showLb = false // 显示轮播图 
                        return item
                    })
                    this.pageNum += 1
                    this.articleInfoList = this.articleInfoList.concat(arr)
                }
            },
            chooseScaleTab (arr, num) {
               let num1 = arr.CurrentNum + num
               if (num1 < 0) {
                   Message('已经是第一张了')
                   num1 = 0
                //    console.log(num1)
               } else if (num1 > arr.CircleEnclosure.length - 1) {
                   Message('已经是最后一张了')
                   num1 = arr.CircleEnclosure.length - 1
                //    console.log(num1)
               } else {
                   arr.CurrentNum = num1
                   arr.CircleEnclosure.forEach((item) => {
                       item.isCurrentIndex = false
                   })
                   arr.CircleEnclosure[num1].isCurrentIndex = true
                   arr.CurrentUrl = arr.CircleEnclosure[num1].Url
               }
            },
            spreadReplyBox (item) {
                // console.log(item)
                item.Dflag = !item.Dflag
            },
            getCircleCommentList (item) {
                item.slowDown = !item.slowDown
                this.getCommentList(item)
            },
            currentChange (item, val) {
                // console.log(`当前页: ${val}`);
                item.commentList = []
                item.currentPage = val
                item.page = val
                this.getCommentList(item)
            },
            // 获取评论列表
            async getCommentList (arr) {
                let data = await CommentList({
                    "MainId": arr.Id,
                    "Type": "CircleArticle",
                    "ParentId": 0,
                    "Sort": "Id",
                    "Order": "desc",
                    "Page": arr.page,
                    "Rows": 4
                })
                if (data.IsSuccess) {
                    arr.commentList = data.Data.List
                    arr.totalPageNumber = Number(data.Data.TotalCount)
                }
            },
            async getAddComment2 (arr, pId, mId, rateVal) {
                if (this.textareaVal[pId]) {
                    let data = await AddComment({
                        Type: 'CircleArticle',
                        Content: this.textareaVal[pId],
                        ParentId: pId,
                        MainId: mId,
                        rate: rateVal
                    })
                    if (data.Type == 1) {
                        Message('评论成功,内容正在审核')
                        this.getCircleArticleList()
                    } else {
                        MessageBox('请填写您的评论')
                    }
                }
            },
            async addAssist (item) {
                let data = await AddUserAssist({
                    ObjType: 'CircleArticle',
                    ObjId: item.Id
                })
                if (data.IsSuccess) {
                    item.AssistCount += 1
                    item.IsAssist = 1
                }
            },
            async deleteAssist (item) {
                let data = await DelUserAssist({
                    ObjType: 'CircleArticle',
                    ObjId: item.Id
                })
                if (data.IsSuccess) {
                    item.AssistCount -= 1
                    item.IsAssist = 0
                }
            },
            async getAddComment3 (item, rateVal) {
                if (item.commentTextArea) {
                    let data = await AddComment({
                        Type: 'CircleArticle',
                        Content: item.commentTextArea,
                        ParentId: 0,
                        MainId: item.Id,
                        rate: rateVal
                    })
                    if (data.Type == 1) {
                        Message('评论成功,内容正在审核')
                        this.getCircleArticleList()
                    } else {
                        MessageBox('请填写您的评论')
                    }
                } else {
                        MessageBox('请填写您的评论')
                } 
            },
            getVideoArr (val) {
                if (this.videoArr) {
                    this.videoArr = val
                }
            }
        },
        watch: {
        }
    }
</script>
<style lang="scss" rel="stylesheet/scss">
    @import "../style/mixin";

    .studyCircleDetail{
        .banner{
            width: 100%;
            height: 200px;
            img{
                width: 100%;
                height: 200px;
            }
        }
        .mw-position{
            width: 1200px;
            margin: 25px auto 0;
            height: 28px;
            .text{
                margin-right: 15px;
            }
            .el-breadcrumb__item{
                height: 19px;
                line-height: 19px;
                display: block;
                img{
                    vertical-align: sub;
                    margin-right: 3px
                }
            }
        }
        .wrapper{
            width: 1200px;
            margin: 15px auto;
            .wrapper-left{
                width: 838px;
                .present{
                    background: #fff;
                    padding: 25px 20px 30px 20px;
                    .face{
                        width: 134px;
                        height: 133px;
                        img{
                            width: 134px;
                            height: 133px;
                        }
                    }
                    .con{
                        width: 640px;
                        margin-left: 20px;
                        .info{
                            .title{
                                font-size: 24px;
                                color: #555;
                                font-weight: bold
                            }
                            .num{
                                .num-list{
                                    margin-left: 20px;
                                    width: 75px;
                                    height: 32px;
                                    text-align: center;
                                    line-height: 32px;
                                    background: #f6f6f6;
                                    color: #999;
                                }
                            }
                        }
                        .time{
                            margin-top: 15px;
                            color: #999;
                            span{
                                color:#f10c00;
                                margin-right: 5px;
                            }
                        }
                        .text{
                            margin-top: 15px;
                            color: #555;
                            line-height: 24px;
                            @include ellipsis_two(2)
                        }
                    }
                }
                .hot-trends{
                    width: 840px;
                    margin-top: 15px;
                    .title{
                        width: 100%;
                        background: #fff;
                        p{
                            font-weight: bold;
                            font-size: 18px;
                            color: #555;
                            border-bottom: 3px solid#368474;
                            padding-top: 15px;
                            padding-bottom: 15px;
                            width: 72px;
                            margin-left: 20px;
                        }
                    }
                    .con{
                        background: #fff;
                        margin-top: 15px; 
                        .trend-list{
                            box-shadow: 0px 10px 10px #e9e9e9;
                            margin-bottom: 10px;
                            .tl-detail{
                                .face{
                                    margin-left: 20px;
                                    margin-top: 20px;
                                    img{
                                        width: 56px;
                                        height: 56px;
                                        border-radius: 50%; 
                                    }
                                }
                                .detail{
                                    width: 725px;
                                    margin-left: 10px;
                                    margin-top: 20px;
                                    .info{
                                        .name{
                                            color: #555;
                                            font-size: 16px;
                                        }
                                        .time{
                                            color: #999;
                                        }
                                    }
                                    .text{
                                        line-height: 26px;
                                        color: #555555;
                                        margin-top: 10px;
                                        margin-bottom: 20px;
                                    }
                                    .media-video{
                                        @extend %clearFix;
                                        .video-list{
                                            float: left;
                                            width: 300px;
                                            height: 150px;
                                            video{
                                                width: 300px;
                                                height: 150px;  
                                            }
                                        }
                                    }
                                    .media-thumb{
                                        width: 510px;
                                        ul{
                                            @extend %clearFix;
                                            li{
                                                float: left;
                                                margin-right: 10px;
                                                margin-bottom: 10px;
                                                width: 160px;
                                                height: 160px;
                                                img{
                                                    width: 160px;
                                                    height: 160px;
                                                }
                                                &:hover{
                                                    cursor: zoom-in;
                                                }
                                            }
                                        }
                                    }
                                    .media-lb{
                                        width: 725px;
                                        position: relative;
                                        .show_box{
                                            ul{
                                                li{
                                                    img{
                                                        display: block;
                                                        margin: 0 auto;
                                                        max-width: 725px;
                                                        cursor: zoom-out;
                                                    }
                                                }
                                            }
                                        }
                                        .choose_box{
                                            margin-top: 20px;
                                            margin-bottom: 20px;
                                            ul{
                                                @extend %clearFix;
                                                li{
                                                    float: left;
                                                    padding: 2px;
                                                    opacity: 0.5;
                                                    cursor: pointer;
                                                    img{
                                                        width: 74px;
                                                        height: 74px;
                                                        border: 1px solid #fff;
                                                    }
                                                    &.active{
                                                        border: 2px solid #fa7d3c;
                                                        opacity: 1;
                                                    }
                                                }
                                            }
                                        }
                                        .left-btn{
                                            width: 48px;
                                            height: 48px;
                                            font-size: 25px;
                                            text-align: center;
                                            line-height: 48px;
                                            background: rgba(0, 0, 0, 0.4);
                                            border-radius: 48px;
                                            color: #fff;
                                            position: absolute;
                                            margin-top: -76px;
                                            cursor: pointer;
                                            top: 50%;
                                            left: 24px;
                                        }
                                        .right-btn{
                                            width: 48px;
                                            height: 48px;
                                            font-size: 25px;
                                            text-align: center;
                                            line-height: 48px;
                                            background: rgba(0, 0, 0, 0.4);
                                            border-radius: 48px;
                                            color: #fff;
                                            position: absolute;
                                            margin-top: -76px;
                                            cursor: pointer;
                                            top: 50%;
                                            right: 24px;
                                        }
                                    }
                                }
                                .handle{
                                    margin-top: 10px;
                                    margin-bottom: 35px;
                                    ul{
                                        li{
                                            float: left;
                                            margin-right: 30px;
                                            color: #999;
                                            cursor: pointer;
                                            img{
                                                vertical-align: sub;
                                                margin-right: 8px;
                                            }
                                        }
                                    }
                                }
                            }
                            .tl-comment{
                                .tl-ct{
                                    .c-box{
                                        width: 100%;
                                        background: #f6f6f6;
                                        padding: 20px 0;
                                        .face1{
                                            margin-left: 20px;
                                            width: 56px;
                                            height: 56px;
                                            img{
                                                width: 56px;
                                                height: 56px;
                                                display: block;
                                                border-radius: 50%; 
                                            }
                                        }
                                        .area{
                                            width: 725px;
                                            margin-left: 10px;
                                            input{
                                                width: 703px;
                                                border: 1px solid #e3e3e3;
                                                background: #fff;
                                                height: 46px;
                                                padding: 0px 10px;
                                                color: #999;
                                            }
                                            .ft{
                                                @extend %clearFix;
                                                .ft-con{
                                                    float: right;
                                                    @extend %clearFix;
                                                    margin-top: 20px;
                                                    .num{
                                                        float: left;
                                                        font-style: italic;
                                                        color: #666;
                                                        height: 36px;
                                                        line-height: 36px;
                                                    }
                                                    button{
                                                        float: left;
                                                        margin-left: 20px;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                .tl-cb{
                                    padding-top: 15px; 
                                    .face{
                                        width: 56px;
                                        height: 56px;
                                        img{
                                            width: 56px;
                                            height: 56px;
                                            display: block;
                                            border-radius: 50%; 
                                        }
                                    }
                                    width: 770px;
                                    margin: 0 auto;
                                    .cl-con{
                                        width: 705px;
                                        border-bottom: 1px solid #e8e8e8;
                                        margin-left: 8px;
                                        padding-top: 20px; 
                                        padding-bottom: 15px;
                                        .cl-con-name {
                                            font-size: 16px;
                                            color: #333;
                                            height: 32px;
                                            line-height: 32px;
                                            @include ellipsis_two(1)
                                        }
                                        .cl-con-text {
                                            color: #666;
                                            line-height: 24px;
                                        }
                                        .cl-con-handle{
                                            height: 28px;
                                            line-height: 28px;
                                            .handle-time{
                                                font-size: 12px;
                                                color: #aaa;
                                            }
                                            .handle-reply{
                                                color: #fab531;
                                                margin-left: 5px;
                                                cursor: pointer;
                                            }
                                        }
                                        .kb-reply-wrapper{
                                            .fcshow_clist{
                                                width: 730px;
                                                margin: 0 auto;
                                                border-top: 1px solid #cfcfcf;
                                                .fcshow_clist2 {
                                                    .fcshow_clist2_replyLists{
                                                        margin-left: 26px;
                                                        width: 655px;
                                                        margin-top: 20px;
                                                        ul{
                                                            margin-left: 30px;
                                                            li{
                                                                margin-bottom: 5px;
                                                                .replyList{
                                                                    .replyList_p1{
                                                                        color: #5c5c5c;
                                                                        font-size: 14px;
                                                                        span{
                                                                            font-size: 14px;
                                                                            color: #3d182b;
                                                                            margin-right: 3px;
                                                                            margin-left: 3px;
                                                                            font-weight: bold;
                                                                        }
                                                                    }
                                                                    .replyList_p2{
                                                                        color: #5c5c5c;
                                                                        font-size: 14px;
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                    .reply_box{

                                                        .reply_box_ta{
                                                            width: 652px;
                                                            height: 30px;
                                                            border: 1px solid #e8e8e8;
                                                            overflow-y: auto;
                                                            float: left;
                                                        }
                                                        .reply_box_act{
                                                            float: left;
                                                            margin-left: 10px;
                                                            .reply_btn_confirm{
                                                                background-color: #ff9e01;
                                                                color: #fff;
                                                                width: 66px;
                                                                height: 32px;
                                                                line-height: 32px;
                                                                display: block;
                                                                outline: none;
                                                                padding: 0;
                                                                cursor: pointer;
                                                                border-radius: inherit;
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                .el-pagination{
                                    text-align: center;
                                    margin: 10px 0;
                                }
                            }
                        }
                        .bottom{
                            p{
                                text-align: center;
                                font-size: 16px;
                                cursor: pointer;
                                padding: 10px 0;
                            }
                        }
                    }
                }
            }
            .wrapper-right{
                width: 331px;
                .publish{
                    padding: 30px 20px;
                    background: #fff;
                    .publish-btn{
                        background:#368474;
                        cursor: pointer;
                        width: 291px;
                        height: 48px;
                        line-height: 48px;
                        color: #fff;
                        text-align: center;
                        border-radius: 5px;
                        font-size: 16px;
                        img{
                            width: 20px;
                            height: 18px;
                            margin-right: 8px;
                        }
                    }
                }
                .wise-con{
                    margin-top: 20px;
                    background: #fff;
                    padding-top: 20px;
                    padding-bottom: 50px;
                    .title{
                        height: 26px;
                        line-height: 26px;
                        .span1{
                            height: 1px;
                            width: 100px;
                            background: #e8e8e8;
                            margin-right: 15px;
                            display: block;
                            margin-top: 13px;
                            margin-left: 10px;
                        }
                        .span2{
                            display: block;
                            font-size: 20px;
                            color: #555;
                            font-weight: bold;
                        }
                        .span3{
                            height: 1px;
                            width: 100px;
                            background: #e8e8e8;
                            margin-left: 15px;
                            display: block;
                            margin-top: 13px;
                        }
                    }
                    .detail{
                        ul{
                            @extend %clearFix;
                            li{
                                float:left;
                                width: 80px;
                                margin: 35px 15px 0 15px;
                                .top-img{
                                    position: relative;
                                    width: 57px;
                                    height: 57px;
                                    .img-wise{
                                        position: absolute;
                                        width: 57px;
                                        height: 57px;
                                        border-radius: 50%;
                                        top: 0;
                                    }
                                    .wise-num{
                                        position: absolute;
                                        width: 50px;
                                        height: 34px;
                                        top: 0;
                                        right: -25px;
                                    }
                                }
                                .wise-name{
                                    color: #555;
                                    font-weight: bold;
                                    margin-top: 15px;
                                }
                                .trend-num{
                                    color: #999;
                                    margin-top: 10px;
                                }
                            }
                        }
                    }
                }
            }
        }
        .mod{
            .el-dialog__header{
                padding: 0;
                height: 48px;
                line-height: 48px;
                background: #368474;
                .el-dialog__title{
                    color: #fff;
                    font-size: 18px;
                }
                button{
                    display: none;
                }
            }
            .el-dialog__body{
                padding: 0;
                margin: 20px 30px 0 30px;
                textarea{
                    border: 1px solid #e8e8e8;
                    padding: 20px 15px;
                    color: #999;
                    height: 115px;
                    width: 588px;
                }
                .upload-mod{
                    width: 620px;
                    background: #f6f6f6;
                    .handle{
                        @extend %clearFix;
                        height: 60px;
                        .handle-con{
                            float: left;
                            color: #555;
                            margin-left: 20px;
                            margin-top: 18px;
                            cursor: pointer;
                            position: relative;
                            width: 110px;
                            height: 25px;
                            .p1{
                                position: absolute;
                                z-index: 1;
                                width: 110px;
                                opacity: 0;
                                cursor: pointer;
                                height: 25px;
                                input{
                                    width: 110px;
                                }
                            }
                            .p2{
                                position: absolute;
                                z-index: 0;
                                height: 25px;
                                width: 110px;
                                cursor: pointer;
                                img{
                                    margin-right: 10px
                                }
                            }
                        }
                    } 
                }
                .picAdd{
                    ul{
                        @extend %clearFix;
                        .upload-item{
                            position: relative;
                            height: 120px;
                            width: 120px;
                            margin-right: 20px;
                            float: left;
                            margin-top: 25px;
                            .uploaded_attach{
                                position: absolute;
                                width: 120px;
                                height: 120px;
                                top: 0;
                            }
                            .delete_btn{
                                position: absolute;
                                top: -15px;
                                right: -15px;
                                width: 30px;
                                height: 30px;
                                cursor: pointer;
                            }
                        }
                        .upload-btn{
                            position: relative;
                            float: left;
                            display: block;
                            height: 120px;
                            width: 120px;
                            margin-right: 20px;
                            margin-top: 25px;
                            cursor: pointer;
                            margin-top: 24px;
                            img{
                                position: absolute;
                                width: 120px;
                                height: 120px;
                                display: inline-block;
                            }
                            input{
                                position: absolute;
                                left: 0;
                                top: 0;
                                opacity: 0;
                                width: 120px;
                                height: 120px;
                                z-index: 1;
                            }
                        }
                    }
                }
            }
            .el-dialog__footer{
                padding: 0;
                @extend %clearFix;
                margin-top: 30px;
                padding-bottom: 35px;
                .dialog-footer{
                    float: right;
                    margin-right: 30px
                }
            }
        }
        
    }
</style>
