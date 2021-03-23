<template>
    <div class="per_interaction">
        <div class="per_bodytitle clearFix">
            <span class="per_infbigtitle pull-left">互动交流</span>
            <ul class="pull-left clearFix">
                <li @click="checkwindows(0)"><router-link class="per_interTopLab" to="/personalCenter/personalInteraction">收到的</router-link></li>
                <li @click="checkwindows(1)"><router-link class="per_interTopLab" to="/personalCenter/personalInteraction/interactionPost">发出的</router-link></li>
            </ul>
            <div class="per_bodytitleR">
                <div class="exam-title2-check l">
                    <el-select v-model="selectOptionsValue" placeholder="请选择">
                        <el-option
                            v-for="item in selectOptions"
                            :key="item.value"
                            :label="item.Name"
                            :value="item.Id">
                        </el-option>
                    </el-select>
                </div>
                <input type="text" name="" id="" value="" placeholder="输入要考试名称" v-model="examName">
                <span><img src="../assets/glass.png"></span>
            </div>
        </div>
        <div>
            <router-view @seoundRank="checkwindows"></router-view>
        </div>
    </div>
</template>

<script>
import { GetCommentType } from '../service/getData'
export default {
    name: 'interaction',
    data: function () {
        return {
            selectOptionsValue: '',
            selectOptions: [],
            examName: ''
        }
    },
    created () {
        this.$emit('getchildvalue', '0')
        this.getCommontTypes() 
    },
    methods: {
        checkwindows (numindex) {
            let labWord = document.getElementsByClassName('per_interTopLab')
                labWord = Array.prototype.slice.call(labWord, 0)

            labWord.forEach((item, index) => {
                item.style.color = '#333'
            })

            labWord[numindex].style.color = '#368474'
        },
        async getCommontTypes () {
            let msg = await GetCommentType({})
            this.selectOptions = msg.Data
        }
    }
}
</script>

<style lang="scss">
@import '../style/mixin';
.per_interaction{
    
    .per_bodytitle {
        border-bottom: 1px solid #efefef;
        padding-left: 19px;
        .per_infbigtitle{
            height: 66px;
            font-size: 20px;
            font-weight: bold;
            line-height: 66px;
            display: block;
            color:#555;
        }
        ul{
            li{
                float:left;
                height:16px;
                margin-left:24px;
                margin-top:24px;
                font-size:16px;
                font-weight: bold;
                a{
                    color:#555; 
                }
                &:first-of-type{
                    a{
                        color:#368474;
                    }
                }
            }
        }
        .per_bodytitleR{
            @extend %pull-right;
            margin-right: 20px;
            margin-top: 14px;
            width: 321px;
            height: 34px;
            line-height: 34px;
            border-radius: 5px;
            border: 1px solid #dddddd;
            .exam-title2-check {
                .el-select {
                    .el-input{
                        width: 95px;
                    }
                    .el-input__inner{
                        width:75px;
                        height: 21px;
                        text-align: center;
                        border: none;
                        text-indent: 5px;
                        padding: 0;
                    }
                    .el-input__suffix{
                        right:3px;
                        .el-input__icon{
                            width: 12px;
                        }
                    }
                    .el-select__caret{
                        &:before{
                            position: relative;
                            bottom:4px;
                        }
                    }
                }
            }
            input {
                width: 180px;
                height: 20px;
                border-left: 1px solid #dddddd;
                border-right: 1px solid #dddddd;
                text-indent: 10px;
            }
            span {
                img{
                    vertical-align: middle;
                    margin-left: 8px;
                    cursor: pointer;
                }
            }
        }
    }
}
</style>
