<template>
    <div class="interSend">
        <div class="per_interSendList">
            <ul>
                <li v-for="(item, index) in itemList" :key="index">
                    <div class="per_SendItemleft">
                        <img :src="item.imgPoster" alt="">
                    </div>
                    <div class="per_SendItemright">
                        <p class="per_username"><span v-text="item.usernameS"></span><span>回复</span><span v-text="item.usernameG"></span></p>
                        <p class="per_reply"><span v-text="item.date"></span><span v-text="item.time"></span>来自:<span v-text="item.comeFrom"></span></p>
                        <p class="per_textInfor" v-text="item.textInfor"></p>
                        <div class="per_articlainfor">
                            <a href="javascript:;" v-text="item.article.title"></a>
                            作者:<span v-text="item.article.author"></span>
                            发布于<span v-text="item.article.update"></span>天前
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="per_interSendPage">
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
// eslint-disable-next-line
import { MyCommentList, calculatetolPage } from '../service/getData'
export default {
    name: 'interPost',
    data: function () {
        return {
            itemList: [],
            Rows: 5,
            currentPage: 1,
            totalPage: 0
        }
    },
    created () {
        this.render()
    },
    mounted: function () {
        this.$emit('seoundRank', '1')
    },
    methods: {
        async render () {
            let msg = await MyCommentList({
                Type: 'All',
                ParentId: 0,
                CommentType: 'FromMe',
                Sort: 'CreateDate',
                Order: 'desc',
                Page: this.currentPage,
                Rows: this.Rows
            })
            console.log(msg)
        }
    }
}
</script>

<style lang="scss">
@import "../style/mixin";
.interSend{
    background: url("../assets/body-bg.png") no-repeat;
    .per_interSendList{
        ul{
            padding: 0 18px;
            li{
                border-bottom:1px dashed #efefef;
                padding-bottom:25px;
                @extend %clearFix;
                .per_SendItemleft{
                    float:left;
                    img{
                        width:54px;
                        height:54px;
                        border-radius: 54px;
                        margin:42px 16px 0 13px;
                    }
                }
                .per_SendItemright{
                    float:left;
                    margin-top:50px;
                    position: relative;
                    .per_username{
                        font-size: 16px;
                        font-weight: bold;
                        margin-bottom:15px;
                        span{
                            &:first-of-type{
                                margin-right: 9px;
                            }
                            &:nth-of-type(2){
                                color:#f00;
                                margin-right: 11px;
                            }
                        }
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
                }
            }
        }
    }
    .per_interSendPage{
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
