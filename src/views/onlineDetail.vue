<template>
    <div class="onlineDetail">
        <header-fix :active-index="headerIndex"></header-fix>
        <div class="oli_bodyDepart">
            <div class="oli_breadCrumb">
                <span class="oli_location">您所在的位置：</span>
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/home' }"><span class="oli_toHome"></span>首页</el-breadcrumb-item>
                    <el-breadcrumb-item :to="{ path: '/onlineshow' }">网上展厅</el-breadcrumb-item>
                    <el-breadcrumb-item>网上展厅详情</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="oli_detailInfor">
                <div class="oli_detailInforLeft">
                    <div class="oli_InforLeftTop">
                        <h1 v-text="title"></h1>
                        <div class="oli_InforDate">
                            <div class="oli_InforDateLeft">
                                作者:<span class="oli_author" v-text="author"></span>
                                发表日期:<span v-text="data"></span>
                            </div>
                            <div class="oli_InforDateRight">
                                <ul>
                                    <li 
                                        @mouseover="mouseinn('perfect')" 
                                        @mouseout="mousego('perfect')"
                                        @click="collectThing('perfect')"
                                        v-show="perfect == 0 || perfect == 2 ? 1 : 0"
                                    >
                                        <img src="../assets/oli_icon1.png" alt="" v-show="perfect == 0 ? 1 : 0">
                                        <img src="../assets/oli_icon1a.png" alt="" v-show="perfect == 2 ? 1 : 0">
                                        <span>点赞</span>
                                    </li>
                                    <li
                                        @click="collectThing('perfect')"
                                        v-show="perfect == 1 ? 1 : 0"
                                    >
                                        <img src="../assets/oli_icon1a.png" alt="">
                                        <span class="oli_wordaction">点赞</span>
                                    </li>
                                    <li 
                                        @mouseenter="mouseinn('collect')" 
                                        @mouseleave="mousego('collect')" 
                                        @click="collectThing('collect')"
                                        v-show="collect == 0 || collect == 2 ? 1 : 0"
                                    >
                                        <img src="../assets/oli_icon2.png" alt="" v-show="collect == 0 ? 1 : 0">
                                        <img src="../assets/oli_icon2a.png" alt="" v-show="collect == 2 ? 1 : 0">
                                        <span>收藏</span>
                                    </li>
                                    <li 
                                        @click="collectThing('collect')"
                                        v-show="collect == 1 ? 1 : 0"
                                    >
                                        <img src="../assets/oli_icon2a.png" alt="">
                                        <span class="oli_wordaction">收藏</span>
                                    </li>
                                    <li @mouseenter="mouseinn('download')" @mouseleave="mousego('download')" @click="downloadsImg()">
                                        <img src="../assets/oli_icon3.png" alt="" v-show="download == 0 ? 1 : 0">
                                        <img src="../assets/oli_icon3a.png" alt="" v-show="download == 1 || download == 2 ? 1 : 0">
                                        <span>下载</span>
                                    </li>
                                    <li class="per_toshare" @mouseenter="mouseinn('enjoy')" @mouseleave="mousego('enjoy')">
                                        <img src="../assets/oli_icon4.png" alt="" v-show="enjoy == 0 ? 1 : 0">
                                        <img src="../assets/oli_icon4a.png" alt="" v-show="enjoy == 1 || enjoy == 2 ? 1 : 0">
                                        <span>分享</span>
                                        <div class="per_shareextenddepart">
                                            <div class="per_shareextendbox">
                                                <ul>
                                                    <li @click="outlineqq"></li>
                                                    <li @click="outlinezone"></li>
                                                    <li @mouseenter="erwei()" @mouseleave="erwei()">
                                                        <div class="per_doublecode" v-show="erweicode">
                                                            <div id="qrcode" ref="qrcode"></div>
                                                            <p>用微信扫描二维码</p>
                                                        </div>
                                                    </li>
                                                    <li @click="outlineweibo"></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="oli_inforBanner">
                            <p class="oli_bannerContent" v-html="description"></p>
                            <div class="oli_swiper">
                                <ul ref="swiper">
                                    <li v-for="(item, index) in bannerImg" :key="index">
                                        <error-img2 :src="item.EnclosureUrl" :error-src="Avatar"></error-img2> 
                                    </li>
                                </ul>
                                <div class="oli_leftButton" @click="bannerTo(bannerIndex-1)">&lt;</div>
                                <div class="oli_rightButton" @click="bannerTo(bannerIndex+1)">&gt;</div>
                            </div>
                            <div class="oli_imgIntroduction">
                                <span class="oli_currentPage" v-text="localIndex"></span>
                                /
                                <span class="oli_allPage" v-text="bannerImg.length"></span>
                                <!-- <span class="oli_pageContent" v-text="bannerImg[localIndex].Remark"></span> -->
                            </div>
                            <div class="oli_swiperBottom">
                                <div class="oli_leftBtn" @click="move('left')" ref="bottomLeft">&lt;</div>
                                <div class="oli_bottomLength">
                                    <ul ref="swiperBottom">
                                        <li v-for="(item, index) in bottomImg" :key="index" ref="btnBottom" @click="bottomTo (index)">
                                            <error-img2 :src="item" :error-src="Avatar"></error-img2> 
                                        </li>
                                    </ul>
                                </div>
                                <div class="oli_rightBtn" @click="move('right')" ref="bottomRight">&gt;</div>
                            </div>
                        </div>
                    </div>
                    <div class="oli_inforLeftBottom">
                        <div class="oli_comment">
                            <div class="oli_commentTitle">
                                <h3>写评论</h3>
                                <div><span v-text="reflog.length" ref="wordlength"></span>/300</div>
                            </div>
                            <div>
                                <textarea name="" id="" cols="30" rows="10" v-model="reflog" @input="wordsLimit()"></textarea>
                            </div>
                            <div class="oli_buttondepart">
                                <button type="button" class="oli_submit" @click="addComment()">发表评论</button>
                            </div>
                        </div>
                        <div class="oli_allComment">
                            <div class="oli_allComTop">
                                <span class="oli_commentIcon"></span>
                                <span class="oli_allComTitle">全部评论</span><span class="oli_commentLength">(共<span v-text="count"></span>条)</span>
                            </div>
                            <ul class="oli_allComContent">
                                <li v-for="(item, index) in commentList" :key="index">
                                    <img :src="item.Img" alt="">
                                    <div class="oli_allComInfor">
                                        <h3 v-text="item.UserName"></h3>
                                        <p class="oli_allComInforContent" v-text="item.Content"></p>
                                        <p class="oli_allComInforTime"><span>发表日期：<span v-text="item.CreateDate"></span></span><span class="oli_allComReback" @click="boxOrNone(index)">回复</span></p>
                                        <el-collapse-transition>
                                            <div class="oli_secoundLevel" v-show="revertState[index] == 1">
                                                <ul>
                                                    <li v-for="(sonitem, index) in item.List" :key="index">
                                                    <span v-text="sonitem.UserName" class="oli_revertUserName"></span>
                                                    <span> 回复 </span>
                                                    <span v-text="item.UserName" class="oli_revertUserName"></span>：
                                                    <span v-text="sonitem.Content"></span> 
                                                    </li>
                                                </ul>
                                                <div>
                                                    <input type="text" v-model="revertContent[index]"><button type="button" @click="revert(item.Id, index)">回复</button>
                                                </div>
                                            </div>
                                        </el-collapse-transition>
                                    </div>
                                </li>
                            </ul>
                            <div class="per_nonecommit" v-if="commitInfor">
                                <h1>暂无评论</h1>
                            </div>
                        </div>
                        <div class="oli_reflogPage">
                            <el-pagination
                                background
                                :current-page.sync="currentPage"
                                layout="prev, pager, next"
                                @current-change="currentchange()"
                                :total="totalPage">
                            </el-pagination>
                        </div>
                    </div>
                </div>
                <div class="oli_detailInforRight">
                    <div class="oli_rightPartTitle">
                        <div class="oli_rightTitleWord">
                            精彩图集
                        </div>
                    </div>
                    <div class="oli_rightPartContent">
                        <ul>
                            <li v-for="(item, index) in productionList" :key="index" @click="Wonderful(item.Id)">
                                <div class="oli_productImg">
                                    <error-img2 :src="item.Image" :error-src="Avatar"></error-img2> 
                                    <!-- <img :src="item.Image" alt=""> -->
                                    <div class="oli_producttitleinfor">
                                        <span class="oli_producticon"></span>
                                        <span class="oli_productnum" v-text="item.EnclosureCount"></span>
                                    </div>
                                </div>
                                <div class="oli_productImg"></div>
                                <div class="oli_productImg"></div>
                                <p v-text="item.ProductionName"></p>
                            </li>
                        </ul>
                    </div>
                    <div class="oli_buttondepart">
                        <button type="button" @click="reloads()"><span class="oli_reflash"></span>换一换</button>
                    </div>
                </div>
            </div>
        </div>
        <footer-fix></footer-fix>
    </div>
