<template>
    <div class="per_myColSecoundw">
        <div class="per_essayBody">
            <ul>
                <li class="clearFix" v-for="(item, index) in essayList" :key="index">
                    <div class="per_essaycb pull-left">
                        <img src="../assets/per-check.png" alt="" @click="checkjugment(index)" v-show="jugement[index] == 1 ? true : false">
                        <img src="../assets/per-checkout.png" alt="" @click="checkjugment(index)" v-show="jugement[index] == 0 ? true : false">
                    </div>
                    <div class="per_essayctext pull-left">
                        <p class="per_essaylab" v-text="item.NameMin"></p>
                        <div class="per_essaybrevisry">
                            <p v-text="item.DescriptionMin" :title="item.Description"></p>
                        </div>
                        <div class="per_essaywatcher">
                            <span></span> <span v-text="item.ClickCount"></span>
                        </div>
                        <a class="per_formoreinfor" :href="item.linkaddress" @click="linkToEssay(item.Id)">查看详情</a>
                    </div>
                    <errorImg class="per_essayimg" :src="item.Img"></errorImg>
                </li>
            </ul>
            <div class="per_noneinfor" v-if="contentInfor">
                <h1>暂无任何内容</h1>
            </div>
        </div>
        <div class="per_bodyBottom clearFix">
            <div class="pull-left">
                <div class="per_selectall" @click="selectAll()">
                <img src="../assets/per-checkout.png" alt ref="checkall" />
                <span>全选</span>
                </div>
                <button class="per_delete" type="button" @click="deleteClass()">删除</button>
            </div>
            <div class="per_singlepage pull-right">
                <el-pagination 
                 :current-page.sync="currentPage"
                 @current-change="currentChange()"
                 background layout="prev, pager, next" 
                 :total="totalPage"
                ></el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import { EssayCollect, CollectDelete } from '../service/getData'
export default {
    name: 'personalColEssay',
    data: function () {
        return {
            essayList: [],
            checkAll: false,
            currentPage: 1,
            totalPage: 0,
            jugement: [],
            Rows: 6,
            contentInfor: false
        }
    },
    mounted: function () {
        this.$emit('seoundRank', '1')
        this.random()
    },
    methods: {
        checkjugment (index) {
            if (this.jugement[index] == 0) {
                this.jugement.splice(index, 1, 1)
            } else {
                this.jugement.splice(index, 1, 0)
                if (this.checkAll == true) {
                    this.checkAll = false
                    this.$refs.checkall.src = require('../assets/per-checkout.png')
                }
            }
        },
        selectAll () {
            if (this.checkAll == false) {
                this.jugement.forEach((item, index) => {
                    this.jugement.splice(index, 1, 1)
                })
                this.checkAll = true
                this.$refs.checkall.src = require('../assets/per-check.png')
            } else {
                for (let i = 0; i < this.jugement.length; i++) {
                    this.jugement.splice(i, 1, 0)
                }
                this.checkAll = false
                this.$refs.checkall.src = require('../assets/per-checkout.png')
            }
        },
        reduceWords (itemValue, wordLimit) {
            if (itemValue.length > wordLimit) {
                let result = itemValue.substr(0, (wordLimit - 1)) + '...'
                return result
            } else {
                let result = itemValue
                return result
            }
        },
        defineTotalPage (Obj) {
            let Count = Obj.Data.Count ? Obj.Data.Count : 0
            let Rows = 6
            if (Count % Rows != 0) {
                let Page = (((Count - Count % Rows) / Rows) + 1) * 10
                return Page
            } else {
                let Page = (Count / Rows) * 10
                return Page
            }
        },
        defineJuge () {
            let arr = []
            if (this.essayList.length < 6) {
                for (let i = 0; i < this.essayList.length; i++) {
                    arr.push(0)
                }
                return arr
            } else {
                arr = [0, 0, 0, 0, 0, 0]
                return arr
            }
        },
        linkToEssay (essayId) {
            const { href } = this.$router.resolve({ path: '/articleDetail', query: { id: essayId, mid: 0 } })
            window.open(href, '_blank')
        },
        async deleteClass () {
            let delItem = []
            this.jugement.forEach((item, index) => {
                if (item == 1) {
                    delItem.push(this.essayList[index].Id)
                }
            })
            if (delItem.length > 0) {
                let result = await CollectDelete({
                    Type: 'Article',
                    ids: delItem
                })
                if (result.Type == 1) {
                    this.$message({
                        message: '文章删除成功！',
                        type: 'success'
                    })
                    this.random()
                    this.checkAll = false
                    this.$refs.checkall.src = require('../assets/per-checkout.png')
                } else if (result.Type == 0) {
                    this.$message({
                        message: '文章删除失败！',
                        type: 'error'
                    })
                }
            } else {
                this.$message.warning('请选择需要取消收藏的文章')
            }
        },
        async random () {
            let result = await EssayCollect({
                Page: 1,
                Rows: this.Rows
            })
            console.log(result)
            result.Data.ListData.forEach((item) => {
                if (!item.Img) {
                    item.Img = 'noMessage'
                }
            })
            this.essayList = result.Data.ListData
            if (this.essayList.length == 0) {
                this.contentInfor = true
            }
            if (this.essayList.length == 0) {
                this.$message({
                    message: '您还未添加任何一条文章收藏哦！',
                    type: 'warning'
                })
            }
            this.essayList.forEach((item, index) => {
                item.NameMin = this.reduceWords(item.Name, 40)
                item.DescriptionMin = this.reduceWords(item.Description, 83)
            })
            this.jugement = this.defineJuge()
            this.currentPage = 1
            this.totalPage = this.defineTotalPage(result)
        },
        async currentChange () {
            let result = await EssayCollect({
                Page: this.currentPage
            })
            result.Data.ListData.forEach((item) => {
                if (!item.Img) {
                    item.Img = 'noMessage'
                }
            })
            this.essayList = result.Data.ListData
            this.checkAll = false
            this.essayList.forEach((item, index) => {
                item.imgurl = require('../assets/per-reader.png')
                item.NameMin = this.reduceWords(item.Name, 40)
                item.DescriptionMin = this.reduceWords(item.Description, 83)
            })
            this.jugement = this.defineJuge()
        }
    }
}
</script>

