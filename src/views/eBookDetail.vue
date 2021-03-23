<template>
    <div class="eBookDetail">
        <header-fix :active-index="headerIndex"></header-fix>
        <div class="main clearfix">
            <div class="mw-position clearfix">
                <p class="text l">您所在的位置:</p>
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/' }"><img src="../assets/home.png" alt="">首页</el-breadcrumb-item>
                    <el-breadcrumb-item :to="{ path: '/eBook' }">电子书</el-breadcrumb-item>
                    <el-breadcrumb-item>电子书详情页</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <section class="mw-book clearfix">
                <div class="mw-book-left l ">
                    <div class="mw-book-brief clearfix">
                        <div class="brief-left l">
                           <img :src="bookContent.Icon" alt="" v-if="bookContent.Icon">
                            <img src="../assets/errorBookImg.png" alt="" v-else="">
                        </div>
                        <div class="brief-right l">
                            <div class="brief-rhd clearfix">
                                <div class="brief-rhd1 l">
									<div class="title">
										《{{bookContent.Name}}》
									</div>
									<div class="author">
										作者: {{bookContent.Author}}
									</div>
									<div class="text" v-html="bookContent.Content">
										通透面对平淡生活的真相，一言难尽却坦诚相告。通透面对平淡生活的 真相，一言难尽却坦诚相告。
									</div>
									<div class="mes clearfix">
										<p class="num">{{bookContent.Count || '0'}}条评论</p>
										<p class="view">{{bookContent.ClickCount}}人浏览</p>
										<p class="name">{{bookContent.TypeName}}</p>
										<p class="time">{{bookContent.CreateDate}}</p>
									</div>
								</div>
                                <div class="brief-rhd2 r">
                                    <div class="score-text">
										当前评分
									</div>
                                    <div class="score-num">
										{{bookContent.Credit}}
									</div>
                                    <div class="score-star">
                                        <el-rate
                                            v-model="valueStar"
                                            disabled
                                            :colors="colors"
                                            score-template="{valueStar}">
                                        </el-rate>
									</div>
                                    <div class="score-nump">
										{{bookContent.UserCommentCount || '0'}}人评分
									</div>
                                </div>
                            </div>
                            <div class="brief-rbd clearfix">
                                <router-link class="brief-link l" :to="{ path: '/bookChapterContent', query: {id: this.firstChapterId} }">
                                    立即阅读
                                </router-link>
								<div class="brief-handle r clearfix">
									<div class="comment l" @click="commentFocus()">
										<p class="icon"><img src="../assets/comment-img.png"/></p>
										<p class="text" >评论</p>
									</div>
									<div class="collect l">
                                        <section v-if="NoCollect" @click="getFavoriteAdd()">
                                            <p class="icon"><img src="../assets/collect-img.png"/></p>
										    <p class="text">收藏</p>
                                        </section>
										<section v-else @click="getFavoriteDelete()">
                                            <p class="icon"><img src="../assets/collect-img2.png"/></p>
										    <p class="text2">已收藏</p>
                                        </section>
									</div>
								</div>
							</div>
                        </div>
                    </div>
                    <div class="mw-book-sketch">
						<div class="sketch-title">
							<div class="sketch-title1">
								内容纲要
							</div>
							<div class="sketch-title-line clearfix">
								<p class="line1 l"></p>
								<p class="line2 l"></p>
							</div>
						</div>
						<div class="sketch-title-con" v-html="bookContent.Content">
							
						</div>
					</div>
                    <div class="mw-book-comment">
                        <div class="bc-title clearfix">
							<div class="bc-title1 l">
								写评论
							</div>
							<div class="bc-title2 r">
								<span>{{this.textLength || 0}}</span>/<span>300</span>
							</div>
						</div>
                        <div class="bc-box">
                            <el-input
                                type="textarea"
                                placeholder="请输入点评内容...."
                                v-model.trim="commentArea"
                                maxlength="300"
                                class="commentArea"
                                ref="bcBoxArea"
                                >
                            </el-input>
                            <!-- <textarea  placeholder="请输入点评内容...." v-model="commentArea" class="commentArea"></textarea> -->
                            <div class="bc-box-handle clearfix">
								<div class="bc-box-handle1 l clearfix" v-if="showScore">
									<div class="box-handle1-text l">
										评分:
									</div>
									<div class="box-handle1-score l">
                                        <el-rate
                                            v-model="boxValue"
                                            :colors="colors2"
                                            text-color="#ff9900"
                                            score-template="{boxValue}"
                                            >
                                        </el-rate>
									</div>
									<div class="box-handle1-ds l">
										您的评分:<span>{{boxValue}}</span>分
									</div>
								</div>
								<div class="bc-box-handle2 r" @click="getAddComment(0, boxValue)">
									评论
								</div>
							</div>
                        </div>
                        <div class="bc-list">
                            <div class="comment-list clearfix" v-for="item in commentList" :key="item.Id">
                                <div class="cl-head l">
                                    <img :src="item.Img">
                                </div>
                                <div class="cl-con l">
                                    <div class="cl-con-name">
                                        {{item.UserName}}
                                    </div>
                                    <div class="cl-con-text">
                                        {{item.Content}}
                                    </div>
                                    <div class="cl-con-handle clearfix">
                                        <span class="handle-time">
                                            发表日期：{{item.CreateDate}}
                                        </span>
                                        <span class="handle-reply" @click="spreadReplyBox(item)">
                                            回复
                                        </span>
                                    </div>
                                    <el-collapse-transition>
                                         <div class="kb-reply-wrapper" v-if="item.slowDown">
                                            <div class="fcshow_clist clearfix">
                                                <div class="fcshow_clist2 l">
                                                    <div class="fcshow_clist2_replyLists" v-if="item.List.length > 0">
                                                        <ul>
                                                            <li v-for="item1 in item.List" :key="item1.Id">
                                                                <div class="replyList clearfix">
                                                                    <p class="replyList_p1 l"><span>{{item1.UserName}}</span>回复<span>{{item.UserName}}</span>：</p>
                                                                    <p class="replyList_p2 l">{{item1.Content}}</p>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div class="reply_box clearfix">
                                                        <input type="textarea" v-model.trim="textareaVal[item.Id]" value="" placeholder="评论" class="reply_box_ta">
                                                        <div class="reply_box_act">
                                                            <input type="button" class="reply_btn_confirm" value="回复" @click="getAddComment2(item.Id, 0)">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </el-collapse-transition>   
                                </div>
                            </div>
                        </div>
                    </div>
                    <el-pagination
                        background
                        :page-size="this.rows"
                        @current-change="handleCurrentChange"
                        layout="prev, pager, next"
                        :total="this.totalPageNumber">
                    </el-pagination>
                </div>
                <div class="mw-book-right r">
                    <div class="mw-book-chapter">
                        <div class="chapter-title">
							章节目录
						</div>
                        <div class="chapter-con" v-loading="loading" :data="chapterList">
							<ul v-if="chapterList.length > 0">
								<li v-for="item in chapterList" :key="item.Id" :title="item.Name">
									<router-link :to="{path: '/bookChapterContent', query:{id: item.Id}}">
                                        {{item.Name}}
                                    </router-link> 
								</li>
							</ul>
                            <p v-else>暂无章节目录</p>
						</div>
						<div class="chapter-handle" v-if="chapterList.length > 0">
							<div class="handle-btn chapter-handle1" @click="getBookChapterList(99999,false)" v-if="showLitterChapterList">
								展开 <img src="../assets/spread.png"/>
							</div>
							<div class="handle-btn chapter-handle2" @click="getBookChapterList(12,true)" v-else>
								收起 <img src="../assets/packup.png"/>
							</div>
						</div>
                    </div>
                    <div class="mw-book-tj">
						<div class="tj-tite">
							热门推荐
						</div>
						<div class="tj-con">
							<ul class="clearfix">
								<li v-for="item in hotBookList" :key="item.Id">
                                    <a javascript=":;" @click="goBookDetail(item.Id)">
                                        <error-book-img :src="item.Icon"  class="tj-img"> </error-book-img>
										<p class="title">《{{item.Name}}》</p>
										<p class="author">作者：{{item.Author}} </p>
                                    </a>
								</li>
							</ul>
							<div class="tj-refresh" @click="refresh()">
								<img src="../assets/refresh.png"/> 换一换
							</div>
						</div>
					</div>
                </div>
            </section>
        </div>
        <footer-fix></footer-fix>
    </div>
