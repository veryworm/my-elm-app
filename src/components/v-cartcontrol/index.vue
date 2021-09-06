<template>
  <div>
    <transition name="fade">
      <div v-show="food.count>0" class="cart-decrease" @click.stop.prevent="descreaseCount">
        <span class="inner icon-remove_circle_outline"></span>
      </div>
    </transition>
    <div v-show="food.count>0" class="cart-count">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click.stop.prevent="addCount"></div>
  </div>
</template>
<script>
import Vue from 'vue'

const EVENT_ADD = 'add' 

export default {
  props:{
    food:{
      type:Object,
      default:(()=>{
        return {}
      })
    }
  },
  methods:{
    descreaseCount(){
      if(!event._constructed){
        return
      }
      if(this.food.count){
        this.food.count--
      }
    },
    addCount(event){
      if(!event._constructed){
        return
      }
      if(!this.food.count){
        Vue.set(this.food,'count',1)
      }else{
        this.food.count++
      }
      console.log(event.target,'event.target');
      this.$emit(EVENT_ADD,event.target)
      // console.log(EVENT_ADD);
    }
  }
}
</script>
<style lang="stylus" scoped>
  .cart-decrease
    display :inline-block
    padding:6px
    font-size :0
    .inner
      display :inline-block
      line-height :24px
      color :rgb(0,160,220)
      font-size :24px
      text-align center
      transform: rotate(0)
      transition :all 0.4s linear
    &.fade-enter-active,&.fade-leave-active
      transition :all 0.4s linear
    &.fade-enter,&.fade-leave-to
      opacity :0
      transform :translate3d(24px,0,0)
      .inner
        transform: rotate(180deg)
  .cart-count
    display inline-block
    font-size :10px
    color :rgb(147,153,159)
    width :12px
    text-align :center
    padding-top :12px
    vertical-align :top
  .cart-add
    display :inline-block
    line-height :24px
    padding:6px
    color :rgb(0,160,220)
    font-size :24px
    text-align center
</style>