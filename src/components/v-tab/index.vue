<template>
  <div id="app">
    <div class="tab">
      <div v-for="item in tabData" :key="item.label" class="tab-item border-1px">
        <router-link :to="'/'+item.name">{{item.label}}</router-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: {
    tabData: {
      type: Array,
      default: () => {
        return [];
      }
    }
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

  .tab
    display :flex
    width :100%
    height :40px
    line-height :40px
    border-1px(rgba(7,17,27,0.1))
    .tab-item
      flex :1
      text-align :center
      &>a
        display :block
        text-decoration :none
        &.active
          color :rgb(240,20,20)
</style>