</template>

<script>
import { Message, MessageBox } from 'element-ui'
import { BookContent, FavoriteAdd, BookChapterList, FavoriteExist, FavoriteDelete, BookList, AddComment, CommentList } from '../service/getData'

export default {
    data () {
        return {
            headerIndex: '4',
            commentArea: '',
            textLength: '',
            valueStar: 0,
            boxValue: 0,
            colors: ['#ea544a', '#ea544a', '#ea544a'],
            colors2: ['#ea544a', '#ea544a', '#ea544a'],
            // 获取评论列表数据后添加一个dropDown:false的对象进item里 点击回复改变这个值的true-false通过v-if来控制回复列表的展开与隐藏
            id: '',
            bookContent: [],
            chapterList: [],
            NoCollect: true,
            showLitterChapterList: true,
            loading: true,
            firstChapterId: '',
            hotPage: 1,
            commentCurrentPage: 1,
            hotBookList: [],
            commentList: [],
            textareaVal: {},
            rows: 4,
            totalPageNumber: 0,
            showScore: true
        }
    },
    created () {
        this.id = this.$route.query.id
    },
    mounted () {
        this.getBookContent()
        this.getBookChapterList(12, true)
        this.getFavoriteExist()
        this.getBookList()
        this.getCommentList()
    },
    methods: {
        handleCurrentChange (val) {
        // console.log(`当前页: ${val}`);
        this.commentList = []
        this.commentCurrentPage = val
        this.page = val
        this.getCommentList()
        },
        async getBookContent () {
            let data = await BookContent({ Id: this.id })
            if (data.IsSuccess) {
                this.bookContent = data.Data
                this.valueStar = data.Data.Credit
                // if (data.Data.UserCommentCount > 0) {
                //     this.showScore = false
                // }
                this.showScore = !data.Data.IsRate
            }
        },
        async getBookChapterList (num, bol) {
            this.showLitterChapterList = bol
            this.chapterList = []
            this.loading = true
            let data = await BookChapterList({ Id: this.id, Page: 1, Rows: num }) 
            if (data.Data.ListData.length == 0) {
                this.loading = false
            } else {
                this.chapterList = data.Data.ListData
                this.firstChapterId = this.chapterList[0].Id
                this.loading = false
            }
        },
        async getFavoriteAdd () {
            let data = await FavoriteAdd({ mainId: this.id, type: 'Book' })
            if (data.Type == 1) {
                Message('您已成功收藏该作品')
                this.NoCollect = false
            }
        },
        async getFavoriteDelete () {
            let data = await FavoriteDelete({ ids: [this.id], type: 'Book' })
            if (data.Type == 1) {
                Message('您已取消收藏该作品')
                this.NoCollect = true
            }
        },
        async getFavoriteExist () {
            let data = await FavoriteExist({ Id: this.id, type: 'Book' })
            if (data.Type == 2) {
                this.NoCollect = true
            } else {
                this.NoCollect = false
            }
        },
        // 热门推荐部分因数据实在太少,与后台商量后先使用所有的电子书数据列表做翻页来模拟换一换功能
        // 后续数据多起来或者有新的接口后再修改该功能,功能做成随机还是用翻页,根据后台,再定
        async getBookList () {
            let data = await BookList({
                CategoryId: 0,
                Page: this.hotPage, 
                Rows: 1, 
                Sort: 'Click', 
                Order: 'desc'
            })
            if (data.IsSuccess) {
                this.hotBookList = data.Data.ListData
                let num = Number(data.Data.Count)
                if (num == this.hotPage) {
                    this.hotPage = 0
                }
            }
        },
        refresh () {
            this.hotBookList = []
            this.hotPage++
            this.getBookList()
        },
        async getAddComment (pId, rateVal) {
            if (this.commentArea) {
                let data = await AddComment({
                    Type: 'Book',
                    Content: this.commentArea,
                    ParentId: pId,
                    MainId: this.id,
                    rate: rateVal
                })
                if (data.Type == 1) {
                    Message('评论成功,正在审核中')
                    this.commentArea = ""
                    this.boxValue = 0
                }
            } else {
                MessageBox('请填写您的评论')
            }
        },
        async getAddComment2 (pId, rateVal) {
            if (this.textareaVal[pId]) {
                let data = await AddComment({
                    Type: 'Book',
                    Content: this.textareaVal[pId],
                    ParentId: pId,
                    MainId: this.id,
                    rate: rateVal
                })
                if (data.Type == 1) {
                    this.textareaVal[pId] = ''
                    Message('评论成功,内容正在审核')
                } else {
                    MessageBox('请填写您的评论')
                }
            }
        },
        async getCommentList () {
            this.commentList = []
            let data = await CommentList({ Page: this.commentCurrentPage, Rows: this.rows, MainId: this.id, parentId: 0, Sort: 'Id', Order: 'desc', Type: 'Book' })
            if (data.IsSuccess) {
                 let data1 = data.Data.List
                 this.totalPageNumber = Number(data.Data.TotalCount)
                 data1.map((item) => {
                     item.slowDown = false
                     return item
                 }) 
                 this.commentList = data1
            }
        },
        spreadReplyBox (item) {
            item.slowDown = !item.slowDown
        },
        commentFocus () {
            this.$refs.bcBoxArea.focus()
        },
        goBookDetail (id) {
            this.$router.push({ path: '/eBookDetail', query: { id: id } })
            this.$nextTick(() => {
                window.location.reload()
            })
        }
    },
    watch: {
        commentArea (val) {
            this.textLength = val.length
            if (this.textLength > 300) {
                this.textLength = 300
            }
        }
    }
}
</script>

