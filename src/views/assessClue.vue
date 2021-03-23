<template>
    <div class="assessclue">
        <header-fix :active-index="headerIndex"></header-fix>
        <div class="head clearFix">
            <div class="title">
                线索评估
            </div>
            <a @click="showSuitPopup = true"><img src="../assets/notice-icon.png" alt=""> 评估须知</a>
        </div>
        <section v-if="showClueCon1">
            <div class="clueDetail">
                <ul>
                    <li class="list">
                        <div class="title">
                            所在地区:
                        </div>
                        <div class="text">
                            浙江省/湖州市/安吉县/递铺街道 
                        </div>
                    </li>
                    <li class="list">
                        <div class="title">
                            地址:
                        </div>
                        <div class="text">
                           {{clueDetail.address}}
                        </div>
                    </li>
                    <li class="list">
                        <div class="title">
                            发现时间:
                        </div>
                        <div class="text">
                            {{clueDetail.occurrenceDate | dateFilter('yyyy年MM月dd日')}}
                        </div>
                    </li>
                    <li class="list">
                        <div class="title">
                            涉及单位:
                        </div>
                        <div class="text">
                            -
                        </div>
                    </li>
                    <li class="list">
                        <div class="title">
                            公益损害领域:
                        </div>
                        <div class="text" v-show="clueDetail.industry && clueDetail.subIndustry">
                            {{clueDetail.industry.name}}-{{clueDetail.subIndustry.name}}
                        </div>
                    </li>
                    <li class="list">
                        <div class="title">
                            反映情况描述:
                        </div>
                        <div class="text">
                            我想提供线索，最近我发现我们这边有一家地下作坊，专门生产假冒的药品，请麻烦能核实调查一下。
                            我想提供线索，最近我发现我们这边有一家地下作坊，专门生产假冒的药品，请麻烦能核实调查一下。
                            我想提供线索，最近我发现我们这边有一家地下作坊，专门生产假冒的药品，请麻烦能核实调查一下。
                        </div>
                    </li>
                </ul>
                <div class="pic-list">
                    <div class="pl-list1 clearFix">
                        <div class="imgBox">
                            <img src="../assets/circle-ming1.png" alt="">
                        </div>
                        <div class="time">
                            2020-12-06
                        </div>
                        <div class="desc">
                            无图片信息
                        </div>
                    </div>
                </div>
                <div class="tip">
                    当前线索是否属于检察公益诉讼监督范围 <img src="../assets/ques-mark.png" alt="">
                </div>
            </div>
            <div class="optionArea">
                <el-button class="cerBtn">是</el-button>
                <el-button class="denyBtn">否</el-button>
            </div>
        </section>
        <section v-else>
            <div class="clueList">
                <ul>
                    <li>
                        <div class="hd">
                            <div class="optionName">
                                线索的紧急性
                            </div>
                            <div class="star">
                                <el-rate
                                    v-model="starArr.starVal1"
                                    :colors="colors">
                                </el-rate>
                            </div>
                            <div class="text-con">
                                <p class="text text1">不紧急</p>
                            </div>
                        </div>
                        <div class="bd">
                            国家利益和社会公共利益是否存在重大侵害危险或正在遭
                            受损害，不及时介入将导致实然损害发生或损害持续扩大。
                        </div>
                    </li>
                    <li>
                        <div class="hd">
                            <div class="optionName">
                               公益侵害严重性
                            </div>
                            <div class="star">
                                <el-rate
                                    v-model="starArr.starVal2"
                                    :colors="colors"
                                    >
                                </el-rate>
                            </div>
                            <div class="text-con">
                                <p class="text text1">不严重</p>
                            </div>
                        </div>
                        <div class="bd">
                            国家利益和公共利益受到侵害的范围大小、程度轻重及公益修复难易
                        </div>
                    </li>
                    <li>
                        <div class="hd">
                            <div class="optionName">
                                引发社会的关注度
                            </div>
                            <div class="star">
                                <el-rate
                                    v-model="starArr.starVal3"
                                    :colors="colors">
                                </el-rate>
                            </div>
                            <div class="text-con">
                                <p class="text text1">关注度高</p>
                            </div>
                        </div>
                        <div class="bd">
                            可能或已经成为公众或媒体的舆论焦点，甚至引发舆情风险。
                        </div>
                    </li>
                    <li>
                        <div class="hd">
                            <div class="optionName">
                                线索反映事实的完整度
                            </div>
                            <div class="star">
                                <el-rate
                                    v-model="starArr.starVal4"
                                    :colors="colors">
                                </el-rate>
                            </div>
                            <div class="text-con">
                                <p class="text text1">很完整</p>
                            </div>
                        </div>
                        <div class="bd">
                            线索是否能够完整反映国家利益和社会公共利益遭受侵害的相关事实
                        </div>
                    </li>
                </ul>
                <div class="leaveMessage">
                    <div class="title">
                        评估留言
                    </div>
                    <textarea name="" id="" placeholder="说点什么吧..."></textarea>
                </div>
            </div>
            <div class="service-sel">
                <el-radio 
                    v-model="serviceAgree" 
                    label="具备与本线索相关的专业知识，愿意为本线索后续办理提供咨询、评估等服务"
                    @click.native.prevent="handleRadioChangeSa"
                    >
                    具备与本线索相关的专业知识，愿意为本线索后续办理提供咨询、评估等服务
                </el-radio>
            </div>
            <div class="submit-section">
                <el-button class="submit-btn">
                    提交
                </el-button>
            </div>
        </section>
        <footer-fix></footer-fix>
        <el-dialog :visible.sync="showSuitPopup"  class="suit-popup">
            <suit-notice @readNotice="readNotice" @closePopup="closePopup"></suit-notice>
        </el-dialog>
        
    </div>
