<template>
<!-- 学习圈分类更多页面 -->
    <div class="studyCircleStage">
         <header-fix :active-index="headerIndex"></header-fix>
         <!-- banner -->
        <div class="banner">
            <img src="../assets/study-circle-banner.png" alt="">
        </div>
        <div class="main clearfix">
            <div class="main-left l">
                <div class="ctop">
                     <p>{{title}}</p>
                </div>
                <div class="content">
                    <ul>
                        <li v-for="item in circleInfoList" :key="item.Id">
                            <div class="tip l">
                                <p class="name">{{item.Name || '暂无'}}</p>
                                <p class="time"><span>{{item.UserName}}</span>{{item.CreateDate|dateFilter('yyyy年MM月dd日')}}创建</p>
                                <div class="data clearfix">
                                    <p><img src="../assets/releases-icon.png" alt="">{{item.ArticleCount}}</p>
                                    <p><img src="../assets/per-eyes.png" alt="">{{item.ClickCount}}</p>
                                </div>
                            </div>
                            <router-link class="link l" :to="{path: '/studyCircleDetail', query: {id: item.Id}}">
                                <no-data-img :src="item.Img" alt=""></no-data-img>
                                <p>进入→</p>
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="main-right r">
                <div class="create">
                    <div class="create-btn" @click="centerDialogVisible = true">
                       <img src="../assets/create-icon.png" alt=""> 创建圈子
                    </div>
                </div>
                <div class="active-circle">
                    <div class="title clearfix">
                        <span class="span1 l"></span>
                        <span class="span2 l">活跃圈子</span>   
                        <span class="span3 l"></span>
                    </div>
                    <div class="detail">
                        <ul class="clearfix">
                            <li v-for="(item, index) in circleHotInfoList" :key="item.Id">
                                <router-link :to="{path: '/studyCircleDetail', query: {id: item.Id}}">
                                    <no-data-img :src="item.Img" alt="" class="img-circle"></no-data-img>
                                    <img src="../assets/sc-NO1.png" alt="" class="rank-num" v-if="index == 0">
                                    <img src="../assets/sc-NO2.png" alt="" class="rank-num" v-if="index == 1">
                                    <img src="../assets/sc-NO3.png" alt="" class="rank-num" v-if="index == 2">
                                </router-link>
                                <p class="circle-name">{{item.Name}}</p>
                                <p class="trend-num">{{item.ArticleCount}}条动态</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <el-dialog
            title="创建圈子"
            width="580px"
            class="mod"
            :visible.sync="centerDialogVisible"
            center
        >
            <div class="create-detail clearfix">
                <div class="text-con l">
                    <div class="list"> 
                        <div class="name">
                            <span>圈子</span>名称
                        </div>
                        <input type="text" placeholder="请为圈子取名" v-model.trim="circleName">
                    </div>
                    <div class="list">
                        <div class="name">
                            <span>圈子</span>说明
                        </div>
                        <textarea name="" id="" placeholder="请为圈子做简单的介绍说明" v-model.trim="circleTip"></textarea>
                    </div>
                </div>
                <div class="upload-cover l">
                    <div class="uc">
                        <input type="file" name="image" ref="attach" accept="image/*" @change='onchangeImgFun($event)'
                        class="header-upload-btn user-header-com">
                        <img alt="" :src='imgSrc' class="user-header-img user-header-com" >
                    </div>
                    <div class="tip">
                        <p>请上传封面</p>
                        <p>(大小限制：134*133)</p>
                    </div>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="getCircleCreate()">创 建</el-button>
                <el-button @click="centerDialogVisible = false">取 消</el-button>
            </span>
        </el-dialog> 
        <footer-fix></footer-fix>
    </div>
</template>

