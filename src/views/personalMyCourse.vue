<template>
    <div class="per_myclasstype">
        <!-- <div class="per_typeresearch">
            <ul>
                <li v-for="(item, index) in typeforsearch" :key="index" @click="differType(index,item.Type)">
                    <img :src="item.typeIcon" alt="" v-show="item.itemAction == 0 ? 1 : 0">
                    <img :src="item.typeAction" alt="" v-show="item.itemAction == 1 ? 1 : 0">
                    <span v-text="item.typeName" ref="makeDiffer"></span>
                </li>
            </ul>
        </div> -->
        <div class="per_myclassunfinishbodypart">
          <ul>
            <li class="per_classItem clearFix" v-for="(item,index) in perVideoList" :key="index">
              <div class="per_clscheckbox pull-left">
                <img src="../assets/per-checkout.png" alt @click="checkjugment(index)" v-show="jugement[index] == 0 ? true : false">
                <img src="../assets/per-check.png" alt @click="checkjugment(index)" v-show="jugement[index] == 1 ? true : false">
              </div>
              <div class="pull-left">
                <p class="per_video"><span v-text="item.Name" @click="linkToCourse(item.Id)"></span></p>
                <p class="per_timeandscore">
                  <span class="per_Time">
                    <img src="../assets/per-courseType.png" alt />
                    视频类型：
                    <span v-text="item.Type ? item.Type : '无'"></span>
                  </span>
                  <span class="per_studyscore">
                    <img src="../assets/per-shoucang.png" alt />
                    学分：
                    <span v-text="item.Credit"></span>
                  </span>
                </p>
                <div class="per_progressbox clearFix">
                  <el-progress class="per_progress pull-left" :stroke-width="15" :percentage="item.BrowseScore" :show-text="false"></el-progress>
                  <span class="per_progressinfor pull-left">
                    进度：
                    <span v-text="item.BrowseScore"></span>%
                  </span>
                </div>
                <a class="per_continue" href="javascript:;" v-if="changeorstart[index] == 0" @click="appearPlanBox(0, index)">
                    <span class="per_addplanvideo"></span>
                    添加计划
                </a>
                <a class="per_continue" href="javascript:;" v-else-if="changeorstart[index] == 1" @click="appearPlanBox(1, index)">
                    <span class="per_changeplanvideo"></span>
                    修改计划
                </a>
              </div>
              <div class="per_videoimg pull-right">
                  <img class="per_normalpic" :src="item.Img" alt v-show="item.Img == null ? false : true">
                  <img class="per_errorpic" src="/images/per-error.png" alt v-show="item.Img == null ? true : false">
                  <div class="per_videoimgshedow"  @click="linkToCourse(item.Id)"><span class="per_countinePlay"></span>继续播放</div>
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
                    <img src="../assets/per-checkout.png" alt  ref="checkall"/>
                    <span>全选</span>
                </div>
                <button class="per_delete" type="button" @click="deleteClass()">删除</button>
            </div>
            <div class="per_singlepage pull-right">
                <el-pagination
                    :current-page.sync="currentPage"
                    @current-change="render()"
                    :total="totalPage"
                    type="danger"
                    background
                    layout="prev, pager, next"
                    >
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import { MyCenter, DelUserCourseReg } from '../service/getData'
import { calculatetolPage } from '../service/calculatePage'
import { mapActions } from 'vuex'
export default {
    name: 'courseTypeAll',
    data () {
        return {
            courseType: 1, 
            changeorstart: [],
            perVideoList: [],
            jugement: [],
            checkAll: false,
            currentPage: 1,
            totalPage: 0,
            contentInfor: false
            // typeforsearch: [
            //     {
            //         typeIcon: '/images/per-icongray1.png',
            //         typeAction: '/images/per-iconblue1.png',
            //         typeName: '富媒体课程',
            //         itemAction: 0,
            //         Type: 'RichCourse'
            //     },
            //     {
            //         typeIcon: '/images/per-icongray2.png',
            //         typeAction: '/images/per-iconblue2.png',
            //         typeName: '实景课程',
            //         itemAction: 0,
            //         Type: 'VRCourse'
            //     },
            //     {
            //         typeIcon: '/images/per-icongray3.png',
            //         typeAction: '/images/per-iconblue3.png',
            //         typeName: '单视频课程',
            //         itemAction: 0,
            //         Type: 'SingleCourse'
            //     },
            //     {
            //         typeIcon: '/images/per-icongray4.png',
            //         typeAction: '/images/per-iconblue4.png',
            //         typeName: '音频课程',
            //         itemAction: 0,
            //         Type: 'AudioCourse'
            //     },
            //     {
            //         typeIcon: '/images/per-icongray5.png',
            //         typeAction: '/images/per-iconblue5.png',
            //         typeName: '微课课程',
            //         itemAction: 0,
            //         Type: 'MicroCourse'
            //     },
            //     {
            //         typeIcon: '/images/per-icongray6.png',
            //         typeAction: '/images/per-iconblue6.png',
            //         typeName: '电子书课程',
            //         itemAction: 0,
            //         Type: 'OfficeCourse'
            //     },
            //     {
            //         typeIcon: '/images/per-icongray7.png',
            //         typeAction: '/images/per-iconblue7.png',
            //         typeName: '三分频课程',
            //         itemAction: 0,
            //         Type: 'ThreeScreenCourse'
            //     },
            //     {
            //         typeIcon: '/images/per-icongray8.png',
            //         typeAction: '/images/per-iconblue8.png',
            //         typeName: '图文课程',
            //         itemAction: 0,
            //         Type: 'H5Course'
            //     }
            // ],
        }   
    },
    props: {
        keys: String
    },
    mounted () {
        this.showtype()
        this.render()
    },
    watch: {
        'keys' (news, old) {
            this.render()
        }
    },
    methods: {
        ...mapActions(['setplanchangesappear']),
        showtype () {
            this.$emit('courseType', this.courseType)
        },
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
        appearPlanBox (con, index) {
            let arr = [con, this.perVideoList[index].PlanId, this.perVideoList[index].Id, this.perVideoList[index].Name, this.perVideoList[index].Credit]
            this.setplanchangesappear(arr)
        },
        linkToCourse (courseId) {
            const { href } = this.$router.resolve({ path: '/courseDetail', query: { id: courseId } })
            window.open(href, '_blank')
        },
        async render () {
            let msg = null
            if (this.keys == '') {
                msg = await MyCenter({
                    page: this.currentPage,
                    rows: 5,
                    sort: 'BrowseScore',
                    order: 'desc',
                    courseType: 'Unfinish'
                })
            } else {
                msg = await MyCenter({
                    title: this.keys,
                    page: this.currentPage,
                    rows: 5,
                    sort: 'BrowseScore',
                    order: 'desc',
                    courseType: 'Unfinish'
                })
            }
            this.perVideoList = msg.Data.ListData.UnfinishModel
            if (this.perVideoList.length == 0) {
                this.contentInfor = true
            }
            this.changeorstart = []
            this.perVideoList.forEach((item, index) => {
                let result = item['Credit'].toString()
                let n = result.lastIndexOf('.')
                if (n == -1) {
                    item['Credit'] = item['Credit'] + '.00'
                } else if (n == 1) {
                    item['Credit'] = item['Credit'] + '0'
                }
                item.PlanId == 0 ? this.changeorstart.push(0) : this.changeorstart.push(1)
            })
            if (this.perVideoList.length < 5) {
                this.jugement = []
                for (let i = 0; i < this.perVideoList.length; i++) {
                    this.jugement.push(0)
                }
            } else {
                this.jugement = [0, 0, 0, 0, 0]
            }
            this.totalPage = calculatetolPage(msg.Data.Count, 5)
            this.checkAll = false
        },
        async deleteClass () {
            let delItem = []
            this.jugement.forEach((item, index) => {
                if (item == 1) {
                    delItem.push(this.perVideoList[index].Id)
                }
            })
            if (delItem.length == 0) {
                this.$message({
                    message: '请先选取课程！',
                    type: 'warning'
                })
                return
            }
            if (delItem.length > 0) {
                let backInfor = []
                for (let i = 0; i < delItem.length; i++) {
                    let result = await DelUserCourseReg({
                        courseId: delItem[i]
                    })
                    console.log(result)
                    if (result.Type == 1) {
                        delItem[i] = 1
                    } else if (result.Type == 0) {
                        delItem[i] = 0
                        backInfor.push(this.perVideoList[i].Name)
                    }
                }
                if (backInfor.length == 0) {
                    this.$message({
                        message: '课程删除成功！',
                        type: 'success'
                    })
                    this.currentPage = 1
                    this.render()
                    this.checkAll = false
                    this.$refs.checkall.src = require('../assets/per-checkout.png')
                } else if (backInfor.length > 0) {
                    this.$message({
                        message: '课程删除失败！',
                        type: 'error'
                    })
                }
            }
        }
    }
}
</script>

