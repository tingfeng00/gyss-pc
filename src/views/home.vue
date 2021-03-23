<template>
    <div class="home_index">
      <section class="home_header ">
        <div class="content clearfix">
          <div class="logo">
            <img src="../assets/icon-jyzx-logo.png" alt="">
          </div>
          <div class="area">
            <img src="../assets/zuobiao.png" alt="">杭州市西湖区
          </div>
          <div class="header_nav">
            <ul class="clearfix">
              <li class="active"><router-link to="/home">首页</router-link> </li>
              <li><router-link to="/coursecenter">案件公布</router-link></li>
              <li><router-link to="/coursecenter">数据查询</router-link></li>
              <li><router-link to="/coursecenter">知识课堂</router-link></li>
            </ul>
          </div>
          <div class="header_search clearfix">
            <input type="text" placeholder="关键词">
            <p>
              <img src="../assets/ic-search.png" alt="">
            </p>
          </div>
        </div>
      </section>
      <section class="link-personal">
        <div class="lp-content clearfix">
           <div class="link">
          <ul class="clearfix">
            <li>
              <router-link to="/coursecenter">
                <p>线索提报</p>
              </router-link>
              </li>
            <li>
              <router-link to="/coursecenter">
                <p>线索评估</p>
              </router-link>
            </li>
            <li>
              <router-link to="/coursecenter">
                <p>知识测试</p>
              </router-link>
            </li>
            <li>
              <router-link to="/coursecenter">
                <p>积分商城</p>
              </router-link>
            </li>
          </ul>
          </div>
          <div class="personal">
            <div class="logined" v-if="userInfo.Model.Account">
              <div class="hd">
                <error-img2 :src="userInfo.Model.UserImage" :error-src="Avatar"></error-img2>
                <p>注销</p>
              </div>
              <div class="bd">
                <p class="name">{{userInfo.Model.Account}}, 欢迎您</p>
                <p class="credit"><span>{{userInfo.Model.SumCredit}}</span>积分</p>
                <router-link to="/personalCenter" class="perLink">个人中心</router-link>
              </div>
            </div>
            <div class="logining" v-else>
              <div class="hd">
                <error-img2 :error-src="Avatar"></error-img2>
              </div>
              <div class="bd">
                <p class="name">游客, 您好</p>
                <div class="tip">
                  <router-link to="/login" class="perLink">请登录</router-link>/<router-link to="/register" class="perLink">注册</router-link>
                </div>
                
              </div>
            </div>
          </div>
        </div>
        
      </section>
      <!-- 新闻 -->
      <section class="news">
        <div class="news-title clearfix">
          <p>新闻推荐</p>
          <router-link to="/newsCenter"> 更多新闻 <img src="../assets/icon-more.png" alt=""></router-link>
        </div>
        <div class="news-wrapper clearfix" v-if="articleList.length > 0">
          <div class="news-lb l" style="height: 270px">
            <img :src="articleList[0].Img" alt="">
          </div>
          <div class="news-con l">
            <div class="firstList">
              <div class="title">
               {{articleList[0].Name}}
              </div>
              <div class="text">
                {{articleList[0].Description | wordLimit(126)}}
              </div>
            </div>
            <ul>
              <li class="clearfix" v-for="item in articleList.slice(1,4)" :key="item.Id">
                <a href="">{{item.Name}}</a>
                <span>{{item.CreateDate | dateFilter2('yyyy-MM-dd')}}</span>
              </li>
             
            </ul>
          </div>
        </div>
        
      </section>
      <div class="bannerAd">
        <img src="../assets/image-banner-zxgg.png" alt="">
      </div>
      <section class="volunter">
        <div class="title">
         <p>志愿者风采</p> 
        </div>
        <div class="vol-lb">
          <swiper :options="swiperOptionCu">
            <swiper-slide v-for="(item, index) in volList" :key="index">
              <router-link class="pic" :to="{path: 'onlineDetail', query:{Id: item.Id, Sort: 'CreateDate', Order: 'desc'}}">
								<error-img2 :src="item.Img"></error-img2>
              </router-link>
              <div class="text">
                <p class="name">{{item.Source}}</p>
                <p class="num">{{item.Name}}</p>
              </div>
            </swiper-slide>
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
          </swiper>
        </div>
      </section>
      <!-- 典型案例 -->
      <section class="cases">
        <div class="cases-title clearfix">
          <p>典型案例</p>
          <a href="">更多案例 <img src="../assets/icon-more.png" alt=""></a>
        </div>
        <div class="cases-con">
          <ul>
            <li v-for="(item, index) in articleList2" :key="item.Id">
              <div class="num" 
                :class="{
                  num0: index == 0,
                  num1: index == 1,
                  num2: index == 2,
                  num3: index == 3,
                }"
              >
              </div>
              <div class="text">
                <div class="title">
                  {{item.Name}}
                </div>
                <div class="desc">
                  {{item.Description || '暂无描述'}}
                </div>
                <div class="court-time clearfix">
                  <div class="court l">
                    {{item.Author}}
                  </div>
                  <div class="time r">
                    {{item.CreateDate | dateFilter2('yyyy-MM-dd')}}
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </section>
      <!-- 课程中心 -->
      <section class="course-center clearfix">
        <div class="cc-cate ">
          <div class="title">
            <p>知识课堂</p>
          </div>
          <div class="list">
            <ul>
              <!-- channelCategoryData -->
              <li v-for="(item, index) in channelCategoryData" 
                  :key="index" 
                  @click="getCourseList(item.id, index)"
                  :class="{active:item.isChoose}"
               >
                {{item.text}}
              </li>
            </ul>
          </div>
          <div class="more">
            <router-link to="/courseCenter">更多知识<img src="../assets/icon-more.png" alt=""></router-link> 
          </div>
        </div>
        <div class="cc-con">
          <ul class="clearfix" v-if="courseList.length > 0">
            <li v-for="item in courseList" :key="item.Id">
              <div class="cc-con-pic">
                <router-link :to="{ path: '/courseDetail', query: {id: item.Id}}">
                  <error-img :src="item.Img" class="pic"></error-img>
                </router-link>
              </div>
              <div class="cc-con-title1 clearfix">
                {{item.Name}}
              </div>
              <div class="cc-con-title2 clearfix">
                {{item.Teacher}}
              </div>
            </li>
          </ul>
          <div class="noData" v-else>
            <p>暂无数据</p>
          </div>
        </div>
      </section>
  
      <footer-fix></footer-fix>
    </div>
