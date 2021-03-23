<template>
    <div class="articleDetail">
        <header-fix :active-index="headerIndex"></header-fix>
        <div class="main clearfix">
             <div class="pc-left l">
                 <menu-list
                    :menu-icon="menuIcon"
                    :menu-list-title="menuListTitle"
                    :menu-data="menuData"
                    :go-menu-list="goMenuList"
                    :sort-title="sortShow"
                    :menu-list-show="menuListShow"
                    :title-text1="titleText1"
                    :title-text2="titleText2"
                    :title-text3="titleText3"
                ></menu-list>
            </div>
            <div class="pc-right r">
                <div class="title">
                    {{articleContent.Name}}
                </div>
                <div class="tip">
                    <div class="tip-con  clearfix">
                        <p>来源:{{articleContent.Source || '暂无'}}</p>
                        <p>发布时间:{{articleContent.CreateDate}}</p>
                        <p>作者：{{articleContent.Author}}</p>
                        <p class="collect" v-if="isFavourite" @click="getFavoriteDelete()"><img src="../assets/collect-img2.png" alt="">已收藏</p>
                        <p class="collect" v-else @click="getFavoriteAdd()"><img src="../assets/collect-img.png" alt="">未收藏</p>
                        
                    </div>
                </div>
                <div class="content" v-html="articleContent.Content">
                </div>
            </div>
        </div>
        <footer-fix></footer-fix>
    </div>
    
</template>
<script>
    import articleIcon from '../assets/classify.png'
    import { GetArticleChannelInfoList, NoticeCategory, ArticleContent, FavoriteAdd, FavoriteDelete, FavoriteExist } from '../service/getData'
//    , SetArticleRed
    import { Message } from 'element-ui'
    export default {
        data () {
            return {
                menuListTitle: '文章分类',
                menuListShow: true,
                headerIndex: '2',
                menuData: [],
                menuData2: [],
                menuIcon: articleIcon,
                titleName: '文章标题',
                titleText1: '新闻',
                titleText2: 'News',
                titleText3: '新闻',
                sortShow2: true,
                sortShow: true,
                id: '',
                articleContent: [],
                isFavourite: false,
                mid: ''
            }
        },
        created () {
            this.id = this.$route.query.id
            this.mid = this.$route.query.mid
        },
        mounted () {
            this.getArticleChannelInfoList()
            this.getNoticeCategory()
            this.getArticleContent()
            this.getFavoriteExist()
        },
        methods: {
            goMenuList (item) {
                this.$router.push({ path: '/articleCenter', query: { Name: item.Name, Id: item.Id } })
            },
            // goMenuList2 (item) {
            //     this.$router.push({ path: '/noticeCenter', query: { Name: item.Name, Id: item.Id } })
            // },
            async getArticleChannelInfoList () {
                let data = await GetArticleChannelInfoList({ parentId: 0 })
                if (data.IsSuccess) {
                     let data1 = data.Data.ArticleCategoryResult.map((item) => {
                         item.Id == this.mid ? item.isClick = true : item.isClick = false
                         return item
                     })
                     this.menuData = data1
                }
            },
            async getNoticeCategory () {
                let data = await NoticeCategory({ parentId: 0 })
                if (data.IsSuccess) {
                    this.menuData2 = data.Data.ListData
                }
            },
            async getArticleContent () {
                let data = await ArticleContent({ Id: this.id })
                if (data.IsSuccess) {
                    this.articleContent = data.Data
                    // if (!data.Data.IsRead) {
                    //     this.getSetArticleRed()
                    // }
                }
            },
            async getFavoriteDelete () {
                let data = await FavoriteDelete({ ids: [this.id], type: 'Article' })
                if (data.Type == 1) {
                    Message('您已取消收藏该作品')
                    this.isFavourite = false
                }
            },
            async getFavoriteAdd () {
                let data = await FavoriteAdd({ mainId: this.id, type: 'Article' })
                if (data.Type == 1) {
                    Message('您已成功收藏该作品')
                    this.isFavourite = true
                }
            },
            async getFavoriteExist () {
                let data = await FavoriteExist({ Id: this.id, type: 'Article' })
                if (data.Type == 2) {
                    this.isFavourite = false
                } else {
                     this.isFavourite = true
                }
            }
            // async getSetArticleRed () {
            //     let data = await SetArticleRed({ Id: this.id })
            //     if (data.IsSuccess) {
            //         // console.log(data.Message)
            //     }
            // }
        }
    }
</script>
<style lang="scss" rel="stylesheet/scss">
    @import '../style/mixin';
    
    .articleDetail{
        background: url("../assets/body-bg.png") no-repeat;
        .main{
            width: 1200px;
            margin: 20px auto 0;
            .pc-left{
                width: 261px;
                background: #fff;
                padding-bottom: 50px;
            }
            .pc-right{
                width: 914px;
                background: #fff;
                padding: 30px 0;
                .title{
                    width: 875px;
                    margin: 0 auto;
                    font-size: 24px;
                    color: #333;
                    text-align: center;
                    font-weight: bold;
                }
                .tip{
                    width: 875px;
                    margin: 0 auto;
                    border-bottom: 1px solid #dfdfdf;
                    .tip-con{
                        display: table;
                        margin: 25px auto 10px;
                        p{
                            color: #999;
                            margin-right: 12px;
                            font-size: 14px;
                            float: left;
                            img{
                                margin: 0 5px;
                                // width: 12px;
                                // height: 12px;
                            }
                            &.collect{
                                cursor: pointer;
                            }
                        }
                    }
                }
                .content{
                    width: 875px;
                    margin: 30px auto 0;
                    line-height: 24px;
                    color: #555;
                    text-indent: 0;
                    min-height: 270px;
                    img{
                        max-width: 875px!important;
                        display: block;
                        margin: 0 auto;
                    }
                    span{
                        text-indent: 30px;
                        display: block;
                    }
                }
            }
        }
    }
</style>
