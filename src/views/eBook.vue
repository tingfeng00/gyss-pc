<template>
    <div class="ebook">
        <header-fix :active-index="headerIndex"></header-fix>
         <div class="ebook-banner">
			<img src="../assets/ebook-banner.png">
		</div>
        <div class="main clearfix">
            <div class="pc-left l">
                <div class="pc-left1">
                    <menu-list
                        :menu-icon="menuIcon"
                        :menu-list-title="menuListTitle"
                        :menu-data="menuData"
                        :go-menu-list="goMenuList"
                        :sort-title="sortTitle"
                        :menu-list-show="menuListShow"
                    ></menu-list>
                </div>
            </div>
            <div class="pc-right r">
                <div class="ebook-top clearfix">
					<div class="ebook-top1 l">
						全部书籍
					</div>
					<div class="ebook-top2 l">
                        <div class="list">
                            <span class="on" v-if="orderNew">最新 <img src="../assets/arrow-down4.png"> </span>
                            <span @click=" orderNew=true, desc='CreatedDate', getBookList()" v-else>最新  <img src="../assets/arrow-down3.png"> </span>
                        </div>
						<div class="list">
                            <span @click="orderNew=false, desc='ClickCount', getBookList()" v-if="orderNew">最热 <img src="../assets/arrow-down3.png"> </span>
                            <span class="on" v-else>最热  <img src="../assets/arrow-down4.png"> </span>
                        </div>
					</div>
					<div class="ebook-top3 r clearfix">
						<input type="text" placeholder="请输入要搜索的电子书名称" v-model="bookTitle">
						<span><img src="../assets/glass.png" @click="searchBook"></span>
					</div>
				</div>
                <div class="ebook-con">
                    <div class="book-body">
                        <ul v-if="bookList.length > 0">
                            <li v-for="item in bookList" :key="item.Id">
								<div class="book clearfix">
                                    <router-link class="book-left l" :to="{path: '/eBookDetail', query:{id: item.Id}}">
                                        <error-book-img :src="item.Icon"></error-book-img>
                                    </router-link>
									<div class="book-right l" :title="item.Name">
                                        <router-link class="br-hd1" :to="{path: '/eBookDetail', query:{id: item.Id}}">
                                            《 {{item.Name}} 》
                                        </router-link>
										<p class="br-hd2" v-if="item.Author.trim()">{{item.Author}}  著</p>
                                        <p class="br-hd2" v-else>暂无作者</p>
										<div class="br-bd1" v-html="item.BookKey">
										</div>
										<div class="br-bd2 clearfix">
											<p class="num">{{item.ClickCount}}人浏览</p>
											<p class="name">{{item.CategoryNames[0]}}</p>
										</div>
									</div>
								</div>
                            </li>
                        </ul>
                        <p class="noData" v-else>暂无数据</p>
                    </div>
                    <el-pagination
                        background
                        @current-change="handleCurrentChange"
                        layout="prev, pager, next"
                        :total="this.totalPageNumber">
                    </el-pagination>
                </div>
            </div>
        </div>
        <footer-fix></footer-fix>
    </div>
</template>

<script>
import Vue from 'vue'
import { Pagination } from 'element-ui'
import { BookCategory, BookList } from '../service/getData'
import ebookIcon from '../assets/ebook-icon.png'
Vue.use(Pagination)

