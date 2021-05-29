<template>
  <button v-if="!submit && !to" @click.prevent="onClick" :class="$style.buttonDesign">
    {{ text }}
  </button>
  <button v-else-if="submit" type="submit" :class="$style.buttonDesign">
    {{ text }}
  </button>
  <nuxt-link v-else :to="to" :class="$style.nuxtLinkStyle">
    {{ text }}
  </nuxt-link>
</template>

<script>
export default {
  props: {
    text: {
      type:String,
      required: true,
    },
    to: {
      type: String,
      required: false,
      default: '',
    },
    submit: {
      type: true,
      required: false,
      default: false,
    }
  },
  methods: {
    onClick() {
      this.$emit('click')
    }
  },
}
</script>

<style lang="scss" module>
@import '~/components/atoms/Button.scss';
</style>

