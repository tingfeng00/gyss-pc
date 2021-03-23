<template>
    <div class="searchKey">
        <section class="pc-key-show clearfix" v-show="showSearch">
            <div class="key-show-title l">
                {{titleName}}： <input type="text" name="" id="" value="" v-model.trim="currentValue" @keyup.13="search"  @keyup.enter="search"/>
            </div>
            <div class="key-show-date l clearfix">
                <div class="show-date-p1 l">
                    发布日期：
                </div>
                <el-date-picker
                    v-model="startDate"
                    type="date"
                    class="startDate l"
                    placeholder="开始日期">
                </el-date-picker>
                <div class="show-date-p2 l">-</div>
                <el-date-picker
                    v-model="endDate"
                    type="date"
                    class="endDate l"
                    placeholder="结束日期">
                </el-date-picker>
            </div>
            <el-button type="primary" class="key-show-search l" @click.native="search">搜索</el-button>
            <div class="key-show-close r" @click="showSearch=false">
                <img src="../assets/close.png">
            </div>
        </section>
        <section class="pc-key-hide" v-show="!showSearch">
            <el-button type="primary" @click.native="showSearch=true">打开索引</el-button>
        </section>
    </div>
</template>

<script>
export default {
    data () {
        return {
            startDate: '',
            endDate: '',
            showSearch: 'true',
            currentValue: this.value
        }
    },
    props: {
        titleName: {
            type: String,
            default: '课程标题'
        },
        search: Function
    },
    methods: {
    },
    watch: {
        currentValue (val) {
            this.$emit('getKey', val)
        },
        startDate (val) {
            this.$emit('startDate', val)
        },
        endDate (val) {
            this.$emit('endDate', val)
        }
    }
}
</script>

<style lang="scss" rel="stylesheet/scss">
    @import "../style/mixin";

    .searchKey{
        .pc-key-show{
            background: #fff;
            width: 100%;
            height: 76px;
            position: relative;
            .key-show-title{
                margin-left: 28px;
                margin-top: 20px;
                input{
                    width: 265px;
                    height: 28px;
                    padding: 0 15px;
                    border-radius: 8px;
                    border: 1px solid #e8e8e8;
                }
            }
            .key-show-date{
                margin-left: 20px;
                margin-top: 20px;
                line-height: 30px;
                .el-date-editor.el-input, .el-date-editor.el-input__inner{
                    width: 136px;
                    height: 30px;
                    border-radius: 8px;
                    input{
                        width: 136px;
                        height: 30px;
                        line-height: 30px;
                        padding: 0 25px;
                    }
                    .el-input__prefix{
                        .el-input__icon{
                            line-height: 30px;
                        }
                        .el-input__inner {
                            padding-right: 25px;
                        }
                    }
                    .el-input__suffix{
                        .el-input__icon{
                            line-height: 30px;
                        }
                    }
                }
                .show-date-p2 {
                    margin: 0 8px;
                    line-height: 30px;
                }
            }
            .el-button{
                margin-left: 30px;
                margin-top: 20px;
                width: 62px;
                height: 32px;
                line-height: 32px;
                text-align: center;
                background: url(../assets/search-bg.png) no-repeat;
                background-size: 100% 100%; 
                padding: 0;
            }
            .key-show-close{
                position: absolute;
                right: -11px;
                top: -7px;
                cursor: pointer;
            }
        }
        .pc-key-hide{
            background: url(../assets/key-hide-bg.png) no-repeat;
            width: 100%;
            height: 30px;
            margin-top: 40px;
            .el-button{
                display: block;
                float: right;
                width: 86px;
                height: 22px;
                line-height: 22px;
                text-align: center;
                background: url(../assets/search-bg.png);
                background-size: 100% 100%;
                color: #fff;
                margin: 4px 11px;
                padding: 0;
            }
        }
    }
</style>
