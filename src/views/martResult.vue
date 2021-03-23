<template>
    <div class="mart_centerresult">
        <header-fix :active-index="headerIndex"></header-fix>
        <div class="mart_topadv">
            <img src="../assets/mart-center.png" alt="">
        </div>
        <div class="mart_classify">
            <dl>
                <dt>全部：</dt>
                <dd>
                    <ul>
                        <li v-for="(item, index) in productTypeList" :key="index">
                            <a href="javascript:;" v-text="item.ProductCategoryName" @click="changeType(item.Id,index)" ref="typename"></a>
                        </li>
                    </ul>
                </dd>
            </dl>
            <dl>
                <dt>排序：</dt>
                <dd>
                    <ul>
                        <li v-for="(item, index) in sortTypeList" :key="index">
                            <a href="javascript:;" v-text="item" @click="listChange(index)" ref="listname"></a>
                        </li>
                    </ul>
                </dd>
            </dl>
        </div>
        <div class="mart_productionListItem">
            <div class="mart_comtopleft">
                <span class="mart_titlesmallbox"></span>
                <span class="mart_titlewords">检索结果</span>
            </div>
        </div>
        <div class="mart_combodypart">
            <ul>
                <li v-for="(item, index) in productionList" :key="index">
                    <span class="mart_newsLabel" v-if="item.News == 1 ? 1 : 0">新品</span>
                    <img :src="item.ProductImage[0] == undefined ? '/images/bannerImg1.jpg' : item.ProductImage[0].Img" alt="" @click="routerLinkTo(item.Id)">
                    <div class="mart_producintro">
                        <p class="mart_productName"><a href="javascript:;" v-text="item.ProductName" @click="routerLinkTo(item.Id)"></a></p>
                        <p class="mart_productionwords"><a href="javascript:;" @click="routerLinkTo(item.Id)"><span class="mart_productprice" v-text="item.Credit"></span>积分</a></p>
                        <p class="mart_productionwords"><a href="javascript:;" @click="routerLinkTo(item.Id)"><span v-text="item.ChangeCount"></span>人已兑换</a></p>
                    </div>
                </li>
            </ul>
        </div>
        <div class="mart_differpagedepart">
            <el-pagination
                background
                :current-page.sync="currentPage"
                @current-change="currentchange()"
                layout="prev, pager, next"
                :total=totalPage
            >
            </el-pagination>
        </div>
        <div class="mart_bottomListType">
            <ul>
                <li>
                    <div>
                        <h2>学分如何兑换商品？</h2>
                        <button>最全兑换技巧</button>
                    </div>
                    <img src="../assets/mart_bottomimg2.png" alt="">
                </li>
                <li>
                    <div>
                        <h2>如何获取学分？</h2>
                        <button>教你获取更多学分</button>
                    </div>
                    <img src="../assets/mart_bottomimg1.png" alt="">
                </li>
                <li>
                    <div>
                        <h2>学分兑换常见问题</h2>
                        <button>典型问题解答</button>
                    </div>
                    <img src="../assets/mart_bottomimg3.png" alt="">
                </li>
            </ul>
        </div>
        <footer-fix></footer-fix>
    </div>
</template>

