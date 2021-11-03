<template>
  <el-upload
  class="avatar-uploader"
  :action="action"
  :show-file-list="false"
  :on-success="handleAvatarSuccess"
  :before-upload="beforeAvatarUpload">
  <img v-if="imageUrl" :src="imageUrl" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
</template>
<script>
export default {
  props:{
    action:String,
    maxSize:{
      type:Number,
      default:2
    },
    imageUrl:{
      type:String,
      default:''
    },
    imgMaxWidth:{
      type:[Number,String],
      default:'auto'
    }
  },
  data(){
    return{}
  },
  methods: {
    handleAvatarSuccess(res, file) {
        if(res.code===1){
          this.$message({
            message:res.mes,
            type:'warning'
          })
          return
        }
        this.$emit('gai',URL.createObjectURL(file.raw))
        console.log(this.imageUrl);
        this.$emit('res-url',{
          resImgUrl:res.data.url
        })
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