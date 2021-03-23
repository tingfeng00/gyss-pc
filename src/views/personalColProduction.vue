<template>
    <div class="per_myColThirdw">
        <div class="per_productBody">
            <ul class="clearFix">
                <li class="pull-left" v-for="(item, index) in productList" :key="index">
                    <div class="per_productimg per_first_floor">
                        <div class="per_productshadow">
                            <img 
                                class="per_productclick" 
                                src="../assets/per-checkout.png" 
                                title="未选择" 
                                v-show="jugement[index] == 0 ? 1 : 0"
                                @click="checkjugment(index)" 
                                alt
                            >
                            <img 
                                class="per_productclick" 
                                src="../assets/per-check.png" 
                                title="已选择" 
                                v-show="jugement[index] == 1 ? 1 : 0"
                                @click="checkjugment(index)" 
                                alt
                            >
                        </div>
                        <img class="per_mainpic" :src="item.Image" ref="mainpic" @error="mistake(index)" alt @click="openProduct(item.Id)">
                        <div class="per_producttitleinfor">
                            <span class="per_producticon"></span>
                            <span class="per_productnum" v-text="item.EnclosureCount + 1"></span>
                        </div>
                    </div>
                    <div class="per_productimg per_secound_floor"></div>
                    <div class="per_productimg per_third_floor"></div>
                    <p class="per_producttitle"><span v-text="item.ProductionName" @click="openProduct(item.Id)"></span></p>
                    <p class="per_proimginfor"><span>点击量：</span><span v-text="item.ClickCount"></span><span></span><span v-text="item.AssistCount"></span></p>
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
                type="danger" 
                background layout="prev, pager, next" 
                :total="totalPage"
            ></el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import { ProductCollect, CollectDelete } from '../service/getData'
import { calculatetolPage } from '../service/calculatePage'
// import { async } from 'q'
export default {
    name: 'personalColpro',
    data: function () {
        return {
            productList: [],
            checkAll: false,
            jugement: [],
            currentPage: 1,
            totalPage: 0,
            contentInfor: false
        }
    },
    mounted: function () {
        this.$emit('seoundRank', '2')
        this.getwidth()
        this.random()
    },
    methods: {
        getwidth: function () {
            this.productList.forEach((item, index) => {
                var length = item.productname.length
                if (length >= 38) {
                    item.productname = item.productname.slice(0, 37) + '...'
                }
            })
        },
        checkjugment (index) {
            if (this.jugement[index] == 0) {
                this.jugement.splice(index, 1, 1)
            } else if (this.jugement[index] == 1) {
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
        mistake (index) {
            this.$refs.mainpic[index].src = '/images/per-error.png'
        },
        openProduct (index) {
            const { href } = this.$router.resolve({ path: '/onlineDetail', query: { Id: index, Sort: 'Id', Order: 'desc' } })
            window.open(href, '_blank')
        },
        defineJugement () {
            let arr = []
            if (this.productList.length < 9) {
                for (let i = 0; i < this.productList.length; i++) {
                    arr.push(0)
                }
                return arr
            } else {
                arr = [0, 0, 0, 0, 0, 0, 0, 0, 0]
                return arr
            }
        },
        async deleteClass () {
            let delItem = []
            this.jugement.forEach((item, index) => {
                if (item == 1) {
                    delItem.push(this.productList[index].Id)
                }
            })
            if (delItem.length > 0) {
                let result = await CollectDelete({
                    Type: 'Production',
                    ids: delItem
                })
                if (result.Type == 1) {
                    this.$message({
                        message: '展厅取消收藏成功！',
                        type: 'success'
                    })
                    this.random()
                    this.checkAll = false
                    this.$refs.checkall.src = require('../assets/per-checkout.png')
                } else if (result.Type == 0) {
                    this.$message({
                        message: '展厅取消失败！',
                        type: 'error'
                    })
                }
            } else {
                this.$message.warning('请选择需要取消收藏的展厅')
            }
        },
        async random () {
            let data = await ProductCollect({
                Page: 1
            })
            this.productList = data.Data.ListData
            if (this.productList.length == 0) {
                this.contentInfor = true
                this.$message.warning('你还未收藏任何一个展厅。')
            }
            this.totalPage = calculatetolPage(data.Data.Count, 9)
            this.jugement = this.defineJugement()
        },
        async currentChange () {
            let data = await ProductCollect({
                Page: this.currentPage
            })
            this.productList = data.Data.ListData
            this.jugement = this.defineJugement()
        }
    }
}
</script>

<style lang="scss">
    .per_myColThirdw{
        .per_productBody{
            padding-top: 21px;
            ul{
                li{
                    margin-left:20px;
                    margin-bottom:29px;
                    position: relative;
                    width:275px;
                    .per_mainpic{
                        position: absolute;
                        top:0;
                        left:0;
                        width: 262px;
                        height: 158px;
                        z-index: 3;
                        cursor:pointer;
                    }

                    .per_productimg{
                        width:262px;
                        height:158px;
                        position: absolute;
                        background:#fff;                    
                        
                        &:nth-of-type(2){
                            top:4px;
                            left:4px;
                            border:1px solid #cecece;
                            z-index: 2;
                        }

                        &:last-of-type{
                            width:261px;
                            height:157px;
                            top:11px;
                            left:11px;
                            border:1px solid #cecece;
                        }
                        .per_productshadow{
                            position: absolute;
                            top: 0;
                            left: 0;
                            z-index: 5;
                            width: 30px;
                            height: 30px;
                            background: rgba(0,0,0,0.7);
                            text-align: center;
                            &:before{
                                content:'';
                                display: inline-block;
                                height:100%;
                                vertical-align: middle;
                            }
                            .per_productclick{
                                cursor: pointer;
                            }
                        }                        

                        .per_producttitleinfor{
                            width:56px;
                            height:32px;
                            position: absolute;
                            bottom:0px;
                            right:0px;
                            line-height: 32px;
                            background:#4dbe7a;
                            color:#fff;
                            z-index: 4;

                            .per_producticon{
                                position: relative;
                                top:3px;
                                display: inline-block;
                                background:url('../assets/per-producticon.png');
                                width:18px;
                                height:17px;
                                margin-left:6px;
                            }

                            .per_productnum{
                                display: inline-block;
                                text-align: center;
                                width:32px;
                            }
                        }

                    }

                    .per_first_floor{
                        background:#f4f4f4;
                        z-index: 3;
                    }

                    .per_producttitle{
                        margin-top:187px;
                        height:40px;
                        color:#888;
                        span{
                            cursor: pointer;
                            &:hover{
                                color:#368474;
                            }
                        }
                    }
                    .per_proimginfor{
                        span{
                            color:#d1d1d1;

                            &:nth-of-type(3){
                                margin:0 5px 0 60px;
                                display: inline-block;
                                width:18px;
                                height:18px;
                                background:url('../assets/per-fingericon.png');
                                position: relative;
                                top:2px;
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
                cursor: pointer;

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
                cursor: pointer;
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
