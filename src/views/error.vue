<template>
    <div class="errorPage">
       <img src="../assets/noPageImg.png" alt="">
    </div>
</template>

<script>
export default {}
</script>

<style lang="scss" rel="stylesheet/scss">
    @import "../style/mixin";
    .errorPage{
        position: relative;
        width: 100vw;
        height: 100vh;
        img{
            display: block;
            position: absolute;
            width: 318px;
            height: 335px;
            left: 50%;
            top: 50%;
            margin-top: -167px;
            margin-left: -159px;
        }
    }
</style>
