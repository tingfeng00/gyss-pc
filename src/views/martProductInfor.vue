<template>
    <div class="prot_productinfor">
        <div class="prot_boxshadowpart" v-show="shadowBox == 1 ? 1 : 0">
            <div class="prot_windowchange" v-if="changeBox == 1">
                <div class="prot_windowtitle">兑换确认</div>
                <div class="prot_windowproductinfor">
                    <div class="prot_windowproductinfor_left">
                        <img :src="imglist[0]" alt="">
                    </div>
                    <div class="prot_windowproductinfor_right">
                        <p class="prot_window_productname" v-text="Title"></p>
                        <p class="prot_window_productnum">数量：<span v-text="productnum"></span></p>
                        <p class="prot_window_productunit"><span class="prot_window_productprice" v-text="Price"></span>个/学分</p>
                    </div>
                </div>
                <div class="prot_windowinfrom" v-if="selectSendType == '线上配送'">
                    <ul>
                        <li>
                            <label for="username">收货人姓名：</label><input type="text" id="username" v-model="realName" placeholder="请填写真实姓名">
                        </li>
                        <li>
                            <label for="username">联系电话：</label><input type="text" id="username" v-model="Telephone" placeholder="请输入11位手机号">
                        </li>
                        <li>
                            <label for="username">详细地址：</label><input type="text" id="username" v-model="Address" placeholder="建议您填写真实详细地址">
                        </li>
                    </ul>    
                </div>
                <div class="prot_windowgetaddress" v-if="selectSendType == '线下自提'">
                    <p>领取地址：苏州市太仓市科教新城天工路 太仓广播电视大学</p>
                </div>
                <div class="prot_windowresult">
                    <span class="prot_resultlabel">消耗：</span>
                    <span class="prot_resultprice" v-text="Price * productnum"></span>
                    <span class="prot_resultunit">个/学分</span>
                    <button type="button" @click="makeChange()">确认兑换</button>
                    <button type="button" @click="cancelChange()">取消兑换</button>
                </div>
            </div>
            <div class="prot_windowattention" v-else-if="changeBox == 2">
                <div class="prot_windowtitle">系统提示</div>
                <div class="prot_windowproductinfor">
                    <div class="prot_windowproductinfor_left">
                        <img :src="imglist[0]" alt="">
                    </div>
                    <div class="prot_windowproductinfor_right">
                        <p class="prot_window_productname" v-text="Title"></p>
                        <p class="prot_window_productnum">数量：<span span v-text="productnum"></span></p>
                        <p class="prot_window_productunit"><span class="prot_window_productprice" v-text="Price"></span>个/积分</p>
                    </div>
                </div>
                <div class="port_windowresult">
                    <span>抱歉，您的积分余额已不足！</span>
                    <button type="button" @click="makeAttation()">确认兑换</button>
                    <button type="button" @click="cancelChange()">取消兑换</button>
                </div>
            </div>
            <div class="prot_windowinfor" v-show="successBox == 1 ? 1 : 0">
                <div class="prot_windowinfor_close" @click="closeAttention()"><span class="prot_windowinfor_closeicon"></span></div>
                <div class="prot_windowinfor_left">
                    <img src="../assets/prot_smile.png" alt="">
                </div>
                <div class="prot_windowinfor_right">
                    <p>兑换成功！</p>
                    <!-- <p>您的兑换信息可在个人中心中查看<a href="javascript:;">去查看&gt;&gt;</a></p> -->
                </div>
            </div>
        </div>
        <header-fix :active-index="headerIndex"></header-fix>
        <div class="prot_bodypart">
            <div class="prot_breadCrumb">
                <span class="prot_location">您所在的位置：</span>
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/home' }"><span class="prot_toHome"></span>首页</el-breadcrumb-item>
                    <el-breadcrumb-item :to="{ path: '/martcenter' }">积分商城</el-breadcrumb-item>
                    <el-breadcrumb-item>商品详情</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="prot_controlpart">
                <div class="prot_controlbanner">
                    <div class="prot_bigimg">
                        <img :src="imgsrc" alt="">
                    </div>
                    <div class="prot_imglist">
                        <div class="prot_imgtotop" @click="bannerTo(bannerIndex-1)" ref="prot_imgtotop">
                            <div class="prot_innerboxu"></div>
                        </div>
                        <div class="prot_imgwarp">
                            <ul ref="warpformove">
                                <li v-for="(item, index) in imglist" :key="index" @click="bigImgChange(index)" ref="warpsmallimg">
                                    <img :src="item" alt="">
                                </li>
                            </ul>
                        </div>
                        <div class="prot_imgtobottom" @click="bannerTo(bannerIndex+1)" ref="prot_imgtobottom">
                            <div class="prot_innerboxn"></div>
                        </div>
                    </div>
                </div>
                <div class="prot_controlinformation">
                    <p class="prot_productTitle" v-text="Title"></p>
                    <p class="prot_productTime"><span class="prot_createtime">上架时间：</span><span v-text="createTime"></span></p>
                    <p class="prot_priceline"><span class="prot_productprice" v-text="Price"></span><span class="prot_productdanwei">个/学分</span></p>
                    <ul>
                        <li><span v-text="productHave"></span>个商品余额</li>
                        <li><span v-text="productChanged"></span>人已兑换</li>
                        <li><span v-text="clickNumber"></span>人浏览</li>
                    </ul>
                    <div>
                        <span class="prot_labelsnames">领取方式：</span>
                        <el-select v-model="selectSendType" placeholder="请选择">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="prot_productnum">
                        <span class="prot_labelsnames">数量：</span>
                        <el-input-number v-model="productnum" :min="1" :max="99" label="描述文字"></el-input-number>
                    </div>
                    <div class="prot_buttondepart">
                        <button type="button" @click="openwindowbox()">立即兑换</button>
                        <router-link to="/martcenter">返回积分商城</router-link>
                    </div>
                </div>
            </div>
        </div>
        <div class="prot_bodypartbottom">
            <div class="prot_bodybottomleft">
                <div class="prot_inforbuttonpart">
                    <ul>
                        <li>商品详细信息</li>
                    </ul>
                </div>
                <div class="prot_inforcontentpart">
                    <ul>
                        <li v-html="inforContent == undefined ? '<p></p>' : inforContent"></li>
                    </ul>
                </div>
            </div>
            <div class="prot_bodybottomright">
                <div class="prot_bodybottomrighttit">
                    <span>热门推荐</span>
                </div>
                <div class="prot_bodybottomrightdep">
                    <ul>
                        <li v-for="(item, index) in recommend" :key="index">
                            <div class="prot_hotproductimg" @click="tohot(item.Id)">
                                <img :src="item.ProductImage[0] == undefined ? '/images/bannerImg1.jpg' : item.ProductImage[0].Img" alt="">
                            </div>
                            <p class="prot_commonname"><a href="javascript:;" v-text="item.ProductName" @click="tohot(item.Id)"></a></p>
                            <p class="prot_commoninfor"><span v-text="item.ChangeCount" @click="tohot(item.Id)"></span><span @click="tohot(item.Id)">人已兑换</span></p>
                        </li>
                    </ul>
                </div>
                <div class="prot_reflashbutton">
                    <button type="button" @click="reloads(hotCurPage + 1)"><span class="prot_reflash"></span>换一换</button>
                </div>
            </div>
        </div>
        <footer-fix></footer-fix>
    </div>
