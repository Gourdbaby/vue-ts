<template>
  <div v-loading="loading">
    <div @click="jump">
      {{ title }}
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class App extends Vue {
  title: string;
  loading: boolean = false;

  constructor() {
    super();
    this.title = 'My Vue and CosmosDB Heroes Appaaa';
  }

  jump(): void{
    location.href = '/mobile/test.html'
  }
}
</script>

<style lang="less">
body{
  div{
    color: #009ec6;
  }
}
</style>
