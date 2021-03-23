<template>
  <div class="oli_show">
    <header-fix :active-index="headerIndex"></header-fix>
    <div class="oli_bodytop">
      <img src="../assets/oli-topimg1.jpg" alt />
    </div>
    <div class="oli_bodypart">
      <div class="oli_bodyleftpart">
        <div class="oli_leftparttitle">
          <span class="oli_logo"></span>
          <span>全部分类</span>
        </div>
        <div class="oli_leftpartcontent">
          <el-scrollbar>
            <ul class="oli_typelist">
              <li v-for="(item, index) in allType" :key="index">
                <div class="oli_leftexample">
                  <no-data-img :src="item.Img" alt></no-data-img>
                  <div class="oli_labelname">
                    <div
                      v-text="item.ProductionCategoryName"
                      @click="changeType(item.Id, 'title', index, item)"
                      ref="titles"
                    ></div>
                    <p v-text="item.EngName"></p>
                  </div>
                </div>
                <div class="oli_buttonlist">
                  <ul>
                    <li
                      v-for="(itemson,indexson) in item.ProductionCategory"
                      :key="indexson"
                      :class="{checked: itemson.isClick}"
                      v-text="itemson.ProductionCategoryName"
                      @click="changeType(itemson.Id, 'button', indexson, allType, index)"
                      ref="buttons"
                    ></li>
                  </ul>
                </div>
              </li>
            </ul>
          </el-scrollbar>
        </div>
      </div>
      <div class="oli_bodyrightpart">
        <!-- <div class="oli_bodyrtop" v-show="searchDepart == true ? true : false">
                    <span>作品名称</span>
                    <input class="oli_searchName" type="text" v-model="ProductionName">
                    <span>发布时间</span>
                    <el-date-picker
                        v-model="timer"
                        type="daterange"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        default-value="2019-8-01"
                        >
                    </el-date-picker>
                    <button @click="searchProduction()">搜索</button>
                    <div class="per_close" @click="searchCondition('open')"></div>
                </div>
                <div class="oli_bodyrtop_hidden" v-show="searchDepart == false ? true : false" @click="searchCondition('close')">
                    <span>打开索引</span>
        </div>-->
        <search-key
          :title-name="titleName"
          :search="searchProduction"
          :current-value="ProductionName"
          @getKey="getKeyWord"
          @startDate="getStartDate"
          @endDate="getEndDate"
        ></search-key>
        <div class="oli_rightbodycontent">
          <div class="per_bodytitle">
            全部作品
            <a href="javascript:;" @click="changeOrder('newtype')" ref="news">
              最新
              <span class="oli_yellowdown" v-show="news == 1 ? 1 : 0"></span>
              <span class="oli_graydown" v-show="news == 0 ? 1 : 0"></span>
            </a>
            <a href="javascript:;" @click="changeOrder('hottype')" ref="hot">
              最热
              <span class="oli_yellowdown" v-show="hot == 1 ? 1 : 0"></span>
              <span class="oli_graydown" v-show="hot == 0 ? 1 : 0"></span>
            </a>
          </div>
          <div class="per_bodycontent">
            <ul class="clearFix">
              <li
                class="pull-left"
                v-for="(item, index) in productList"
                :key="index"
                @click="lineto(item.Id)"
              >
                <div class="per_productimg">
                  <error-img2 :src="item.Image" :error-src="Avatar"></error-img2> 
                  <div class="per_producttitleinfor">
                    <span class="per_producticon"></span>
                    <span class="per_productnum" v-text="item.EnclosureCount"></span>
                  </div>
                </div>
                <div class="per_productimg"></div>
                <div class="per_productimg"></div>
                <p class="per_producttitle" v-text="item.ProductionName"></p>
                <p class="per_proimginfor">
                  <span>点击量：</span>
                  <span v-text="item.ClickCount"></span>
                  <span></span>
                  <span v-text="item.AssistCount"></span>
                </p>
              </li>
            </ul>
            <div class="per_nothinginfor" v-if="noContent">暂无数据</div>
          </div>
          <div class="per_bodybottom">
            <div class="per_singlepage">
              <el-pagination
                :current-page.sync="currentPage"
                background
                layout="prev, pager, next"
                @current-change="currentchange()"
                :total="totalPage"
              ></el-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
    <footer-fix></footer-fix>
  </div>
