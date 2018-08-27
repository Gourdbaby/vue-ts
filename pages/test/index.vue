<template>
  <div v-loading="loading">
    {{ title }}
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
    this.title = 'Hi welcome to vue and ts and webpack world'; 
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
