<template>
    <div class="courseDetail">
        <header-fix :active-index="headerIndex"></header-fix>
        <div class="main clearfix">
             <div class="mw-position clearfix">
                <p class="text l">您所在的位置:</p>
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/' }"><img src="../assets/home.png" alt="">首页</el-breadcrumb-item>
                    <el-breadcrumb-item :to="{ path: '/courseCenter' }">课程中心</el-breadcrumb-item>
                    <el-breadcrumb-item>课程详情</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="mw-course-bc clearfix">
                <div class="mw-course-brief l">
					<div class="mw-course-brief1 clearfix">
						<div class="mwc-brief1-hd l">
							<img :src="imgUrl+courseContent.Img" v-if="courseContent.Img"/>
                            <img src="../assets/noDataPic2.png" alt="" v-else>
						</div>
						<div class="mwc-brief1-bd l">
							<div class="title" :title="courseContent.Name">
								{{courseContent.Name}}
							</div>
							<div class="s_brief clearfix">
								<p class="l"><span>所属分类:</span>{{courseContent.ChannelName}}</p>
								<p class="r"><span>表现形式:</span>{{courseContent.Type}}</p>
							</div>
							<div class="s_brief clearfix">
								<p class="l"><span>点击次数:</span>{{courseContent.ClickCount}}次</p>
								<p class="r"><span>总学分:</span>{{courseContent.Credit}}分</p>
							</div>
							<div class="brief_pre clearfix">
								<p class="text l">播放进度:</p>
								<el-progress :percentage="progress" :stroke-width="10"></el-progress>
							</div>
							<div class="mwc-brief1-handle clearfix">
                                <!-- <div class="playBtn" @click="toPlay(courseContent.Type, courseContent.Id)">
                                    继续播放
                                </div> -->
                                <router-link class="playBtn" target="_blank" :to="{path: '/playSC', query: { id: courseContent.Id}}">
                                    继续播放
                                </router-link> 
								<div class="collect r">
                                    <section v-if="isFavourite" @click="getFavoriteDelete()">
                                        <img src="../assets/collect-img2.png"/>
									    <p>已收藏</p>
                                    </section>
                                    <section v-else @click="getFavoriteAdd()">
                                        <img src="../assets/collect-img.png"/>
									    <p>收藏</p>
                                    </section>
									
								</div>
							</div>
						</div>
					</div>
					<div class="mw-course-brief2">
						<div class="mwc-brief2-title">
							<p>课程简介</p>
							<div class="line clearfix">
								<p class="line1 l"></p>
								<p class="line2 l"></p>
							</div>
						</div>
						<div class="mwc-brief2-con">
							{{courseContent.Description||'暂无简介'}}
						</div>
					</div>
				</div>
                <div class="mw-course-comment l">
                    <div class="mw-course-ctitle">
						精彩评论
					</div>
                    <div class="mw-course-clist">
                        <ul>
                            <li v-for="(item,index) in commentList" :key="index">
								<div class="clist-con">
									<div class="clist-con-hd clearfix">
										<div class="clist-con-hd1 l">
											<img :src="item.UserImg">
										</div>
										<div class="clist-con-hd2 l">
											<div class="name">
												{{item.UserName}}
											</div>
											<el-rate
                                                v-model="item.Rate"
                                                disabled
                                                :colors="colors"
                                                score-template="{value}">
                                            </el-rate>
										</div>
									</div>
									<div class="clist-con-bd">
										{{item.Comment}}
									</div>
								</div>
							</li>
                        </ul>
                        <p class="noData" v-if="this.commentList.length == 0">暂无评论</p>
                    </div>
                </div>
            </div>
            <div class="mw-rec">
                <div class="mw-rec-title">
                    <p>课程推荐</p>
                    <div class="line clearfix">
                        <p class="line1 l"></p>
                        <p class="line2 l"></p>
                    </div>
                </div>
                <div class="mw-rec-con">
                    <swiper :options="swiperOptionCu">
                        <swiper-slide v-for="item in recommendCourseList" :key="item.Id">
                            <router-link class="pic" target="_blank" :to="{path: '/courseDetail', query: {id: item.Id}}">
                                <!-- <img :src="item.Img"/> -->
                                <error-img :src="item.Img"></error-img>
                            </router-link>
                            <div class="text">
                                <p class="name">{{item.Name}}</p>
                                <p class="num">点击量：{{item.ClickCount}}</p>
                            </div>
                        </swiper-slide>
                       
                        <div class="swiper-button-prev" slot="button-prev"></div>
                        <div class="swiper-button-next" slot="button-next"></div>
                    </swiper>
                </div>
            </div>
        </div>
        <footer-fix></footer-fix>
    </div>
