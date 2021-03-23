<template>
    <div class="suitNotice">
        <div class="title">
            <img src="../assets/icon-notice.png" alt=""> 公益诉讼志愿者须知
        </div>
        <div class="wrapper">
            一、仅受理对涉及公益诉讼领域相关事实和行为的检举控告。反映其他问题，请到有关部门举报网站举报。
        </div>
        <div class="notice-sel">
            <el-radio 
            v-model="readNotice" 
            label="已阅读了解上述须知"
            @click.native.prevent="handleRadioChange"
            >已阅读了解上述须知</el-radio>
        </div>
        <div class="notice-tip">
            <div class="title1">是否想加入我们，成为一名公益诉讼志愿者？</div>
            <div class="text">
                申请成为志愿者，经填写、完善注册信息，并通过公益诉讼知识测试后，方可参与线索评估、在线听证等， 并获取相应积分。
            </div>
        </div>
        <div class="notice-btn">
            <el-button class="notice-btn1" @click.native="$emit('closePopup', true)">是</el-button>
            <el-button class="notice-btn2" @click.native="$emit('closePopup', false)">否</el-button>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            readNotice: ''
        }
    },
    methods: {
        handleRadioChange () {
            this.readNotice =
                this.readNotice === '已阅读了解上述须知'
                ? ''
                : '已阅读了解上述须知'
        }
    },
    watch: {
        readNotice (val) {
            this.$emit('readNotice', val)
        }
    }
}
</script>

<style lang="scss" rel="stylesheet/scss">
    @import "../style/mixin";
    .suitNotice{
        
        .title{
            background: #f3f3f3;
            height: 70px;
            line-height: 70px;
            text-align: center;
            font-weight: bold;
            color: #056cc0;
            font-size: 24px;
        }
        .wrapper{
            margin: 20px 25px ;
            width: 715px;
        }
        .notice-sel{
            margin-left: 25px;
            margin-top: 25px;
        }
        .notice-tip{
            border: 1px solid #83b5df;
            background: #ecf6ff;
            width: 715px;
            margin: 10px auto 20px;
            border-radius: 5px;
            .title1{
                font-size: 16px;
                font-weight: bold;
                color: #333;
                padding: 10px 18px 5px 18px;
            }
            .text{
                padding: 0 18px 5px 18px; 
                line-height: 24px;
                color: #666;
                font-size: 14px;
            }
        }
        .notice-btn{
            text-align: center;
            font-size: 18px;
            margin-bottom: 20px;
            .notice-btn1{
                width: 140px;
                height: 50px;
                background: #066fc4;
                color: #fff;
            }
            .notice-btn2{
                width: 140px;
                height: 50px;
                background: #f7f7f7;
            }
        }
    }
</style>
