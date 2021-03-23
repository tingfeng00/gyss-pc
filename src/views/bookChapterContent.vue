<template>
    <div class="bookChapterContent">
        <header-fix :active-index="headerIndex"></header-fix>
        <div class="main">
            <div class="mw-position clearfix">
                <p class="text l">您所在的位置:</p>
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/' }"><img src="../assets/home.png" alt="">首页</el-breadcrumb-item>
                    <el-breadcrumb-item :to="{ path: '/eBook' }">电子书</el-breadcrumb-item>
                    <el-breadcrumb-item :to="{ path: '/eBookDetail',query: {id: bookId} }">电子书详情页</el-breadcrumb-item>
                    <el-breadcrumb-item>{{bookContent.Name}}</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="mw-title">
                <div class="text">
                    {{bookContent.Name}}
                </div>
                <div class="info">
                    <span>作者: 曹雪芹</span> <span>来源: 无</span>
                </div>
                <div class="adjust">
                    <span v-if="this.isCollect == false" @click="getFavoriteAdd()">[未收藏]</span>
                    <span v-else @click="getFavoriteDelete()">[已收藏]</span>
                    <!-- <span v-print="'#printMe'">[打印]</span> -->
                    <span @click="print()">[打印]</span>
                    <span @click="fontSizeHandleM()">[缩小字体]</span>
                    <span @click="fontSizeHandleA()">[放大字体]</span>
                </div>
            </div>
            <div class="detail-content" v-html="bookContent.Content" ref="printMe" id="printMe">

            </div>
        </div>
        <footer-fix></footer-fix>
    </div>
</template>

<script>
import Vue from 'vue'
import { BookChapterContent, FavoriteExist, FavoriteDelete, FavoriteAdd } from '../service/getData'
import { Message } from 'element-ui'
import VueHtmlToPaper from 'vue-html-to-paper'
Vue.use(VueHtmlToPaper)
export default {
    data () {
        return {
            headerIndex: '4',
            id: '',
            bookContent: [],
            isCollect: false,
            num: 14,
            bookId: ''
        }
    },
    created () {
        this.id = this.$route.query.id
    },
    mounted () {
        this.getBookChapterContent()
        this.getFavoriteExist()
    },
    methods: {
        async getBookChapterContent () {
            let data = await BookChapterContent({ Id: this.id })
            this.bookContent = data.Data
            this.bookId = data.Data.BookId
            console.log(this.bookId)
        },
        async getFavoriteAdd () {
            let data = await FavoriteAdd({ mainId: this.id, type: 'BookChapter' })
            if (data.Type == 1) {
                Message('您已成功收藏该章节')
                this.isCollect = true
            }
        },
        async getFavoriteDelete () {
            let data = await FavoriteDelete({ ids: [this.id], type: 'BookChapter' })
            if (data.Type == 1) {
                Message('您已取消收藏该章节')
                this.isCollect = false
            }
        },
        async getFavoriteExist () {
            let data = await FavoriteExist({ Id: this.id, type: 'BookChapter' })
            if (data.Type == 2) {
                this.isCollect = false
            } else {
                this.isCollect = true
            }
        },
        fontSizeHandleM () {
            this.num -= 2
            if (this.num <= 12) {
                this.num = 12
            }
            let fs = document.getElementById('printMe')
            fs.style.fontSize = this.num + 'px'
        },
        fontSizeHandleA () {
            this.num += 2
            let fs = document.getElementById('printMe')
            fs.style.fontSize = this.num + 'px'
        },
        print () {
            this.$htmlToPaper('printMe')
        }

    }
}
</script>

<style lang="scss" rel="stylesheet/scss">
    @import "../style/mixin";

    .bookChapterContent {
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
            .mw-title{
                border-bottom: 1px solid #999;
                text-align: center;
                .text{
                    font-size: 22px;
                    font-weight: 600;
                    line-height: 35px;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    text-align: center;
                }
                .info{
                    line-height: 30px;
                    font-size: 12px;
                    color: #999;
                    text-align: center;
                    span{
                        margin: 0 15px;
                    }
                }
                .adjust{
                    color: #999;
                    text-align: center;
                    line-height: 35px;
                    span{
                        color: #999;
                        line-height: 30px;
                        margin: 0 5px;
                        cursor: pointer
                    }
                }
            }
            .detail-content{
                min-height: 500px;
                word-wrap: break-word;
                padding: 10px 20px;
            }
           
        }
    }
</style>