</template>

<script>
import Vue from 'vue'
import { Message } from 'element-ui'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { CourseContent, FavoriteExist, FavoriteDelete, FavoriteAdd, CourseComment, RecommendCourse } from '../service/getData'
import { toPlay } from '../service/mixins'
Vue.use(swiper)
Vue.use(swiperSlide)
export default {
    mixins: [toPlay],
    data () {
        return {
            headerIndex: '3',
            colors: ['#ea544a', '#ea544a', '#ea544a'],
            swiperOptionCu: {
                slidesPerView: 4,
                spaceBetween: 20,
                centeredSlides: false,
                autoplay: {
                delay: 4000,
                disableOnInteraction: false
                },
                navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
                }
            },
            id: '',
            courseContent: [],
            progress: 0,
            isFavourite: false,
            commentList: [],
            recommendCourseList: [],
            imgUrl: ''
        }
    },
    created () {
        this.id = this.$route.query.id
    },
    mounted () {
        this.getCourseContent()
        this.getFavoriteExist()
        this.getCourseComment()
        this.getRecommendCourse()
    },
    methods: {
        async getCourseContent () {
            let data = await CourseContent({ id: this.id })
            this.courseContent = data.CourseModel
            this.imgUrl = data.ImageCourse
            if (data.CourseModel.BrowseScore < 0) {
                this.progress = 0 
            } else {
                this.progress = data.CourseModel.BrowseScore
            }
        },
        async getFavoriteDelete () {
            let data = await FavoriteDelete({ ids: [this.id], type: 'Course' })
            if (data.Type == 1) {
                Message('您已取消收藏该作品')
                this.isFavourite = false
            }
        },
        async getFavoriteAdd () {
            let data = await FavoriteAdd({ mainId: this.id, type: 'Course' })
            if (data.Type == 1) {
                Message('您已成功收藏该作品')
                this.isFavourite = true
            }
        },
        async getFavoriteExist () {
            let data = await FavoriteExist({ Id: this.id, type: 'Course' })
            if (data.Type == 2) {
                this.isFavourite = false
            } else {
                this.isFavourite = true
            }
        },
        async getCourseComment () {
            let data = await CourseComment({ page: 1, rows: 4, id: this.id, order: 'desc', sort: 'CreateDate' })
            this.commentList = data.ListData
        },
        async getRecommendCourse () {
            let data = await RecommendCourse({ Page: 1, Rows: 8 })
            if (data.IsSuccess) {
                this.recommendCourseList = data.Data.ListData
            }
        }
    }
}
</script>

