<template>
  <div>
    <nuxt/>
    <div v-show="$store.state.isLoading" :class="$style.loadingMode">
      <div :class="$style.centerSrring">Loading...</div>
    </div>
  </div>
</template>

<style lang="scss" module>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  background: $black;
  color: $white;

  *, *:before, *:after {
    box-sizing: border-box;
    margin: 0;
  }

  .loadingMode {
    @include container;
    opacity: 0.75;
    position: fixed;
    z-index: 1;
    top: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    
    .centerSrring {
      color: $white;
      font-size: 29px;
    }
  }
}
</style>

