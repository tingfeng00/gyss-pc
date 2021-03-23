<template>
    <div class="per_interGet">
        <div class="per_interGetList">
            <ul>
                <li v-for="(item, index) in itemList" :key="index">
                    <div class="per_GetItemleft">
                        <img :src="item.imgPoster" alt="">
                        <div v-show="item.isShow" class="per_news"></div>
                    </div>
                    <div class="per_GetItemright">
                        <p class="per_username" v-text="item.UserName"></p>
                        <p class="per_reply"><span v-text="item.CreateDate"></span>来自:<span v-text="item.TypeName"></span></p>
                        <p class="per_textInfor" v-text="item.Content"></p>
                        <button ref="reply" class="per_callback" type="button" @click="caller(index)">回复TA</button>
                        <div class="per_articlainfor">
                            <a v-text="item.obj.Name" href="javascript:;" @click="outLink(index)"></a>
                            作者:<span v-text="item.obj.Another"></span>
                            发布于<span v-text="item.obj.Time"></span>
                        </div>
                        <div class="per_return" ref="replywindow">
                            <div class="per_returnleft">
                                <img :src="item.imgUser" alt="">
                            </div>
                            <div class="per_returnright">
                                <input type="text" ref="replyinput" v-model="replys[index]">
                                <p>提示:回复内容发布成功后，可在<router-link to="/personalCenter/personalInteraction/interactionPost">“发出的”</router-link>查看!</p>
                                <button type="button" @click="publishComment(index)">发表</button>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="per_interGetPage">
            <el-pagination
                :current-page.sync="currentPage" 
                @current-change="currentChange()"
                type="danger"
                background
                layout="prev, pager, next"
                :total="totalPage">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import { MyCommentList, CourseContent, BookContent, ProductionDetail, AddComment } from '../service/getData'
import { calculatetolPage } from '../service/calculatePage'
export default {
    name: 'interGet',
    data: function () {
        return {
            itemList: [],
            replys: [],
            Rows: 4,
            currentPage: 1,
            totalPage: 0
        }
    },
    created: function () {
        this.render()
    },
    mounted () {
        this.$emit('seoundRank', '0')  
    },
    methods: {
        caller (i) {
            if (this.$refs.reply[i].innerHTML == '回复TA') {
                this.$refs.reply.forEach((item, index) => {
                    this.$refs.replywindow[index].style.display = 'none'
                    this.$refs.replyinput[index].value = ''
                    this.$refs.reply[index].innerHTML = '回复TA'
                })
                this.$refs.replywindow[i].style.display = 'block'
                this.$refs.reply[i].innerHTML = '取消回复'
            } else {
                this.$refs.replywindow[i].style.display = 'none'
                this.$refs.replyinput[i].value = ''
                this.$refs.reply[i].innerHTML = '回复TA'
            }
        },
        typeTrans (type) {
            switch (type) {
                case 'course':
                    return '课程评论'
                case 'knowledge':
                    return '知识点评论'
                case 'series':
                    return '专题评论'
                case 'message':
                    return '留言板评论'
                case 'Book':
                    return '电子书评论'
                case 'article':
                    return '文章评论'
                case 'production':
                    return '展厅评论'
            }
        },
        outLink (index) {
            console.log(this.itemList[index].obj.Address.path)
            const { href } = this.$router.resolve({ path: this.itemList[index].obj.Address.path, query: this.itemList[index].obj.Address.query })
            window.open(href, '_blank')
        },
        async publishComment (index) {
            if (this.replys[index] == undefined || this.replys[index] == "") {
                this.$message({
                    message: '请输入内容',
                    type: 'warning'
                })
                return
            }   
            let msg = await AddComment({
                Type: this.itemList[index].Type,
                Content: this.replys[index],
                ParentId: this.itemList[index].Id
            })
            if (msg.Type == 0) {
                this.$message({
                    message: msg.Message,
                    type: 'warning'
                })
            } else if (msg.Type == 1) {
                this.$message({
                    message: msg.Message,
                    type: 'success'
                })
            }
        },
        async getObjInfor (type, MainId) {
            let msg = null
            switch (type) {
                case 'course':
                    msg = await CourseContent({
                        id: MainId
                    })
                    return {
                        Address: { path: '/courseDetail', query: { id: MainId } },
                        Name: '#' + msg.CourseModel.Name + '#',
                        Another: msg.CourseModel.Teacher,
                        Time: '无'
                    }
                case 'knowledge':
                    return {
                        Address: 'javascript:;',
                        Name: '暂无',
                        Another: '暂无',
                        Time: '无'
                    }
                case 'series':
                    return {
                        Address: 'javascript:;',
                        Name: '暂无',
                        Another: '暂无',
                        Time: '无'
                    }
                case 'message':
                    return {
                        Address: 'javascript:;',
                        Name: '暂无',
                        Another: '暂无',
                        Time: '无'
                    }
                case 'Book':
                    msg = await BookContent({
                        Id: MainId
                    })
                    console.log(msg)
                    return {
                        Address: { path: '/eBookDetail', query: { id: MainId } },
                        Name: '#' + msg.Data.Name + '#',
                        Another: msg.Data.Author,
                        Time: msg.Data.CreateDate != undefined ? msg.Data.CreateDate.substr(0, 10) : ''
                    }
                case 'article':
                    return {
                        Address: 'javascript:;',
                        Name: '暂无',
                        Another: '暂无',
                        Time: '无'
                    }
                case 'production':
                    msg = await ProductionDetail({
                        Id: MainId,
                        Sort: 'Id',
                        Order: 'desc'
                    })
                    return {
                        Address: { path: '/onlinedetail', query: { Id: MainId, Sort: 'Id', Order: 'desc' } },
                        Name: '#' + msg.Data.ProductionName + '#',
                        Another: msg.Data.AuthorName,
                        Time: msg.Data.CreateDate != undefined ? msg.Data.CreateDate.substr(0, 10) : ''
                    }
            }
        },
        async render () {
            let msg = await MyCommentList({
                Type: 'All',
                ParentId: 0,
                CommentType: 'ToMe',
                Sort: 'CreateDate',
                Order: 'desc',
                Page: this.currentPage,
                Rows: this.Rows
            })
            console.log(msg)
            for (let i = 0; i < msg.Data.List.length; i++) {
                msg.Data.List[i].CreateDate = msg.Data.List[i].CreateDate.substr(0, 16)
                let infor = await this.getObjInfor(msg.Data.List[i].Type, msg.Data.List[i].MainId)

                msg.Data.List[i].TypeName = this.typeTrans(msg.Data.List[i].Type)
                this.$set(msg.Data.List[i], 'obj', infor)
            }
            this.replys = []
            this.itemList = msg.Data.List
            this.totalPage = calculatetolPage(msg.Data.TotalCount, this.Rows)
        }
    }
}
</script>

