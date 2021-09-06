<template>
  <div class="shopcar">
    <div class="wrapper" @click="toggleList">
      <div class="left">
        <div class="logo-wrapper">
          <div class="logo" :class="{'highlight':totalPrice>0}">
            <i class="icon-shopping_cart" :class="{'highlight':totalPrice>0}"></i>
          </div>
          <div class="num" v-show="totalPrice">{{totalCount}}</div>
        </div>
        <div class="price" :class="{'highlight':totalPrice>0}">￥{{totalPrice}}</div>
        <div class="description">另需配送费￥{{deliveryPrice}}元</div>
      </div>
      <div class="right">
        <div @click.stop.prevent="pay" class="pay" :class="isEnough">{{paydesc}}</div>
      </div>
    </div>
    <div class="ball-container">
      <div v-for="(ball,index) in balls" :key="index" transition="drop">
        <transition @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
          <div class="ball" v-show="ball.show">
            <div class="inner inner-hook"></div>
          </div>
        </transition>
      </div>
    </div>
    <transition name="move">
      <div v-show="listShow" class="shopcart-list">
        <div class="list-header">
          <h1 class="title">购物车</h1>
          <span class="empty" @click="empty">清空</span>
        </div>
        <div class="list-content" ref="listContent">
          <ul>
            <li v-for="(item,index) in selectFoods" :key="index" class="list-item">
              <span class="name">{{item.name}}</span>
              <span class="price">￥{{item.price*item.count}}</span>
              <div class="v-cartcontrol">
                <v-cartcontrol :food="item"></v-cartcontrol>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
    <transition name="mask">
      <div v-show="listShow" class="mask-wrapper"></div>
    </transition>
  </div>
</template>
<script>
import VCartcontrol from "components/v-cartcontrol/index.vue";
import BScroll from "better-scroll";

const innerClsHook = "inner-hook";
const BALL_LEN = 10;

function createBalls() {
  var balls = [];
  for (let i = 0; i < BALL_LEN; i++) {
    balls.push({ show: false });
  }
  return balls;
}

