<template>
  <section :class="$style.container">
    <Title filePath="210426/cf7f979d1762cfa21c6c5e0650eddfec" />
    <div v-show="errorMessage" :class="$style.errorMessage">{{ errorMessage }}</div>
    <form :class="$style.loginArea" @submit.prevent>
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
      <ButtonArea :class="$style.submitButtonArea">
        <Button text="デスノートを開く" type="submit" :class="$style.buttonStyle" @click="login"/>
        <Button text="キラになる" to="/contract" :class="$style.buttonStyle"/>
        <Button text="パスワードを忘れた" to="/passwordReset" :class="$style.buttonStyle"/>
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
    ButtonArea,
    Title,
  },
  mixins: [Mixin],
  mounted() {
    this.$set(this, 'inputData', [
      { name: 'mail', label: 'メールアドレス', value: '' },
      { name: 'password', label: 'パスワード', value: '' },
    ])
  },
  methods: {
    async login() {
      const { $set, $store } = this;
			const parameter = {};
      this.inputData.map((el) => {
        parameter[`${el.name}`] = el.value;
        return el;
      });

      this.$set(this, 'errors', []);
      $store.dispatch('changeIsLoading', true);
      await this.$axios.post('/api/login', parameter).then((response) => {
        const { errorList, isError, message } = response.data;

				if(isError) {
					$set(this, 'errors', errorList);
          $set(this, 'errorMessage', message);
        } else {
          this.$router.push(response.data.route);
        }
        
        $store.dispatch('changeIsLoading', false);
      })
    }
  },
}
</script>

<style lang="scss" module>
@import "~/pages/openDeathNote/index.scss";
</style>

