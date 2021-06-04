<template>
  <section :class="$style.container">
		<Title
			filePath="210522/8f6d2deb92a782b544bbc61469722cac"
			subTitle="キラの情報を変更する"
		/>
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
      <div>
        <Button text="キラをやめる" @click="deleteKilaData"/>
      </div>
      <div :class="$style.buttonPosition">
        <Button text="戻る" to="/top" :class="$style.backButton" />
        <Button text="変更する" type="submit" @click="editKilaData"/>
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
  props: {
    kilaData: {
      type: Object,
      required: true,
    }
  },
  mixins: [Mixin],
  mounted() {
    const { kilaData } = this;
    this.$set(this, 'inputData', [
      { name: 'name', label: '名前', value: kilaData.name },
      { name: 'mail', label: 'メールアドレス', value: kilaData.mail },
      { name: 'password', label: 'パスワード', value: kilaData.password },
      { name: 'age', label: '年齢',　value: kilaData.age.toString() },
      { name: 'occupation', label: '職業',　value: kilaData.occupation },
    ]);
  },
  methods: {
    //  キラの情報を変更する
    async editKilaData() {
      const parameter = {};
      this.inputData.map((el) => {
        parameter[`${el.name}`] = el.value;
        return el;
      });

      parameter.id = this.kilaData.id;

      this.$store.dispatch('changeIsLoading', true);
      await this.$axios.post('api/editKilaData', parameter).then((response) => {
        const { isError } = response.data;
        
        if(!isError) this.$router.push('/complete/edit');

        this.$store.dispatch('changeIsLoading', false);
      });
    },

    // キラの情報を削除する
    async deleteKilaData() {
      if(!window.confirm('本当にキラをやめますか？')) return;

      const { id } = this.kilaData;

      this.$store.dispatch('changeIsLoading', true);
      await this.$axios.post('api/deleteKilaData', { id }).then((response) => {
        this.$store.dispatch('changeIsLoading', false);
        this.$router.push('complete/delete');
      })

    }
  }
}
</script>

<style lang="scss" module>
@import '~/components/templates/aboutKila/Index.scss';
</style>
