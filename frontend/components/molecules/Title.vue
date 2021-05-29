<template>
	<div>
  	<h1 :class="$style.title">
    	<a href="https://fontmeme.com/ja/font-death-note/" target="_blank">
      	<img :src="createUrl" alt="font-death-note" border="0">
    	</a>
  	</h1>
		<div v-if="subTitle" :class="$style.subTitle">
			{{ subTitle }}
		</div>
	</div>
</template>

<script>
export default {
  props: {
    filePath: {
      type: String,
      required: true,
    },
    subTitle: {
      type: String,
      required: false,
      default: ''
    }
  },
  computed: {
    createUrl() {
      return `https://fontmeme.com/permalink/${this.filePath}.png`;
    },
  }
}
</script>

<style lang="scss" module>
@import '~/components/molecules/Title.scss';
</style>

