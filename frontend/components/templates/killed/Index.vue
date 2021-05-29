<template>
  <section :class="$style.container">
    <Title
			filePath="210529/b34812f586b213c0a8974d990b9ad84c"
			subTitle="今までにデスノートに名前を書かれた人たち"
		/>
    <ul :class="$style.deadPersonList">
      <li v-for="(item, index) in deadPerson" :key="`${item.killerId}-${item.id}`" :class="$style.deadPersonListDetail">
				<div>No.{{ index }}</div>
        <div :class="$style.killPersonName">死亡者の名前:&nbsp;{{ item.killPersonName }}</div>
        <div :class="$style.causeOfDeath">死因:&nbsp;{{ item.causeOfDeath }}</div>
				<div :class="$style.detail">詳細:&nbsp;{{ item.detail === '' ? 'なし' : detail }}</div>
        <div :class="$style.killerName">デスノートに名前を書いた人:&nbsp;{{ item.killerName }}</div>
      </li>
    </ul>
    <ButtonArea :class="$style.buttonArea">
      <Button text="戻る" to="/top" :class="$style.backButton" />
    </ButtonArea>
  </section>
</template>

<script>
import Button from '~/components/atoms/Button.vue';
import ButtonArea from '~/components/molecules/ButtonArea.vue';
import Title from '~/components/molecules/Title.vue';

export default {
    components: {
        Button,
        ButtonArea,
        Title,
    },
    props: {
        deadPerson: {
            type: Array,
            required: true,
        }
    }
}
</script>

<style lang="scss" module>
@import '~/components/templates/killed/Index.scss';
</style>