export default {
    data () {
        return {
            headerIndex: '4',
            menuListTitle: '电子书',
            menuData: [],
            menuIcon: ebookIcon,
            orderNew: true,
            menuListShow: true,
            sortTitle: false,
            bookList: [],
            totalPageNumber: 0,
            currentPage: 1,
            page: '1',
            rows: 10,
            categoryId: 0,
            desc: 'CreatedDate',
            bookTitle: '' // 搜索书名关键字
        }
    },
    mounted () {     
        this.getBookCategory()  
        this.getBookList()
    },
    methods: {
        goMenuList (item, menu) {
            menu.forEach((itemS) => {
                this.$set(itemS, 'isClick', false)
            })
            this.$set(item, 'isClick', true)
            this.bookList = []
            this.categoryId = item.id
            this.getBookList()
        },
        handleCurrentChange (val) {
        // console.log(`当前页: ${val}`);
        this.bookList = []
        this.currentPage = val
        this.page = val
        this.getBookList()
        },
        async getBookCategory () {
            let data = await BookCategory()
            this.menuData = data.Data.DataList   
        },
        async getBookList () {
            let data = await BookList({ 
                CategoryId: this.categoryId, 
                Page: this.page, 
                Rows: this.rows, 
                title: this.bookTitle, 
                Sort: this.desc, 
                Order: 'desc'
            })
            if (data.IsSuccess) {
                this.bookList = data.Data.ListData
                this.totalPageNumber = Number(data.Data.Count)
            }
        },
        searchBook () {
            this.bookList = []
            this.page = 1
            this.currentPage = 1
            this.getBookList()
        }
    }
}
</script>

<style lang="scss" rel="stylesheet/scss">
    @import "../style/mixin";

    .ebook{
        width: 100%;
        .ebook-banner{
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
                 width: 276px;
                .pc-left1{
                    width: 100%;
                    background: #fff;
                    padding-bottom: 50px;
                }
            }
            .pc-right{
                width: 905px;
                background: #fff;
                min-height: 388px;
                .ebook-top{
                    border-bottom: 1px solid #e8e8e8;
                    background: #fff;
                    height: 65px;
                    .ebook-top1 {
                        font-size: 18px;
                        color: #333;
                        height: 65px;
                        line-height: 65px;
                        margin-left: 20px;
                        font-weight: bold;
                    }
                    .ebook-top2 {
                        margin-left: 35px;
                        height: 65px;
                        line-height: 65px;
                        width: 125px;
                        @extend %clearFix;
                        .list{
                            float: left;
                            span {
                                margin-left: 20px;
                                cursor: pointer;
                                &.on{
                                    color: #ff9c08;
                                }
                            }
                        }
                    }
                    .ebook-top3 {
                        width: 265px;
                        height: 34px;
                        border: 1px solid #dddddd;
                        border-radius: 5px;
                        margin-right: 20px;
                        margin-top: 14px;
                        input {
                            width: 220px;
                            height: 20px;
                            line-height: 20px;
                            margin-left: 10px;
                            border-right: 1px solid #ddd;
                            margin-top: 7px;
                            float: left;
                        }
                        span {
                            margin-left: 8px;
                            display: block;
                            float: left;
                            img {
                                vertical-align: sub;
                                margin-top: 7px;
                                cursor: pointer;
                            }
                        }
                    }
                }
                .ebook-con{
                    .book-body{
                        ul{
                            @extend %clearFix;
                            li{
                                float: left;
                                border-bottom: 1px solid #eeeeee;
                                width: 432px;
                                height: 196px;
                                .book{
                                    .book-left{
                                        margin-left: 20px;
                                        margin-top: 20px;
                                        img{
                                            width: 108px;
                                            height: 159px;
                                        }
                                    }
                                    .book-right{
                                        width: 260px;
                                        margin-left: 20px;
                                        margin-top: 20px;
                                        .br-hd1{
                                            color: #555;
                                            font-size: 16px;
                                            height: 26px;
                                            line-height: 26px;
                                            font-weight: bold;
                                            overflow: hidden;
                                            text-overflow: ellipsis;
                                            white-space: nowrap;
                                            &:hover{
                                                color: #368474;
                                            }
                                        }
                                        .br-hd2{
                                        color: #999;
                                            height: 26px;
                                            line-height: 26px;
                                        }
                                        .br-bd1{
                                            color: #555;
                                            line-height: 26px;
                                            margin-top: 8px;
                                            @include ellipsis_two(2);
                                        }
                                        .br-bd2{
                                            margin-top: 20px;
                                            p {
                                                float: left;
                                                height: 16px;
                                                line-height: 16px;
                                                color: #999;
                                                &.num{
                                                    padding-right: 10px;
                                                    border-right: 1px solid #999;
                                                }
                                                &.name{
                                                    padding-left: 10px;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        p.noData{
                            text-align: center;
                            font-size: 16px;
                            margin-top: 20px;
                            font-weight: bold;
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
