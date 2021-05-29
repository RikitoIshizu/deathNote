<template>
  <input
    :value="value"
    :class="$style.inputDesign"
    @input="onChangeValue"
  />
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: false,
      default: ''
    },
  },
  methods: {
    onChangeValue(e) {
      this.$emit('onChange', e.target.value, this.name);
    }
  }
}
</script>

<style lang="scss" module>
@import '~/components/atoms/Input.scss';
</style>