</template>

<script>
import Avatar from '../assets/error-img.png'
import { OnlineShowList, OnlineShowInfor } from "../service/getData"
import { formatDate } from "../plugins/utils"
import { calculatetolPage } from "../service/calculatePage"
export default {
  data: function () {
    return {
      headerIndex: "7",
      allType: [],
      timer: "",
      productList: [],
      currentPage: 1,
      totalPage: 0,
      Rows: 9,
      ProductionCategoryId: "",
      ProductionName: "",
      Order: "desc",
      Sort: "CreateDate",
      hot: 0,
      news: 1,
      searchDepart: true,
      titleName: "作品名称",
      startDate1: "",
      endDate1: "",
      noContent: false,
      Avatar
    }
  },
  created () {
    this.ProductionCategoryId = this.$route.query.id || "0"
  },
  mounted () {
    this.random()
    this.getTypeList()
  },
  methods: {
    searchCondition (type) {
      if (type == "open") {
        this.searchDepart = false
      } else if (type == "close") {
        this.searchDepart = true
      }
    },
    async getTypeList () {
      let typeList = await OnlineShowList({})
      this.allType = typeList.Data.List
      this.allType.forEach(item => {
        item.EngName = item.EngName.toUpperCase()
      })
      let list1 = typeList.Data.List
      this.$nextTick(() => {
        list1.forEach((item, index) => {
          if (this.ProductionCategoryId == item.Id) {
            this.$refs.titles[index].style.color = "#FF9C08"
          }
        })
      })
    },
    async random () {
      let Infor = await OnlineShowInfor({
        ProductionCategoryId: this.ProductionCategoryId,
        ProductionName: this.ProductionName,
        startDate: this.startDate1,
        endDate: this.endDate1,
        Order: this.Order,
        Sort: this.Sort,
        Page: 1
      })
      this.productList = Infor.Data.List
      if (this.productList.length == 0) {
        this.noContent = true
      }
      this.currentPage = 1
      this.totalPage = calculatetolPage(Infor.Data.TotalCount, this.Rows)
      // this.ProductionCategoryId
    },
    async currentchange () {
      let Infor = await OnlineShowInfor({
        ProductionCategoryId: this.ProductionCategoryId,
        ProductionName: this.ProductionName,
        startDate: this.startDate,
        endDate: this.endDate,
        Sort: this.Sort,
        Order: this.Order,
        Page: this.currentPage
      })
      this.productList = Infor.Data.List
    },
    async changeType (index, type, listindex, arr, num) {
      // console.log(index, type, listindex)
      this.$refs.titles.forEach(item => {
        item.style.color = ""
      })
      this.$refs.buttons.forEach(item => {
        item.style.color = ""
        item.style.background = ""
      })
      if (type == "title") {
        this.$refs.titles[listindex].style.color = "#FF9C08"
      }
      if (type == "button") {
        // this.$refs.buttons[listindex].style.color = "#fff"
        // this.$refs.buttons[listindex].style.background = "linear-gradient(to left,#58d7fb,#2cabfa)"
         arr.forEach((item1, n1) => {
           item1.ProductionCategory.forEach((item2, n2) => {
             this.$set(item2, 'isClick', false)
           })
        })
        this.$set(arr[num].ProductionCategory[listindex], 'isClick', true)
        this.allType = arr
      //  arr[num][listindex].style.color = "#fff"
      //  arr[num][listindex].style.background = "linear-gradient(to left,#58d7fb,#2cabfa)"
      }
      this.ProductionCategoryId = index
      this.ProductionName = ""
      this.timer = ""
      this.random()
    },
    async searchProduction () {
      this.ProductionCategoryId = ""
      if (this.timer == null) {
        this.timer = ""
      }
      this.random()
    },
    async changeOrder (condition) {
      if (condition == "newtype") {
        this.$refs.hot.style.color = "#888"
        this.$refs.news.style.color = "#ff9c08"
        this.news = 1
        this.hot = 0
        this.Sort = "CreateDate"
        this.Order = "desc"
      } else if (condition == "hottype") {
        this.$refs.hot.style.color = "#ff9c08"
        this.$refs.news.style.color = "#888"
        this.news = 0
        this.hot = 1
        this.Sort = "ClickCount"
        this.Order = "desc"
      }
      this.random()
    },
    lineto (index) {
      const self = this
      this.$router.push({
        path: "onlinedetail",
        query: { Id: index, Sort: self.Sort, Order: self.Order }
      })
    },
    getEndDate (val) {
      this.endDate1 = formatDate(val, "yyyy-MM-dd")
    },
    getStartDate (val) {
      this.startDate1 = formatDate(val, "yyyy-MM-dd")
    },
    getKeyWord (val) {
      this.ProductionName = val
    }
  }
}
</script>