<style lang="scss">
    .per_myColSecoundw{
        
        .per_essayBody{
            padding-left:23px;
            ul{
                li{
                    width:860px;
                    height:175px;
                    border-bottom:1px solid #efefef;

                    .per_essaycb{
                        width:50px;
                        height:175px;
                        position: relative;

                        img{
                            position: absolute;
                            top:50%;
                            margin-top:-7px;
                            left:8px;
                        }
                    }

                    .per_essayctext{
                        width:584px;
                        color:#666;
                        position: relative;

                        .per_essaylab{
                            margin-top: 31px;
                            font-weight: bold;
                            font-size: 15px;
                        }

                        .per_essaybrevisry{
                            margin-top: 15px;
                            height:37px;
                        }

                        .per_essaywatcher{
                            margin-top:33px;
                            
                            span{
                                &:first-of-type{
                                    display:inline-block;
                                    margin-right:10px;
                                    height:11px;
                                    width:16px;
                                    background:url("../assets/per-eyes.png") no-repeat;
                                    background-position: 0 1px;
                                }
                                &:nth-of-type(2){
                                    font-size: 12px;
                                    color:#cecece;
                                }
                            }
                        }

                        .per_formoreinfor{
                            width:75px;
                            height:30px;
                            position: absolute;
                            text-align: center;
                            background:#efefef;
                            color:#888;
                            line-height: 30px;
                            border-radius: 3px;
                            bottom:10px;
                            right:8px;
                            cursor:pointer;
                            &:hover{
                                color:#fff;
                                background:#368474;
                            }
                        }
                    }

                    .per_essaybg{
                        margin-top: 30px;
                    }

                    .per_essayimg{
                        margin-top:24px;
                        float:right;
                        width: 180px;
                        .trueImg{
                            width:180px;
                            height:120px;
                        }
                    }
                }
            }
            .per_noneinfor{
                height:300px;
                line-height: 300px;
                text-align: center;
            }
        }
        .per_bodyBottom{
            height:75px;
            line-height: 75px;
            .per_selectall{
                display: inline-block;
                padding-left:31px;
                img{
                    margin-right: 12px;
                }
                span{
                    margin-right: 16px;
                }
            }
            .per_delete{
                border: 0;
                width: 56px;
                height: 28px;
                color: #fff;
                border-radius: 3px;
                background:#368474;
                line-height: 28px;
            }
            .per_singlepage{    
                position: relative;
                top:50%;
                right:35px;
                margin-top:-14px;
                .el-pager {
                    height:28px;
                    li {
                        width:auto;
                    }
                }
            }
        }
    }
</style>