<style lang="scss">
@import "../style/mixin";
.per_interGet{
    background: url("../assets/body-bg.png") no-repeat;
    .per_interGetList{
        ul{
            padding: 0 18px;
            li{
                border-bottom:1px dashed #efefef;
                padding-bottom:25px;
                @extend %clearFix;
                .per_GetItemleft{
                    float:left;
                    position: relative;
                    img{
                        width:54px;
                        height:54px;
                        border-radius: 54px;
                        margin:42px 16px 0 13px;
                    }
                    .per_news{
                        width:13px;
                        height:13px;
                        border:1px solid #fff;
                        border-radius: 13px;
                        background:#f95c49;
                        position: absolute;
                        top:43px;
                        right:17px;   
                    }
                }
                .per_GetItemright{
                    float:left;
                    margin-top:50px;
                    position: relative;
                    .per_username{
                        font-size: 16px;
                        font-weight: bold;
                        margin-bottom:15px;
                    }
                    .per_reply{
                        span{
                            &:first-of-type{
                                margin-right: 11px;
                            }
                            &:nth-of-type(2){
                                margin-right: 19px;
                            }
                        }
                    }
                    .per_textInfor{
                        margin-top:15px;
                    }
                    .per_callback{
                        width:64px;
                        height:28px;
                        color:#368474;
                        background:#fff;
                        border:1px solid #368474;
                        border-radius: 3px;
                        position:absolute;
                        top:0;
                        right:0;
                        cursor: pointer;

                        &:hover{
                            border:1px solid #fff;
                            background:linear-gradient(to left, #6adbfc, #089ffa);
                            color:#fff;
                        }
                    }
                    .per_articlainfor{
                        width:769px;
                        height:51px;
                        background: #efefef;
                        margin-top:15px;
                        &:before{
                            content:'';
                            height:100%;
                            display: inline-block;
                            vertical-align: middle;
                        }
                        a{
                            margin-left:20px;
                            color:#ff9c07;
                            margin-right:20px;
                        }
                        span{
                            &:first-of-type{
                                margin-right:19px;
                            }
                        }
                    }
                    .per_return{
                        display:none;
                        padding-top:20px;
                        padding-bottom:15px;
                        @extend %clearFix;
                        .per_returnleft{
                            float: left;
                            img{
                                width:44px;
                                height:44px;
                                border-radius: 44px;
                            }
                        }
                        .per_returnright{
                            float:left;
                            padding-left:12px;
                            position: relative;
                            input{
                                width:713px;
                                height:36px;
                                line-height: 36px;
                                padding:0 15px;
                                margin-bottom:16px;
                                border:1px solid #cecece;
                                box-sizing: border-box;
                            }
                            p{
                                padding-left:26px;
                                background:url('../assets/per-attention.png') no-repeat;
                                a{
                                    color:#f00;
                                }
                            }
                            button{
                                position: absolute;
                                bottom:-10px;
                                right:0;
                                width:64px;
                                height:28px;
                                color:#368474;
                                background:#fff;
                                border:1px solid #368474;
                                border-radius: 3px;
                                cursor: pointer;
                                &:hover{
                                    border:1px solid #fff;
                                    background:linear-gradient(to left, #6adbfc, #089ffa);
                                    color:#fff;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    .per_interGetPage{
        text-align: right;
        height:80px;
        padding-right:42px;
        &:before{
            content:'';
            height:100%;
            display: inline-block;
            vertical-align: middle;
        }
        .el-pagination{
            display: inline-block;
        }
    }
}
</style>
