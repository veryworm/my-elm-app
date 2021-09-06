<template>
  <div class="content">
    <div class="left-menu" ref="left-menu">
      <ul>
        <li
          v-for="(item, index) in goods"
          :key="index"
          class="menu-item"
          :class="{ current: currentIndex === index }"
          @click="_selectMenu(index, $event)"
        >
          <span class="text border-1px">
            <v-img
              class="v-img"
              v-if="item.type > 0"
              :imgType="item.type"
            ></v-img>
            {{ item.name }}
          </span>
        </li>
      </ul>
    </div>
    <div class="right-content" ref="right-content">
      <ul>
        <li
          v-for="(good, index) in goods"
          :key="index"
          class="good-item good-item-hook"
        >
          <h1 class="title">{{ good.name }}</h1>
          <ul>
            <li
              v-for="(food, index) in good.foods"
              :key="index"
              class="food-item-hook food-item border-1px"
              @click="selectFoodFunc(food, $event)"
            >
              <div class="icon1">
                <img class="img1" :datasrc="food.icon" width="57" height="57" />
              </div>
              <div class="content2">
                <h2 class="name">{{ food.name }}</h2>
                <p class="desc">{{ food.description }}</p>
                <div class="extra">
                  <span class="count">月售{{ food.sellCount }}份</span>
                  <span>好评率{{ food.rating }}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{ food.price }}</span>
                  <span class="old" v-show="food.oldPrice"
                    >￥{{ food.oldPrice }}</span
                  >
                </div>
                <div class="cartcontrol-wrapper">
                  <v-cartcontrol @add="onAdd" :food="food"></v-cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <v-shopcar
      ref="shopCart"
      :selectFoods="selectFoods"
      :delivery-price="seller.deliveryPrice"
      :min-price="seller.minPrice"
    ></v-shopcar>
    <v-food ref="food" @add="onAdd" :selectFoods="foods"></v-food>
  </div>
