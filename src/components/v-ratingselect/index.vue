<template>
  <div>
    <div class="rating-select border-1px">
      <span class="block positive" @click="select(2,$event)" :class="{'active':selectType===2}">{{desc.all}} <span class="count">{{ratings.length}}</span> </span>
      <span class="block positive" @click="select(0,$event)" :class="{'active':selectType===0}">{{desc.positive}}<span class="count">{{positives.length}}</span></span>
      <span class="block negative" @click="select(1,$event)" :class="{'active':selectType===1}">{{desc.negative}}<span class="count">{{negatives.length}}</span></span>
    </div>
    <div @click="toggleContent" class="only-content" :class="{'on':onlyContent}">
      <span class="icon-check_circle"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>
<script>
// const All = 2
const POSITIVE = 0
const NEGATIVE = 1

export default {
  props:{
    desc:{
      type:Object,
      default:(()=>{
        return {
          all:'全部',
          positive:'满意',
          negative:'不满意'
        }
      })
    },
    ratings:{
      type:Array,
      default:(()=>{
        return []
      })
    },
    selectType:{
      type:Number,
      default:(()=>{
        return 0
      })
    },
    onlyContent:{
      type:Boolean,
      default:(()=>{
        return true
      })
    },
  },
  computed:{
    positives() {
      return this.ratings.filter((rating) => {
        return rating.rateType === POSITIVE;
      });
    },
    negatives() {
      return this.ratings.filter((rating) => {
        return rating.rateType === NEGATIVE;
      });
    }
  },
  methods:{
    select(type,event){
      if (!event._constructed) {
        return;
      }
      this.$emit('change1',type)
    },
    toggleContent(){
      this.$emit('change2')
    }
  }
}
</script>
<style lang="stylus" scoped>
@import "../../common/stylus/mixin.styl"
  .rating-select
    margin :18px 18px 0 18px
    padding-bottom 18px
    border-1px(rgba(7, 17, 27, 0.1))
    .block
      display :inline-block
      margin-right :8px
      padding: 8px 12px
      margin-right: 8px
      line-height: 16px
      border-radius: 1px
      font-size: 12px
      color: rgb(77, 85, 93)
      &.active
        color:#fff
      &.positive
        background :rgba(0,160,220,0.2)
        &.active
          background :rgb(0,160,220)
      &.negative
        background :rgba(77,85,93,0.2)
        &.active
          background :rgb(77,85,93)
  .count
    display :inline-block
    margin-left :3px
    font-size :8px
  .only-content
    padding:12px 18px
    // line-height :24px
    color :rgb(147,153,159)
    border-bottom: 1px solid rgba(7, 17, 27, 0.1)
    font-size :0
    &.on
      .icon-check_circle
        color: #00c850
    .icon-check_circle
      margin-right :4px
      font-size :24px
    .text
      display: inline-block
      vertical-align: top
      font-size :12px
      margin-top :6px

</style>