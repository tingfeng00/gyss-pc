<template>
  <div class="per_coursePlan">
    <div class="per_bodytitle">课程计划</div>
    <div class="per_bodycontent">
      <div class="per_myPlanClass">
        <ul>
          <li class="per_classItem clearFix" v-for="(item,index) in perVideoList" :key="index">
            <div class="per_clscheckbox pull-left">
              <img
                src="../assets/per-checkout.png"
                @click="checkjugment(index)"
                v-show="jugement[index] == 0 ? true : false"
                alt
              />
              <img
                src="../assets/per-check.png"
                @click="checkjugment(index)"
                v-show="jugement[index] == 1 ? true : false"
                alt
              />
            </div>
            <div class="pull-left per_middlepart">
              <p class="per_video"><span v-text="item.CourseName" :title="item.Name" @click="linkToCourse(item.Id)"></span></p>
              <p class="per_timeandscore">
                <span class="per_Time">
                  计划开始时间：
                  <span v-text="item.RemindDate"></span>
                </span>
                <span class="per_studyscore">
                  计划完成时间：
                  <span >{{item.PlanFinishDate | dateFilter('yyyy-MM-dd')}}</span>
                </span>
              </p>
              <div class="per_progressbox clearFix">
                <el-progress
                  class="per_progress pull-left"
                  :stroke-width="15"
                  :percentage="item.BrowseScore"
                  :show-text="false"
                ></el-progress>
                <span class="per_progressinfor pull-left">
                  进度：
                  <span v-text="item.BrowseScore"></span>%
                </span>
              </div>
              <div class="per_changebutton" @click="appearPlanBox(1, index)"><span class="per_changePlan"></span>修改计划</div>
            </div>
            <div  class="per_colcourseimgbox">
              <img class="per_normalpic" :src="item.CourseImg" alt v-show="item.CourseImg == null ? false : true">
              <img class="per_errorpic" src="/images/per-error.png" alt v-show="item.CourseImg == null ? true : false">
              <div class="per_videoimgshedow" @click="linkToCourse(item.Id)"><span class="per_countinePlay"></span>播放</div>
            </div>
          </li>
        </ul>
        <div class="per_noneinfor" v-if="contentInfor">
            <h1>暂无任何内容</h1>
        </div>
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
          @current-change="render()"
          :total="totalPage"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { MyStudyPlan, DelStudyPlan } from '../service/getData'
import { calculatetolPage } from '../service/calculatePage'
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      perVideoList: [],
      jugement: [],
      totalPage: 0,
      currentPage: 1,
      checkAll: false,
      contentInfor: false
    }
  },
  mounted () {
      this.$emit('getchildvalue', '1')
      this.render()
  },
  methods: {
    ...mapActions(['setplanchangesappear']),
    mistake (index) {
        this.$refs.coursepic[index].src = '/images/per-error.png'
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
        let arr = [con, this.perVideoList[index].Id, this.perVideoList[index].CourseId, this.perVideoList[index].CourseName, this.perVideoList[index].Credit]
        this.setplanchangesappear(arr)
    },
    linkToCourse (courseId) {
        const { href } = this.$router.resolve({ path: '/courseDetail', query: { id: courseId } })
        window.open(href, '_blank')
    },
    async render () {
      let msg = await MyStudyPlan({
        Page: this.currentPage,
        Rows: 5,
        sort: 'Id',
        order: 'desc'
      })
      this.perVideoList = msg.Data.Data.ListData
      if (this.perVideoList.length == 0) {
        this.$message.warning('您还未添加任何一条学习计划')
        this.contentInfor = true
      }
      if (this.perVideoList.length < 5) {
        this.jugement = []
        for (let i = 0; i < this.perVideoList.length; i++) {
            this.jugement.push(0)
        }
      } else {
          this.jugement = [0, 0, 0, 0, 0]
      }
      this.perVideoList.forEach((item, index) => {
        let result = item['Credit'].toString()
        let n = result.lastIndexOf('.')
        if (n == -1) {
            item['Credit'] = item['Credit'] + '.00'
        } else if (n == 1) {
            item['Credit'] = item['Credit'] + '0'
        }
      })
      this.totalPage = calculatetolPage(msg.Data.Data.Count, 5)
    },
    async deleteClass () {
      let delItem = []
      this.jugement.forEach((item, index) => {
          if (item == 1) {
              delItem.push(this.perVideoList[index].Id)
          }
      })
      if (delItem.length > 0) {
        let backInfor = []
        for (let i = 0; i < delItem.length; i++) {
            let result = await DelStudyPlan({
                id: delItem[i]
            })
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
      } else {
        this.$message.warning('请先选取课程！')
      }
    }    
  }
}

</script>

<style lang="scss">
@import "../style/mixin";
.per_coursePlan {
  .per_bodytitle {
    height: 66px;
    border-bottom: 1px solid #efefef;
    line-height: 66px;
    font-size: 20px;
    font-weight: bold;
    color: #555;
    padding-left: 19px;
  }
  .per_bodycontent {
    .per_myPlanClass {
      ul {
        li {
          width: 904px;
          position: relative;
          border-bottom: 1px solid #efefef;
          .per_clscheckbox {
            width: 75px;
            height: 168px;
            line-height: 168px;
            text-align: center;
            line-height: 168px;
          }

          .per_middlepart {
              position: relative;
          }

          .per_video {
            margin-top: 34px;
            font-weight: bold;
            color: #565656;
            font-size: 16px;
            span{
              cursor: pointer;
              &:hover{
                color:#368474;
              }
            }
          }

          .per_timeandscore {
            margin-top: 18px;
            font-size: 14px;
            .per_Time {
              font-size: inherit;
              color: #bbb;

              img {
                width: 14px;
                position: relative;
                bottom: 2px;
              }
            }

            .per_studyscore {
              margin-left: 39px;
              font-size: inherit;
              color: #ff9c07;
              img {
                width: 14px;
                position: relative;
                bottom: 2px;
              }
            }
          }

          .per_progressbox {
            margin-top: 25px;
            .per_progress {
              width: 396px;
              display: inline-block;
            }

            .per_progressinfor {
              height: 15px;
              line-height: 15px;
              font-size: 12px;
              color: #bbb;
              margin-left: 12px;
            }
          }
          .per_changePlan{
              width:16px;
              height:16px;
              display: inline-block;
              background: url('../assets/per-changePlan.png');
              margin-right:8px;
              position: relative;
              top:3px;
          }
          .per_changebutton{
            color: #368474;
            position: absolute;
            right:-100px;
            bottom:0;
            cursor: pointer;
          }

          .per_colcourseimgbox{
            margin:24px 30px 0 0;
            float: right;
            width:180px;
            height:120px;
            text-align: center;
            position: relative;
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
              cursor: pointer;
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
                cursor: pointer;
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
  }
  .per_bodyBottom {
    height: 75px;
    line-height: 75px;

    .per_selectall {
      display: inline-block;
      padding-left: 31px;

      img {
        margin-right: 12px;
      }
      span {
        margin-right: 16px;
      }
    }
    .per_delete {
      border: 0;
      width: 56px;
      height: 28px;
      color: #fff;
      border-radius: 3px;
      background:#368474;
      line-height: 28px;
    }
    .per_singlepage {
      position: relative;
      top: 50%;
      right: 35px;
      margin-top: -14px;

      .el-pager {
        height: 28px;
        li {
          width: auto;
        }
      }
    }
  }
}
</style>