<script>
import { ProductTypeList, ProductList, LoginShort } from '../service/getData'
export default {
    Name: 'martresult',
    data () {
        return {
            headerIndex: '9',
            productTypeList: [],
            sortTypeList: ['我能兑换', '热门兑换', '新品上架', '最低学分排序', '最高学分排序'],
            productionList: [],
            userScore: 0,
            sortType: -1,
            productType: this.$route.query.type,
            currentPage: 1,
            totalPage: 1,
            Rows: 15
        }
    },
    mounted () {
        this.random()
    },
    methods: {
        defineTotalPage (Obj, count) {
            let Count = count != undefined ? count : 0
            let Rows = this.Rows
            if (Count % Rows != 0) {
                let Page = (((Count - Count % Rows) / Rows) + 1) * 10
                return Page
            } else {
                let Page = (Count / Rows) * 10
                return Page
            }
        },
        routerLinkTo (index) {
            const { href } = this.$router.resolve({ path: '/martproductinfor', query: { Id: index } })
            window.open(href, '_blank')
        },
        async random () {
            let type = await ProductTypeList({
                Id: this.$route.query.type
            })
            let userInfor = await LoginShort()
            let msg = await ProductList({
                ProducCategoryId: this.$route.query.type,
                Page: 1,
                Rows: 15
            })
            let addAll = {
                Id: this.$route.query.type,
                ProductCategoryName: '全部'
            }
            type.Data.List.unshift(addAll)
            this.productTypeList = type.Data.List
            this.productionList = msg.Data.List
            this.userScore = userInfor.Model.SumCredit
            this.totalPage = this.defineTotalPage(msg, msg.Data.TotalCount)
            this.productionList.forEach((item, index) => {
                let yyyy = item.CreateDate.substr(0, 4)
                let mth = item.CreateDate.substr(5, 2)
                    mth = mth - 1
                let dd = item.CreateDate.substr(8, 2)
                let hh = item.CreateDate.substr(11, 2)
                let mm = item.CreateDate.substr(14, 2)
                let ss = item.CreateDate.substr(17, 2)
                let createdata = new Date(yyyy, mth, dd, hh, mm, ss)       
                    createdata = createdata.getTime()
                let now = new Date()
                    now = now.getTime()
                let result = (now - createdata) / 1000
                if (result > 604800) {
                    item.News = 0
                } else {
                    item.News = 1
                }
            })
        },
        async currentchange () {
            let request = {
                ProducCategoryId: self.productType,
                Page: 1,
                Rows: 15
            }
            if (self.sortType == 0) {
                request.MinCredit = 0
                request.MaxCredit = this.userScore == 0 ? -1 : this.userScore
            } else if (self.sortType == 1) {
                request.Sort = 'ChangeCount'
                request.Order = 'desc'
            } else if (self.sortType == 2) {
                request.Sort = 'CreateDate'
                request.Order = 'desc'
            } else if (self.sortType == 3) {
                request.Sort = 'Credit'
                request.Order = 'asc'
            } else if (self.sortType == 4) {
                request.Sort = 'Credit'
                request.Order = 'desc'
            }

            let msg = await ProductList(request)
            this.productionList = msg.Data.List
            this.totalPage = this.defineTotalPage(msg, msg.Data.TotalCount)
            this.productionList.forEach((item, index) => {
                let yyyy = item.CreateDate.substr(0, 4)
                let mth = item.CreateDate.substr(5, 2)
                    mth = mth - 1
                let dd = item.CreateDate.substr(8, 2)
                let hh = item.CreateDate.substr(11, 2)
                let mm = item.CreateDate.substr(14, 2)
                let ss = item.CreateDate.substr(17, 2)
                let createdata = new Date(yyyy, mth, dd, hh, mm, ss)       
                    createdata = createdata.getTime()
                let now = new Date()
                    now = now.getTime()
                let result = (now - createdata) / 1000
                if (result > 604800) {
                    item.News = 0
                } else {
                    item.News = 1
                }
            })
        },
        async changeType (typeId, typeIndex) {
            let self = this
            this.$refs.typename.forEach(item => {
                item.style.fontWeight = ''
                item.style.color = ''
            })
            this.$refs.typename[typeIndex].style.fontWeight = 'bold'
            this.$refs.typename[typeIndex].style.color = '#089ffa'
            this.productType = typeId
            let request = {
                ProducCategoryId: typeId,
                Page: 1,
                Rows: 15
            }
                
            if (self.sortType == 0) {
                request.MinCredit = 0
                request.MaxCredit = this.userScore == 0 ? -1 : this.userScore
            } else if (self.sortType == 1) {
                request.Sort = 'ClickCount'
                request.Order = 'desc'
            } else if (self.sortType == 2) {
                request.Sort = 'CreateDate'
                request.Order = 'desc'
            } else if (self.sortType == 3) {
                request.Sort = 'Credit'
                request.Order = 'asc'
            } else if (self.sortType == 4) {
                request.Sort = 'Credit'
                request.Order = 'desc'
            }
            let msg = await ProductList(request)
            this.productionList = msg.Data.List
            this.totalPage = this.defineTotalPage(msg, msg.Data.TotalCount)
            this.productionList.forEach((item, index) => {
                let yyyy = item.CreateDate.substr(0, 4)
                let mth = item.CreateDate.substr(5, 2)
                    mth = mth - 1
                let dd = item.CreateDate.substr(8, 2)
                let hh = item.CreateDate.substr(11, 2)
                let mm = item.CreateDate.substr(14, 2)
                let ss = item.CreateDate.substr(17, 2)
                let createdata = new Date(yyyy, mth, dd, hh, mm, ss)       
                    createdata = createdata.getTime()
                let now = new Date()
                    now = now.getTime()
                let result = (now - createdata) / 1000
                if (result > 604800) {
                    item.News = 0
                } else {
                    item.News = 1
                }
            })
        },
        async listChange (listIndex) {
            this.sortType = listIndex
            let self = this
            this.$refs.listname.forEach(item => {
                item.style.fontWeight = ''
                item.style.color = ''
            })
            this.$refs.listname[listIndex].style.fontWeight = 'bold'
            this.$refs.listname[listIndex].style.color = '#089ffa'
            let request = {
                ProducCategoryId: self.productType,
                Page: 1,
                Rows: 15
            }
            if (self.sortType == 0) {
                request.MinCredit = 0
                request.MaxCredit = this.userScore == 0 ? -1 : this.userScore
            } else if (self.sortType == 1) {
                request.Sort = 'ChangeCount'
                request.Order = 'desc'
            } else if (self.sortType == 2) {
                request.Sort = 'CreateDate'
                request.Order = 'desc'
            } else if (self.sortType == 3) {
                request.Sort = 'Credit'
                request.Order = 'asc'
            } else if (self.sortType == 4) {
                request.Sort = 'Credit'
                request.Order = 'desc'
            }
            let msg = await ProductList(request)
            this.productionList = msg.Data.List
            this.totalPage = this.defineTotalPage(msg, msg.Data.TotalCount)
            this.productionList.forEach((item, index) => {
                let yyyy = item.CreateDate.substr(0, 4)
                let mth = item.CreateDate.substr(5, 2)
                    mth = mth - 1
                let dd = item.CreateDate.substr(8, 2)
                let hh = item.CreateDate.substr(11, 2)
                let mm = item.CreateDate.substr(14, 2)
                let ss = item.CreateDate.substr(17, 2)
                let createdata = new Date(yyyy, mth, dd, hh, mm, ss)       
                    createdata = createdata.getTime()
                let now = new Date()
                    now = now.getTime()
                let result = (now - createdata) / 1000
                if (result > 604800) {
                    item.News = 0
                } else {
                    item.News = 1
                }
            })
        }
    }
}
</script>

