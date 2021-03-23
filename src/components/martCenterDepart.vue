<template>
    <div class="mart_departpart">
        <div class="mart_topdepart">
            <div class="mart_comtopleft">
                <span class="mart_titlesmallbox"></span>
                <span class="mart_titlewords" v-text="typeName"></span>
            </div>
            <div class="mart_comtopright">
                <a href="javascript:;" @click="routerLinkTo()">更多&gt;&gt;</a>
            </div>
        </div>
        <div class="mart_productionlist">
            <ul>
                <li v-for="(item, index) in productionList" :key="index">
                    <span 
                    class="mart_newsLabel" 
                    v-if="item.News == 1 ? 1 : 0" 
                    @click="routerLinkToSon(item.Id)"
                    >新品</span>
                    <img 
                        :src="item.ProductImage[0] == undefined ? '/images/bannerImg1.jpg' : item.ProductImage[0].Img" 
                        alt="" 
                        @click="routerLinkToSon(item.Id)"
                    >
                    <div class="mart_producintro">
                        <p class="mart_productName"><a href="javascript:;" v-text="item.ProductName" @click="routerLinkToSon(item.Id)"></a></p>
                        <p class="mart_productionwords"><a href="javascript:;" @click="routerLinkToSon(item.Id)"><span class="mart_productprice" v-text="item.Credit"></span>积分</a></p>
                        <p class="mart_productionwords"><a href="javascript:;" @click="routerLinkToSon(item.Id)"><span v-text="item.ChangeCount"></span>人已兑换</a></p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { ProductList } from '../service/getData'
export default {
    Name: 'martCenterDepart',
    data () {
        return {
            typeName: '',
            productionList: [],
            Data: ''
        }
    },
    mounted () {
        this.changeType(this.productIndex[1])
        this.random()
    },
    props: [ 'productIndex' ],
    methods: {
        changeType (str) {
            this.typeName = str
        },
        routerLinkTo () {
            this.$router.push({ path: '/martresult', query: { type: this.productIndex[0] } })
        },
        routerLinkToSon (index) {
            const { href } = this.$router.resolve({ path: '/martproductinfor', query: { Id: index } })
            window.open(href, '_blank')
        },
        async random () {
            let msg = await ProductList({
                ProducCategoryId: this.productIndex[0],
                Page: 1,
                Rows: 5
            })
            // console.log(msg)
            this.productionList = msg.Data.List
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
.mart_departpart{
    .mart_topdepart{
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
        .mart_comtopright{
            float:right;
            a{
                position: relative;
                top:5px;
            }
        }
    }
    .mart_productionlist{
        ul{
            @extend %clearFix;
            li{
                float:left;
                position: relative;
                margin-right:20px;
                background:#fff;
                transition: 0.5s;
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
                &:last-of-type{
                    margin-right: 0;
                }
            }
        }
    }
}
</style>
