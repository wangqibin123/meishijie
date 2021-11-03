<template>
  <el-upload
    class="avatar-uploader"
    :action="action"
    :show-file-list='false'
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload"
    >
    <img v-if="imageUrl" style="width:200px;" :src="imageUrl" class="avatar">
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
</template>
<script>
export default {
  props:{
    action:String,
    imageUrl:{
      type:String,
      default:''
    }
  },
  data(){
    return {

    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.$emit('resurl',{imageUrl:this.imageUrl})
    },
    beforeAvatarUpload(file) {
      // const isJPG = file.type === 'image/jpeg';
      // const isLt2M = file.size / 1024 / 1024 < 2;

      // if (!isJPG) {
      //   this.$message.error('上传头像图片只能是 JPG 格式!');
      // }
      // if (!isLt2M) {
      //   this.$message.error('上传头像图片大小不能超过 2MB!');
      // }
      // return isJPG && isLt2M;
    }
  }
}
</script>