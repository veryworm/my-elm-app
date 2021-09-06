<template>
  <div class="title">
    <div class="line"></div>
    <div class="text">{{title}}</div>
    <div class="line"></div>
  </div>
</template>
<script>
export default {
  props:{
    title:{
      type:String,
      default:(()=>{
        return '标题'
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
.title
 display :flex
 width :80%
 margin : 0 36px 24px 36px
 .line
   position relative
   top :-6px
   flex :1
   border-bottom: 1px solid rgba(255, 255, 255, 0.2)
 .text
   padding :0 12px
   font-weight: 700
   font-size: 14px
</style>