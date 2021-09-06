<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar" ref="avatar">
        <img :src="seller.avatar" width="64" height="64" alt />
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">{{seller.description}}/{{seller.deliveryTime}}分钟送达</div>
        <div class="support" v-if="seller.supports">
          <v-img class="v-img" :imgType="seller.supports[0].type"></v-img>
          <span class="img-description">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="support-count" @click="showDialog">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin">
      <span class="bulletin-icon"></span>
      <span class="bulletin-content">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%" alt="">
    </div>
    <transition name="fade">
      <div class="detail-wrapper" v-show="showFlag">
        <div class="detail-main clearFix">
          <div class="content">
            <h1 class="name">{{seller.name}}</h1>
            <div class="star-wrapper">
              <v-star :size="48" :score="seller.score"></v-star>
            </div>
            <div class="title">
              <v-line title="商家信息"></v-line>
            </div>
            <div v-if="seller.supports" class="supports">
              <v-img class="v-img" :supports="seller.supports">
              </v-img>
            </div>
            <div class="line">
              <v-line class="v-line" title="商家公告"></v-line>
            </div>
            <div class="description-two">
              {{seller.bulletin}}
            </div>
          </div>
        </div>
        <div class="detail-close" @click="showDialog">
          <i class="icon-close"></i>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import VImg from "components/v-img/index.vue";
import VStar from "components/v-star/index.vue";
import VLine from "components/v-line/index.vue";
export default {
  components:{VImg,VStar,VLine},
  data(){
    return {
      showFlag:false
    }
  },
  props: {
    seller: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  created(){},
  methods:{
    showDialog(){
      this.showFlag = !this.showFlag
    }
  },
  mounted(){
  }
};
</script>
<style lang="stylus" scoped>
  @import "../../common/stylus/mixin.styl"
  .header
    background: rgba(7,17,27,0.5)
    color: #fff
    position :relative
    overflow :hidden
    .content-wrapper 
      padding: 24px 24px 0 24px
      position :relative
      .avatar
        display: inline-block
        vertical-align :top
        img
          border-radius :2px
      .content
        display: inline-block
        margin-left 16px
        .title
          margin-bottom :8px
        .brand
          display :inline-block
          width :30px
          height :18px
          bg-image('brand')
          background-size :30px 18px
          background-repeat :no-repeat
          vertical-align :top
        .name
          margin-left :6px
          font-size :14px
          line-height :18px
          font-weight :bold
        .description
          margin:8px 0 10px 0px
          line-height :12px
          font-size :12px
        .support
          margin-bottom :2px
          .v-img
            display :inline-block
            width :14px
            height :14px
            background-size :14px 14px
            background-repeat :no-repeat
            margin-right :4px
          .img-description
            font-size :10px
            color :rgb(255,255,255)
            line-height :12px
            vertical-align :top
      .support-count
        position :absolute
        color :rgb(255,255,255)
        right :12px
        bottom :0
        height :24px
        line-height :24px
        background: rgba(0, 0, 0, 0.2)
        padding: 0 8px
        border-radius: 14px
        text-align :center
        .count
          font-size :10px
          vertical-align :top
        .icon-keyboard_arrow_right
          margin-left: 2px
          line-height: 24px
          font-size: 10px
        
    .bulletin
      position :relative
      height :28px
      margin-top:18px
      line-height :28px
      white-space :nowrap
      overflow :hidden
      text-overflow :ellipsis
      padding: 0 22px 0 12px
      background :rgba(7,17,27,0.2)
      .bulletin-icon
        display :inline-block
        vertical-align :top
        margin-top :8px
        width :22px
        height :12px
        background-size :22px 12px
        background-repeat :no-repeat
        bg-image('bulletin')
      .bulletin-content
        font-size :10px
        vertical-align :top
        margin: 0 4px
      .icon-keyboard_arrow_right
        position:absolute
        right :12px
        top:8px
        font-size :10px
    .background
      width :100%
      height :100%
      position :absolute
      z-index :-1
      top:0
      left:0
      filter :blur(10px)
    .detail-wrapper
      position :fixed
      top :0
      left :0
      width :100%
      height :100%
      z-index: 100
      overflow: auto
      background:rgba(7,17,27,0.8)
      backdrop-filter :blur(10px)
      &.fade-enter-active,&.fade-leave-active
        transition :all 0.5s ease
      &.fade-enter,&.fade-leave-to
        opacity :0
      .detail-main
        min-height :100%
        width :100%
        .content
          margin-top :64px
          padding-bottom 64px
          .name
            line-height: 16px
            text-align: center
            font-size: 16px
            font-weight: 700
          .star-wrapper
            margin:16px 0 28px 0
            text-align center
          .supports
            width :80%
            margin :0 auto
          .line
            margin-top 28px
          .description-two
            margin :36px
            line-height :24px
      .detail-close
        width 32px
        height 32px
        margin :-64px auto 0 auto
        font-size 32px
</style>