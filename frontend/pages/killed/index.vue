<template>
  <Index :deadPerson="deadPerson"/>
</template>

<script>
import Index from '~/components/templates/killed/Index.vue';

export default {
	components: {
		Index,
	},
	async asyncData({ $axios }) {
		const getData = await $axios.get('/api/getKilledPerson');
		
    return {
      deadPerson: getData.data,
    }
  }
}
</script>
