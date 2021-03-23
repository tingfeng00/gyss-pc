<template>
    <div class="per_myCollect">
        <div class="per_bodytitle clearFix">
            <span class="per_colbigtitle pull-left">我的收藏</span>
            <ul class="pull-left clearFix">
                <li @click="checkwindows(0)"><router-link class="per_colTopLab" to="/personalCenter/personCollect/personColClass">课程</router-link></li>
                <li @click="checkwindows(1)"><router-link class="per_colTopLab" to="/personalCenter/personCollect/personColEssay">文章</router-link></li>
                <li @click="checkwindows(2)"><router-link class="per_colTopLab" to="/personalCenter/personCollect/personColProduction">作品</router-link></li>
                <li @click="checkwindows(3)"><router-link class="per_colTopLab" to="/personalCenter/personCollect/personCole-book">电子书</router-link></li>
            </ul>
        </div>
        <div>
            <router-view @seoundRank="checkwindows"></router-view>
        </div>
    </div>
</template>

<script>
export default {
    mounted: function () {
        this.$emit('getchildvalue', '2')
    },
    methods: {
        checkwindows (numindex) {
            let labWord = document.getElementsByClassName('per_colTopLab')
                labWord = Array.prototype.slice.call(labWord, 0)

                labWord.forEach((item, index) => {
                    item.style.color = '#333'
                })

                labWord[numindex].style.color = '#368474'
        }
    }
}
</script>

<style lang="scss">
    .per_myCollect{
        .per_bodytitle {
            border-bottom: 1px solid #efefef;
            padding-left: 19px;
            .per_colbigtitle{
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
                    margin-top:29px;
                    font-weight: bold;
                }
            }
        
        }
    }
</style>
