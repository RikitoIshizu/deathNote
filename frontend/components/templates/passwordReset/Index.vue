<template>
	<section :class="$style.container">
		<Title
			filePath="210430/50cc9929911c6e86ed16071fc6004c18"
			subTitle="パスワードをリセットする"
		/>
		<div v-show="errorMessage" :class="$style.errorMessage">{{ errorMessage }}</div>
		<form :class="$style.inputArea" >
			<div v-for="item in inputData" :key="item.name" :class="$style.registerAreaInputItem">
        <label :for="item.name" :class="$style.registerAreaInputItemLabel">
          {{ item.label }}<span :class="$style.errorDetail">{{ getErrorMessage(item.name) }}</span>
        </label>
        <Input
          :id="item.name"
          :name="item.name"
          :value="item.value"
          :class="$style.inputStyle"
          @onChange="changeData"
        />
      </div>
			<ButtonArea>
				<Button text="戻る" to="/openDeathNote" />
				<Button text="パスワード変更" @click="resetPassword"/>
			</ButtonArea>
    </form>
	</section>
</template>

<script>
import Button from '~/components/atoms/Button.vue';
import Input from '~/components/atoms/Input.vue';
import ButtonArea from '~/components/molecules/ButtonArea.vue';
import Title from '~/components/molecules/Title.vue';
import Mixin from '~/mixins/error'; 

export default {
  components: {
		Button,
		Input,
		Title,
		ButtonArea,
	},
	mixins: [Mixin],
	mounted() {
    this.$set(this, 'inputData', [
      { name: 'mail', label: 'メールアドレス', value: '' },
      { name: 'password', label: 'パスワード', value: '' },
    ])
  },
	methods: {	
		async resetPassword() {
			const { $set, $store } = this;
			const parameter = {};
      this.inputData.map((el) => {
        parameter[`${el.name}`] = el.value;
        return el;
      });

      if(this.errors.length >= 0) this.errors.length = 0;

			$store.dispatch('changeIsLoading', true);
			await this.$axios.post('/api/resetPassword', parameter).then((response) => {
				$store.dispatch('changeIsLoading', false);

				const { errorList, isError, message } = response.data;

				if(isError) {
					$set(this, 'errors', errorList);
          $set(this, 'errorMessage', message);
				} else {
					this.$router.push('/passwordReset/complete');
				}
			});
		}
	}
}
</script>

<style lang="scss" module>
@import '~/components/templates/passwordReset/Index.scss';
</style>