</template>

<script>
  import Vue from 'vue'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import Avatar from '../assets/image-my-avatar-default.png'
  import Avatar2 from '../assets/noDataPic.png'
  import { 
   ArticleList, 
   ArticleContent, 
   CourseList2,
   LeftRealTimeData,
   StudentStyle,
   CourseCategory
   } from '../service/getData'
import { mapActions, mapState } from 'vuex'
  Vue.use(swiper)
  Vue.use(swiperSlide)
  export default {
    data () {
        return {
          Avatar,
          Avatar2,
          headerIndex: '1',
          showList: true,
          localList: false,
          volList: [], // 志愿者风采
          courseList: [], // 课程中心列表
          channelCategoryData: [], // 课程中心频道列表
          articleList: [], // 新闻推荐列表
          articleList2: [], // 典型案例列表
           swiperOptionCu: {
            slidesPerView: 4,
            spaceBetween: 20,
            centeredSlides: false,
            loop: true,
            autoplay: {
              delay: 4000,
              disableOnInteraction: false
              // stopOnLastSlide: false
            },
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev'
            }
          }
      }
    },
    created () {
      this.getUserInformation()
      console.log(this.userInfo)
    },
    computed: {
        ...mapState(['userAgent', 'userInfo'])
    },
    mounted () {
      this.getArticleList()
      this.getArticleList2()
      this.getStudentStyle()
      this.getCourseCategory()
    },
    methods: {
     ...mapActions(['getUserInformation', 'saveUserInfo']),
      async articleContent () {
        let data = await ArticleContent({ CategoryId: '0' })
        if (data.IsSuccess) {
          // console.log(1)
        }
      },
      // 新闻推荐
      async getArticleList () {
        let data = await ArticleList({ categoryId: '1125', page: 1, rows: 4, order: 'desc', sort: 'Sort', wordLimt: 20 })
        if (data.Status == 200) {
          this.articleList = data.Data.ListData
        }
      },
      // 典型案例
      async getArticleList2 () {
        let data = await ArticleList({ categoryId: '1126', page: 1, rows: 4, order: 'desc', sort: 'Sort', wordLimt: 20 })
        if (data.Status == 200) {
          this.articleList2 = data.Data.ListData
        }
      },
      async getCourseCategory () {
        let data = await CourseCategory({ 
          titleNav: '',
          sort: 'Sort',
          order: 'Desc',
          page: 1, 
          rows: 6 
          })
        // 
        let array = [{
          SunFlag: false,
          children: null,
          id: 349,
          state: "open",
          text: "全部"
        }]
        let list1 = array.concat(data.Data.ListData) 
        list1.forEach((item, index) => {
          item.isChoose = false
          return item
        })
        list1[0].isChoose = true
        this.channelCategoryData = list1
        this.getCourseList(this.channelCategoryData[0].id, 0)
      },
      async getCourseList (id, index) {
        this.channelCategoryData.forEach((item, index) => {
          item.isChoose = false
          // return item
        })
        this.channelCategoryData[index].isChoose = true
        let data = await CourseList2({ 
          page: 1, 
          rows: 8, 
          sort: 'Sort', 
          order: 'desc', 
          flag: 'All',
          courseType: 'All', 
          wordLimt: '35', 
          title: '', 
          channelId: id 
        })
        this.courseList = data.Data.ListData || []
      },
      // 实时数据
      async getRealData () {
        let data = await LeftRealTimeData()
        this.realData = data.Data.Model
      },
      // 志愿者风采
      async getStudentStyle () {
        let data = await StudentStyle({ page: 1, rows: 8, sort: 'Sort', order: 'desc', titleNav: '' })
        if (data.Status == 200) {
          this.volList = data.Data.ListData
        }
      },
      goDetail (url) {
        // this.$router.push({ path: '/articleDetail', query: { id: id } })
        window.location.href = url
      }

    },
    watch: {
      shareAddress: {
        handler: function (val) {
          if (val) {
            let regUrl = /^(?=^.{3,255}$)(http(s)?:\/\/)?(www\.)?[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+(:\d+)*(\/\w+\.\w+)*$/ 
            this.urlConfirm = regUrl.test(val)
          } else {
            this.urlConfirm = false
          }
        }
      },
      shareContent: {
        handler: function (val) {
          if (val.length >= 30 && val.length <= 50) {
            this.shareContentConfirm = true
          } else {
            this.shareContentConfirm = false
          }
        }
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
    @import "../style/mixin";

    .home_index{
      width: 100%;
      background: #f7f7f7;
      .home_header{
        height: 445px;
        background: url("../assets/img-homepage-bg.png") no-repeat;
        background-size:100% 445px;
        .content{
          width: 1200px;
          margin: 0 auto;
        }
        .logo{
          float: left;
          margin-top: 30px;
        }
        .area{
          float: left;
          margin-top: 44px;
          margin-left: 50px;
          width: 200px;
          color: #fff;
          img{
            width: 14px;
            height: 17px;
            margin-right: 10px;
          }
        }
        .header_nav{
          float: left;
          ul{
            li{
              float: left;
              a{
                color: #d6e3ff;
                font-size: 18px;
                display: block;
                width: 99px;
                height: 90px;
                line-height: 99px;
                text-align: center;
              }
              &.active{
                a{
                  background: url("..//assets/nav_selected.png") no-repeat;
                  color: #fff;
                  font-weight: bold;
                }
              }
            }
          }
        }
        .header_search{
          float: right;
          width: 210px;
          height: 36px;
          background:transparent;
          margin-top: 30px;
          border: 1px solid #FFFFFF;
          // opacity: 0.3;
          border-radius: 18px;
          p{
            float: left;
            width: 42px;
            height: 36px;
            border-radius: 0 18px 18px 0;
            text-align: center;
            line-height: 36px;
            cursor: pointer;
            img{
              width: 21px;
              height: 21px;
            }
          }
          input{
            float: left;
            background: #fff;
            height: 36px;
            width: 168px;
            border-radius: 14px 0 0 14px;
            text-indent: 15px;
            &::-webkit-textarea-placeholder{
                text-align: center;
            }
            &:-moz-placeholder{
                text-align: center;
            }
            &::-moz-placeholder{
                text-align: center;
            }
            &:-ms-textarea-placeholder{
                text-align: center;
            }
            &:focus + p{
              background: #066fc4;
            }
          }
        }
      }
      .link-personal{
        width: 100%;
        background: #fff;
        padding: 50px 0;
        .lp-content{
          width: 1180px;
          margin: 0px auto 0;
        }
        .link{
          float: left;
          ul{
            li{
              margin: 0 60px;
              float: left;
              width: 115px;
              height: 125px;
              cursor: pointer;
              &:hover{
                a{
                  p{
                    background: url("../assets/image-homepage-menu-bg.png") no-repeat;
                    color: #fff;
                  }
                }
              }
              &:nth-child(1){
                margin-left: 0;
                background: url("../assets/icon-homepage-xstb-nor.png") no-repeat center top;
                &:hover{
                  background: url("../assets/icon-homepage-xstb-click.png") no-repeat center top;
                }
              }
              &:nth-child(2){
                background: url("../assets/icon-homepage-xspg-nor.png") no-repeat center top;
                &:hover{
                  background: url("../assets/icon-homepage-xspg-click.png") no-repeat center top;
                }
              }
              &:nth-child(3){
                background: url("../assets/icon-homepage-zscs-nor.png") no-repeat center top;
                &:hover{
                  background: url("../assets/icon-homepage-zscs-click.png") no-repeat center top;
                }
              }
              &:nth-child(4){
                background: url("../assets/icon-homepage-jfsc-nor.png") no-repeat center top;
                &:hover{
                  background: url("../assets/icon-homepage-jfsc-click.png") no-repeat center top;
                }
              }
              a{
                display: block;
                p{
                  margin-top: 85px;
                  height: 36px;
                  line-height: 44px;
                  font-size: 18px;
                  text-align: center;
                  
                }
              }
            }
          }
        }
        .personal{
          float: left;
          background: url("../assets/line-bg2.png") no-repeat 0 18px ;
          .logined{
            @extend %clearFix;
            .hd{
              padding-left: 35px;
              float: left;
              text-align: center;
              img{
                width: 66px;
                height: 66px;
                border-radius: 50%;
              }
              p{
                color: #fff;
                background: #066fc4;
                height: 25px;
                line-height: 25px;
                border-radius: 13px;
                margin-top: 15px;
                cursor: pointer;
              }
            }
            .bd{
              float: left;
              margin-left: 25px;
              margin-top: 18px;
              p{
                &.name{
                  font-size: 18px;
                }
                &.credit{
                  font-size: 16px;
                  line-height: 28px;
                  color: #666666;
                  margin-top: 3px;
                  span{
                    font-weight: bold;
                    color: #fea93a;
                    padding: 0 10px;
                    font-size: 24px;
                    display: inline-block;
                    height: 28px;
                  }
                }
                
              }
              a.perLink{
                margin-top: 3px;
                display: block;
                text-align: right;
                color: #066fc4;
                font-size: 16px;
                &:hover{
                  text-decoration: underline;
                }
              }
            }
          }
          .logining{
            .hd{
              padding-left: 35px;
              float: left;
              text-align: center;
              img{
                width: 66px;
                height: 66px;
                border-radius: 50%;
              }
            }
            .bd{
              float: left;
              margin-left: 25px;
              margin-top: 15px;
              .name{
                font-size: 18px;
              }
              .tip{
                color: #066fc4;
                a{
                  color: #066fc4;
                  font-size:16px;
                  &:hover{
                    text-decoration: underline;
                  }
                }
              }
            }
          }
        }
      }
      .news{
        width: 1120px;
        margin: 2px auto 0;
        padding: 30px;
        box-sizing: content-box;
        background: #fff;
        .news-wrapper{
          margin-top: 25px;
        }
        .news-title{
          width: 100%;
          p{
            float: left;
            height: 22px;
            line-height: 22px;
            border-left: 6px solid #066fc4;
            color: #000;
            font-size: 22px;
            text-indent: 20px;
          }
          a{
            float: right;
            color: #666666;
            font-size: 16px;
            img{
              vertical-align: middle;
              width: 14px;
              height: 14px;
            }
          }
        }
        .news-lb{
          width: 482px;
          height: 270px;
          overflow:hidden;
          margin:  0 auto;
          position:relative;
        }
        .news-con{
          width: 600px;
          margin-left: 30px;
          .firstList{
            padding-bottom: 25px;
            border-bottom: 1px solid #f6f6f6;
            .title{
              color: #333;
              font-weight: bold;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              font-size: 20px;
            }
            .text{
              margin-top: 15px;
              color: #666;
              font-size: 14px;
              line-height: 24px;
            }
          }
          ul{
            li{
              margin-top: 20px;
              height: 25px;
              line-height: 25px;
              a{
               color: #333333;
               font-size: 16px;
               background: url("../assets/circle-bg.png") no-repeat 0px 10px;
               display: block;
               float: left;
               overflow: hidden;
               white-space: nowrap;
               text-overflow: ellipsis;
               width: 475px;
               text-indent: 15px;
              }
              span{
               color: #999999;
               font-size: 14px;
               float: right;
              }
            }
          }
        }
      }
      .bannerAd{
        width: 1180px;
        margin: 20px auto 0;
      }
      .volunter{
        width: 1180px;
        margin: 20px auto 0;
        background: #fff;
        padding-bottom: 40px;
        .title{
          width: 1130px;
          margin: 0 auto;
          height: 22px;
          line-height: 22px;
          text-indent: 20px;
          color: #3a3a3a;
          font-size: 22px;
          border-bottom: 1px solid #f5f5f5;
          padding: 30px 0;
          p{
            border-left: 6px solid #066fc4;
          }
        }
        .vol-lb{
          .swiper-container{
            width: 1050px;
            margin: 30px auto;
            overflow: inherit;
            .swiper-wrapper{
              position: relative;
              overflow: hidden;
              .swiper-slide{
                width: 250px;
                .pic{
                  width: 250px;
                  height: 155px;
                  img{
                    width: 250px;
                    height: 150px;
                  }
                }
                .text{
                  width: 100%;
                  .name{
                    margin-top: 5px;
                    font-size: 18px;
                    color: #555;
                    height: 32px;
                    line-height: 32px;
                    font-weight: bold;
                    text-align: center;
                  }
                  .num{
                    color: #333;
                    height: 28px;
                    line-height: 28px;
                    font-size: 16px;
                    text-align: center;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                  }
                }
              }
            }
            .swiper-button-prev{
              position: absolute;
              background: url(../assets/btn-left-nor.png) no-repeat;
              width:28px;
              height: 58px;
              top:50%;
              margin-top: -60px;
              left: -35px;
              &:hover{
                 background: url(../assets/btn-left-click.png) no-repeat;
              }
            }
            .swiper-button-next{
              background: url(../assets/btn-right-nor.png) no-repeat;
              width:28px;
              height: 58px;
              top:50%;
              margin-top: -60px;
              right: -35px;
              &:hover{
                 background: url(../assets/btn-right-click.png) no-repeat;
              }
            }
            .swiper-button-disabled{
              opacity: 1
            }
          }
        }
      }
      .cases{
        width: 1180px;
        margin: 20px auto 0;
        background: #fff;
        padding: 40px 0;
        .cases-title{
          width: 1130px;
          margin-left: 20px;
          padding-bottom: 20px;
          border-bottom: 1px solid #f5f5f5;
          p{
            float: left;
            height: 22px;
            line-height: 22px;
            border-left: 6px solid #066fc4;
            color: #000;
            font-size: 22px;
            text-indent: 20px;
          }
          a{
            float: right;
            color: #666666;
            font-size: 16px;
          }
        }
        .cases-con{
          margin-left: 20px;
          ul{
            @extend %clearFix;
            li{
              float: left;
              width: 530px;
              margin-right: 50px;
              margin-top: 30px;
              &:nth-child(2n){
                margin-right: 0;
              }
              .num{
                width: 41px;
                height: 51px;
                float: left;
                &.num0{
                  background: url("../assets/image-anli-01.png") no-repeat;
                }
                &.num1{
                  background: url("../assets/image-anli-02.png") no-repeat;
                }
                &.num2{
                  background: url("../assets/image-anli-03.png") no-repeat;
                }
                &.num3{
                  background: url("../assets/image-anli-04.png") no-repeat;
                }
              }
              .text{
                width: 470px;
                float: left;
                margin-left: 15px;
                .title{
                  font-size: 20px;
                  height: 36px;
                  line-height: 36px;
                  color: #333;
                  font-weight: bold;
                  @include ellipsis_two(1)
                }
                .desc{
                  font-size: 16px;
                  color: #333;
                  line-height: 24px;
                  @include ellipsis_two(1)
                }
                .court-time {
                  margin-top: 25px;
                  float: right;
                  font-size: 14px;
                  color: #666;
                  .court{
                    margin-right: 25px;
                  }
                }
              }
            }
          }
        }
      }
      .course-center{
        width: 1180px;
        margin: 20px auto 0;
        background: #fff;
        padding: 40px 0;
        .cc-cate{
          width: 1110px;
          margin-left: 20px;
          height: 25px;
          padding-bottom: 25px;
          border-bottom: 1px solid #f5f5f5;
          @extend %clearFix;
          .title{
            height: 25px;
            line-height: 25px;
            text-align: center;
            float: left;
            border-left: 6px solid #066fc4;
            text-indent: 20px;
            font-size: 22px;
          }
          .list{
            width: 780px;
            float: left;
            margin-left: 40px;
            ul{
              @extend %clearFix;
              li{
                float: left;
                color: #333;
                cursor: pointer;
                font-size: 18px;
                padding: 0 10px;
                // line-height: 12px;
                background: url("../assets/border-line.png") no-repeat right;
                &.active{
                  color:  #066fc4;
                }
                img{
                  margin-right: 8px;
                }
                &:nth-last-child(1){
                  background: none;
                }
              }
            }
          }
          .more{
            float: right;
            cursor: pointer;
            font-size: 16px;
            color: #666;
            img{
              margin-left: 10px;
            }
          }
        }
        .cc-con{
         
         margin-left: 20px;
         width: 1110px;
          ul{
            li{
              float: left;
              width: 250px;
              height: 200px;
              margin-right: 35px;
              margin-top: 35px;
              &:nth-child(4n){
                margin-right: 0;
              }
              .cc-con-pic{
                position: relative;
                .pic{
                  width: 250px;
                  height: 130px;
                  display: block;
                  .trueImg{
                    width: 250px;
                    height: 130px;
                    display: block;
                  }
                }
                 p{
                    position: absolute;
                    bottom: 10px;
                    background: url(../assets/book-shadow.png) no-repeat;
                    width: 91px;
                    height: 24px;
                    line-height: 24px;
                    color: #fff;
                    img{
                      vertical-align: sub;
                      margin-left: 10px;
                    }
                  }
              }
              .cc-con-title {
                margin-top: 8px;
                height: 32px;
                line-height: 32px;
                .garden{
                  font-size: 16px;
                  color: #555;
                  font-weight: bold;
                  width: 125px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap
                }
                .time{
                  font-size: 14px;
                  color: #999
                }
              }
              .cc-con-pic1{
                width: 275px;
                height: 178px;
                display: block;
                background: #f8f8f8;
                text-align: center;
                img{
                  width: 91px;
                  height: 91px;
                  margin-top: 40px;
                }
              }
              .cc-con-title1{
                margin-top: 8px;
                font-size: 18px;
                font-weight: bold;
                color: #333;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                text-align: center;
                margin-top: 15px;
              }
              .cc-con-title2{
                margin-top: 10px;
                color: #333;
                text-align: center;
                font-size: 16px;
              }
            }
          }
          .noData{
            width: 100%;
            text-align: center;
            p{
              font-size: 22px;
              margin-top: 30px;
              font-weight: bold;
            }
          }
        }
      }
      .community{
        width: 1160px;
        margin: 0 auto;
        margin-top: 30px;
        background: #fff;
        padding: 20px;
        .community-title{
          width: 100%;
          background: url(../assets/book.png) no-repeat;
          height: 46px;
          .name{
            height: 46px;
            line-height: 46px;
            margin-left: 57px;
            color: #555;
            font-weight: bold;
            font-size: 16px;
            span{
              font-size: 14px;
              font-weight: normal;
              color: #999;
            }
          }
          .more{
            height: 46px;
            line-height: 46px;
          }
        }
        
      }
      .cadet{
        width: 1160px;
        margin: 0 auto;
        margin-top: 30px;
        background: #fff;
        padding: 20px;
        height: 490px;
        .cadet-title{
          width: 100%;
          background: url(../assets/mien-img.png) no-repeat;
          height: 46px;
          .name{
            height: 46px;
            line-height: 46px;
            margin-left: 57px;
            color: #555;
            font-weight: bold;
            font-size: 16px;
            span{
              font-size: 14px;
              font-weight: normal;
              color: #999;
            }
          }
          .more{
            height: 46px;
            line-height: 46px;
          }
        }
        .cadet-con{
          margin-top: 20px;
          position: relative;
          .ulWrap{
            ul{
              @extend %clearFix;
              li{
                float:left;
                width: 580px;
                .pic{
                  width: 290px;
                  height: 190px;
                  img{
                    width: 290px;
                    height: 190px;
                  }
                }
                .text{
                  width: 290px;
                  height: 190px;
                  position: relative;
                  .title{
                    margin-left: 20px;
                    height: 56px;
                    line-height: 56px;
                    font-size: 18px;
                    font-weight: bold;
                    color: #555;
                  }
                  .line{
                    height: 3px;
                    background: #409bf1;
                    width: 30px;
                    margin-left: 20px;
                  }
                  .content{
                    margin-left: 20px;
                    margin-top: 10px;
                  }
                }
                &.litop{
                  .text{
                    background: #fef2de;
                    &::before{
                      position:absolute;
                      border-left:0px solid transparent;
                      border-right:12px solid #fef2de;
                      border-bottom:6px solid transparent;
                      border-top:6px solid transparent;
                      content:" ";
                      display:block;
                      width:0;
                      height:0;
                      top:85px;
                      left: -12px;
                    }
                  }
                }
                &.libottom{
                  .text{
                    background: #d5e4fa;
                    &::before{
                      position:absolute;
                      border-right:0px solid transparent;
                      border-left:12px solid #d5e4fa;
                      border-bottom:6px solid transparent;
                      border-top:6px solid transparent;
                      content:" ";
                      display:block;
                      width:0;
                      height:0;
                      top:85px;
                      right: -12px;
                    }
                  }
                }
              }
            }
          }
          .swiper-container{
            height: 420px;
          }
          .swiper-pagination{
            position: absolute;
            width: 30px;
            right: 25px;
            left: auto;
            .swiper-pagination-bullet{
              width: 5px;
              height: 5px;
              margin: 0 2px;
            }
            .swiper-pagination-bullet-active{
              background: #ffd800;
            }
          }
          .swiper-button-prev{
            position: absolute;
            width:18px;
            height:18px;
            background:url(../assets/left-arrow2.png) no-repeat;
            top: 417px;
            left: auto;
            right: 60px;
          }
          .swiper-button-next{
            position: absolute;
            width:18px;
            height:18px;
            margin-right:5px;
            background:url(../assets/right-arrow2.png) no-repeat;
            left: auto;
            top: 417px;
            right: 0
          }
          .swiper-button-disabled{
            opacity: 1;
          }
        }
      }
        
      .shareMore{
        position: fixed;
        right: 0;
        bottom: 30px;
        width: 180px;
        z-index: 20;
        .closeShare{
          width: 24px;
          height: 24px;
          float: right;
          display: block;
          cursor: pointer;
        }
        .courseShare{
          width: 180px;
          height: 140px;
          display: block;
          cursor: pointer;
        }
      }
     
    }
</style>