</template>

<script>
import { ProductDetail, LoginShort, SendRecord, ProductHotList } from '../service/getData'
export default {
    Name: 'martproductinfor',
    data () {
        return {
            headerIndex: '9',
            userScore: 0,
            imgsrc: '',
            imglist: [],
            bannerIndex: 4,
            Title: '',
            createTime: '',
            Price: 0,
            productHave: 0,
            productChanged: 0,
            clickNumber: 0,
            inforContent: undefined,
            options: [
                {
                    value: '线上配送',
                    label: '线上配送'
                }, 
                {
                    value: '线下自提',
                    label: '线下自提'
                }
            ],
            selectSendType: '',
            productnum: 1,
            recommend: [],
            shadowBox: 0,
            changeBox: 0,
            successBox: 0,
            realName: '',
            Telephone: '',
            Address: '',
            pageRows: 2,
            hotCurPage: 1,
            hotTolPage: 1
        }
    },
    mounted () {
        this.ramdom()
    },
    methods: {
        bannerTo (index) {
            let self = this
            if (this.imglist.length > 4) {
            if (index == this.imglist.length + 1) {
                this.$message({
                    message: '图册已经到底了',
                    type: 'warning'
                })
                return
            } else if (index == 3) {
                this.$message({
                    message: '图册已经到顶了',
                    type: 'warning'
                })
                return
            }
            
            this.$refs.warpformove.style.top = -(index - 4) * 90 + 'px'
            self.bannerIndex = index
            }
        },
        bigImgChange (index) {
            this.imgsrc = this.imglist[index]
            this.$refs.warpsmallimg.forEach(item => {
                item.style.border = '3px solid #efefef'
            })
            this.$refs.warpsmallimg[index].style.border = '3px solid #368474'
        },
        closeAttention () {
            this.shadowBox = 0
            this.successBox = 0
        },
        getImgList (arr) {
            let arr2 = []
            arr.forEach(item => {
                arr2.push(item.Img)
            })
            return arr2
        },
        openwindowbox () {
            let self = this
            if (this.productHave < this.productnum) {
                this.$message({
                    message: '库存不足',
                    type: 'warning'
                })
            } else {
                // 数量足够
                 if (self.productnum * self.Price <= self.userScore) {
                    self.shadowBox = 1
                    self.changeBox = 1
                } else if (self.productnum * self.Price > self.userScore) {
                    self.shadowBox = 1
                    self.changeBox = 2
                }
            }
        },
        cancelChange () {
            this.shadowBox = 0
            this.changeBox = 0
        },
        makeAttation () {
            this.$message({
                message: '您的积分不足',
                type: 'warning'
            })
        },
        tohot (index) {
            const { href } = this.$router.resolve({ path: '/martproductinfor', query: { Id: index } })
            window.open(href, '_blank')
        },
        async ramdom () {
            let msg = await ProductDetail({
                Id: this.$route.query.Id
            })
            let userInfor = await LoginShort()
            let hot = await ProductHotList({
                Page: 1,
                Rows: this.pageRows
            })
            this.Title = msg.Data.ProductName
            this.createTime = msg.Data.CreateDate.substr(0, 10)
            this.Price = msg.Data.Credit
            this.selectSendType = msg.Data.SendType == 'OffLine' ? '线下自提' : '线上配送'
            this.productHave = msg.Data.Num
            this.productChanged = msg.Data.ChangeCount
            this.clickNumber = msg.Data.ClickCount
            this.inforContent = msg.Data.ProductInfo
            this.imglist = this.getImgList(msg.Data.ProductImage)
            if (this.imglist.length > 4) {
                this.$refs.prot_imgtotop.style.visibility = 'visible'
                this.$refs.prot_imgtobottom.style.visibility = 'visible'
            } else {
                this.$refs.prot_imgtotop.style.visibility = 'hidden'
                this.$refs.prot_imgtobottom.style.visibility = 'hidden'
            }
            this.imgsrc = this.imglist[0]
            this.userScore = userInfor.Model.SumCredit
            this.recommend = hot.Data.List
            this.hotTolPage = hot.Data.TotalCount / this.pageRows
        },
        async makeChange () {
            let msg = null
            if (this.selectSendType == '线上配送') {
                if (this.realName == '' || this.Telephone == '' || this.Address == '') {
                    this.$message({
                        message: '请填写完信息',
                        type: 'warning'
                    })
                    return
                }

                msg = await SendRecord({
                    ProductId: this.$route.query.Id,
                    Address: this.Address,
                    ContactName: this.realName,
                    ContactTel: this.Telephone,
                    Num: this.productnum
                })
            } else if (this.selectSendType == '线下自提') {
                msg = await SendRecord({
                    ProductId: this.$route.query.Id,
                    Num: this.productnum
                })
            }
            if (msg.Type == 1) {
                this.changeBox = 0
                this.successBox = 1
            }
        },
        async reloads (page) {
            if (page > this.hotTolPage) {
                page = 1
            }
            let hot = await ProductHotList({
                Page: page,
                Rows: this.pageRows
            })
            this.recommend = hot.Data.List
            this.hotCurPage = page
        }
    }
}
</script>