</template>

<script>
import Avatar from '../assets/error-img.png'
import { throttle } from '../service/throttleDebounce'
import { ProductionDetail, ProductionListTask, FavoriteAdd, FavoriteDelete, AddUserAssist, DelUserAssist, DownLoadImages, AddComment, CommentList } from '../service/getData'
import { calculatetolPage } from '../service/calculatePage'
import QRCode from 'qrcodejs2'
import { share } from '../plugins/utils'
export default {
    name: 'onlineDetail',
    data () {
        return {
            Avatar,
            headerIndex: '7',
            title: '',
            author: '',
            data: '',
            perfect: 0,
            collect: 0,
            download: 0,
            enjoy: 0,
            description: '',
            bannerImg: [],
            bottomImg: [],
            productionList: [],
            bannerIndex: 0,
            reflog: '',
            count: 0,
            perPro: 0,
            nextPro: 0,
            commentList: [],
            proId: this.$route.query.Id,
            order: this.$route.query.Order,
            Sort: this.$route.query.Sort,
            localIndex: 1,
            currentPage: 1,
            totalPage: 0,
            revertContent: ['', '', '', '', ''],
            revertState: [],
            erweicode: false,
            commitInfor: false
        }
    },
    mounted () {
        this.random()
        this.qrcode()
    },
    watch: {
        '$route' (to, from) {
            this.proId = this.$route.query.Id
            this.order = this.$route.query.Order
            this.Sort = this.$route.query.Sort
            this.random()
            this.$refs.swiper.style.left = 0
            this.bannerIndex = 0
            this.localIndex = 1
            this.bottomTo(1)
        }
    },
    methods: {
        culWidth () {
            this.$refs.swiper.style.width = (this.bannerImg.length) * 769 + 'px'
            this.$refs.swiperBottom.style.width = (this.bottomImg.length) * 142 + 'px'
        },
        bottomTo: throttle(function (index) {
            if (index == 0) {
                this.$refs.btnBottom.forEach(item => {
                    item.style.border = '2px solid #fff'
                })
                const self = this
                if (this.nextPro != 0) {
                    this.$router.push({ path: 'onlinedetail', query: { Id: self.nextPro, Sort: self.Sort, Order: self.Order } })
                } else {
                    this.$message({
                        message: '这已经是最新的展厅了',
                        type: 'warning'
                    })
                    return
                } 
                this.$refs.btnBottom[1].style.border = '2px solid #ff0' // 上一展厅
            } else if (index == this.bottomImg.length - 1) {
                this.$refs.btnBottom.forEach(item => {
                    item.style.border = '2px solid #fff'
                })
                const self = this
                if (this.perPro != 0) {
                    this.$router.push({ path: 'onlinedetail', query: { Id: self.perPro, Sort: self.Sort, Order: self.Order } })
                } else {
                    this.$message({
                        message: '这已经是最后的展厅了',
                        type: 'warning'
                    })
                    return
                }
                this.$refs.btnBottom[1].style.border = '2px solid #ff0' // 下一展厅
            } else if (index != 0 && index != this.bottomImg.length - 1) {
                this.$refs.btnBottom.forEach(item => {
                    item.style.border = '2px solid #fff'
                })
                if (index <= 2) {
                    this.$refs.swiperBottom.style.left = 0
                } else if ((index > 2 && index <= this.bottomImg.length - 3) && this.bottomImg.length > 5) {
                    this.$refs.swiperBottom.style.left = -(index - 2) * 142 + 'px'
                } else if (index > this.bottomImg.length - 3) {
                    this.$refs.swiperBottom.style.left = -(index - 3) * 142 + 'px'
                }
                this.$refs.btnBottom[index].style.border = '2px solid #ff0'
                if (index != this.bannerIndex + 1) {
                    this.bannerTo(index - 1)
                }
            } 
        }, 300), // 底部轮播图
        bannerTo: throttle(function (index) {
            let self = this
            let timer = null
            this.bannerIndex = index
            if (this.bannerIndex < 0) {
                this.bannerIndex = 0
                this.$message({
                    message: '图集已经到顶',
                    type: 'warning'
                })
                return ''
            } else if (this.bannerIndex > this.bannerImg.length - 1) {
                this.bannerIndex = this.bannerImg.length - 1
                this.$message({
                    message: '图集已经到底',
                    type: 'warning'
                })
                return ''
            }
            let totalDistance = this.bannerIndex * -769
            let currentDistance = self.$refs.swiper.offsetLeft
            let speed = round()
            function round () {
                if (totalDistance - currentDistance >= 0) {
                    let sum = (totalDistance - currentDistance) / 30
                    return sum
                } else if (totalDistance - currentDistance < 0) {
                    let sum = (totalDistance - currentDistance) / -30
                    return sum
                }
            } // 测算轮播切换速度
            
            timer = setInterval(function () {
                if (currentDistance < totalDistance) {
                    self.$refs.swiper.style.left = self.$refs.swiper.offsetLeft + speed + 'px'
                    if (self.$refs.swiper.offsetLeft >= totalDistance) {
                        self.$refs.swiper.style.left = totalDistance + 'px'
                        clearInterval(timer)
                    }
                } else if (currentDistance > totalDistance) {
                    self.$refs.swiper.style.left = self.$refs.swiper.offsetLeft - speed + 'px'
                    if (self.$refs.swiper.offsetLeft <= totalDistance) {
                        self.$refs.swiper.style.left = totalDistance + 'px'
                        clearInterval(timer)
                    }
                }
            }, 10)
            this.bottomTo(this.bannerIndex + 1, 'nature')
            this.localIndex = this.bannerIndex + 1
        }, 300), // 主轮播图
        move: throttle(function (ways) {
            let self = this
            if (ways == 'left' && self.$refs.swiperBottom.offsetLeft < 0) {
                self.$refs.swiperBottom.style.left = self.$refs.swiperBottom.offsetLeft + 142 + 'px'
            } else if (ways == 'right' && self.$refs.swiperBottom.offsetLeft > -self.bottomImg.length * 142 + 711) {
                self.$refs.swiperBottom.style.left = self.$refs.swiperBottom.offsetLeft - 142 + 'px'
            }
            if (self.$refs.swiperBottom.offsetLeft == 0 && ways == 'left') {
                this.$message.warning('该展厅已经到顶')
            } else if (self.$refs.swiperBottom.offsetLeft == (this.bannerImg.length - 3) * -142 && ways == 'right') {
                this.$message.warning('该展厅已经到底')
            }
        }, 300), // 底部轮播图左右按钮切换
        outlineqq () {
            let href = share({
                url: encodeURIComponent(window.location),
                title: this.title, // 大标题不可修改
                description: this.title, // 小标题可以修改
                summary: this.description,
                img: 'http://test46.jy365.net' + this.bannerImg[0].EnclosureUrl,
                type: 'qq'
            })
            window.open(href)
        },
        outlinezone () {
            let href = share({
                url: encodeURIComponent(window.location),
                title: this.title, 
                description: this.description, 
                img: 'http://test46.jy365.net' + this.bannerImg[0].EnclosureUrl,
                type: 'qzone'
            })
            window.open(href)
        },
        outlineweibo () {
            let href = share({
                url: encodeURIComponent(window.location),
                title: this.title,
                img: 'http://test46.jy365.net' + this.bannerImg[0].EnclosureUrl,
                type: 'weibo'
            })
            window.open(href)
        },
        qrcode () {
            // console.log(window.location)
            // eslint-disable-next-line
            let qrcode = new QRCode('qrcode', {
                width: 125, // 设置宽度，单位像素
                height: 125, // 设置高度，单位像素
                text: window.location.href
            })
        },
        erwei () {
            if (this.erweicode == false) {
                this.erweicode = true
            } else {
                this.erweicode = false
            }
        },
        mouseinn (infor) {
            if (this[infor] == 1) {
                return
            }
            this[infor] = 2
        },
        mousego (infor) {
            if (this[infor] == 1) {
                return
            }   
            this[infor] = 0
        },
        getImg () {
            let arr = []
            this.bannerImg.forEach((item, index) => {
                arr.push(item.EnclosureUrl)
            })
            arr.unshift(require('../assets/oli_upper.png'))
            arr.push(require('../assets/oli_bottom.png'))
            return arr
        }, // 拼装底部轮播
        Wonderful (index) {
            const { href } = this.$router.resolve({ path: 'onlinedetail', query: { Id: index, Sort: this.Sort, Order: this.Order } })
            window.open(href, '_blank')
        }, // 其它展厅打开
        wordsLimit () {
            if (this.reflog.length >= 300) {
                this.reflog = this.reflog.substr(0, 300)
                this.$refs.wordlength.style.color = '#f00'
            } else if (this.reflog.length < 300) {
                this.$refs.wordlength.style.color = ''
            }
        }, // 字数限制函数
        boxOrNone (index) {
            this.revertState.forEach((item, index) => {
                this.revertState.splice(index, 1, 0)
            })
            this.revertState.splice(index, 1, 1)
        },
        async random () {
            let msg = await ProductionDetail({
                Id: this.proId,
                Sort: this.Sort == 'CreateDate' ? 'Id' : this.Sort,
                Order: this.order
            })
            let Infor = await ProductionListTask({
                Id: 5
            })
            let Comment = await CommentList({
                MainId: this.proId,
                Type: 'Production',
                Page: 1,
                Rows: 5
            })
            if (msg.Data.ProductionEnclosure.length <= 3) {
                this.$refs.bottomLeft.style.visibility = 'hidden'
                this.$refs.bottomRight.style.visibility = 'hidden'
            } else {
                this.$refs.bottomLeft.style.visibility = 'visible' 
                this.$refs.bottomRight.style.visibility = 'visible'
            }
            this.title = msg.Data.ProductionName
            this.author = msg.Data.AuthorName
            this.data = msg.Data.CreateDate.substr(0, 10)
            this.perPro = msg.Data.PreId
            this.nextPro = msg.Data.nextId
            this.description = msg.Data.ProductionDesc
            this.bannerImg = msg.Data.ProductionEnclosure
            this.bottomImg = this.getImg()
            this.culWidth()
            msg.Data.IsFavorite == true ? this.collect = 1 : this.collect = 0
            msg.Data.IsAssist == true ? this.perfect = 1 : this.perfect = 0
            this.productionList = Infor.Data.List
            this.commentList = Comment.Data.List
            if (this.commentList.length == 0) {
                this.commitInfor = true
            }
            this.count = Comment.Data.TotalCount
            this.revertState = []
            this.commentList.forEach(item => {
                if (item.Img == '') {
                    item.Img = '/images/oli-header.jpg'
                }
                this.revertState.push(0)
            })
            this.totalPage = calculatetolPage(Comment.Data.TotalCount, 5)
            this.currentPage = 1
            this.$refs.swiperBottom.style.left = 0
        },
        async currentchange () {
            let Comment = await CommentList({
                MainId: this.proId,
                Type: 'Production',
                Page: this.currentPage,
                Rows: 5
            })
            this.commentList = Comment.Data.List
            this.commentList.forEach(item => {
                if (item.Img == '') {
                    item.Img = '/images/oli-header.jpg'
                }
            })
            this.revertContent = ['', '', '', '', '']
            this.revertState = []
            this.commentList.forEach(item => {
                this.revertState.push(0)
            })
        },
        async collectThing (type) {
            if (this.$store.state.userInfo.Account == null) {
                this.$router.push({ path: '/userLogin' })
                return false
            }
            if (type == 'collect' && (this.collect == 0 || this.collect == 2)) {
                const msg = await FavoriteAdd({
                    mainId: this.proId,
                    type: 'Production'
                })
                if (msg.Type == 1) {
                    this.collect = 1
                    this.$message.success('收藏成功！')
                }
            } else if (type == 'collect' && this.collect == 1) {
                const infor = await FavoriteDelete({
                    type: 'Production',
                    ids: this.proId
                })
                if (infor.Type == 1) {
                    this.collect = 0
                    this.$message.success('已取消收藏！')
                }
            } else if (type == 'perfect' && (this.perfect == 0 || this.perfect == 2)) {
                const msg = await AddUserAssist({
                    ObjType: 'Production',
                    ObjId: this.proId
                })
                if (msg.Type == 1) {
                    this.perfect = 1
                    this.$message.success('点赞成功！')
                }
            } else if (type == 'perfect' && this.perfect == 1) {
                const infor = await DelUserAssist({
                    ObjType: 'Production',
                    ObjId: this.proId
                })
                if (infor.Type == 1) {
                    this.perfect = 0
                    this.$message.success('已取消点赞！')
                }
            }
        },
        async reloads () {
            let msg = await ProductionListTask({
                Id: 5
            })
            this.productionList = msg.Data.List
        }, // 换一换展厅按钮
        async downloadsImg () {
            if (this.$store.state.userInfo.Account == null) {
                this.$router.push({ path: '/userLogin' })
                return false
            }
            let msg = await DownLoadImages({
                id: this.proId
            })
            if (msg.Type == 1) {
                window.open(msg.Message)
            } else {
                this.$message.error('下载失败')
            }
        },
        async addComment () {
            if (this.$store.state.userInfo.Account == null) {
                this.$router.push({ path: '/userLogin' })
                return false
            }
            if (this.reflog == '') {
                this.$message({
                    message: '评论不能为空',
                    type: 'error'
                })
                return
            }
            let msg = await AddComment({
                Type: 'production',
                Content: this.reflog,
                ParentId: 0,
                MainId: this.proId
            })
            if (msg.Type == 1) {
                this.$message({
                    message: msg.Message,
                    type: 'success'
                })
                this.reflog = ''
                this.random()
            }
        }, // 提交展厅评论
        async revert (index, listnum) {
            if (this.$store.state.userInfo.Account == null) {
                this.$router.push({ path: '/userLogin' })
                return false
            }
            if (this.revertContent[listnum] == '') {
                this.$message({
                    message: '评论不能为空',
                    type: 'warning'
                })
                return false
            }

            let msg = await AddComment({
                Type: 'production',
                Content: this.revertContent[listnum],
                ParentId: index,
                MainId: this.proId
            })
            if (msg.Type == 1) {
                this.$set(this.revertContent, listnum, '')
                // this.revertContent[listnum] = ''
                // this.$forceUpdate()
                this.$message({
                    message: msg.Message,
                    type: 'success'
                })
            } else if (msg.Type == 0) {
                this.$message({
                    message: msg.Message,
                    type: 'error'
                })
            }
        }
    }
}
</script>