export default {
  components: {
    VCartcontrol
  },
  props: {
    deliveryPrice: {
      type: Number,
      default: () => {
        return 0;
      }
    },
    minPrice: {
      type: Number,
      default: () => {
        return 0;
      }
    },
    selectFoods: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      balls: createBalls(),
      fold: true
    };
  },
  computed: {
    totalPrice() {
      let value = 0;
      this.selectFoods.forEach(item => {
        value += item.price * item.count;
      });
      return value;
    },
    totalCount() {
      let value = 0;
      this.selectFoods.forEach(item => {
        value += item.count;
      });
      return value;
    },
    paydesc() {
      if (this.totalPrice === 0) {
        return `${this.minPrice}起送`;
      } else if (this.totalPrice < this.minPrice) {
        let diff = this.minPrice - this.totalPrice;
        return `还差￥${diff}元起送`;
      } else {
        return "去结算";
      }
    },
    isEnough() {
      if (this.minPrice <= this.totalPrice) {
        return "enough";
      } else {
        return "not-enough";
      }
    },
    listShow: {
      get() {
        if (!this.totalCount) {
          return false;
        }
        if (!this.fold) {
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new BScroll(this.$refs.listContent, {
                click: true
              });
            } else {
              this.scroll.refresh();
            }
          });
        }
        return !this.fold;
      },
      set() {
        if (!this.totalCount) {
          this.fold = false;
        }
      }
    }
  },
  watch: {
    // 控制当商品数量减少到0时，购物车栏会叠起来，当再次增加商品时，因为此时fold为false，所以购物车栏自动会显示。
    totalCount: {
      handler(val) {
        if (!val) {
          this.fold = true;
        }
      }
    }
  },
  created() {
    this.dropBalls = []; //不被响应式渲染的数据
  },
  methods: {
    pay(){},
    empty() {
      this.selectFoods.forEach((item)=>{
        item.count = 0
      })
    },
    toggleList() {
      if (!this.totalCount) {
        return;
      }
      this.fold = !this.fold;
    },
    beforeDrop(el) {
      console.log(this.dropBalls, "beforeDrop");
      // el:inner ball:icon
      // ball:y轴方向的显示 inner：x轴方向的显示
      const ball = this.dropBalls[this.dropBalls.length - 1];
      const rect = ball.el.getBoundingClientRect();
      const x = rect.left - 32;
      const y = -(window.innerHeight - rect.top - 22);
      el.style.display = "";
      el.style.transform = el.style.webkitTransform = `translate3d(0,${y}px,0)`;
      console.log(el, "el");
      const inner = el.getElementsByClassName(innerClsHook)[0];
      console.log(inner, "inner");
      inner.style.transform = inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
    },
    dropping(el, done) {
      // 重绘
      this._reflow = document.body.offsetHeight;
      el.style.transform = el.style.webkitTransform = "translate3d(0,0,0)";
      const inner = el.getElementsByClassName(innerClsHook)[0];
      inner.style.transform = inner.style.webkitTransform = `translate3d(0,0,0)`;
      el.addEventListener("transitionend", done);
    },
    afterDrop(el) {
      let ball = this.dropBalls.shift();
      if (ball.show) {
        ball.show = false;
        el.style.display = "none";
      }
      // console.log(this.dropBalls,'after');
    },
    drop(el) {
      for (let i = 0; i < this.balls.length; i++) {
        const ball = this.balls[i];
        if (!ball.show) {
          ball.show = true;
          ball.el = el;
          this.dropBalls.push(ball); //收藏下落的小球
          return;
        }
      }
    }
  }
};
</script>
<style lang="stylus" scoped>
@import "../../common/stylus/mixin.styl"
.shopcar
  position :fixed
  bottom :0
  left :0
  width :100%
  height :48px
  z-index :50
  .wrapper
    display :flex
    background: #141d27
    color: rgba(255, 255, 255, 0.4)
    .left
      flex :1
      .logo-wrapper
        display :inline-block
        position :relative
        top:-10px
        border-radius :50%
        width :56px
        height :56px
        padding:6px
        margin :0 12px
        box-sizing :border-box
        background :#141d27
        .logo
          width :100%
          height :100%
          border-radius :50%
          background :#2d343c
          text-align :center
          &.highlight
            background: rgb(0, 160, 220)
          .icon-shopping_cart
            line-height :44px
            font-size :24px
            &.highlight
              color: #fff
        .num
          position :absolute
          top :0px
          right :0px
          width :24px
          height :16px
          line-height :16px
          text-align :center
          border-radius: 16px
          font-size: 9px
          font-weight: 700
          color: #fff
          background: rgb(240, 20, 20)
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4)
      .price
        display: inline-block
        vertical-align :top
        padding 0 12px 12px 0
        margin :12px 12px 0 0
        line-height :24px
        box-sizing: border-box
        border-right: 1px solid rgba(255, 255, 255, 0.1)
        font-size: 16px
        font-weight: 700
        &.highlight
          color: #fff
      .description
        display :inline-block
        vertical-align :top
        line-height :24px
        margin-top 12px
        font-size: 10px
        font-weight: 700
    .right
      flex :0 0 105px
      width :105px
      height :48px
      .pay
        height: 48px
        line-height: 48px
        text-align: center
        font-size: 12px
        font-weight: 700
        background: #2b333b
        &.enough
          background: #00b43c
          color: #fff
        &.not-enough
          background: #2b333b
  .ball-container
    .ball
      position :fixed
      left :32px
      bottom :22px
      z-index 200        
      transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
      .inner
        width :16px
        height :16px
        border-radius: 50%
        background :blue
        transition: all 0.4s linear //x轴
  
  .shopcart-list
    position :absolute
    left :0
    top :0
    width :100%
    z-index -1
    transition :all 0.5s
    transform: translate3d(0, -100%, 0)
    &.move-enter, &.move-leave-to
      transform: translate3d(0, 0, 0)
    .list-header
      height: 40px
      line-height: 40px
      padding: 0 18px
      background: #f3f5f7
      border-bottom: 1px solid rgba(7, 17, 27, 0.1)
      .title
        float: left
        font-size: 14px
        color: rgb(7, 17, 27)
      .empty
        float: right
        font-size: 12px
        color: rgb(0, 160, 220)
    .list-content
      max-height :217px
      padding :0 18px
      overflow :hidden
      background :#fff
      .list-item
        padding:12px 0
        position relative
        border-1px(rgba(7, 17, 27, 0.1))
        .name
          line-height :24px
          font-size :14px
          color rgb(7,17,27)
        .price
          position :absolute
          right 84px
          font-size 10px
          font-weight 700
          line-height :24px
          color:rgb(240,20,20)
        .v-cartcontrol
          position :absolute
          right 0
          bottom:6px
  .mask-wrapper
    position fixed
    top:0
    left:0
    width 100%
    height 100%
    background :rgba(7,17,27,0.6)
    z-index -2
    opacity :1
    transition :all 0.5s
    &.mask-enter,&.mask-leave-to
      opacity :0
</style>