<style lang="scss" rel="stylesheet/scss">
    @import '../style/mixin';

    .courseDetail{
        background: url("../assets/body-bg.png") no-repeat;
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
            .mw-course-bc{
                width: 100%;
                margin-top: 10px;
                .mw-course-brief{
                    width: 840px;
                    .mw-course-brief1 {
                        width: 800px;
                        padding: 20px;
                        height: 240px;
                        background: #fff;
                        .mwc-brief1-hd {
                            width: 390px;
                            height: 240px;
                            img {
                                width: 390px;
                                height: 240px;
                            }
                        }
                        .mwc-brief1-bd {
                            width: 380px;
                            margin-left: 30px;
                            .title {
                                font-weight: bold;
                                color: #555;
                                font-size: 20px;
                                line-height: 36px;
                                @include ellipsis_two();
                            }
                            .s_brief {
                                width: 100%;
                                line-height: 27px;
                                color: #989898;
                                p {
                                    width: 140px;
                                    text-align: left;
                                    span {
                                        margin-right: 10px;
                                        width: 60px;
                                        text-align: right;
                                        display: inline-block;
                                    }
                                }
                            }
                            .brief_pre{
                                color: #989898;
                                margin-top: 10px;
                                .el-progress{
                                    float: left;
                                    width: 300px;
                                    margin-left: 5px;
                                    margin-top: 2px;
                                }
                            }
                            .mwc-brief1-handle{
                                margin-top: 20px;
                                border-top: 1px solid #e8e8e8;
                                padding-top: 20px;
                                 .playBtn {
                                    float: left;
                                    display: block;
                                    width: 122px;
                                    height: 47px;
                                    line-height: 40px;
                                    color: #fff;
                                    font-size: 16px;
                                    text-align: center;
                                    background: url(../assets/play-bg.png) no-repeat;
                                    cursor: pointer;
                                }
                                .collect {
                                    text-align: center;
                                    cursor: pointer;
                                    img {
                                        width: 24px;
                                        height: 24px;
                                        display: block;
                                        margin: 0 auto;
                                    }
                                    p {
                                        height: 20px;
                                        line-height: 20px;
                                        color: #999;
                                    }
                                }
                            }
                        }
                    }
                    .mw-course-brief2 {
                        width: 800px;
                        padding: 20px;
                        background: #fff;
                        margin-top: 15px;
                        height: 220px;
                        .mwc-brief2-title {
                            p {
                                font-size: 18px;
                                font-weight: bold;
                                line-height: 21px;
                                color: #555;
                            }
                            .line {
                                margin-top: 10px;
                                .line1 {
                                    width: 70px;
                                    height: 3px;
                                    background:#368474;
                                }
                                .line2 {
                                    width: 730px;
                                    height: 1px;
                                    background: #e8e8e8;
                                    margin-top: 1px;
                                }
                            }
                        } 
                        .mwc-brief2-con{
                            line-height: 30px;
                            color: #555;
                            padding-top: 10px;
                            @include ellipsis_two(6)
                        }
                    }
                }
                .mw-course-comment {
                    width: 295px;
                    padding: 20px;
                    margin-left: 20px;
                    min-height: 240px;
                    background: #fff;
                    .mw-course-ctitle{
                        text-align: center;
                        background: url(../assets/line-bg.png) no-repeat 0 12px;
                        font-size: 18px;
                        font-weight: bold;
                        color: #555;
                    }
                    .mw-course-clist{
                        margin-top: 15px;
                        ul{
                            li{
                                margin-bottom: 22px;
                                .clist-con{
                                    .clist-con-hd{
                                        .clist-con-hd1{
                                            width: 50px;
                                            height: 50px;
                                            img{
                                                width: 50px;
                                                height: 50px;
                                                display: block;
                                            }
                                        }
                                        .clist-con-hd2{
                                            margin-left: 10px;
                                            .name{
                                                width: 235px;
                                                color: #303030;
                                                font-size: 13px;
                                            }
                                            .el-rate{
                                                margin-top: 5px;
                                            }
                                        }
                                    }
                                    .clist-con-bd {
                                        height: 40px;
                                        line-height: 20px;
                                        font-size: 13px;
                                        color: #303030;
                                        word-break: break-all;
                                    }
                                }
                            }
                        }
                        .noData{
                            text-align:center; 
                            font-size: 16px;
                            font-weight: bold;
                        }
                    }
                }
            }
            .mw-rec{
                margin-top: 20px;
                padding: 20px;
                background: #fff;
                .mw-rec-title {
                    width: 1155px;
                    p {
                        font-size: 18px;
                        font-weight: bold;
                        color: #555;
                        line-height: 21px;
                    }
                    .line {
                        margin-top: 10px;
                        .line1 {
                            width: 70px;
                            height: 3px;
                            background:#368474;
                        }
                       .line2 {
                            width: 1085px;
                            height: 1px;
                            background: #e8e8e8;
                            margin-top: 1px;
                        }
                    }
                }
            }
            .mw-rec-con{
                width: 100%;
                margin-top: 20px;
                .swiper-container{
                    .swiper-wrapper{
                    position: relative;
                    .swiper-slide{
                        width: 275px;
                        height: 245px;
                        .pic{
                        width: 275px;
                        height: 179px;
                        img{
                            width: 275px;
                            height: 179px;
                        }
                        }
                        .text{
                        width: 100%;
                        .name{
                            margin-top: 5px;
                            font-size: 16px;
                            color: #555;
                            height: 32px;
                            line-height: 32px;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }
                        .num{
                            color: #999;
                            height: 28px;
                            line-height: 28px;
                        }
                        }
                    }
                    }
                    .swiper-button-prev{
                    position: absolute;
                    background: url(../assets/left-arrow1.png) no-repeat;
                    width:44px;
                    height: 44px;
                    top:50%;
                    margin-top: -55px;
                    left: 20px
                    }
                    .swiper-button-next{
                    background: url(../assets/right-arrow1.png) no-repeat;
                    width:44px;
                    height: 44px;
                    top:50%;
                    margin-top: -55px;
                    right: 20px;
                    }
                    .swiper-button-disabled{
                    opacity: 1
                    }
                }
            }
        }
    }
</style>
