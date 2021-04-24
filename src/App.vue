<template>
  <div id="app">
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>


<script>
import EmptyLayOut from "@/layouts/EmptyLayOut";
import MainLayOut from "@/layouts/MainLayOut";

export default {
  computed: {
    layout() {
      return (this.$route.meta.layout || "empty") + "-layOut";
    },
  },
  components: {
    EmptyLayOut,
    MainLayOut,
  },
  methods: {
    async testFunc() {
      console.log(`asd`);
    },
  },
};
</script>

<style lang="scss">
@import "~materialize-css/dist/css/materialize.min.css";
@import "assets/index.css";
</style>
