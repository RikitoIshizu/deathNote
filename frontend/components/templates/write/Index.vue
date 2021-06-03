<template>
  <section :class="$style.container">
    <Title
			filePath="210526/aa8b237f90d491419074486a52175a09"
			subTitle="デスノートに名前を書く"
		/>
    <div v-show="errorMessage" :class="$style.errorMessage">{{ errorMessage }}</div>
    <form :class="$style.registerArea" @submit.prevent="postKillerParsonData">
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
        <label for="detail" :class="$style.registerAreaInputItemLabel">
          死の詳細<span :class="$style.errorDetail">{{ getErrorMessage('detail') }}</span>
        </label>
        <textarea id="detail" :value="detail" :class="$style.registerAreaTextarea" @input="changeDetail"/>
      </div>
      <div :class="$style.buttonPosition">
        <Button text="戻る" to="/top" :class="$style.backButton" />
				<Button text="書く" :submit="true" />
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
    Title
  },
  data() {
    return {
      detail: '',
    }
  },
  mixins: [Mixin],
  mounted() {
    this.$set(this, 'inputData', [
      { name: 'killPersonName', label: '殺したい人', value: '' },
      { name: 'causeOfDeath', label: '死因', value: '' },
    ]);
	},
	methods: {
    // デスノートに名前を書く人を登録する
		postKillerParsonData() {
      if(!window.confirm('本当にいいのですね？後戻りはできませんよ？')) return;
      const { detail, errors, $set, $store } = this;
      const parameter = { detail };
      this.inputData.map(el => {
        parameter[`${el.name}`] = el.value;
        return el;
      });

      if(errors.length >= 0) $set(this, 'errors', []);

      $store.dispatch('changeIsLoading', true);
      this.$axios.post('/api/registerKillerPerson', parameter).then(response => {
        $store.dispatch('changeIsLoading', false);
        const { errorList, isError, message } = response.data;

				if(isError) {
					$set(this, 'errors', errorList);
          $set(this, 'errorMessage', message);
				} else {
					this.$router.push('/complete/write');
				}
      });
    },
  
    // 詳細を変更する
    changeDetail({ target }) {
      this.$set(this, 'detail', target.value);
    }
	}
}
</script>

<style lang="scss" module>
@import '~/components/templates/write/Index.scss';
</style>