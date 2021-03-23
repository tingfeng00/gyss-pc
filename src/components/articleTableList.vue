<template>
    <div class="articleTableList">
        <div class="cm-lesson-title">
            <ul class="clearfix">
                <li class="cm-lesson-title1">编号</li>
                <li class="cm-lesson-title2">文章标题</li>
                <li class="cm-lesson-title3">点击数</li>
                <!-- <li class="cm-lesson-title3">学分</li> -->
                <li class="cm-lesson-title4">上传时间</li>
            </ul>
        </div>
        <table class="cml-table" v-if="listData.length > 0">
            <tr v-for="(item, index) in listData" :key="index">
                <th width="107">{{index + 1 + (currentPage-1) * row}}</th>
                <th width="418">
                    <router-link :to="{ path: '/articleDetail', query:{id: item.ArticleId, mid: mid}}">
                        {{item.ArticleTitle}}
                    </router-link> 
                </th>
                <th width="160">{{item.ClickCount}}</th>
                <!-- <th width="80">{{item.Credit}}</th> -->
                <th width="180">{{item.ArticleCreateDate}}</th>
            </tr>
        </table>
        <div class="cml-table2" v-else>
            暂无数据
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
        listData: {
            type: Array
        },
        currentPage: {
            type: Number
        },
        row: {
             type: Number
        },
        mid: {
            type: [String, Number]
        }
    },
    methods: {

    }
}
</script>

<style lang="scss" rel="stylesheet/scss">
    @import "../style/mixin";

    .articleTableList{
        .cm-lesson-title{
            width: 875px;
            margin: 0 auto;
            margin-top: 25px;
            ul{
                li{
                    float: left;
                    text-align: center;
                    height: 35px;
                    line-height: 35px;
                    background: #e9e9e9;
                    &.cm-lesson-title1{
                        width: 107px;
                        margin-right: 3px;
                    }
                    &.cm-lesson-title2 {
                        width: 415px;
                        margin-right: 3px;
                    }
                    &.cm-lesson-title3 {
                        width: 160px;
                        margin-right: 3px;
                    }
                    &.cm-lesson-title4 {
                        width: 180px;
                    }
                }
            }
        }
        .cml-table{
            width: 875px;
            margin: 0 auto;
            border: none;
            table-layout: fixed;
            tr {
                border-bottom: 1px solid #e9e9e9;
                th {
                    height: 48px;
                    line-height: 48px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    font-weight: normal;
                    a {
                        color: #333;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                }
                &:hover{
                    color: #368474;
                    a{
                        color: #368474;
                    }
                }
            }
        }
        .cml-table2{
            text-align: center;
            font-weight: bold;
            padding-top: 30px;
            font-size: 30px;
        }
    }
</style>
