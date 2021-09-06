<template>
  <div :class="starType" class="star">
    <span v-for="(classMap,index) in classMaps" :key="classMap+index" :class="classMap" class="star-item"></span>
  </div>
</template>
<script>
const LENGTH = 5
const CLS_ON = 'on'
const CLS_OFF = 'off'
const CLS_HALF = 'half'
export default {
  props: {
    size: {
      type: Number,
      default: () => {
        return 24;
      }
    },
    score: {
      type: Number,
      default: () => {
        return 0;
      }
    }
  },
  computed: {
    starType() {
      return 'star' +'-'+ this.size;
    },
    classMaps(){
     // 4.3
     let arr = []
     let score = Math.floor(this.score*2)/2
     let isDescimal = score%1 !==0
     let integer = Math.floor(score)
     for(let i=0;i<integer;i++){
      arr.push(CLS_ON)
     }
     if(isDescimal){
      arr.push(CLS_HALF)
     }
     while(arr.length<LENGTH){
      arr.push(CLS_OFF)
     }
     return arr
    }
  }
};
</script>
<style lang="stylus" scoped>
  @import "../../common/stylus/mixin.styl"
  .star
   .star-item
    display :inline-block
    background-repeat: no-repeat
   &.star-24
    .star-item
     width: 10px
     height: 10px
     margin-right: 3px
     background-size: 10px 10px
     &.half
      bg-image('star24_half')
     &.off
      bg-image('star24_off')
     &.on
      bg-image('star24_on')
   &.star-36
    .star-item
     width: 15px
     height: 15px
     margin-right: 3px
     background-size: 15px 15px
     &.half
      bg-image('star36_half')
     &.off
      bg-image('star36_off')
     &.on
      bg-image('star36_on')
   &.star-48
    .star-item
     width: 20px
     height: 20px
     margin-right: 3px
     background-size: 20px 20px
     &.half
      bg-image('star48_half')
     &.off
      bg-image('star48_off')
     &.on
      bg-image('star48_on')
</style>