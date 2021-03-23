<template>
    <div class="mart_centershop">
        <header-fix :active-index="headerIndex"></header-fix>
        <div class="mart_topadv">
            <img src="../assets/mart-center.png" alt="">
        </div>
        <div class="exchange_history">
             <div class="left_credit_box pull-left clearfix">
                <div class="credit_box box_1 pull-left">
                <!-- reInfo.Model.SumCredit -->
                <!-- {{(reInfo.Model.ProductCredit + reInfo.Model.Integral) || 0}} -->
                <div class="credit_num"><span class="highlight">{{userInfo.TotalCoin || 0}}</span>/分</div>
                <div class="title">总积分数</div>
                </div>
                <div class="credit_box box_2 pull-left">
                    <!-- {{reInfo.Model.ProductCredit || 0}} -->
                <div class="credit_num"><span class="highlight">{{userInfo.ProductCredit || 0}}</span>/分
                </div>
                <div class="title">已用积分</div>
                </div>
                <div class="credit_box box_3 pull-left">
                    <!-- {{reInfo.Model.Integral || 0}} -->
                <div class="credit_num"><span class="highlight">{{userInfo.Coin || 0}}</span>/分</div>
                <div class="title">剩余积分</div>
                </div>
            </div>
            <div class="right_history_box pull-right clearfix">
                <div class="box_title">
                    最新兑换
                    <router-link class="more" to="/martRecord" target="_blank">
                        <img src="https://zyycdn.hngbwlxy.gov.cn/Main/images/jifen.png" alt="">
                        <span>兑换记录</span>
                    </router-link>
                </div>
                <ul class="history_list">
                    <li class="history_item list" v-for="item in historyList" :key="item.Id">
                        <span class="list4 text-left">{{item.ProductName}}</span>
                        <span class="list3 text-center">-{{item.Credit}}/分</span>
                        <span class="list3 text-right">{{item.CreateDate.substr(0,10)}}</span>
                    </li>
                </ul>
            </div>
        </div>
        <div class="mart_classify">
            <dl>
                <dt>全部：</dt>
                <dd>
                    <ul>
                        <li v-for="(item, index) in productTypeList" :key="index">
                            <a href="javascript:;" v-text="item.ProductCategoryName" @click="directLink(item.Id)"></a>
                        </li>
                    </ul>
                </dd>
            </dl>
        </div>
        <div class="mart_productionList">
            <martCenterDepart 
            v-for="(item,index) in productTypeList"
            :key="index"
            :productIndex="[item.Id, item.ProductCategoryName]"
            ></martCenterDepart>
        </div>
        <div class="mart_bottomListType">
            <ul>
                <li>
                    <div>
                        <h2>学分如何兑换商品？</h2>
                        <button @click="makeSuggestion">最全兑换技巧</button>
                    </div>
                    <img src="../assets/mart_bottomimg2.png" alt="">
                </li>
                <li>
                    <div>
                        <h2>如何获取学分？</h2>
                        <button @click="teach">教你获取更多学分</button>
                    </div>
                    <img src="../assets/mart_bottomimg1.png" alt="">
                </li>
                <li>
                    <div>
                        <h2>学分兑换常见问题</h2>
                        <button @click="attentionQues">典型问题解答</button>
                    </div>
                    <img src="../assets/mart_bottomimg3.png" alt="">
                </li>
            </ul>
        </div>
        <footer-fix></footer-fix>
    </div>
</template>

<script>
import { ProductTypeList, MyProductRecordList } from '../service/getData'
import { mapActions, mapState } from 'vuex'
export default {
    Name: 'martcenter',
    data () {
        return {
            headerIndex: '9',
            productTypeList: [],
            historyList: []
        }
    },
    created () {
        this.ramdom()
    },
    computed: {
      ...mapState(['userInfo', 'userAgent', 'wxLoginUrl'])
    },
    mounted () {
        this.getMyProductRecordList()
        this.getUserInformation()
    },
    methods: {
        ...mapActions(['getUserInformation', 'saveUserInfo']),
        directLink (index) {
            this.$router.push({ path: '/martresult', query: { type: index } })
        },
        async ramdom () {
            let msg = await ProductTypeList({})
            this.productTypeList = msg.Data.List
        },
        makeSuggestion () {
            this.$router.push({ path: '/articleDetail', query: { id: 889, mid: 0 } })
        },
        teach () {
            this.$router.push({ path: '/articleDetail', query: { id: 890, mid: 0 } })
        },
        attentionQues () {
            this.$router.push({ path: '/articleDetail', query: { id: 891, mid: 0 } })
        },
        async getMyProductRecordList () {
            let data = await MyProductRecordList({
                page: 1,
                rows: 2,
                sort: 'CreateDate',
                order: 'desc'
            })
            if (data.IsSuccess) {
                this.historyList = data.Data.List
            }
        }
    }
}
</script>

