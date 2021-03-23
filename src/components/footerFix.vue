<template>
  <div class="bottom">
    <div class="bottom-link clearfix">
      <div class="bl-left">
        <p class="title"> 相关链接: </p>
        <div class="list"> 
          <a href="http://cpc.people.com.cn/">中国共产党新闻</a>
          <a href="http://www.npc.gov.cn/">全国人大</a>
          <a href="http://www.gov.cn/">中央政府</a>
          <a href="http://www.cppcc.gov.cn/">全国政协</a>
          <a href="http://www.court.gov.cn/">最高人民法院</a>
          <a href="http://newspaper.jcrb.com/">检察日报</a>
          <a href="http://www.jcrb.com/">正义网</a>
          <a href="https://www.12309.gov.cn/">中国检查网</a>
        </div>
      </div>
      <div class="bl-right" >
        <select onchange="self.location.href=options[selectedIndex].value">
          <option value="">相关机构</option>
          <option value="http://www.chinapeace.gov.cn/">中央政法委</option>
					<option value="http://www.ccdi.gov.cn/">中央纪委国家监委</option>
					<option value="http://www.mps.gov.cn/n16/index.html">公安部</option>
					<option value="http://www.mca.gov.cn/">民政部</option>
					<option value="http://www.moj.gov.cn/">司法部</option>
					<option value="http://www.mof.gov.cn/">财政部</option>
					<option value="http://www.mnr.gov.cn/">自然资源部</option>
					<option value="http://www.icac.org.hk/">香港特区廉政公署</option>
					<option value="http://www.mp.gov.mo/">澳门特区检察院</option>
        </select>
        <select onchange="self.location.href=options[selectedIndex].value">
          <option value="">新闻媒体</option>
          <option value="http://www.xinhuanet.com/">新华网</option>
          <option value="http://www.people.com.cn/">人民网</option>
          <option value="http://www.cctv.com/">央视网</option>
          <option value="http://paper.people.com.cn/rmrb/">人民日报</option>
          <option value="http://epaper.gmw.cn/gmrb/">光明日报</option>
          <option value="http://epaper.legaldaily.com.cn/public/dianzhibao-2011.php">法制日报</option>
          <option value="http://newspaper.jcrb.com/">检察日报</option>
          <option value="http://epaper.cpd.com.cn/">人民公安报</option>
          <option value="http://rmfyb.chinacourt.org/paper/html/node_2.htm">人民法院报</option>
          <option value="http://www.jcrb.com/FYFZ/">方圆</option>
          <option value="http://www.jcrb.com/rmjc/">人民检察</option>
          <option value="http://www.gmw.cn/">光明网</option>
          <option value="http://www.legaldaily.com.cn/">法制网</option>
          <option value="http://www.jcrb.com/">正义网</option>
          <option value="http://www.jjjcb.cn/content/2020-10/16/node_2.htm">中国纪检监察报</option>
          <option value="http://www.legalinfo.gov.cn/">中国普法网</option>
        </select>
        <select onchange="self.location.href=options[selectedIndex].value">
          <option value="">检察新媒体</option>
          <option value="http://www.jcrb.com/xmtpd/index.html">检察新媒体</option>
        </select>
      </div>
    </div>
    <div class="bottom-con">
        <p>Copyrights©最高人民检察院 All Rights Reserved.</p>
        <p>最高人民检察院 （100726）北京市东城区北河沿大街147号 010-65209114（查号台） 010-12309（检察服务热线）</p>
        <p>未经本网书面授权，请勿转载、摘编或建立镜像，否则视为侵权。 备案序号：京ICP备05026262号　建议使用1920*1080分辨率获得最佳浏览效果</p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  props: {
  }
}
</script>

<style scoped lang="scss">
     @import "../style/mixin";
    .bottom{
        width: 100%;
        background: #0266b7;
        margin-top: 31px;
        .bottom-link{
          width: 1110px;
          margin: 0 auto;
          border-bottom: 1px solid #2797f2;
          padding: 20px 0;
          .bl-left{
            float: left;
            @extend %clearFix;
            .title{
               float: left;
               color: #fff;
            }
            .list{
              float: left;
              a{
                float: left;
                color: #fff;
                margin-left: 10px;
              }
            }
          }
          .bl-right{
            float: right;
            select{
              margin-left: 25px;
              background: transparent;
              color: #fff;
              width: 122px;
              border: 1px solid #fff;
              option{
                color: #333;
              }
            }
          }
        }
        .bottom-con{
            width: 1100px;
            margin: 0 auto;
            padding:30px 0;
            p{
                color:#fff;
                height: 25px;
                line-height: 25px;
                a{
                  color: #fff;
                }
            }
        }
    }
</style>
