<template>
  <transition name="show">
    <div v-show="showFlag" class="food-wrapper" ref="foodWrapper">
      <div class="wrapper">
        <div class="img-header">
          <img :src="selectFoods.image" alt="">
        </div>
        <div class="leftTop" @click="close">
          <i class="icon-arrow_lift"></i>
        </div>
        <div class="content">
          <div class="content-header">
            {{selectFoods.name}}
          </div>
          <div class="cartcontrol-wrapper">
            <v-cartcontrol @add="drop" :food="selectFoods"></v-cartcontrol>
          </div>
          <transition name="hide">
            <div class="addCart" v-show="!selectFoods.count||selectFoods.count===0" @click.stop.prevent="addCart">加入购物车</div>
          </transition>
        </div>
        <v-split></v-split>
        <div class="rating">
          <h1 class="title">商品评价</h1>
          <v-ratingselect :ratings="selectFoods.ratings" @change1="change1" @change2="change2" :onlyContent="onlyContent" :selectType="selectType" :desc="desc"></v-ratingselect>
          <div class="rating-wrapper">
            <ul v-if="selectFoods.ratings&&selectFoods.ratings.length">
              <li v-show="showContent(rating.rateType,rating.text)" class="rating-item border-1px" v-for="(rating,index) in selectFoods.ratings" :key="index">
                <span class="time">{{rating.rateTime | formatTime}}</span>
                <div class="user">
                  <span class="username">
                    {{rating.username}}
                  </span>
                  <img class="avatar" :src="rating.avatar" alt="">
                </div>
                <p class="text">
                  <span class="icon" :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></span>{{rating.text}}
                </p>
              </li>
            </ul>
            <div class="no-rating" v-else>
              暂无评价
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import VCartcontrol from "components/v-cartcontrol/index.vue";
import VSplit from "components/v-split/index.vue";
import VRatingselect from "components/v-ratingselect/index.vue";
import BScroll from "better-scroll";

const All = 2

export default {
  components:{VCartcontrol,VSplit,VRatingselect},
  data(){
    return {
      showFlag:false,
      desc:{
        all:'全部',
        positive:'推荐',
        negative:'吐槽'
      },
      onlyContent:false,
      selectType:All
    }
  },
  props:{
    selectFoods:{
      type:Object,
      default:(()=>{
        return {}
      })
    }
  },
  methods:{
    showContent(type,text){
      if(this.onlyContent&&!text){
        return false
      }
      if(this.selectType=== All){
        return true
      }else {
        return this.selectType===type
      }
    },
    change1(type){
      this.selectType = type
      this.$nextTick(()=>{
        this.scroll.refresh()
      })
    },
    change2(){
      this.onlyContent = !this.onlyContent
      this.$nextTick(()=>{
        this.scroll.refresh()
      })
    },
    addCart(event){
      if (!event._constructed) {
        return;
      }
      this.$emit('add', event.target);
      this.$set(this.selectFoods, 'count', 1);
    },
    show(){
      this.showFlag = true
      this.selectType = All
      this.onlyContent = false;
      this.$nextTick(()=>{
        if(!this.scroll){
          this.scroll = new BScroll(this.$refs.foodWrapper,{
            click:true
          })
        }else{
          this.scroll.refresh()
        }
        console.log(this.scroll,',this.scroll');
      })
    },
    close(){
      this.showFlag = false
    },
    drop(event){
      this.$emit('add', event);
    }
  }
}
</script>
<style lang="stylus" scoped>
@import "../../common/stylus/mixin.styl"
  .food-wrapper
    position fixed
    top:0
    left:0
    bottom :48px
    z-index 40
    width :100%
    background :#fff
    transition :all 0.2s linear
    transform :translate3d(0,0,0)
    &.show-enter,&.show-leave-to
      transform :translate3d(100%,0,0)
    .img-header
      position :relative
      width:100%
      height :0
      padding-top 100%
      img
        position :absolute
        top :0
        left:0
        width 100%
        height:100%
    .leftTop
      position: fixed
      top :10px
      left :0
      .icon-arrow_lift
        display block
        font-size :20px
        color:#fff
        padding:10px
    .content
      position relative
      padding :18px
      .cartcontrol-wrapper
        position absolute
        right :18px
        bottom :5px
      .addCart
        position absolute
        top 15px
        right: 18px
        height :24px
        line-height :24px
        z-index 10
        padding: 0 12px
        box-sizing: border-box
        border-radius: 12px
        font-size: 10px
        color: #fff
        background: rgb(0, 160, 220)
        transition :all 0.2s
        opacity :1
        &.hide-enter,&.hide-leave-to
          opacity :0
    .rating
      padding :18px 0 6px 0
      .title
        line-height :14px
        margin-left :18px
      .rating-wrapper
        .user
          position :absolute
          right 0
          top :14px
          .username
            font-size :10px
          img
            width :12px
            height :12px
            border-radius :50%
        .text
          margin-top :6px
          font-size: 12px
          line-height: 16px
          color: rgb(7, 17, 27)
          .icon
            font-size :12px
            color :rgb(147,153,159)
            line-height :16px
            margin-right :4px
            &.icon-thumb_up
              color: rgb(0, 160, 220)
      .rating-item
        padding :16px 0
        position relative
        margin:0 18px
        border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
      .no-rating
        padding: 16px
        font-size: 12px
        color: rgb(147, 153, 159)
          
</style>