<style lang="scss" rel="stylesheet/scss">
    @import "../style/mixin";

    .eBookDetail{
        .main{
            width: 1200px;
            margin: 20px auto 0;
            .mw-position{
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
            .mw-book{
                .mw-book-left{
                    background: #fff;
                    .mw-book-brief {
                        width: 850px;
                        padding-bottom: 40px;
                        .brief-left {
                            width: 182px;
                            height: 242px;
                            background: url(../assets/ebook-bg1.png);
                            margin-top: 20px;
                            margin-left: 20px;
                            background-size: 100% 100%;
                            img{
                                width: 158px;
                                height: 213px;
                                margin-top: 15px;
                                margin-left: 12px;
                            }
                        }
                        .brief-right {
                            width: 610px;
                            margin: 25px 0 0 20px;
                            .brief-rhd{
                                width: 100%;
                                border-bottom: 1px solid #e8e8e8;
                                .brief-rhd1 {
                                    width: 435px;
                                    .title{
                                        font-size: 18px;
                                        color: #555555;
                                        font-weight: bold;
                                    }
                                    .author{
                                        color: #999999;
                                        line-height: 27px;
                                    }
                                    .text{
                                        color: #555;
                                        line-height: 26px;
                                        @include ellipsis_two(2)
                                    }
                                    .mes{
                                        color: #999;
                                        margin-bottom: 15px;
                                        margin-top: 15px;
                                        p{
                                            float: left;
                                            padding: 0 8px;
                                            border-right: 1px solid #d8d8d8;
                                            height: 16px;
                                            line-height: 16px;
                                            &.num{
                                                padding-left: 0;
                                            }
                                            &.time{
                                                border-right: 0;
                                            }
                                        }
                                    }
                                }
                                .brief-rhd2 {
                                    width: 120px;
                                    height: 135px;
                                    box-shadow: 0px 0px 10px #ededed;
                                    .score-text {
                                        line-height: 26px;
                                        color: #999;
                                        margin-top: 10px;
                                        text-align: center;
                                    }
                                    .score-num {
                                        font-size: 30px;
                                        color: #000;
                                        font-weight: bold;
                                        text-align: center;
                                        line-height: 36px;
                                    }
                                    .score-star{
                                        .el-rate{
                                            display: table;
                                            margin: 0 auto;
                                            .el-rate__item{
                                                display: table-cell;
                                                .el-rate__icon{
                                                    margin-right: 4px;
                                                }
                                            }
                                        } 
                                    }
                                    .score-nump {
                                        text-align: center;
                                        color: #555;
                                        font-size: 12px;
                                    }
                                }
                            }
                            .brief-rbd{
                                width: 100%;
                                margin-top: 20px;
                                .brief-link {
                                    width: 120px;
                                    height: 40px;
                                    text-align: center;
                                    line-height: 40px;
                                    display: block;
                                    color: #fff;
                                    background: url(../assets/linkBg.png);
                                    font-size: 16px;
                                    font-weight: bold;
                                }
                                .brief-handle{
                                    .comment{
                                        border-right: 1px solid #e8e8e8;
                                    }
                                    .collect{
                                        padding-left: 25px;
                                        .text{
                                            color: #333;
                                        }
                                        .text2{
                                            color: #de4648;
                                        }
                                    }
                                    .comment,.collect{
                                        padding-right: 25px;
                                        height: 45px;
                                        cursor: pointer;
                                        .icon{
                                            width: 24px;
                                            height: 24px;
                                            margin: 0 auto;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    .mw-book-sketch{
                        margin-top: 20px;
                        padding: 20px;
                        width: 810px;
                        .sketch-title{
                            .sketch-title1{
                                font-size: 18px;
                                height: 21px;
                                line-height: 21px;
                                color: #555;
                                font-weight: bold;
                            }
                            .sketch-title-line{
                                margin-top: 16px;
                                .line1{
                                    width: 70px;
                                    height: 3px;
                                    background:#368474;
                                }
                                .line2{
                                    width: 740px;
                                    height: 1px;
                                    background: #e8e8e8;
                                    margin-top: 1px;
                                }
                            }
                        }
                        .sketch-title-con{
                            line-height: 30px;
                            color: #555;
                            padding: 15px 0 30px 0;
                        }
                    }
                    .mw-book-comment{
                        margin-top: 15px;
                        padding: 20px;
                        width: 810px;
                        .bc-title{
                            .bc-title1{
                                font-weight: bold;
                                font-size: 16px;
                            }
                            .bc-title2{
                            }
                        }
                        .bc-box{
                            textarea{
                                width: 810px;
                                height: 90px;
                                background: #f3f3f3;
                                border: 1px solid #e2e2e2;
                                margin-top: 5px;
                                text-indent: 10px;
                                padding-top: 10px;
                                display: block;
                            }
                            .bc-box-handle {
                                margin-top: 20px;
                                .box-handle1-text {
                                    line-height: 20px;
                                    margin-right: 15px;
                                }
                                .box-handle1-score{
                                }
                                .box-handle1-ds{
                                    margin-left: 25px;
                                    line-height: 20px;
                                    span{
                                        font-size: 18px;
                                        color: #ea544a;
                                        font-weight: bold;
                                        margin-left: 5px;
                                    }
                                }
                                .bc-box-handle2{
                                    width: 100px;
                                    height: 36px;
                                    text-align: center;
                                    line-height: 36px;
                                    cursor: pointer;
                                    background:#368474;
                                    color: #fff;
                                    border-radius: 5px;
                                }
                            }
                        }
                        .bc-list{
                            margin-top: 10px;
                            .comment-list {
                                margin-top: 10px;
                                .cl-head{
                                    width: 50px;
                                    height: 50px;
                                    border-radius: 50%;
                                    img{
                                         width: 50px;
                                        height: 50px;
                                        border-radius: 50%;
                                    }
                                }
                                .cl-con{
                                    width: 730px;
                                    border-bottom: 1px solid #e8e8e8;
                                    margin-left: 8px;
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
                        }
                    }
                    .el-pagination{
                        display: table;
                        margin: 0 auto;
                        padding: 60px 0;
                        ul{
                            li{
                                &.active{
                                    background: #ff9c08;
                                }
                                &:hover{
                                    background: #ff9c08;
                                    color: #fff;
                                }
                            }
                        }
                    }
                }
                .mw-book-right{
                    width: 332px;
                    .mw-book-chapter{
                        background: #fff;
                        border-top: 1px solid #fff;
                        padding-bottom: 20px;
                        .chapter-title{
                            width: 290px;
                            margin: 0 auto;
                            background: url(../assets/mulu-tbg.png) no-repeat 0 10px;
                            height: 25px;
                            line-height: 25px;
                            text-align: center;
                            font-weight: bold;
                            font-size: 20px;
                            color: #555;
                            margin-top: 15px;
                        }
                        .chapter-con{
                            width: 290px;
                            margin: 0 auto;
                            height: 410px;
                            overflow: auto;
                            ul{
                                li{
                                    a {
                                        color: #555;
                                        display: block;
                                        height: 34px;
                                        line-height: 34px;
                                        white-space: nowrap;
                                        text-overflow: ellipsis;
                                        overflow: hidden;
                                        text-indent: 10px;
                                        &:hover{
                                            background: #eff9fe;
                                        }
                                    }
                                }
                            }
                            p{
                                text-align: center;
                                margin-top: 20px;
                                font-size: 16px;
                            }
                        }
                        .chapter-handle{
                            width: 290px;
                            margin: 20px auto 0;
                            .handle-btn {
                                width: 100%;
                                height: 50px;
                                line-height: 50px;
                                background:#368474;
                                color: #fff;
                                text-align: center;
                                border-radius: 5px;
                                cursor: pointer;
                            }
                        }
                    }
                    .mw-book-tj{
                        background: #fff;
                        margin-top: 15px;
                        border-top: 1px solid #fff;
                        padding-bottom: 30px;
                        .tj-tite {
                            width: 290px;
                            margin: 0 auto;
                            background: url(../assets/mulu-tbg.png) no-repeat 0 10px;
                            height: 25px;
                            line-height: 25px;
                            text-align: center;
                            font-weight: bold;
                            font-size: 20px;
                            color: #555;
                            margin-top: 15px;
                        }
                        .tj-con{
                            width: 290px;
                            margin: 0 auto;
                            margin-top: 25px;
                            ul{
                                li{
                                    float: left;
                                    width: 130px;
                                    height: 230px;
                                    margin: 0px 7px 25px 7px;
                                    cursor: pointer;
                                    .tj-img{
                                        width: 108px;
                                        height: 159px;
                                    }
                                    .title{
                                        color: #555;
                                        font-size: 16px;
                                        font-weight: bold;
                                        line-height: 27px;
                                        height: 27px;
                                        overflow: hidden;
                                        text-overflow: ellipsis;
                                        white-space: nowrap
                                    }
                                    .author {
                                        color: #999;
                                        height: 27px;
                                        line-height: 27px;
                                    }
                                }
                            }
                            .tj-refresh {
                                width: 100%;
                                height: 50px;
                                line-height: 50px;
                                background: #e8e8e8;
                                border-radius: 5px;
                                text-align: center;
                                font-size: 16px;
                                font-weight: bold;
                                cursor: pointer;
                                img{
                                    vertical-align: middle;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>