<style lang="scss">
@import "../style/mixin";
.mart_centershop{
    background: url("../assets/body-bg.png") no-repeat;
    .mart_topadv{
        width: 1200px;
        margin: 0 auto;
        img{
            width:100%;
        }
    }
    .exchange_history{
        // .wh(1200px, 160px);
        width: 1200px;
        height: 160px;
        margin: 0 auto;
        background: url("https://zyycdn.hngbwlxy.gov.cn/Main/images/exchange_history_bg.png") no-repeat center;
        box-shadow: 0 0 10px 5px #eee;
        .left_credit_box {
            padding: 30px 0 0 40px;
            .credit_box {
                width: 160px;
                & + .credit_box {
                    margin-left: 100px;
                }
                .credit_num {
                    margin-top: 20px;
                    font-size: 16px;
                    line-height: 1;
                    vertical-align: bottom;
                    .highlight {
                        font-size: 36px;
                        font-weight: bold;
                    }
                }
                .title {
                    margin-top: 28px;
                    line-height: 1;
                    font-size: 16px;
                    color: #333;
                }

                &.box_1 {
                    border-top: 2px solid #b81c24;
                    .highlight {
                        color: #b81c24;
                    }
                }

                &.box_2 {
                    border-top: 2px solid #028efe;
                    .highlight {
                    color: #028efe;
                    }
                }
                &.box_3 {
                    border-top: 2px solid #50b301;
                    .highlight {
                        color: #50b301;
                    }
                }
            }
        }
        .right_history_box {
            width: 356px;
            padding: 20px 34px 0 38px;

            .box_title {
                font-size: 18px;
                font-weight: bold;
                line-height: 1;

                .more {
                    margin-top: 2px;
                    float: right;
                    font-weight: normal;
                    font-size: 14px;
                    color: #B2000C;
                    span {
                        text-decoration: underline;
                    }
                    img{
                        margin-right: 5px;
                    }
                }
            }

            .history_list {
                margin-top: 15px;
                li {
                    @extend %clearFix;
                    & + li {
                        border-top: 1px dashed #ddd;
                    }
                    .list4 {
                        width: 40%;
                        float: left;
                        line-height: 37px;
                        padding-left: 10px;
                        padding-right: 10px;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                    }
                    .list3 {
                        width: 30%;
                        float: left;
                        line-height: 37px;
                        padding-left: 10px;
                        padding-right: 10px;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                    }
                    .text-left {    
                        text-align: left;
                    }
                    .text-center {
                        text-align: center;
                    }
                    .text-right {
                        text-align: right;
                    }
                }
            }
        }
    }
    .mart_classify{
        width:1200px;
        margin:20px auto 0;
        padding: 15px 30px 15px;
        box-sizing: border-box;
        background:#fff;
        dl{
            @extend %clearFix;
            dt{
                float: left;
                width: 42px;
                line-height: 25px;
                color: #acacac;
            }
            dd{
                float: left;
                width:1078px;
                margin: 0 0 0 20px;
                ul{
                    @extend %clearFix;
                    li{
                        float: left;
                        line-height: 25px;
                        margin-right: 30px;
                        color: #666;
                        a{
                            &:hover{
                                color:#368474;
                            }
                        }
                    }
                }
            }
        }
    }
    .mart_productionList{
        width: 1200px;
        margin: 0 auto;
    }
    .mart_bottomListType{
        width: 1200px;
        margin: 30px auto 0;
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