</template>
<script>
import { getGoods } from "api";
import VImg from "components/v-img/index.vue";
import VShopcar from "components/v-shopcar/index.vue";
import VCartcontrol from "components/v-cartcontrol/index.vue";
import VFood from "components/v-food/index.vue";
import BScroll from "better-scroll";
export default {
  components: { VImg, VShopcar, VCartcontrol, VFood },
  data() {
    return {
      goods: [],
      hookHeightArr: [],
      hookImg: [],
      scrollY: 0,
      foods: {},
      oldTop: 0,
      len:0
    };
  },
  props: {
    data: {
      type: String,
      default: () => {
        return "";
      },
    },
    seller: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  watch: {
    scrollY: {
      immediate: true,
      handler: "_lazyload",
    },
  },
  computed: {
    currentIndex() {
      for (let i = 0; i < this.hookHeightArr.length; i++) {
        let h1 = this.hookHeightArr[i];
        let h2 = this.hookHeightArr[i + 1];
        if (!h2 || (this.scrollY >= h1 && this.scrollY < h2)) {
          return i;
        }
      }
      return 0;
    },
    selectFoods() {
      let arr = [];
      this.goods.forEach((good) => {
        good.foods.forEach((food) => {
          if (food.count) {
            arr.push(food);
          }
        });
      });
      return arr;
    },
  },
  created() {
    getGoods({
      id: this.seller.id,
    }).then((res) => {
      console.log(res, "goods");
      this.goods = res;
      this.$nextTick(() => {
        this._initMenu();
        this._calucateHeight();
        this._loadImg()
      });
    });
  },
  methods: {
    _lazyload(newVal) {
      if (this.scrollY - this.oldTop > 400) {
        console.log(this.scrollY, ",if", this.oldTop);
        this._loadImg(newVal);
        this.oldTop = newVal;
      } else {
        this.debounce(this._loadImg, 1000,newVal)();
      }
    },
    debounce(fn, delay,newVal=0) {
      let timer = null;
      return () => {
        if (timer) {
          console.log(1111);
          clearTimeout(timer);
          timer = setTimeout(() => {
            fn(newVal);
          }, delay);
        } else {
          timer = setTimeout(() => {
            fn(newVal);
          }, delay);
        }
      };
    },
    _loadImg(val) {
      this.$nextTick(() => {
        let top = this.$refs["right-content"].clientHeight + val;
        let list = this.$refs["right-content"].getElementsByClassName("img1");
        for (let i = this.len; i < this.hookImg.length; i++) {
          if (this.hookImg[i] <= top) {
            list[i].src = list[i].getAttribute("datasrc");
            this.len = i
          }
        }
      });
    },
    selectFoodFunc(food, event) {
      if (!event._constructed) {
        return;
      }
      this.foods = food;
      this.$refs.food.show();
    },
    onAdd(target) {
      this.$nextTick(() => {
        this.$refs.shopCart.drop(target);
      });
    },
    _selectMenu(index, event) {
      if (!event._constructed) {
        return;
      }
      let hook =
        this.$refs["right-content"].getElementsByClassName("good-item-hook");
      let height = hook[index];
      this.rightContent.scrollToElement(height, 300);
    },
    _initMenu() {
      this.leftMenu = new BScroll(this.$refs["left-menu"], {
        click: true,
      });
      this.rightContent = new BScroll(this.$refs["right-content"], {
        probeType: 3,
        click: true,
      });
      this.rightContent.on("scroll", (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y));
      });
    },
    _calucateHeight() {
      let hook =
        this.$refs["right-content"].getElementsByClassName("good-item-hook");
      let hook2 =
        this.$refs["right-content"].getElementsByClassName("food-item-hook");
      let height = 0;
      let height2 = 0;
      this.hookHeightArr.push(height);
      this.hookImg.push(height2);
      for (let i = 0; i < hook.length; i++) {
        let item = hook[i];
        height += item.clientHeight;
        this.hookHeightArr.push(height);
      }
      for (let i = 0; i < hook2.length; i++) {
        let item = hook2[i];
        height2 += item.clientHeight;
        this.hookImg.push(height2);
      }
    },
  },
};
</script>
<style lang="stylus" scoped>
@import "../../common/stylus/mixin.styl"
  .content
    display:flex
    position :absolute
    top:178px
    bottom :46px
    width :100%
    overflow :hidden
    .left-menu
      flex :0 0 80px
      width :80px
      background-color: #f3f5f7;
      .menu-item
        display :table
        line-height :14px
        width :56px
        height :54px
        padding:0 12px
        &.current
          background :#fff
          position :relative
          margin-top :-1px
          z-index :10
          font-weight :700
          .text
            border-none()
        .v-img
          display :inline-block
          width :12px
          height :12px
          margin-right :2px
          background-size :12px 12px
          vertical-align :top
        .text
          width :56px
          font-size :12px
          vertical-align :middle
          display: table-cell;
          border-1px(rgba(7, 17, 27, 0.1));
    .right-content
      flex:1
      .title
        border-left: 2px solid #d9dde1
        padding-left :14px
        height :26px
        line-height :26px
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display :flex
        margin :18px
        padding-bottom :10px
        border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
        .icon1
          flex: 0 0 57px
          margin-right: 10px
        .content2
          flex:1
          .name
            font-size :14px
            color :rgb(7,17,27)
            margin :2px 0 8px 0
            height :14px
            line-height :14px
          .desc
            margin-bottom :8px
            font-size :10px
            line-height :12px
            color :rgb(7,17,27)
          .extra
            font-size :10px
            color :rgb(147,153,159)
            margin-bottom :8px
            .count
              display :inline-block
              margin-right :12px
          .price
            font-weight :700
            .now
              color :rgb(240,20,20)
              margin-right :8px
              font-size :14px
            .old
              text-decoration :line-through
              font-size :10px
              color :rgb(147,153,159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 0
</style>