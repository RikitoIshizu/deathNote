import Vue from 'Vue';

export const state = () => ({
	isLoading: false,
	isLogin: false,
});

export const mutations = {
	CHANGE_ISLOADING: (state, payload) => {
		Vue.set(state, 'isLoading', payload);
	},

	SET_LOGIN: (state, payload) => {
		Vue.set(state, 'isLogin', payload);
	}
};

export const actions = {
	changeIsLoading({commit}, value) {
		commit('CHANGE_ISLOADING', value);
	},

	async isLoginCheck({ commit }) {
		await this.$axios.get('/api/checkLogin').then(response => {
			commit('SET_LOGIN', response.data.isLogin);
		});
	},
}