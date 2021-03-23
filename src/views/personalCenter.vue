<template>

  <div class="personal_container" ref="personal_container">
    <header-fix :active-index="headerIndex"></header-fix>
    <div class="personal_tc clearFix">
      <div class="personal_top pull-left ">
        <div class="personal_login">
          <div class="personal_loginback">
            <error-img2 :src="perHeadAddress" :error-src="Avatar"></error-img2>  
          </div>
          <!-- <button class="personal_submitHPBtn" type="button" @click="SET_HEADCHANGE_APPEAR()">上传头像</button> -->
          <!-- <p>您好，欢迎进入个人中心！</p> -->
          <div class="personal_info">
            <div class="name-tel clearFix">
              <p class="name ">{{perInfor.Name}}</p>
              <p class="tel ">{{perInfor.Account}}</p>
            </div>
            <div class="credit">
              当前积分 <span>{{perInfor.Point}}</span>
            </div>
            <div class="level">
              {{perInfor.LevelName}}
            </div>
            <div class="exit">
               <el-button  class="exit-btn">退出登录</el-button>
            </div>
          </div>
        </div>
        <div class="personal_body_l">
          <div class="per_labeldart">
            <img src="../assets/person-xs.png" alt />
            个人中心
          </div>
          <div class="per_lablebody">
            <ul>
              <li v-for="(item,index) in perLabel" :key="index" >
                <div class="parTitle">
                  {{item.title}}
                </div>
                <div class="list">
                  <p v-for="(item1, index1) in item.nodes" :key="index1" @click="linkStyle(index, index1)">
                    <router-link class="secoundlinks" :to="item1.perLinkAddress" ref="secoundlink">
                      <span :class="{checked: item1.checked}">{{item1.perTab}}</span>
                    </router-link>
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="personal_body pull-left clearFix">
        <div class="personal_body_r pull-left clearFix">
          <router-view @getchildvalue="linkStyle" ref="son" @makereload="reloading"></router-view>
        </div>
      </div>
    </div>
    
    <footer-fix></footer-fix>
  </div>
</template>

<script>
import Avatar from '../assets/default-avatar.png'
// import { mapState, mapMutations } from 'vuex'
import { GetUserInfo } from '../service/getData'
export default {
  name: 'personalCenter',
  data: function () {
    return {
      Avatar,
      perHeadAddress: '',
      headerIndex: '6',
      perInfor: {},
      perLaberN: [0, 0],
      perLabel: [
        {
          title: '线索管理',
          nodes: [
            {
              perLinkAddress: '/personalCenter/personClass',
              perTab: '线索提报',
              checked: true
            }
          ]
        },
        {
          title: '我的待办',
          nodes: [
            {
              perLinkAddress: '/personalCenter/unDoneClue',
              perTab: '待评估线索(1)',
              checked: false
            }
          ]
        },
        {
          title: '我的已办',
          nodes: [
            {
              perLinkAddress: '/personalCenter/personClass',
              perTab: '已提报线索',
              checked: false
            },
            {
              perLinkAddress: '/personalCenter/personClass',
              perTab: '已评估线索',
              checked: false
            }
          ]
        },
        {
          title: '积分管理',
          nodes: [
            {
              perLinkAddress: '/personalCenter/personClass',
              perTab: '积分详情',
              checked: false
            },
            {
              perLinkAddress: '/personalCenter/personClass',
              perTab: '积分商城',
              checked: false
            }
          ]
        },
        {
          title: '账户管理',
          nodes: [
            {
              perLinkAddress: '/personalCenter/personClass',
              perTab: '个人资料',
               checked: false
            },
            {
              perLinkAddress: '/personalCenter/personClass',
              perTab: '安全中心',
              checked: false
            }
          ]
        },
        {
          title: '其他',
          nodes: [
            {
              perLinkAddress: '/personalCenter/personClass',
              perTab: '帮助手册'
            },
            {
              perLinkAddress: '/personalCenter/personClass',
              perTab: '建议反馈'
            }
          ]
        }
        
      ],
      pageIndex: 1,
      planAwakeWay: 0
    }
  },
  mounted: function () {
    this.random()
  },
  methods: {
    linkStyle (num, num1) {
      this.perLabel.forEach((item, index) => {
        item.nodes.forEach((item1, index1) => {
          item1.checked = false
        })
      })
      this.perLabel[num].nodes[num1].checked = true
    },
    
    stopmove (event) {
      let evt = window.event || event
      evt.preventDefault()
    },
    async random () {
      let msg = await GetUserInfo()
      if (msg.Status == 200) {
        // console.log(msg)
        this.perHeadAddress = msg.Data.Model.UserImage
        this.perInfor = msg.Data.Model
      }
      // this.perHeadAddress = msg.Data.Model.UserImage
      // this.perInfor = msg.Model
      // console.log(this.perInfor)
    },
    reloading () {
      this.random()
    }
  }
}
</script>

