<template>
  <section :class="$style.container">
    <Title
			filePath="210520/0f14fc03b371f63aebbd87056a9d4853"
			subTitle="メニュー"
		/>
		<div :class="$style.buttonArea">
    	<Button text="デスノートを閉じる" :class="$style.buttonStyle" @click="logout"/>
      <Button text="デスノートに名前を書く" to="/write" :class="$style.buttonStyle" />
      <Button text="デスノートに名前を書かれた人たち" to="/killed" :class="$style.buttonStyle" />
			<Button text="キラの情報を変える" to="/aboutKila" :class="$style.buttonStyle" />
		</div>
  </section>
</template>

<script>
import Button from '~/components/atoms/Button.vue';
import Title from '~/components/molecules/Title.vue';

export default {
  components: {
		Button,
    Title
  },
  methods: {
		// ログアウト
    async logout() {
      this.$store.dispatch('changeIsLoading', true);
      this.$axios.post('/api/logout').then(response => {
        if(response.data.logout) this.$router.push('/openDeathNote');
        this.$store.dispatch('changeIsLoading', false);
      });
    }
  }
}
</script>

<style lang="scss" module>
@import '~/components/templates/top/Index.scss';
</style>