<style lang="scss">
@import "../style/mixin";
.prot_productinfor{
    background: url("../assets/body-bg.png") no-repeat;
    .prot_boxshadowpart{
        position: fixed;
        width:100%;
        height:100%;
        background: rgba(0,0,0,0.3);
        z-index: 10;
        display: block;
        .prot_windowchange{
            position: absolute;
            top:50%;
            left:50%;
            transform: translate(-50%, -50%);
            display: block;
            width:580px;
            background:#fff;
            .prot_windowtitle{
                height:48px;
                line-height: 48px;
                text-align: center;
                font-size: 18px;
                color:#fff;
                background:#368474;
                margin-bottom:40px;
            }
            .prot_windowproductinfor{
                height:157px;
                padding:0 20px;
                @extend %clearFix;
                .prot_windowproductinfor_left{
                    width:150px;
                    background:#acacac;
                    border:1px solid #efefef;
                    border-radius: 5px;
                    text-align: center;
                    overflow: hidden;
                    float: left;
                    img{
                        max-width:150px;
                        height:127px;
                    }
                }
                .prot_windowproductinfor_right{
                    width: 352px;
                    margin-left: 20px;
                    float: left;
                    .prot_window_productname{
                        font-size: 18px;
                        font-weight: 500;
                        color: #000;
                    }
                    .prot_window_productnum{
                        margin:17px 0 23px;
                        color:#cecece;
                        line-height: 24px;
                        .prot_window_productprice{
                            font-size: 18px;
                            color:#333;
                            margin-right:5px;
                            font-weight: bold;
                        }
                    }
                }
            }
            .prot_windowinfrom{
                height:212px;
                background:#f6f6f6;
                vertical-align: middle;
                position: relative;
                ul{
                    position: absolute;
                    top:50%;
                    left:50%;
                    transform: translate(-50%,-50%);
                    li{
                        text-align: center;
                        width:500px;
                        margin-bottom:16px;
                        input{
                            width:280px;
                            height:40px;
                            border:1px solid #dfdfdf;
                            border-radius: 5px;
                            padding: 0 11px;
                            color:#888;
                        }
                        &:first-of-type{
                            position: relative;
                            top:0;
                            left:-7px;
                        }
                    }
                }
            }
            .prot_windowgetaddress{
                height:112px;
                background:#f6f6f6;
                p{
                    line-height: 112px;
                    text-align: center;
                }
            }
            .prot_windowresult{
                background:rgba(255, 0, 0, 0.1);
                height:67px;
                padding-left:182px;
                &:before{
                    content:'';
                    display: inline-block;
                    height:100%;
                    vertical-align: middle;
                }
                .prot_resultlabel{
                    color:#f00;
                    font-size: 18px;
                    font-weight: 500;
                }
                .prot_resultprice{
                    position: relative;
                    top:2px;
                    font-size: 22px;
                    font-weight: bold;
                    color:#f00;
                    margin-right:5px;
                }
                .prot_resultunit{
                    color:#f00;
                }
                button{
                    width:106px;
                    height:36px;
                    border-radius: 36px;
                    border:0px;
                    font-weight: bold;
                    cursor:pointer;
                    &:first-of-type{
                        margin-left:24px;
                        background:#e94648;
                        color:#fff
                    }
                    &:last-of-type{
                        background:none;
                        color:#333;
                    }
                }
            }
        }
        .prot_windowattention{
            width:580px;
            height:311px;
            position: absolute;
            top:0;
            right:0;
            bottom:0;
            left:0;
            margin: auto;
            background:#fff;
            display: block;
            .prot_windowtitle{
                height:48px;
                line-height: 48px;
                text-align: center;
                font-size: 18px;
                color:#fff;
                background:#368474;
                margin-bottom:40px;
            }
            .prot_windowproductinfor{
                height:157px;
                padding:0 20px;
                @extend %clearFix;
                .prot_windowproductinfor_left{
                    width:150px;
                    background:#acacac;
                    border:1px solid #efefef;
                    border-radius: 5px;
                    text-align: center;
                    overflow: hidden;
                    float: left;
                    img{
                        max-width:150px;
                        height:127px;
                    }
                }
                .prot_windowproductinfor_right{
                    width: 352px;
                    margin-left: 20px;
                    float: left;
                    .prot_window_productname{
                        font-size: 18px;
                        font-weight: 500;
                        color: #000;
                        @include ellipsis_two();
                    }
                    .prot_window_productnum{
                        margin:17px 0 23px;
                        color:#cecece;
                        line-height: 24px;
                    }
                    .prot_window_productunit{
                        color:#cecece;
                        .prot_window_productprice{
                            font-size: 18px;
                            color:#333;
                            margin-right:5px;
                            font-weight: bold;
                        }
                    }
                }
            }
            .port_windowresult{
                height:67px;
                background:#f6f6f6;
                padding-left:141px;
                &:before{
                    content:'';
                    height:100%;
                    display: inline-block;
                    vertical-align: middle;
                }
                span{
                    margin-right:27px;
                }
                button{
                    width:106px;
                    height:36px;
                    border-radius: 36px;
                    border:0px;
                    font-weight: bold;
                    cursor:pointer;
                    &:first-of-type{
                        margin-left:6px;
                        background:#cecece;
                        color:#fff;
                        cursor: default;
                    }
                    &:last-of-type{
                        background:none;
                        color:#333;
                    }
                }
            }
        }
        .prot_windowinfor{
            display: block;
            width:399px;
            height:220px;
            border-radius:5px;
            position: absolute;
            top:0;
            right:0;
            bottom:0;
            left:0;
            margin:auto;
            background:#fff;
            @extend %clearFix;

            &::before{
                content:'';
                display: block;
                width:100%;
                height:4px;
                background:#f4aa27;
                border-top-right-radius: 5px;
                border-top-left-radius: 5px;
            }
            .prot_windowinfor_close{
                width:32px;
                height:32px;
                border-radius: 100%;
                text-align: center;
                background:#fff;
                position: absolute;
                top:-10px;
                right:-10px;
                box-shadow: 0 0 8px #888;
                cursor: pointer;
                .prot_windowinfor_closeicon{
                    display: inline-block;
                    width:13px;
                    height:13px;
                    background:url('../assets/prot_cross.png');
                    position: absolute;
                    top:0;
                    right:0;
                    bottom:0;
                    left:0;
                    margin:auto;
                }
            }
            .prot_windowinfor_left{
                float:left;
                margin-top:47px;
                margin-left:57px;
            }
            .prot_windowinfor_right{
                float:left;
                width:183px;
                margin-top: 90px;
                margin-left: 15px;
                p{
                    &:first-of-type{
                        font-size: 18px;
                        font-weight: bold;
                        padding-left:5px;
                        margin-bottom:10px;
                    }
                    &:last-of-type{
                        color:#888;
                        a{
                            margin-left:5px;
                            color:#f00;
                        }
                    }
                }
            }
        }
    }
    .prot_bodypart{
        width: 1200px;
        margin: 0 auto;
        .prot_breadCrumb{
            @extend %clearFix;
            margin: 31px 0 17px;
            .prot_location{
                float:left;
                height:18px;
                line-height: 18px;
            }
            .el-breadcrumb{
                display: inline-block;
                .prot_toHome{
                    display: inline-block;
                    width: 14px;
                    height: 14px;
                    margin-right: 3px;
                    position: relative;
                    top:1px;
                    background:url('../assets/home.png');
                }
            }
        }
        .prot_controlpart{
            margin-left:20px;
            @extend %clearFix;
            .prot_controlbanner{
                float:left;
                @extend %clearFix;
                .prot_bigimg{
                    width:440px;
                    text-align: center;
                    float:left;
                    img{
                        max-width:440px;
                        height:440px;
                    }
                }
                .prot_imglist{
                    float:left;
                    margin-left:20px;
                    .prot_imgtotop, .prot_imgtobottom{
                        width:90px;
                        height:44px;
                        background:#cecece;
                        position: relative;
                        visibility: hidden;
                        .prot_innerboxu{
                            width:14px;
                            height:14px;
                            border-top:3px solid #fff;
                            border-left:3px solid #fff;
                            transform: rotate(45deg) translate(-50%,10%);
                            display: inline-block;
                            position: absolute;
                            top:50%;
                            left:50%;
                        }
                        .prot_innerboxn{
                            width:14px;
                            height:14px;
                            border-bottom:3px solid #fff;
                            border-right:3px solid #fff;
                            transform: rotate(45deg) translate(-70%,0);
                            display: inline-block;
                            position: absolute;
                            top:50%;
                            left:50%;
                        }
                        
                    }
                    .prot_imgwarp{
                        height:352px;
                        overflow: hidden;
                        position: relative;
                        ul{
                            transition: 0.5s;
                            position: absolute;
                            top: 0;
                            left: 0;
                            li{
                                width:90px;
                                text-align: center;
                                box-sizing: border-box;
                                border:3px solid #efefef;
                                margin-bottom:10px;
                                img{
                                    max-width: 84px;
                                    height:74px;
                                }
                                &:first-of-type{
                                    border:3px solid #368474;
                                }
                                &:last-of-type{
                                    margin-bottom:0;
                                }
                            }
                        }
                    }
                }
            }
        }
        .prot_controlinformation{
            float: left;
            margin-left: 20px;
            .prot_productTitle{
                width:600px;
                font-size: 18px;
                font-weight: 500;
                color: #000;
                margin-top:5px;
                margin-bottom:15px;
            }
            .prot_productTime{
                margin-bottom:25px;
            }
            .prot_createtime{
                color:#888;
            }
            .prot_productprice{
                font-size: 24px;
                font-weight: bolder;
                color: #f00;
                margin-right:10px;
            }
            .prot_productdanwei{
                color:#555;
            }
            .prot_priceline{
                margin-bottom: 25px;
            }
            ul{
                margin-bottom: 24px;
                @extend %clearFix;
                li{
                    float: left;
                    height: 48px;
                    line-height: 48px;
                    padding: 0 17px;
                    background: #cecece;
                    text-align: center;
                    margin-right:3px;
                    color:#fff;
                }
            }
            .prot_productnum{
                margin-top: 24px;
                margin-bottom: 26px;
            }
            .prot_labelsnames{
                color:#888;
            }
            .prot_buttondepart{
                button{
                    height: 56px;
                    width: 160px;
                    color:#fff;
                    font-size: 20px;
                    background:#368474;
                    border-radius: 5px;
                    border: 0;
                    margin-right: 20px;
                    cursor: pointer;
                }
                a{
                    font-size: 20px;
                    color:#888;
                }
            }
        }
    }
    .prot_bodypartbottom{
        width:1200px;
        margin:20px auto;
        @extend %clearFix;
        .prot_bodybottomleft{
            float: left;
            width: 838px;
            background:#fff;
            .prot_inforbuttonpart{
                ul{
                    @extend %clearFix;
                    li{
                        float:left;
                        width:152px;
                        height: 61px;
                        line-height: 61px;
                        font-weight: bold;
                        text-align: center;
                        padding: 0 21px;
                        position: relative;

                        &:after{
                            content:'';
                            width:104px;
                            height:3px;
                            position: absolute;
                            bottom:0;
                            left:24px;
                            background:#368474;

                        }
                    }
                }
            }
            .prot_inforcontentpart{
                width: 838px;
                padding: 20px 24px;
                box-sizing: border-box;
                overflow: hidden;
                img{
                    max-width:790px!important;
                }
            }
        }
        .prot_bodybottomright{
            width: 332px;
            float: left;
            margin-left:29px;
            padding:0 13px;
            box-sizing: border-box;
            background:#fff;
            .prot_bodybottomrighttit{
                text-align: center;
                height:33px;
                border-bottom: 1px solid #cecece;
                span{
                    font-size: 18px;
                    font-weight: bold;
                    padding: 0 19px;
                    color:#666;
                    background: #fff;
                    position: relative;
                    top:20px;
                }

            }
            .prot_bodybottomrightdep{
                ul{
                    @extend %clearFix;
                    li{
                        width: 147px;
                        margin: 16px 6px 0 0;
                        float:left;
                        .prot_hotproductimg{
                            width:147px;
                            height:147px;
                            cursor:pointer;
                            img{
                                width:147px;
                                height:147px;
                            }
                        }
                        .prot_commonname{
                            height:36px;
                            margin-top:12px;
                            font-weight: bold;
                            overflow: hidden;
                            cursor:pointer;
                        }
                        .prot_commoninfor{
                            margin-top:3px;
                            color:#888;
                            cursor:pointer;
                        }
                    }
                }
            }
            .prot_reflashbutton{
                margin-top:35px;
                margin-bottom:40px;
                text-align: center;
                button{
                    width:291px;
                    height:51px;
                    border:0px;
                    font-size: 16px;
                    font-weight: bold;
                    border-radius: 5px;
                    cursor: pointer;
                    &:hover{
                        .prot_reflash{
                            transform: rotate(180deg);
                        }
                    }
                    .prot_reflash{
                        display: inline-block;
                        width:24px;
                        height:19px;
                        background:url('../assets/huanyihuan(1).png');
                        position: relative;
                        right:8px;
                        top:4px;
                        transition:all 0.5s;
                    }
                }
            }
        }
    }
}
</style>
