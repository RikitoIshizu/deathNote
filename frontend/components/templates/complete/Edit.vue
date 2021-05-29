<template>
	<section :class="$style.container">
		<Title filePath="210430/231a8ea94be24bb2592ff4cf5d26c8c9" subTitle="変更完了" />
		<p :class="$style.message">キラの情報を変更しました。</p>
		<div :class="$style.buttonPosition">
      <Button text="トップページに戻る" to="/top" :class="$style.backButton" />
    </div>
	</section>
</template>

<script>
import Button from '~/components/atoms/Button.vue';
import Title from '~/components/molecules/Title.vue';

export default {
  components: {
		Button,
		Title,
	}
}
</script>

<style lang="scss" module>
@import '~/components/templates/complete/Index.scss'
</style>


