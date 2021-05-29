<template>
	<Index :kilaData="kilaData"/>
</template>

<script>
import Index from '~/components/templates/aboutKila/Index.vue';

export default {
	components: {
		Index,
  },
  async asyncData({ $axios }) {
    const getData = await $axios.get('/api/getKilaData');

    return {
      kilaData: getData.data,
    }
  }
}
</script>