<style lang="scss">
@import "../style/mixin";
.mart_centerresult{
    background: url("../assets/body-bg.png") no-repeat;
    .mart_topadv{
        img{
            width:100%;
        }
    }
    .mart_classify{
        width:1200px;
        line-height: 77px;
        margin:20px auto 0;
        padding: 0 30px;
        box-sizing: border-box;
        background:#fff;
        dl{
            @extend %clearFix;
            margin:0;
            border-bottom: 1px dashed #ececec;
            dt{
                float: left;
                color: #acacac;
            }
            dd{
                float: left;
                margin-left:20px;
                ul{
                    @extend %clearFix;
                    li{
                        float: left;
                        margin-right: 30px;
                        color: #666;
                    }
                }
            }
            &:last-of-type{
                border-bottom:0px;
            }
        }
    }
    .mart_productionList{
        width: 1200px;
        margin: 0 auto;
    }
    .mart_productionListItem{
        width: 1200px;
        margin: 0 auto;
        height: 64px;
        line-height:64px;
        @extend %clearFix;
        .mart_comtopleft{
            float:left;
            height:64px;
            .mart_titlesmallbox{
                display: inline-block;
                width:12px;
                height:25px;
                background: #368474;
                vertical-align: middle;
            }
            .mart_titlewords{
                margin-left:10px;
                font-size: 18px;
                color: #888;
                position: relative;
                top:3px;
            }
        }
    }
    .mart_combodypart{
        width: 1200px;
        margin: 0 auto;
        ul{
            @extend %clearFix;
            li{
                float:left;
                position: relative;
                margin-right:20px;
                background:#fff;
                transition: 0.5s;
                margin-bottom: 29px;
                .mart_newsLabel{
                    width:48px;
                    height:24px;
                    line-height: 24px;
                    text-align: center;
                    color:#fff;
                    background:#adadad;
                    position: absolute;
                    top:0;
                    left:0;
                    cursor:pointer;
                }
                    
                img{
                    width: 224px;
                    height: 173px;
                    margin-bottom: 15px;
                    cursor:pointer;
                }

                .mart_producintro{
                    padding:0 20px;
                    width:224px;
                    box-sizing: border-box;
                    overflow: hidden;
                    .mart_productName{
                        height: 38px;
                        margin-bottom: 10px;
                        overflow: hidden;
                        a{
                            font-weight: bold;
                            color:#666;
                        }
                    }
                    .mart_productionwords{
                        a{
                            display: inline-block;
                            color: #acacac;
                        }
                        margin-bottom:10px;
                    }
                    .mart_productprice{
                        font-size: 18px;
                        font-weight: bold;
                        color:#f00;
                        margin-right: 10px;
                    }
                }
                &:hover{
                    box-shadow: 0 0 20px #888;
                    .mart_newsLabel{
                        background:#089ffa;
                    }
                }
                &:last-of-type, &:nth-of-type(5), &:nth-of-type(10){
                    margin-right: 0;
                }
            }
        }
    }
    .mart_differpagedepart{
        width: 1200px;
        height: 82px;
        margin: 0 auto;
        text-align: center;
        &:before{
            content:'';
            display: inline-block;
            height:100%;
            vertical-align: middle;
        }
        .el-pagination{
            display: inline-block;
        }
    }
    .mart_bottomListType{
        width: 1200px;
        margin: 0 auto;
        ul{
            @extend %clearFix;
            li{
                float:left;
                width: 386px;
                height: 160px;
                background:#fff;
                border-radius: 5px;
                margin-right: 20px;
                transition: 0.5s;
                &:before{
                    content:'';
                    display: inline-block;
                    vertical-align: middle;
                    height: 100%;
                }

                &:nth-of-type(2){
                    img{
                        margin:0 0 0 20px;
                    }
                }

                &:last-of-type{
                    margin-right: 0;
                    img{
                        margin:20px 0 0 20px;
                    }
                }

                &:hover{
                    box-shadow: 0 0 20px #888;
                }

                div{
                    width: 189px;
                    text-align: center;
                    display: inline-block;
                    vertical-align: middle;
                    margin-left:30px;
                    margin-right:10px;
                    h2{
                        font-weight:500; 
                        margin: 0 0 30px;
                    }
                    button{
                        border: 1px solid #888;
                        border-radius: 23px;
                        color:#888;
                        padding: 0 15px;
                        background: #fff;
                        cursor: pointer;
                        &:hover{
                            background: #089ffa;
                            border: 1px solid #fff;
                            color:#fff;
                        }
                    }
                }
            }
        }
    }
}
</style>
