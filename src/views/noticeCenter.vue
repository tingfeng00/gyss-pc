<template>
    <div class="noticeCenter">
        <header-fix :active-index="headerIndex"></header-fix>
        <div class="course-banner">
			<img src="../assets/article-banner.png">
		</div>
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
                <search-key
                  :title-name="titleName" 
                  :search="clickSearch"
                  :current-value="keyword"
                  @getKey="getKeyWord"
                  @startDate="getStartDate"
                  @endDate="getEndDate"
                  >
                </search-key>
                <div class="cm-lesson">
                    <div class="cm-lesson-top clearfix">
                        <div class="cm-lesson-top1 l">
                            全部文章
                        </div>
                    </div>
                    <div class="cm-lesson-con">
                        <notice-table-list :list-data="articleList" :current-page="currentPage" :row="rows" :mid="CategoryId"></notice-table-list>
                    </div>
                    <el-pagination
                        background
                        :page-size="this.rows"
                        @current-change="handleCurrentChange"
                        layout="prev, pager, next"
                        :total="this.totalPageNumber">
                        <!--  -->
                    </el-pagination>
                </div>
            </div>
        </div>
        <footer-fix></footer-fix>
    </div>
</template>

<script>
import articleIcon from '../assets/classify.png'
import { NoticeCategory, NoticeList } from '../service/getData'
import { formatDate } from '../plugins/utils'
export default {
    data () {
        return {
            headerIndex: '0',
            menuListTitle: '公告分类',
            menuData: [],
            menuData2: [],
            menuIcon: articleIcon,
            sortShow2: true,
            menuListShow: true,
            titleName: '公告标题',
            titleText4: '通知',
            titleText5: 'Notice announcement',
            titleText6: '公告',
            keyword: '',
            startDate: '',
            endDate: '',
            articleList: [],
            totalPageNumber: 0,
            page: '1',
            CategoryId: '',
            currentPage: 1,
            rows: 10,
            desc: 'CreateDate'
        }
    },
    created () {
       this.CategoryId = this.$route.query.Id || '0'
    },
    mounted () {
        this.getNoticeCategory()
        this.getNoticeInfoList()
    },
    methods: {
        // goMenuList (item, menu) {
        //     menu.forEach((itemS) => {
        //         // 使用set方法时 不用遍历从接口获得的数据添加isClick set方法可以添加原数组没有的参数且不改变数组
        //         // 通过这个添加的参数来进行数据操作
        //         // this.$set(itemS,'isClick', false)
        //         itemS.isClick = false
        //     })
        //     item.isClick = true
        //     // this.$set(item,'isClick', true)
        //     this.CategoryId = item.Id
        //     this.articleList = []
        //     this.startDate = ''
        //     this.endDate = ''
        //     this.keyword = ''
        //     this.getNoticeInfoList()
        // },
        goMenuList2 (item, menu) {
            menu.forEach((itemS) => {
                this.$set(itemS, 'isClick', false)
            })
            item.isClick = true
            // this.CategoryId = item.Id
            this.articleList = []
            this.startDate = ''
            this.endDate = ''
            this.keyword = ''
            this.getNoticeInfoList()
        }, 
        handleCurrentChange (val) {
            this.articleList = []
            this.page = val
            this.currentPage = val 
            this.getNoticeInfoList()
        },
        async getNoticeCategory () {
            let data = await NoticeCategory({ parentId: 0 })
            if (data.IsSuccess) {
                let data1 = data.Data.ListData.map((item) => {
                    item.Id == this.CategoryId ? item.isClick = true : item.isClick = false
                    return item
                })
                this.menuData2 = data1
            }
        },
        async getNoticeInfoList () {
            let data = await NoticeList({ 
                CategoryId: this.CategoryId,
                Page: this.page,
                Rows: this.rows, 
                Sort: this.desc, 
                Order: 'desc',
                BeginDate: this.startDate,
                EndDate: this.endDate,
                Keyword: this.keyword
            })
            if (data.IsSuccess) {
                this.articleList = data.Data.ListData
                this.totalPageNumber = Number(data.Data.Count)
            }
        },
        getEndDate (val) {
            this.endDate = formatDate(val, 'yyyy-MM-dd')
        },
        getStartDate (val) {
            this.startDate = val
        },
        getKeyWord (val) {
            this.keyword = val
        },
        clickSearch () {
           this.articleList = []
           this.getNoticeInfoList()
        }
    }
}
</script>

<style lang="scss" rel="stylesheet/scss">
    @import '../style/mixin';

    .noticeCenter{
        background: url("../assets/body-bg.png") no-repeat;
        .course-banner{
            width: 100%;
            height: 200px;
            img{
                width: 100%;
                height: 200px;
            }
        }
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
                .cm-lesson{
                    background: #fff;
                    margin-top: 10px;
                    min-height: 855px;
                    position: relative;
                    .cm-lesson-top {
                        height: 42px;
                        border-bottom: 1px solid #e8e8e8;
                        .cm-lesson-top1 {
                            font-size: 18px;
                            color: #333;
                            height: 42px;
                            line-height: 42px;
                            margin-left: 20px;
                            font-weight: bold;
                        }
                        .cm-lesson-top2 {
                            margin-left: 35px;
                            height: 42px;
                            line-height: 42px;
                            span {
                                margin-left: 20px;
                                cursor: pointer;
                                &.on{
                                    color: #ff9c08;
                                }
                            }
                        }
                        .cm-lesson-top3{
                            p{
                                float: left;
                                width: 70px;
                                border-left: 1px solid #e8e8e8;
                                cursor: pointer;
                                height: 43px;
                                line-height: 43px;
                                text-align: center;
                                img {
                                    width: 16px;
                                    height: 17px;
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
            }
        }
    }
</style>