<style lang="scss">
@import "../style/mixin";
.oli_show{
  background: url("../assets/body-bg.png") no-repeat;
}
.oli_bodytop {
  width: 1200px;
  margin: 0 auto;
  img {
    width: 100%;
  }
}
.oli_bodypart {
  width: 1202px;
  margin: 28px auto;
  @extend %clearFix;

  .oli_bodyleftpart {
    @extend %pull-left;
    @extend %clearFix;
    width: 276px;
    background: #fff;
    .oli_leftparttitle {
      height: 72px;
      background: #368474;
      font-size: 24px;
      color: #fff;
      box-sizing: border-box;
      .oli_logo {
        width: 31px;
        height: 25px;
        background: url("../assets/oli-books.png");
        margin-left: 25px;
        margin-top: 21px;
      }
      span {
        @extend %pull-left;
        &:nth-child(2) {
          margin-top: 17px;
          margin-left: 7px;
        }
      }
    }
    .oli_leftpartcontent {
      background: #fff;
      margin: 28px 0 47px 21px;
      width: 241px;
      height: 782px;
      overflow: auto;
      .el-scrollbar {
        height: 100%;
      }
      .el-scrollbar__wrap {
        overflow-x: hidden;
      }
      .el-scrollbar__thumb {
        background: #368474;
        width: 4px;
        border-radius: 0;
      }
      .is-horizontal {
        display: none;
      }
      .is-vertical {
        width: 4px;
        border-radius: 0;
        background: #efefef;
        opacity: 1;
      }
      .oli_typelist {
        li {
          padding: 28px 0 0 0;
          &:first-child {
            padding: 0;
          }
          .oli_leftexample {
            @extend %clearFix;
            img {
              width: 70px;
              height: 64px;
              border-radius: 3px;
              @extend %pull-left;
            }
            .oli_labelname {
              padding-left: 11px;
              float: left;
              div {
                margin-top: 13px;
                font-weight: bold;
                color: #368474;
                cursor: pointer;
              }
              p {
                width: 150px;
                font-size: 12px;
                color: #ccc;
              }
            }
          }
          .oli_buttonlist {
            ul {
              @extend %clearFix;
              li {
                @extend %pull-left;
                width: 106px;
                height: 32px;
                border-radius: 3px;
                padding: 0;
                text-align: center;
                line-height: 32px;
                background: #efefef;
                margin-right: 9px;
                margin-top: 9px;
                cursor: pointer;
                &:hover {
                  // background: #58d7fb;
                  background: linear-gradient(to left, #4dbe7a, #25adca);
                  color: #fff;
                }
                &.checked{
                  background: linear-gradient(to left, #4dbe7a, #25adca);
                  color: #fff;
                }
              }
            }
          }
          
        }
      }
    }
  }

  .oli_bodyrightpart {
    @extend %pull-left;
    margin-left: 21px;
    .per_bodytitle {
      padding-left: 19px;
      border-bottom: 2px solid #efefef;
      height: 66px;
      font-size: 20px;
      font-weight: bold;
      line-height: 66px;
      display: block;
      color: #888;
      a {
        font-size: 12px;
        color: #888;
        margin-left: 37px;
        font-weight: normal;
        &:first-of-type {
          color: #ff9c08;
        }
        .oli_yellowdown {
          display: inline-block;
          width: 6px;
          height: 11px;
          margin-left: 5px;
          background: url("../assets/oli-todown1.png");
          position: relative;
          top: 1px;
        }
        .oli_graydown {
          display: inline-block;
          width: 6px;
          height: 11px;
          margin-left: 5px;
          background: url("../assets/oli-todown2.png");
          position: relative;
          top: 1px;
        }
      }
    }
    .oli_bodyrtop {
      width: 905px;
      height: 78px;
      background: #fff;
      padding-left: 33px;
      box-sizing: border-box;
      color: #666;
      position: relative;
      &:before {
        content: "";
        display: inline-block;
        vertical-align: middle;
        height: 100%;
      }
      .oli_searchName {
        width: 220px;
        border: 1px solid #cecece;
        border-radius: 3px;
        margin: 0 45px 0 7px;
        height: 30px;
        padding: 0 10px;
      }
      .el-date-editor {
        margin-left: 7px;
        height: 32px;
        padding: 0 10px;
        border: 1px solid #cecece;
      }
      button {
        margin-left: 10px;
        border: 0;
        height: 32px;
        width: 62px;
        border-radius: 3px;
        background: #58d7fb;
        background: linear-gradient(to left, #58d7fb, #2cabfa);
        color: #fff;
        cursor: pointer;
      }
      .per_close {
        height: 24px;
        width: 24px;
        position: absolute;
        background: url("../assets/oli-close.png");
        top: -7px;
        right: -7px;
        cursor: pointer;
      }
    }

    .oli_bodyrtop_hidden {
      margin-top: 40px;
      width: 100%;
      height: 30px;
      line-height: 30px;
      background: url("../assets/key-hide-bg.png") no-repeat;
      box-sizing: border-box;
      position: relative;
      span {
        position: absolute;
        top: 4px;
        right: 6px;
        width: 86px;
        height: 22px;
        border-radius: 2px;
        line-height: 22px;
        text-align: center;
        background: linear-gradient(to left, #58d7fb, #2cabfa);
        color: #fff;
        cursor: pointer;
      }
    }
    .oli_rightbodycontent {
      margin-top: 20px;
      background: #fff;
      width: 905px;
      .per_bodycontent {
        padding-top: 21px;
        border-bottom: 2px solid #efefef;
        ul {
          li {
            margin-left: 20px;
            margin-bottom: 29px;
            position: relative;
            width: 275px;

            .per_productimg {
              width: 262px;
              height: 158px;
              position: absolute;
              background: #fff;
              border: 1px solid #cecece;

              img {
                width: 262px;
                height: 158px;
                vertical-align: middle;
              }

              .per_productclick {
                position: absolute;
                top: 9px;
                left: 11px;
              }

              &:first-of-type {
                z-index: 3;
              }

              &:nth-of-type(2) {
                width: 261px;
                height: 157px;
                top: 5px;
                left: 6px;
                border: 1px solid #cecece;
                z-index: 2;
              }

              &:last-of-type {
                width: 261px;
                height: 157px;
                top: 10px;
                left: 12px;
                border: 1px solid #cecece;
              }

              .per_producttitleinfor {
                width: 56px;
                height: 32px;
                position: absolute;
                bottom: 0;
                right: 0;
                line-height: 32px;
                background: #4dbe7b;
                color: #fff;
                .per_producticon {
                  position: relative;
                  top: 3px;
                  display: inline-block;
                  background: url("../assets/per-producticon.png");
                  width: 18px;
                  height: 17px;
                  margin-left: 6px;
                }

                .per_productnum {
                  display: inline-block;
                  text-align: center;
                  width: 32px;
                }
              }
            }

            .per_producttitle {
              margin-top: 187px;
              height: 40px;
              color: #888;
            }
            .per_proimginfor {
              span {
                color: #d1d1d1;

                &:nth-of-type(3) {
                  margin: 0 5px 0 60px;
                  display: inline-block;
                  width: 18px;
                  height: 18px;
                  background: url("../assets/per-fingericon.png");
                  position: relative;
                  top: 2px;
                }
              }
            }
          }
        }
        .per_nothinginfor {
          height: 80px;
          padding-top: 15px;
          text-align: center;
          font-size: 18px;
          box-sizing: border-box;
        }
      }
      .per_bodybottom {
        height: 78px;
        text-align: center;
        &:before {
          content: "";
          display: inline-block;
          vertical-align: middle;
          height: 100%;
        }
        .per_singlepage {
          display: inline-block;
          .el-pagination.is-background{
            .el-pager{
              li{
                &.active{
                  background: #368474!important;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