<script>
    import { CircleHotInfoList, CircleInfoList, UploadAttachment, CircleCreate } from '../service/getData'
    import { Message } from 'element-ui'
    export default {
        data () {
            return {
                headerIndex: '10',
                centerDialogVisible: false,
                circleHotInfoList: [],
                TypeId: '',
                circleInfoList: [],
                title: '',
                circleName: '',
                circleTip: '',
                imgSrc: require('../assets/upload-cross.png'),
                imgName: ''
            }
        },
        created () {
            this.TypeId = this.$route.query.id
            this.title = this.$route.query.title
        },
        mounted () {
            this.getCircleHotInfoList()
            this.getCircleInfoList()
        },
        methods: {
            async getCircleHotInfoList () {
                let data = await CircleHotInfoList({
                    "Sort": "Id",
                    "Order": "desc",
                    "Page": 1,
                    "Rows": 4
                })
                if (data.IsSuccess) {
                    this.circleHotInfoList = data.Data.List
                }
            },
            async getCircleInfoList () {
                let data = await CircleInfoList({ TypeId: this.TypeId })
                if (data.IsSuccess) {
                    this.circleInfoList = data.Data.List
                }
            },
            async getCircleCreate () {
                if (!this.circleName) {
                    Message('圈子名称不能为空')
                } else if (!this.circleTip) {
                    Message('圈子说明不能为空')
                } else if (!this.imgSrc) {
                    Message('请上传圈子头像')
                } else {
                    let res = await CircleCreate({
                        Name: this.circleName,
                        Remark: this.circleTip,
                        Img: this.imgName,
                        TypeId: this.TypeId
                    })
                    if (res.IsSuccess) {
                        this.centerDialogVisible = false
                        this.circleName = ''
                        this.circleTip = ''
                        this.imgName = ''
                        this.imgSrc = ''
                        Message('恭喜您,圈子创建成功,正在审核中')
                    }
                }
            },
            async onchangeImgFun (e) {
                var file = e.target.files[0]
                // console.log(file)
                let arr = file.name.split('.')
                let fileType = arr[arr.length - 1]
                let formData = new FormData()
                let fileName = `${+new Date()}.${fileType}`
                this.imgName = fileName
                // console.log(fileName)
                formData.append('FileType', 'ImageCircle')
                formData.append('FileCode', fileName)
                formData.append('FileName', fileName)
                this.imgSrc = window.URL.createObjectURL(file)
                formData.append('file', file, fileName)
                console.log(this.imgSrc)
                // console.log(formData.get('FileCode'))
                let res = await UploadAttachment(formData)
                if (res.IsSuccess) {
                    this.imgSrc = window.URL.createObjectURL(file)
                }
            }
        },
        watch: {

        }
    }