<style lang="scss">
@import '../style/mixin';
.onlineDetail{ 
    background: url("../assets/body-bg.png") no-repeat; 
    .oli_bodyDepart{
        width:1200px;
        margin: 0 auto;
        .oli_breadCrumb{
            @extend %clearFix;
            margin: 31px 0 17px;
            .oli_location{
                float:left;
                height:18px;
                line-height: 18px;
            }
            .el-breadcrumb{
                display: inline-block;
                .oli_toHome{
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
    }
    .oli_detailInfor{
        @extend %clearFix;
        .oli_detailInforLeft{
            width: 850px;
            float: left;
            .oli_InforLeftTop{
                padding:0 23px 45px;
                box-sizing: border-box;
                background: #fff;
                padding-top:40px;
                h1{
                    font-size: 24px;
                    margin:0 0 20px 0;
                    font-weight: bolder;
                }
                .oli_InforDate{
                    @extend %clearFix;
                    .oli_InforDateLeft{
                        float: left;
                        color: #acacac;
                        .oli_author{
                            margin-right:20px;
                        }
                    }
                    .oli_InforDateRight{
                        float:right;
                        ul{
                            @extend %clearFix;
                            padding-bottom:20px;
                            .per_toshare{
                                p{
                                    padding-left:16px;
                                }
                                &:hover{
                                    .per_shareextenddepart{
                                        display: block;
                                    }
                                }
                            }
                            li{
                                float:left;
                                margin-right:30px;
                                position: relative;
                                height:30px;
                                cursor: pointer;
                                img{
                                    padding-right:8px;
                                }
                                span{
                                    display: inline-block;
                                    color:#d1d1d1;
                                    position: relative;
                                    top: 2px;
                                }
                                .oli_wordaction{
                                    color:#368474;
                                }
                                .per_shareextenddepart{
                                    width: 160px;
                                    position: absolute;
                                    top: 29px;
                                    right: -11px;
                                    display: none;

                                    &:before{
                                        content: '';
                                        display: inline-block;
                                        width:10px;
                                        height:10px;
                                        background: #f1f1f1;
                                        transform: rotate(45deg);
                                        position: absolute;
                                        top:-3px;
                                        left:113px;
                                    }
                                    .per_shareextendbox{
                                        background: #f1f1f1;
                                        padding: 5px 0 5px 0;
                                        border-radius: 5px;
                                        ul{
                                            padding:0;
                                            li{
                                                margin: 0 5px 0 5px;
                                                width: 30px;
                                                height: 30px;
                                                position: relative;
                                                .per_doublecode{
                                                    position: absolute;
                                                    width:150px;
                                                    height:160px;
                                                    top:35px;
                                                    right:-60px;
                                                    border: 1px solid #888;
                                                    background:#fff;
                                                    z-index: 10;
                                                    &:before{
                                                        content: '';
                                                        width:8px;
                                                        height:8px;
                                                        position: absolute;
                                                        border-top: 1px solid #888;
                                                        border-left: 1px solid #888;
                                                        transform: rotate(45deg);
                                                        top:-4px;
                                                        left:72px;
                                                        background:#fff;
                                                    }
                                                    #qrcode{
                                                        width:150px;
                                                        height:135px;
                                                        padding-top: 15px;
                                                        padding-left: 12px;
                                                        width:150px;
                                                        overflow: hidden;
                                                        box-sizing: border-box;
                                                    }
                                                }
                                                &:first-of-type{
                                                    background: url('../assets/qq.png') no-repeat;
                                                    background-size: 100%;
                                                    &:hover{
                                                        background: url('../assets/qqblue.png') no-repeat;
                                                        background-size: 100%;
                                                    }
                                                }
                                                &:nth-of-type(2){
                                                    background: url('../assets/qqzone.png') no-repeat;
                                                    background-size: 100%;
                                                    padding-bottom:5px;
                                                    &:hover{
                                                        background: url('../assets/qqzoneblue.png') no-repeat;
                                                        background-size: 100%;
                                                    }
                                                }
                                                &:nth-of-type(3){
                                                    background: url('../assets/weixin.png') no-repeat;
                                                    background-size: 100%;
                                                    &:hover{
                                                        background: url('../assets/weixingreen.png') no-repeat;
                                                        background-size: 100%;
                                                    }
                                                }
                                                &:last-of-type{
                                                    background: url('../assets/weibo.png') no-repeat;
                                                    background-size: 100%;
                                                    &:hover{
                                                        background: url('../assets/weiboyellow.png') no-repeat;
                                                        background-size: 100%;
                                                    }
                                                }
                                            }
                                        }
                                        
                                    }
                                }
                                &:first-of-type{
                                    &:hover{
                                        span{
                                            color:#368474;
                                        }
                                    }
                                }
                                &:nth-of-type(3){
                                    &:hover{
                                        span{
                                            color:#368474;
                                        }
                                    }
                                }
                                &:nth-of-type(5){
                                    &:hover{
                                        span{
                                            color:#368474;
                                            .per_shareextendbox{
                                                display: block;
                                            }
                                        }
                                    }
                                }
                                &:last-of-type{
                                    &:hover{
                                        span{
                                            color:#368474;
                                        }
                                        .per_shareextendbox{
                                            display: block;
                                        }
                                        
                                    }
                                }
                            }
                        }
                    }
                }
                .oli_inforBanner{
                    .oli_bannerContent{
                        padding-bottom: 24px;
                        text-indent: 38px;
                    }
                    .oli_swiper{
                        width: 769px;
                        height: 452px;
                        margin: 0 auto;
                        overflow: hidden;
                        position: relative;
                        background:#cdcdcd;
                        &:hover{
                            .oli_leftButton,.oli_rightButton{
                                opacity: 1;
                            }
                        }
                        ul{
                            @extend %clearFix;
                            position: absolute;
                            top:0;
                            left:0;
                            li{
                                float:left;
                                width: 769px;
                                height: 452px;
                                text-align: center;
                                img{
                                    height: 452px;
                                    max-width: 769px;
                                }
                            }
                        }
                        .oli_leftButton,.oli_rightButton{
                            width:48px;
                            height:48px;
                            font-size: 25px;
                            text-align: center;
                            line-height: 48px;
                            background:rgba(0,0,0,0.4);
                            border-radius: 48px;
                            color:#fff;
                            position: absolute;
                            margin-top: -24px;
                            transition: 0.5s;
                            opacity: 0;
                            cursor: pointer;

                        }
                        .oli_leftButton{
                            top:50%;
                            left:24px;
                        }
                        .oli_rightButton{
                            top:50%;
                            right:24px;
                        }
                    }
                    .oli_imgIntroduction{
                        text-align: center;
                        line-height: 66px;
                        height: 66px;
                        span{
                            font-size: 16px;
                        }
                        .oli_allPage{
                            margin-right:16px;
                        }
                        .oli_currentPage{
                            font-size: 24px;
                            color:#368474;
                        }
                    }
                    .oli_swiperBottom{
                        width: 767px;
                        height: 81px;
                        overflow: hidden;
                        margin: 0 auto;
                        @extend %clearFix;
                        .oli_bottomLength{
                            float:left;
                            width:711px;
                            height: 81px;
                            overflow: hidden;
                            position: relative;
                            ul{
                                @extend %clearFix;
                                position: absolute;
                                top:0;
                                left:0;
                                transition: 0.3s;
                                li{
                                    margin: 0 2px;
                                    border: 2px solid #fff;
                                    width: 138px;
                                    height: 81px;
                                    text-align: center;
                                    background: #cdcdcd;
                                    float: left;
                                    &:nth-of-type(2){
                                        border: 2px solid #ff0;
                                    }
                                    img{
                                        height: 77px;
                                        max-width: 134px;
                                        vertical-align: middle
                                    }
                                }
                            }
                        }
                        .oli_leftBtn,.oli_rightBtn{
                            float:left;
                            height:81px;
                            width:28px;
                            text-align: center;
                            line-height: 81px;
                            color:#fff;
                            background:rgba(0,0,0,0.4);
                            visibility: hidden;
                            cursor: pointer;
                        }
                    }
                }
            }
        }
        .oli_inforLeftBottom{
            background:#fff;
            padding: 26px 0 0;
            margin-top:20px;
            .oli_comment{
                padding: 0 21px;
            }
            .oli_allComment{
                padding: 0 21px;
            }
            .oli_commentTitle{
                margin-bottom:10px;
                @extend %clearFix;
                h3{
                    float:left;
                    margin:0 0 0 2px;
                    font-weight: bolder;
                }
                div{
                    float:right;
                    font-style: italic;
                    font-weight: 500;
                    color:#acacac; 
                }
            }
            textarea{
                height: 91px;
                border: 1px solid #cecece;
                background:#efefef;
                padding: 14px;
                box-sizing: border-box;
            }
            .oli_buttondepart{
                @extend %clearFix;
                padding-bottom: 15px;
                .oli_submit{
                    float:right;
                    width: 100px;
                    height: 36px;
                    border: 0px;
                    border-radius: 5px;
                    margin-top: 19px;
                    background:#368474;
                    color:#fff;
                    cursor: pointer;
                }
            }
            .oli_allComTop{
                padding-bottom: 10px;
                border-bottom: 1px solid #efefef;    
            }
            .oli_commentIcon{
                display: inline-block;
                width: 19px;
                height: 15px;
                background:url('../assets/oli-comment.png');
                position: relative;
                top: 2px;
            }
            .oli_allComTitle{
                font-size: 16px;
                font-weight: 500;
                margin-left: 9px;
            }
            .oli_commentLength{
                margin-left: 6px;
                font-size: 12px;
                color:#acacac;
            }
            .per_nonecommit{
                height:80px;
                text-align: center;
            }
            .oli_allComContent{
                li{
                    @extend %clearFix;
                    img{
                        float:left;
                        width:50px;
                        height:50px;
                        border-radius: 50px;
                        margin: 20px 9px 0 9px;
                        border:1px solid #efefef;
                    }
                    .oli_allComInfor{
                        float:left;
                        width:738px;
                        border-bottom:1px solid #efefef;
                        padding-bottom:21px;
                        h3{
                            margin:22px 0 16px;
                            font-weight: 500;
                        }
                        .oli_allComInforContent{
                            margin-bottom:20px;
                            color:#888;
                            word-break: break-all;
                        }
                        .oli_allComInforTime{
                            font-size: 12px;
                            color:#acacac;
                            padding-bottom: 8px;
                        }
                        .oli_allComReback{
                            font-size: 14px;
                            color:#ff9c07;
                            margin-left:10px;
                            cursor:pointer;
                        }
                        .oli_secoundLevel{
                            padding-top:20px;
                            border-top:1px solid #cecece;
                            ul{
                                padding: 0 0 5px 50px;
                                li{
                                    .oli_revertUserName{
                                        font-weight: bold;
                                        color:#2e1769
                                    }
                                }
                            }
                            input{
                                width:650px;
                                height:30px;
                                line-height: 32px;
                                padding: 0 15px;
                                margin-right:10px;
                                border: 1px solid #cecece;
                                box-sizing: border-box;
                            }
                            button{
                                width:66px;
                                height:32px;
                                color:#fff;
                                background:#ff9c07;
                                border: 0;
                                position: relative;
                                top:1px;
                                cursor:pointer;
                            }
                        }
                    }
                    &:last-of-type{
                        .oli_allComInfor{
                            border-bottom: 0px;
                        }       
                    }
                }
            }
        }
        .oli_reflogPage{
            border-top: 1px solid #efefef;
            height:76px;
            text-align: center;
            &:before{
                content:'';
                height: 100%;
                display: inline-block;
                vertical-align: middle;
            }
            .el-pagination{
                display: inline-block;
                .el-pager{
                    .active{
                        background: #368474!important;
                    }
                }
            }
        }
        .oli_detailInforRight{
            float:left;
            width: 332px;
            margin-left: 18px;
            background:#fff;
            padding: 0 13px;
            box-sizing: border-box;
            .oli_rightPartTitle{
                height:32px;
                border-bottom:1px solid #efefef;
                position: relative;
                .oli_rightTitleWord{
                    width:118px;
                    font-size: 18px;
                    font-weight: bolder;
                    text-align: center;
                    position: absolute;
                    color:#666;
                    top:60%;
                    left:50%;
                    margin-left:-59px;
                    background:#fff;
                }
            }
            .oli_rightPartContent{
                ul{
                    li{
                        padding-top:35px;
                        overflow: hidden;
                        width:280px;
                        margin:0 auto;
                        position: relative;
                        .oli_productImg{
                            width:262px;
                            height:158px;
                            position: absolute;
                            background:#fff;
                            border: 1px solid #cecece;

                            img{
                                width:262px;
                                height:158px;
                                vertical-align: middle;
                            }

                            &:first-of-type{
                                z-index: 3;
                                cursor: pointer;
                            }

                            &:nth-of-type(2){
                                width:261px;
                                height:157px;
                                top:40px;
                                left:6px;
                                border:1px solid #cecece;
                                z-index: 2;
                            }

                            &:last-of-type{
                                width:261px;
                                height:157px;
                                top:44px;
                                left:12px;
                                border:1px solid #cecece;
                            }
                        }
                        .oli_producttitleinfor{
                            width: 56px;
                            height: 32px;
                            position: absolute;
                            bottom: 0;
                            right: 0;
                            line-height: 32px;
                            background:#4dbe7a;
                            color:#fff;

                            .oli_producticon{
                                position: relative;
                                top:3px;
                                display: inline-block;
                                background:url('../assets/per-producticon.png');
                                width:18px;
                                height:17px;
                                margin-left:6px;
                            }

                            .oli_productnum{
                                display: inline-block;
                                text-align: center;
                                width:32px;
                            }
                        }
                    }
                    p{
                        margin-top: 190px;
                        text-align: center;
                        font-weight: bolder;
                    }
                }
            }
            .oli_buttondepart{
                margin-top:39px;
                padding-bottom:30px;
                button{
                    display: block;
                    width:290px;
                    height:50px;
                    margin: 0 auto;
                    border:0px;
                    border-radius: 3px;
                    font-weight: bold;
                    cursor:pointer;
                    &:hover{
                        .oli_reflash{
                            transform: rotate(180deg);
                        }
                    }
                }
                .oli_reflash{
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
.el-breadcrumb__item{
    &:nth-of-type(1){
        .el-breadcrumb__inner{
            &.is-link:hover:hover{
                color:#368474;
            }
        }
    }
    &:nth-of-type(2){
        .el-breadcrumb__inner{
            position: relative;
            top:2px;
            &.is-link:hover:hover{
                color:#368474;
            }
        }
        .el-breadcrumb__separator{
            &:before{
                position: relative;
                top:2px;
            }
        }
    }
    &:last-of-type{
        .el-breadcrumb__inner{
            position: relative;
            top:2px;
            color:#368474;
        }
    }
    
}
</style>
