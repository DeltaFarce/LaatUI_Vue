<template>
    <div class="image">
        <video src='https://laatui.oss-cn-beijing.aliyuncs.com/demo.mp4' controls="controls"  style="height:100%">
            your browser does not support the video tag
        </video>
    </div>
</template>

<script>
export default {
    name: "donate"
};
</script>

<style>
.image {
    width: 90%;
    height: 90%;
    margin:0 auto;

}
video {
    display:flex;  /*盒子模型*/
    flex-direction: row;  /*横向*/
    justify-content: space-around; /*主轴居中*/
    align-items: center; /*纵轴居中*/
}
</style>