</script>
<style lang="scss" rel="stylesheet/scss">
    @import "../style/mixin";

    .studyCircleStage{
        .banner{
            width: 100%;
            height: 200px;
            img{
                width: 100%;
                height: 200px;
            }
        }
        .main{
            width: 1200px;
            margin: 40px auto 0;
            .main-left{
                width: 800px;
                padding: 20px;
                background: #fff;
                .ctop{
                    @extend %clearFix;
                    p{
                        color: #555;
                        font-weight: bold;
                        font-size: 18px;
                        padding-bottom: 15px;
                        border-bottom: 3px solid#368474;
                        float: left;
                    }
                    border-bottom: 1px solid #e8e8e8;
                }
                .content{
                    ul{
                        li{
                            width: 400px;
                            @extend %clearFix;
                            padding: 25px 0;
                            border-bottom: 1px dashed #e3e3e3;
                            float: left;
                            .tip{
                                width: 205px;
                                margin-left: 28px;
                                .name{
                                    color: #555;
                                    font-weight: bold;
                                    font-size: 16px;
                                }
                                .time{
                                    margin-top: 15px;
                                    color: #999;
                                    span{
                                        color: #f10c00;
                                        margin-right: 10px;
                                    }
                                }
                                .data{
                                    margin-top: 30px;
                                    p{
                                        width: 72px;
                                        height: 32px;
                                        line-height: 32px;
                                        text-align: center;
                                        background: #f6f6f6;
                                        color: #999;
                                        float:left;
                                        border-radius: 5px;
                                        img{
                                            margin-right: 9px;
                                        }
                                        &:nth-child(1){
                                            margin-right: 24px;
                                        }
                                    }
                                }
                            }
                            .link{
                                display: block;
                                width: 134px;
                                height: 133px;
                                position: relative;
                                img{
                                    width: 134px;
                                    height: 133px;
                                    position: absolute;
                                    top: 0;
                                }
                                p{
                                    position: absolute;
                                    right: 0;
                                    bottom: 0;
                                    width: 62px;
                                    text-align: center;
                                    height: 24px;
                                    line-height: 24px;
                                    background:#368474;
                                    color: #fff;
                                    display: none;
                                }
                            }
                            &:hover{
                                background: #f4f4f4;
                                .tip{
                                    .data{
                                        p{
                                            background: #fff;
                                        }
                                    }
                                }
                                .link{
                                    p{
                                        display: block;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            .main-right{
                width: 332px;
                .create{
                    padding: 30px 20px;
                    background: #fff;
                    .create-btn{
                        background:#368474;
                        cursor: pointer;
                        width: 291px;
                        height: 48px;
                        line-height: 48px;
                        color: #fff;
                        text-align: center;
                        border-radius: 5px;
                        font-size: 16px;
                        img{
                            width: 20px;
                            height: 18px;
                            margin-right: 8px;
                        }
                    }
                }
                .active-circle{
                    margin-top: 20px;
                    background: #fff;
                    padding-top: 20px;
                    padding-bottom: 50px;
                    .title{
                        height: 26px;
                        line-height: 26px;
                        .span1{
                            height: 1px;
                            width: 100px;
                            background: #e8e8e8;
                            margin-right: 15px;
                            display: block;
                            margin-top: 13px;
                            margin-left: 10px;
                        }
                        .span2{
                            display: block;
                            font-size: 20px;
                            color: #555;
                            font-weight: bold;
                        }
                        .span3{
                            height: 1px;
                            width: 100px;
                            background: #e8e8e8;
                            margin-left: 15px;
                            display: block;
                            margin-top: 13px;
                        }
                    }
                    .detail{
                        ul{
                        margin-right: -28px;
                            li{
                                width: 135px;
                                margin-top: 40px;
                                margin-right: 28px;
                                float: left;
                                a{
                                    display: block;
                                    position: relative;
                                    width: 135px;
                                    height: 133px;
                                    .img-circle{
                                        position: absolute;
                                        width: 135px;
                                        height: 133px;
                                    }
                                    .rank-num{
                                        position: absolute;
                                        width: 50px;
                                        height: 34px;
                                        top: 0;
                                        right: -15px;
                                    }
                                }
                                .circle-name{
                                    color: #555;
                                    font-weight: bold;
                                    margin-top: 20px;
                                }
                                .trend-num{
                                    color: #999;
                                    margin-top: 10px;
                                }
                                &:nth-child(2n+1){
                                    margin-left: 14px;
                                }
                            }
                        }
                    }
                }
            }
        }
        .mod{
            .el-dialog__header{
                padding: 0;
                height: 48px;
                line-height: 48px;
                background: #368474;
                .el-dialog__title{
                    color: #fff;
                    font-size: 18px;
                }
                button{
                    display: none;
                }
            }
            .el-dialog__body{
                padding: 20px 30px;
                .create-detail{
                    .text-con{
                        width: 360px;
                        .list{
                            .name{
                                font-weight: bold;
                                font-size: 16px;
                                color: #368474;
                                span{
                                    color: #555;
                                }
                            }
                            input{
                                width: 358px;
                                height: 38px;
                                border: 1px solid #e8e8e8;
                                text-indent: 16px;
                                margin-top: 15px;
                                margin-bottom: 20px;
                            }
                            textarea{
                                width: 328px;
                                height: 110px;
                                border: 1px solid #e8e8e8;
                                margin-top: 15px;
                                padding: 15px;
                            }
                        }
                    }
                    .upload-cover{
                        margin-left: 25px;
                        width: 135px;
                        .uc{
                            position: relative;
                            display: inline-block;
                            cursor: pointer;
                            .user-header-com{
                                width: 134px;
                                height: 133px;
                                display: inline-block;
                            }
                            .header-upload-btn{
                                position: absolute;
                                left: 0;
                                top: 0;
                                opacity: 0;
                            }
                        }
                        .tip{
                            margin-top: 15px;
                            text-align: center;
                            p{
                                margin-bottom: 10px;
                            }
                        }
                    }
                }
            }
            .el-dialog__footer{
                padding: 0;
                @extend %clearFix;
                margin-top: 30px;
                padding-bottom: 35px;
                .dialog-footer{
                    float: right;
                    margin-right: 30px;
                    button{
                        width: 96px;
                        height: 36px;
                        border: none;
                        font-size: 16px;
                        font-weight: bold;
                        &:nth-child(1){
                            background: linear-gradient(to right, #57d7fb, #1ba5fa);
                            border-radius: 18px;
                        }
                    }
                }
            }
        }
    }
</style>
