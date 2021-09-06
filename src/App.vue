<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <v-tab :tabData="tabData"></v-tab>
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script>
import { getSeller } from "api";
import VHeader from "components/v-header/index.vue";
import VTab from "components/v-tab/index.vue";
import { urlParse } from "common/js/utils";
export default {
  name: "App",
  components: { VHeader, VTab },
  data() {
    return {
      searchText: "",
      check: "",
      showD: false,
      seller: {
        id: urlParse().id,
      },
      tabData: [
        {
          label: "商品",
          name: "goods",
        },
        {
          label: "评价",
          name: "ratings",
        },
        {
          label: "商家",
          name: "shops",
        },
      ],
    };
  },
  mounted() {
    getSeller({
      id: this.seller.id,
    }).then((res) => {
      console.log(res, "seller");
      this.seller = Object.assign({}, this.seller, res);
    });
    setTimeout(() => {
      this.showD = true;
    }, 0);
  },
  methods: {},
};
</script>

<style lang="stylus" rel="stylesheet/stylus"></style>
