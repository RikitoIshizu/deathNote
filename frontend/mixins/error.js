export default {
  data() {
    return {
			inputData: [],
      errors: [],
      errorMessage: '',
    }
  },
  computed: {
  	getErrorMessage() {
      return errorName => {
        const errorMessage = this.errors.filter(el => el.param === errorName);
        return errorMessage.length ? errorMessage[0].msg : '';
      }
    }
	},
	methods: {
		changeData(e, name) {
      const { inputData } = this;

      inputData.map((el, index) =>
        el.name === name ? this.$set(inputData[index], 'value', e) : null
      );
    },
	}
}