<style lang="scss">
@import "../style/mixin";
.per_myclasstype{
    // .per_typeresearch{
    //     ul{
    //         @extend %clearFix;
    //         width: 843px;
    //         margin: 0 auto;
    //         margin-top: 23px;
    //         padding-top: 22px;
    //         background: #efefef;
    //         border-radius: 5px;
    //         li{
    //             width: 145px;
    //             margin-left: 65px;
    //             float:left;
    //             margin-bottom: 19px;
    //             cursor:pointer;
    //             img{
    //                 margin-right: 10px;
    //             }
    //         }
    //     }
    // }
    .per_myclassunfinishbodypart{
        ul{
            li{
                width:904px;
                position: relative;
                border-bottom:1px solid #efefef;
                padding-left: 0;
                .per_clscheckbox {
                width: 75px;
                height: 168px;
                line-height: 168px;
                text-align: center;
                line-height: 168px;
                }

                .per_video{
                    margin-top:34px;
                    font-weight: bold;
                    color:#565656;
                    font-size: 16px;
                    span{
                        cursor: pointer;
                        &:hover{
                            color:#368474;
                        }
                    }
                }

                .per_timeandscore{
                    margin-top:18px;
                    font-size: 14px;
                    .per_Time{
                        font-size: inherit;
                        color:#bbb;
                        img{
                            width:14px;
                            position:relative;
                            bottom:2px;
                        }
                    }

                    .per_studyscore{
                        margin-left:39px;
                        font-size: inherit;
                        color:#ff9c07;
                        img{
                            width:14px;
                            position:relative;
                            bottom:2px;
                        }
                    }
                }

                .per_progressbox{
                    margin-top:25px;
                    .per_progress{
                        width:396px;
                        display:inline-block;
                    }
                .per_progressinfor{
                        height:15px;
                        line-height: 15px;
                        font-size: 12px;
                        color:#bbb;
                        margin-left:12px;
                    }
                }

                .per_continue{
                    color:#368474;
                    font-weight:bold;
                    position: absolute;
                    top:110px;
                    right:250px;
                    .per_addplanvideo{
                        display: inline-block;
                        width:18px;
                        height:18px;
                        background: url('../assets/per_shizi1.png');
                        position: relative;
                        top: 4px;
                    }
                    .per_changeplanvideo{
                        display: inline-block;
                        width:16px;
                        height:16px;
                        background: url('../assets/per-changePlan.png');
                        position: relative;
                        top: 4px;
                    }
                    &:first-of-type{
                        &:hover{
                            .per_addplanvideo{
                                background: url('../assets/per_shizi2.png')
                            }
                        }
                    }

                }

                .per_videoimg{
                    margin:24px 30px 0 0;
                    width:180px;
                    height:120px;
                    text-align: center;
                    position: relative;
                    cursor: pointer;
                    &:hover{
                        .per_videoimgshedow{
                            display: block;
                        }
                    }
                    .per_normalpic{
                        height:120px;
                        width:180px;
                    }
                    .per_errorpic{
                        height:120px;
                    }
                    .per_videoimgshedow{
                        display: none;
                        text-align: center;
                        width:180px;
                        height:120px;
                        position: absolute;
                        top:0;
                        left:0;
                        background:rgba(0,0,0,0.4);
                        color:#fff;
                        &:before{
                            content:'';
                            display: inline-block;
                            height:100%;
                            vertical-align: middle;
                        }
                        span{
                            display: inline-block;
                            width:18px;
                            height:18px;
                            background:url('../assets/per-videotoplay.png');
                            position: relative;
                            top:4px;
                            right:8px;
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
