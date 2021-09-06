<template>
  <div>
    <ul v-if="supports&&supports.length">
      <li v-for="(item,index) in supports" :key="index" class="support-item">
        <span :class="classMap[item.type]" class="icon"></span>
        <span class="description">{{item.description}}</span>
      </li>
    </ul>
    <span v-else :class="imgClass" class="icon"></span>
  </div>
</template>
<script>
export default {
  data() {
    return {
      classMap:["decrease", "discount", "special", "invoice", "guarantee"]
    };
  },
  props: {
    imgType:{
      type:Number,
      default:(()=>{
        return 0
      })
    },
    supports:{
      type:Array,
      default:(()=>{
        return []
      })
    }
  },
  computed:{
    imgClass(){
      return this.classMap[this.imgType]
    }
  }
};
</script>
<style lang="stylus" scoped>
  @import "../../common/stylus/mixin.styl"
  .support-item
    margin-bottom :12px
    &.last-child
      margin-bottom :0
  .icon
    display :inline-block
    width :16px    
    height :16px    
    background-size :16px 16px
    background-repeat:no-repeat
    margin-right :6px

  .description
    display :inline-block
    font-size :12px
    color :rgb(255,255,255)
    line-height :16px
    vertical-align :top
  .decrease
    bg-image('decrease_1')
  .discount
    bg-image('discount_1')
  .guarantee
    bg-image('guarantee_1')
  .invoice
    bg-image('invoice_1')
  .special
    bg-image('special_1')
</style>