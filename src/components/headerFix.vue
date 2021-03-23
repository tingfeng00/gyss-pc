<template>
  <div class="top">
    <div class="top-con">
      <div class="top-con2 clearfix">
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
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Menu } from 'element-ui'
Vue.use(Menu)
export default {
  data () {
    return {
      noticeNum: '',
      slideDown: false,
      searchValue: '课程',
      searchOptions: [
        {
          label: '课程',
          value: '课程'
        },
        {
          label: '文章',
          value: '文章'
        }
      ],
      searchKey: ''
    }
  },
  props: {
    activeIndex: {
      type: String,
      default: '1'
    }
  },
  created () {
  },
  mounted () {
  },
  computed: {
  },
  methods: {
    mouseOver () {
      this.slideDown = true
    },
    mouseLeave () {
      this.slideDown = false
    },
    goRouter (query) {
      // console.log(query)
      let path = this.$route.fullPath
      // console.log(path, query)
      if (path == query) {
        window.location.reload()
      } else {
        this.$router.push({ path: query })
      }
    },
    goSearch () {
      if (this.searchKey) {
        let path = this.$route.fullPath 
        if (this.searchValue == '课程') {
           // console.log('我搜的文章')
          this.$router.push({ path: '/courseCenter', query: { keyWord: this.searchKey } })
          if (path == "/courseCenter") {
            window.location.reload()
          }
        } else if (this.searchValue == '文章') {
          // console.log('我搜的文章')
          this.$router.push({ path: '/articleCenter', query: { keyWord: this.searchKey } })
          if (path == "/articleCenter") {
            window.location.reload()
          }
        }
      } else {
        this.$alert('请输入您的搜索内容', '提示', {
          confirmButtonText: '确定'
          // callback: action => {
          //   this.$message({
          //     type: 'info'
          //   })
          // }
        })
      }
    }
  }
}
</script>

<style  lang="scss">
  @import "../style/mixin";

  .top{
    width: 100%;
    height: 90px;
    background: linear-gradient(to bottom,#265196,#0370c6 );
    .top-con{
      width: 1120px;
      margin: 0 auto;
      .top-con2{
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
                height: 85px;
                line-height: 85px;
                text-align: center;
              }
              &.active{
                a{
                  background: linear-gradient(to bottom, #1a66ba, #0570c8);
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
    }
  
  }
</style>
