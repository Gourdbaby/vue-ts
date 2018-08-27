declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

declare var $;

declare function require(path: string): any;