<style lang="scss">
@import "../style/mixin";
.personal_container{
  background: #f7f7f7;
}
.personal_tc{
  margin: 20px auto 0;
  width: 1120px;
  .personal_top {
  width: 260px;
  .personal_login {
    width: 260px;
    height: 265px;
    position: relative;
    background: #fff;
    .personal_loginback{
      padding-top: 25px;
      text-align: center;
      img{
        width:60px;
        height:60px;
        border-radius: 50%;
        border: 3px solid #d1d0d1;
        position: relative;
        top:3px;
        left: 3px;
      }
    }
    .personal_info{
      width: 140px;
      margin: 10px auto 0;
      .name-tel{
        .name{
          float: left;
        }
        .tel{
          float: right;
        }
      }
      .credit{
        color: #333;
        font-size: 16px;
        margin-top: 10px;
        span{
          margin-left: 15px;
          color: #fea93a;
          font-size: 20px;
        }
      }
      .level{
        margin-top: 10px;
      }
      .exit{
        margin-top: 10px;
        .exit-btn{
          width: 135px;
          height: 28px;
          line-height: 28px;
          color: #666;
          padding: 0;
          font-size: 16px;
        }
      }
    }
    .personal_submitHPBtn{
      width:88px;
      height:28px;
      position: absolute;
      top:142px;
      left:50%;
      margin-left:-44px;
      border:0;
      border-radius: 28px;
      background:#feac30;
      background:linear-gradient(to bottom,#feac30,#ff7d37);
      color:#fff;
      cursor:pointer;
    }

  }
  .per_labeldart {
    box-sizing: border-box;
    height: 72px;
    color: #333;
    font-size: 22px;
    line-height: 72px;
    margin-top: 30px;
    font-weight: bold;
    background: #fff;
    border-bottom: 2px solid #066fc4;
    text-align: center;
  }
  .per_lablebody {
    padding: 0px 20px 29px 20px;
    background: #fff;
    ul {
      li {
        .parTitle{
          padding: 30px 0;
          font-size: 20px;
          color: #333;
          margin-left: 55px;
          text-indent: 15px;
          background: url("../assets/list-circle.png") no-repeat 0px 40px;
        }
        .list{
          
          p{
            margin-left: 70px;
            height: 20px;
            line-height: 20px;
            margin-bottom: 20px;
            .secoundlinks{
              font-size: 16px;
              color: #666;
              display: block;
              span{
                &.checked{
                  color: #066fc4; 
                }
              }
              &:hover{
                color: #066fc4; 
              }
            }
            &:nth-last-child(1){
              margin-bottom: 0;
            }
          }
        }
       
      }

      .active {
        background:#066fc4;
        color: #fff;
      }
    }
  }
  
}

.personal_body {
  // margin: 20px auto 0;

  .personal_body_r {
    margin-left: 30px;
    width: 830px;
  }
}
}

</style>
