<template>
    <div class="clueResult">
        <header-fix :active-index="headerIndex"></header-fix>
        <section class="result-tip clearFix">
            <div class="tip-img">
                <img src="../assets/icon-clue-success.png" alt="">
            </div>
            <div class="tip-text">
                <p>评估成功，还有线索未评估，可继续评估</p>
                <p>评估成功可获得积分，积分可兑换好礼！</p>
            </div>
        </section>
         <section class="clueList">
           <ul>
               <li>
                   <div class="time">
                       志愿者评估线索剩余时间： <span>1天14小时</span>
                   </div>
                   <div class="table">
                       <div class="cell">
                           <div class="title">
                               提供线索区域
                           </div>
                           <div class="text">
                               浙江省湖州市安吉县递铺镇云鸿东路1号
                           </div>
                       </div>
                       <div class="cell">
                           <div class="title">
                               提供涉及区域
                           </div>
                           <div class="text">
                               食品药品安全领域-保健食品非法生产销售
                           </div>
                       </div>
                       <div class="cell">
                           <div class="title">
                               线索描述
                           </div>
                           <div class="text">
                               我想提供线索，最近我发现我们
                                这边有一家地下作坊，专门生产假
                                冒药品，请麻烦能能核实调查一下。
                                <!-- | wordLimit(126) -->
                           </div>
                       </div>
                       <div class="cell">
                           <el-button class="cell-btn1">评估线索</el-button>
                           <!-- <el-button class="cell-btn2" disabled>评估线索</el-button> -->
                       </div>
                   </div>
               </li>
              
           </ul>
       </section>
        <footer-fix></footer-fix>
    </div>
</template>

<script>
export default {
    data () {
        return {
            headerIndex: '0'
        }
    }
}
</script>

<style lang="scss" rel="stylesheet/scss">
    @import "../style/mixin";
    .clueResult{
        .result-tip{
            width: 540px;
            margin: 70px auto 0;
            .tip-img{
                float: left;
            }
            .tip-text{
                float: left;
                margin-left: 20px;
                
                p{
                    &:nth-child(1){
                        margin-top: 10px;
                        font-size: 24px;
                        line-height: 24px;
                        color: #333;
                    }
                    &:nth-child(2){
                        margin-top: 15px;
                        font-size: 14px;
                        color: #666;
                        line-height: 24px;
                    }
                }
                
            }
        }
        .clueList{
            margin-top: 30px;
            width: 1040px;
            margin: 40px auto;
            ul{
                li{
                    margin-bottom: 20px;
                    border: 1px solid #ddd;
                    .time{
                        background: #f5f5f5;
                        height: 42px;
                        line-height: 42px;
                        text-indent: 20px;
                        color: #999;
                        font-size: 14px;
                        span{
                            color: #066fc4;
                            font-weight: bold;
                        }
                    }
                }
                .table{
                    display: table;
                    margin-bottom: 0;
                    .cell{
                        display: table-cell;
                        height: 90px;
                        padding: 15px;
                        position: relative;
                        background: #fff;
                        .title{
                            height: 18px;
                            line-height: 18px;
                        }
                        .text{
                            line-height: 22px;
                        }
                        button{
                            text-align: center;
                            background: #066fc4;
                            color: #fff;
                            width: 120px;
                            height: 36px;
                            position: absolute;
                            top: 40px;
                            margin-left: 70px;
                        }
                        &:nth-child(1){
                            width: 200px;
                            border-right: 1px solid #ddd;
                        }
                        &:nth-child(2){
                            width: 200px;
                            border-right: 1px solid #ddd;
                        }
                        &:nth-child(3){
                            width: 259px;
                            border-right: 1px solid #ddd;
                        }
                        &:nth-child(4){
                            width: 258px;
                        }
                    }
                }
            }
        }
    }
</style>
