<template>
    <div class="articleDetail">
        <header-fix :active-index="headerIndex"></header-fix>
        <div class="main clearfix">
             <div class="pc-left l">
                <menu-list
                    :menu-icon="menuIcon"
                    :menu-list-title="menuListTitle"
                    :menu-data="menuData2"
                    :go-menu-list="goMenuList2"
                    :sort-title="sortShow2"
                    :title-text1="titleText4"
                    :title-text2="titleText5"
                    :title-text3="titleText6"
                ></menu-list>
            </div>
            <div class="pc-right r">
                <div class="title">
                    {{articleContent.Name}}
                </div>
                <div class="tip">
                    <div class="tip-con  clearfix">
                        <p>来源:{{articleContent.Source || '暂无'}}</p>
                        <p>发布时间:{{articleContent.CreateDate | dateFilter('yyyy-MM-dd')}}</p>
                        <p>作者：{{articleContent.Author || '暂无'}}</p>
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
    import { NoticeCategory, NoticeContent } from '../service/getData'
    export default {
        data () {
            return {
                menuListTitle: '文章分类',
                menuListShow: true,
                headerIndex: '0',
                menuData2: [],
                menuIcon: articleIcon,
                titleName: '文章标题',
                titleText4: '通知',
                titleText5: 'Notice announcement',
                titleText6: '公告',
                sortShow2: true,
                sortShow: true,
                id: '',
                articleContent: [],
                mid: ''
            }
        },
        created () {
            this.id = this.$route.query.id
            this.mid = this.$route.query.mid
        },
        mounted () {
            this.getNoticeCategory()
            this.getArticleContent()
        },
        methods: {
            goMenuList2 (item) {
                this.$router.push({ path: '/noticeCenter', query: { Name: item.Name, Id: item.Id } })
            },
            
            async getNoticeCategory () {
                let data = await NoticeCategory({ parentId: 0 })
                if (data.IsSuccess) {
                     let data1 = data.Data.ListData.map((item) => {
                        item.Id == this.mid ? item.isClick = true : item.isClick = false
                        return item
                    })
                    this.menuData2 = data1
                }
            },
            async getArticleContent () {
                let data = await NoticeContent({ Id: this.id })
                if (data.IsSuccess) {
                    this.articleContent = data.Data.Model
                }
            }
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
                    text-indent: 30px;
                    img{
                        text-align: center
                    }
                }
            }
        }
    }
</style>