</template>

<script>
import { GetClubDetail } from '../service/getData'
export default {
    data () {
        return {
            id: '',
            headerIndex: '0',
            readNoticeVal: '',
            showSuitPopup: false,
            showClueCon1: true,
            starArr: { starVal1: 0, starVal2: 0, starVal3: 0, starVal4: 0 },
            colors: { 3: '#fcc643', 5: '#f26713' },
            serviceAgree: '',
            clueDetail: {}
        }
    },
    created () {
        this.id = this.$route.query.id
    },
    mounted () {
        this.getClubDetail()
    },
    methods: {
      async getClubDetail () {
          let data = await GetClubDetail({ id: this.id })
          if (data.msg == 'OK') {
              this.clueDetail = data.data
          }
      },
      readNotice (val) {
          this.readNoticeVal = val
      },
      closePopup (bol) {
          if (this.readNoticeVal == '') {
              this.$message('请先阅读并了解上述须知')
              return
          } 
          if (bol) {
            //  alert(1) 
          }
          this.showSuitPopup = false
      },
      starChange (val) {
          console.log(val)
      },
      handleRadioChangeSa () {
          this.serviceAgree == '' ? this.serviceAgree = '具备与本线索相关的专业知识，愿意为本线索后续办理提供咨询、评估等服务' : this.serviceAgree = ''
      }
    }
}
</script>

<style lang="scss" rel="stylesheet/scss">
    @import "../style/mixin";
    .assessclue{
        .head{
            width: 1120px;
            margin: 20px auto 0;
            background: #fff;
            padding: 25px 0px 30px 0px;
            .title{
                float: left;
                margin-left: 20px;
                border-left: 7px solid #066cc4;
                height: 30px;
                line-height: 30px;
                text-indent: 35px;
                color: #066cc4;
                font-size: 16px;
                font-weight: bold;
            }
            a{
                float: right;
                margin-right: 20px;
                color: #066cc4;
            }
        }
        .clueDetail{
            width: 1120px;
            margin: 15px auto 0;
            background: #fff;
            padding-bottom: 10px;
            ul{
                margin-left: 60px;
                padding: 30px 0 10px 0;
                li{
                    @extend %clearFix;
                    line-height: 30px;
                    width: 820px;
                    .title{
                        color: #999;
                        font-size: 14px;
                        margin-right: 20px;
                        float: left;
                    }
                    .text{
                        color: #666;
                        float: left;
                        max-width: 700px;
                    }
                }
            }
            .pic-list{
                margin: 20px 0 0 60px;
                width: 820px;
                .pl-list1{
                    .imgBox{
                        border: 1px solid #e5e5e5;
                        width: 48px;
                        height: 48px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        float: left;
                        img{
                            max-width: 48px;
                            height: auto;
                        }
                    }
                    .time{
                        margin-left: 20px;
                        width: 70px;
                        color: #666;
                        font-size: 12px;
                        float: left;
                        line-height: 22px;
                        margin-top: 13px;
                    }
                    .desc{
                        float: left;
                        margin-left: 20px;
                        width: 580px;
                        font-size: 12px;
                        line-height: 22px;
                        margin-top: 13px;
                    }
                }
            }
            .tip{
                height: 40px;
                line-height: 40px;
                color: #fc982c;
                font-size: 16px;
                background: #f7f7f7;
                width: 1100px;
                margin: 20px auto 0;
                text-align: center;
                img{
                    margin-left: 20px;
                }
            }
        }
        .optionArea{
            background: #fff;
            width: 1120px;
            margin: 10px auto 0;
            padding: 20px 0;
            text-align: center;
            .cerBtn{
                width: 140px;
                height: 50px;
                background: #066fc4;
                color: #fff;
                font-size: 18px;
                margin-right: 20px;
            }
            .denyBtn{
                width: 140px;
                height: 50px;
                font-size: 18px;
            }
        }
        .suit-popup{
            
            .el-dialog__header{
                display: none;
            }
            .el-dialog{
                border: 5px solid #dddddd;
                width: 765px;
            }
            .el-dialog__body{
                padding: 0;
            }
        }
        .clueList{
            width: 1120px;
            margin: 15px auto 0;
            background: #fff;
            padding-top: 30px;
            padding-bottom: 10px;
            ul{
                @extend %clearFix;
                li{
                    float: left;
                    width: 50%;
                    padding-left: 50px;
                    margin-bottom: 40px;
                    .hd{
                        display: flex;
                        .optionName{
                            font-size: 16px;
                            color: #333;
                        }
                        .star{
                            margin-left: 10px;
                            .el-rate__icon{
                                font-size: 24px;
                            }
                        }
                    }
                    .bd{
                        margin-top: 10px;
                        font-size: 14px;
                        color: #999;
                        line-height: 28px;
                        width: 365px;
                    }
                }
            }
            .leaveMessage{
                margin: 0px auto 0;
                background: #fff;
                padding-bottom: 10px;
                margin-left: 50px;
                .title{
                    font-size: 16px;
                    font-weight: bold;
                }
                textarea{
                    padding: 20px;
                    margin-top: 20px;
                    width: 610px;
                    height: 80px;
                    border: 1px solid #dddddd;
                }
            }
        }
        .service-sel{
            width: 1120px;
            margin: 2px auto 0;
            background: #fff;
            padding: 30px 0;
            label{
                margin-left: 50px;
            }
        }
        .submit-section{
            background: #fff;
            padding: 20px 0;
            width: 1120px;
            margin: 20px auto 0;
            text-align: center;
            .submit-btn{
                width: 250px;
                height: 50px;
                font-size: 18px;
                color: #fff;
                background: #066fc4;
            }
        }
    }
</style>
