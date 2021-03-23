<template>
    <div class="per_myColFouthw">
        <div class="per_bodycenter clearFix">
            <ul>
                <li class="clearFix pull-left" v-for="(item,index) in bookList" :key="index">
                    <div class="per_bookcheckbox pull-left">
                        <img src="../assets/per-checkout.png" @click="checkjugment(index)" v-show="jugement[index] == 0 ? true : false" alt>
                        <img src="../assets/per-check.png" @click="checkjugment(index)" v-show="jugement[index] == 1 ? true : false" alt>
                    </div>
                    <div class="per_bookcontent pull-left clearFix">
                        <img class="pull-left" :src="item.Img" alt="" @click="linkToEbook(item.Id)">
                        <div class="per_bookcontinfor pull-left">
                            <p class="per_bookname" v-text="item.Names" :title="item.Name" @click="linkToEbook(item.Id)"></p>
                            <p class="per_author"><span v-text="item.Author"></span> 著</p>
                            <div class="per_introcontent">
                                <p class="per_introduction" v-text="item.Contents" :title="item.Content"></p>
                            </div>
                            <p class="per_bookmoreinfor"><span v-text='item.ClickCount'></span><span>人浏览</span><span v-text="item.BookTypeName"></span></p>
                        </div>
                    </div>
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
                background 
                layout="prev, pager, next" 
                @current-change="currentchange()"
                :total="totalPage">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import { MyBookFavorite, CollectDelete } from '../service/getData'
export default {
    name: 'personalColEbook',
    data: function () {
        return {
            bookList: [],
            jugement: [],
            checkAll: false,
            currentPage: 1,
            totalPage: 0,
            Rows: 8,
            contentInfor: false
        }
    },
    mounted: function () {
        this.$emit('seoundRank', '3')
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
                for (let i = 0; i < this.jugement.length; i++) {
                    this.jugement.splice(i, 1, 1)
                }
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
        linkToEbook (ebookId) {
            const { href } = this.$router.resolve({ path: '/eBookDetail', query: { id: ebookId, mid: 0 } })
            window.open(href, '_blank')
        },
        async random () {
            let msg = await MyBookFavorite({
                Page: 1,
                Rows: 8
            })
            this.bookList = msg.Data.ListData
            if (this.bookList.length == 0) {
                this.contentInfor = true
            }            
            this.bookList.forEach(item => {
                item.Name = '《' + item.Name + '》'
                if (item.Name.length > 13) {
                    item.Names = item.Name.substr(0, 12) + '...'
                } else {
                    item.Names = item.Name
                }
                if (item.Content.length > 30) {
                    item.Contents = item.Content.substr(0, 29) + '...'
                } else {
                    item.Contents = item.Content
                }
            })
            if (this.bookList.length < 8) {
                this.jugement = []
                for (let i = 0; i < this.bookList.length; i++) {
                    this.jugement.push(0)
                }
            } else {
                this.jugement = []
                for (let i = 0; i < 8; i++) {
                    this.jugement.push(0)
                }
            }
            this.totalPage = this.defineTotalPage(msg, msg.Data.Count)
        },
        async currentchange () {
            let data = await MyBookFavorite({
                Rows: 8,
                Page: this.currentPage
            })
            this.bookList = data.Data.ListData
            if (this.bookList.length < this.Rows) {
                this.jugement = []
                for (let i = 0; i < this.bookList.length; i++) {
                    this.jugement.push(0)
                }
            } else {
                this.jugement = []
                for (let i = 0; i < this.Rows; i++) {
                    this.jugement.push(0)
                }
            }
            this.checkAll = false
            this.$refs.checkall.src = require('../assets/per-checkout.png')
            this.bookList.forEach(item => {
                item.Name = '《' + item.Name + '》'
                if (item.Name.length > 13) {
                    item.Names = item.Name.substr(0, 12) + '...'
                } else {
                    item.Names = item.Name
                }
                if (item.Content.length > 30) {
                    item.Contents = item.Content.substr(0, 29) + '...'
                } else {
                    item.Contents = item.Content
                }
            })
        }, // 翻页功能
        async deleteClass () {
            let delItem = []
            this.jugement.forEach((item, index) => {
                if (item == 1) {
                    delItem.push(this.bookList[index].Id)
                }
            })
            if (delItem.length > 0) {
                let result = await CollectDelete({
                    Type: 'Book',
                    ids: delItem
                })
                if (result.Type == 1) {
                    this.$message({
                        message: '课程删除成功！',
                        type: 'success'
                    })
                    this.random()
                    this.checkAll = false
                    this.$refs.checkall.src = require('../assets/per-checkout.png')
                } else if (result.Type == 0) {
                    this.$message({
                        message: '课程删除失败！',
                        type: 'error'
                    })
                }
            } else {
                this.$message.warning('请选择要取消收藏的电子书')
            }
        }
    }
}
</script>

<style lang="scss">
    .per_myColFouthw{
        padding-top:20px;
        .per_bodycenter{
            ul{
                li{
                    .per_bookcheckbox{
                        height: 197px;
                        width: 51px;
                        position: relative;

                        img{
                            position: absolute;
                            top:50%;
                            margin-top:-7px;
                            right:16px;
                        }
                    }
                    .per_bookcontent{
                        width:392px;
                        box-sizing: border-box;
                        padding:20px 0 20px 21px;

                        img{
                            margin-right:10px;
                            width:105px;
                            height:157px;
                            cursor: pointer;
                        }

                        .per_introcontent{
                            height: 64px;
                            overflow: hidden;
                        }

                        .per_bookcontinfor{
                            width:231px;
                            .per_bookname{
                                font-weight: bold;
                                font-size: 16px;
                                margin-top:8px;
                                cursor: pointer;
                                &:hover{
                                    color:#368474;
                                }
                            }

                            .per_author{
                                color:#888;
                                margin-top: 5px;
                                padding-left: 8px;
                            }

                            .per_introduction{
                                margin-top:12px;
                                padding-left: 8px;
                                line-height: 26px;
                                color:#888;
                            }

                            .per_bookmoreinfor{
                                font-size: 12px;
                                color:#888;
                                margin-top:15px;
                                padding-left: 8px;

                                span{

                                    &:nth-of-type(2){
                                        margin-right:26px;
                                        position: relative;

                                        &:after{
                                            content:'';
                                            width:1px;
                                            height:10px;
                                            background:#888;
                                            position: absolute;
                                            top:4px;
                                            right:-12px;
                                        }
                                    }
                                }
                            }
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
