<template>
  <section :class="$style.container">
    <Title filePath="210427/3a6c5cb21ee30a4cc4e29daf7881eae8" subTitle="キラになる" />
    <div v-show="errorMessage" :class="$style.errorMessage">{{ errorMessage }}</div>
    <form :class="$style.registerArea">
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
      <div :class="$style.buttonPosition">
        <Button text="戻る" to="/openDeathNote" :class="$style.backButton" />
        <Button text="契約する" type="submit" @click="registerAccount"/>
      </div>
    </form>
  </section>
</template>

<script>
import Button from '~/components/atoms/Button.vue';
import Input from '~/components/atoms/Input.vue';
import Title from '~/components/molecules/Title.vue';
import Mixin from '~/mixins/error'; 

export default {
	components: {
    Button,
    Input,
    Title,
  },
  mixins: [Mixin],
  mounted() {
    this.$set(this, 'inputData', [
      { name: 'name', label: '名前', value: '' },
      { name: 'mail', label: 'メールアドレス', value: '' },
      { name: 'password', label: 'パスワード', value: '' },
      { name: 'age', label: '年齢',　value: '' },
      { name: 'occupation', label: '職業',　value: '' },
    ])
  },
  methods: {
    async registerAccount() {
      if(!window.confirm('本当に良いのですね？後戻りはできませんよ？')) return;
      const parameter = {};
      this.inputData.map((el) => {
        parameter[`${el.name}`] = el.value;
        return el;
      });

      if(this.errors.length >= 0) this.errors.length = 0;

      this.$store.dispatch('changeIsLoading', true);
      await this.$axios.post('/api/register', parameter).then((response) => {
        const { errorList, isError, message } = response.data;
        
        if(isError) {
          this.$set(this, 'errors', errorList);
          this.$set(this, 'errorMessage', message);
        } else {
          this.$router.push('/complete');
        }

        this.$store.dispatch('changeIsLoading', false);
      });
    },
  },
}
</script>

<style lang="scss" module>
@import '~/components/templates/contract/Index.scss';
</style>
