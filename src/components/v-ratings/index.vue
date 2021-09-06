<template>
  <div class="shops">
    <div class="header">
      <div class="header-left">
        <div class="score">
          <span>{{ seller.score }}</span>
        </div>
        <p class="score-title">综合评分</p>
        <p class="rate">高于周边商家{{ seller.rankRate }}%</p>
      </div>
      <div class="header-right">
        <div class="score-wrapper">
          <span class="text">服务态度</span>
          <v-star class="star" :size="36" :score="seller.serviceScore"></v-star>
          <span class="score">{{seller.serviceScore}}</span>
        </div>
        <div class="score-wrapper">
          <span class="text">商品评分</span>
          <v-star class="star" :size="36" :score="seller.foodScore"></v-star>
          <span class="score">{{seller.foodScore}}</span>
        </div>
        <div class="score-wrapper">
          <span class="text">送达时间</span>
          <span class="delivery">{{seller.deliveryTime}}分钟</span>
        </div>
      </div>
    </div>
    <v-split></v-split>
  </div>
</template>

<script>
import VStar from "components/v-star/index.vue";
import VSplit from "components/v-split/index.vue";
export default {
  components:{VStar,VSplit},
  props: {
    seller: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {};
  },
  created() {},
};
</script>
<style lang="stylus" scoped>
  .header
    padding:18px
    display :flex
    .header-left
      text-align :center
      flex: 0 0 110px
      width :110px
      padding-right :18px
      border-right: 1px solid rgba(7, 17, 27, 0.1)
      @media only screen and (max-width 320px)
        flex: 0 0 90px
        width: 90px
      .score
        line-height :28px
        margin-bottom :6px
        font-size: 24px
        color: rgb(255, 153, 0)
      .score-title
        line-height :12px
        margin-bottom :8px
        font-size: 12px
        color: rgb(7, 17, 27)
        font-weight :700
      .rate
        // line-height :10px
        color: rgb(147, 153, 159)
        font-size: 10px
        margin-bottom :6px
    .header-right
      flex:1
      padding: 0 0 6px 24px
      @media only screen and (max-width: 320px)
        padding-left: 6px
      .score-wrapper
        display :inline-block
        margin-bottom :8px
        &.last-child
          margin-bottom :0
        .text
          display :inline-block
          font-size :12px
          line-height 18px
          vertical-align :top
          margin-right :3px
          color: rgb(7, 17, 27)
          font-weight :700
        .star
          display :inline-block
        .score
          font-size :12px
          line-height 18px
          vertical-align :top
        .delivery
          font-size :12px
          line-height 18px

</style>