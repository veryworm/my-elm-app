<template>
  <div class="shops">
    <div class="header">
      <p class="title">{{ seller.name }}</p>
      <div class="favorite" @click="toggleFavorite">
        <span class="icon-favorite" :class="{'active':favorite}"></span>
        <span class="text">{{favoriteText}}</span>
      </div>
    </div>
    <v-split></v-split>
    <div class="seller-img">
      <h1 class="title">商家实景</h1>
      <div class="pic" ref="picWrapper">
        <ul ref="picul">
          <li class="pic-item" v-for="(pic, index) in seller.pics" :key="index">
            <img width="120" height="90" :src="pic" alt="" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import VSplit from "components/v-split/index.vue";
import BScroll from "better-scroll";
import {saveToLocal,readToLocal} from 'common/js/storage'

const KEY = "favorite"

export default {
  components: { VSplit },
  props: {
    seller: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      favorite:false,
    };
  },
  watch: {
    seller() {
      this._caculateWidth();
    },
  },
  computed:{
    favoriteText(){
      return this.favorite?'已收藏':'收藏'
    }
  },
  created(){
    this.favorite = readToLocal(this.seller.id,KEY,false)
  },
  mounted() {
    this._caculateWidth();
  },
  methods: {
    toggleFavorite() {
      this.favorite = !this.favorite
      saveToLocal(this.seller.id,KEY,this.favorite)
    },
    _caculateWidth() {
      if (this.seller.pics) {
        let width = 120;
        let margin = 6;
        let len = this.seller.pics.length;
        let totalWidth = (width + margin) * len - margin;
        this.$refs.picul.style.width = totalWidth + "px";
        this.$nextTick(() => {
          if (!this.picScroll) {
            this.picScroll = new BScroll(this.$refs.picWrapper, {
              scrollX: true,
              eventPassthrough: "vertical",
            });
          } else {
            this.picScroll.refresh();
          }
          console.log(this.picScroll, ",this.picScroll");
        });
      }
    },
  },
};
</script>
<style lang="stylus" scoped>
  .shops
    width :100%
    height :100%
    .header
      margin:18px
      position :relative
      .title
        font-size :14px
        color :rgb(7,17,27)
        line-height :14px
        font-weight :700
      .favorite
        text-align :center
        width :36px
        height :36px
        position :absolute
        right :0
        top:-12px
        // bottom :3px
        .icon-favorite
          font-size :24px
          line-height :24px
          color: #d4d6d9
          display :block
          &.active
            color:rgb(240,20,20)
        .text
          font-size :10px
          color:rgb(77,85,93)
          line-height :10px
          display :block
          margin-top :6px
    .seller-img
      margin:18px
      .title
        margin-bottom :12px
      .pic
        width :100%
        overflow :hidden
        white-space :nowrap
        .pic-item
          display :inline-block
          width :120px
          height :90px
          margin-right :6px
          &:last-child
            margin-right :0
</style>