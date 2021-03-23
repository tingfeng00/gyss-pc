<template>
    <div class="studyCircleCenter">
        <header-fix :active-index="headerIndex"></header-fix>
        <!-- banner -->
        <div class="banner">
            <img src="../assets/study-circle-banner.png" alt="">
        </div>
        <!-- 分类 -->
        <div class="classify clearfix">
            <div class="subClass l" v-for="item in circleTypeInfo" :key="item.Id">
                <div class="subClassCon clearfix">
                    <div class="sc-left l">
                        <div class="title">
                            {{item.Name}}
                        </div>
                        <div class="con">
                            <ul class="clearfix">
                                <li v-for="item1 in item.Circle" :key="item1.Id">
                                    <router-link :to="{path: '/studyCircleDetail', query: {id: item1.Id}}">
                                        {{item1.Name}}
                                    </router-link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="more l">
                        <router-link :to="{path: '/studyCircleStage', query: {id: item.Id, title: item.Name}}">
                            <img :src="item.Img" alt="">
                            <p>更多</p>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
        <!-- 热门动态-活跃圈子 -->
        <div class="wrapper clearfix">
            <div class="hot-trends l">
                <div class="title">
                   <p>热门动态</p> 
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
                                <div class="media-video" v-if="item.CircleEnclosure.length > 0 && item.CircleEnclosure[0].Type == 'Video'">
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
                </div>
            </div>
            <div class="active-circle r">
                <div class="title clearfix">
                    <span class="span1 l"></span>
                    <span class="span2 l">活跃圈子</span>   
                    <span class="span3 l"></span>
                </div>
                <div class="con">
                    <ul class="clearfix">
                        <li v-for="(item, index) in circleHotInfoList" :key="item.Id">
                            <router-link :to="{path: '/studyCircleDetail', query: {id: item.Id}}">
                                <img :src="item.Img" alt="" class="img-circle" v-if="item.Img">
                                <img src="../assets/noDataPic.png" alt="" class="img-circle2" v-else>
                                <img src="../assets/sc-NO1.png" alt="" class="rank-num" v-if="index == 0">
                                <img src="../assets/sc-NO2.png" alt="" class="rank-num" v-if="index == 1">
                                <img src="../assets/sc-NO3.png" alt="" class="rank-num" v-if="index == 2">
                            </router-link>
                            <p class="circle-name">{{item.Name}}</p>
                            <p class="trend-num">{{item.ArticleCount}}条动态</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <footer-fix></footer-fix>
    </div>
</template>

<script>
    import { CircleTypeInfoList, CircleArticleList, CircleHotInfoList, CommentList, AddComment, AddUserAssist, DelUserAssist } from '../service/getData'
    import { Message, MessageBox } from 'element-ui'
    export default {
        data () {
            return {
                headerIndex: '10',
                circleTypeInfo: [],
                articleInfoList: [],
                showThumb: false,
                showLb: true,
                circleHotInfoList: [],
                textareaVal: {},
                textLength: ''
            }
        },
        created () {
        },
        mounted () {
            this.getCircleTypeInfoList()
            this.getCircleArticleList()
            this.getCircleHotInfoList()
        },
        methods: {
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
            // 获取圈子类型列表
            async getCircleTypeInfoList () {
                let data = await CircleTypeInfoList({ Id: 0 })
                if (data.IsSuccess) {
                    this.circleTypeInfo = data.Data.List
                }
            },
            // 获取热门动态
            async getCircleArticleList () {
                let data = await CircleArticleList({
                    "Sort": "Id",
                    "Order": "desc",
                    "Page": 1,
                    "Rows": 5
                })
                if (data.IsSuccess) {
                    let arr = data.Data
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
                    })
                    this.articleInfoList = arr
                    // console.log(this.articleInfoList)
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
            async getCircleHotInfoList () {
                let data = await CircleHotInfoList({
                    "Sort": "Id",
                    "Order": "desc",
                    "Page": 1,
                    "Rows": 4
                })
                if (data.IsSuccess) {
                    this.circleHotInfoList = data.Data.List
                }
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
                    console.log(arr)
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
            }
        },
        watch: {
            
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    @import "../style/mixin";

    .studyCircleCenter{
        .banner{
            width: 100%;
            height: 200px;
            img{
                width: 100%;
                height: 200px;
            }
        }
        .classify{
            width: 1160px;
            margin: 0 auto;
            padding: 0 20px 35px 20px;
            background: #fff;
            .subClass{
                margin-top: 35px;
                padding-bottom: 35px; 
                border-bottom: 1px dashed #e3e3e3;
                .subClassCon{
                    border-right: 1px dashed #e3e3e3;
                    .sc-left{
                        .title{
                            font-size: 20px;
                            font-weight: bold;
                            color: #333;
                        }
                        .con{
                            width: 220px;
                            @include ellipsis_two(2);
                            ul{ 
                                margin-right: -25px;
                                height: 82px;
                                overflow: hidden;
                                li{
                                    float: left;
                                    margin-right: 25px;
                                    white-space: nowrap;
                                    text-overflow: ellipsis;
                                    overflow: hidden;
                                    max-width: 80px;
                                    margin-top: 20px;
                                    a{
                                        color: #555;
                                        font-size: 16px;
                                        &:hover{
                                            color:#368474
                                        }
                                    }
                                }
                            }
                        }
                    }
                    .more{
                        margin-left: 30px;
                        a{
                            display: block;
                            width: 80px;
                            height: 109px;
                            margin-right: 43px;
                            img{
                                display: block;
                                width: 80px;
                                height: 80px;
                                margin: 0 auto;
                            }
                            p{
                                color: #4d7af5;
                                font-size: 16px;
                                text-align: center;
                                margin-top: 10px;
                            }
                        }
                    }
                }
                &:nth-child(3n+2){
                    .sc-left{
                        margin-left: 35px;
                    }
                }
                &:nth-child(3n+3){
                    .subClassCon{
                        border-right: none;
                    }
                    .sc-left{
                        margin-left: 35px;
                    }
                    .more{
                        a{
                            margin-right: 12px;
                        }
                    }
                }
            }
        }
        .wrapper{
            width: 1200px;
            margin: 20px auto 0;
            .hot-trends{
                width: 840px;
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
                }
            }
            .active-circle{
                background: #fff;
                padding-top: 20px;
                padding-bottom: 50px;
                width: 331px;
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
                .con{
                    ul{
                        margin-right: -28px;
                        li{
                            width: 135px;
                            margin-top: 40px;
                            margin-right: 28px;
                            float: left;
                            a{
                                display: block;
                                position: relative;
                                width: 135px;
                                height: 133px;
                                .img-circle{
                                    position: absolute;
                                    width: 135px;
                                    height: 133px;
                                }
                                .img-circle2{
                                    position: absolute;
                                    width: 98px;
                                    height: 120px;
                                    left: 18px;
                                }
                                .rank-num{
                                    position: absolute;
                                    width: 50px;
                                    height: 34px;
                                    top: 0;
                                    right: -15px;
                                }
                            }
                            .circle-name{
                                color: #555;
                                font-weight: bold;
                                margin-top: 20px;
                            }
                            .trend-num{
                                color: #999;
                                margin-top: 10px;
                            }
                            &:nth-child(2n+1){
                                margin-left: 14px;
                            }
                        }
                    }
                }
            }
        }
    }
</style>
