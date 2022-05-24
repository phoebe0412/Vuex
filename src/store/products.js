import axios from 'axios'

export default {
  // state 屬於模組區域變數
  // actions, muations, getters 屬於全域變數
  namespaced: true, // actions, muations, getters 屬於區域變數
  state:{
    products: [],
    categories: [],
  },
  actions: {
    getProducts(context) {
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`;
      context.commit('LOADING', true, { root: true })
      axios.get(url).then((response) => {
        context.commit('PRORDUCTS', response.data.products)
        context.commit('CATEGORIES', response.data.products)
        console.log('取得產品列表:', response);
        context.commit('LOADING', false, { root: true })
      });
    },
  },
  mutations: {
    PRORDUCTS(state, payload){
      state.products = payload
    },
    CATEGORIES(state, payload){
      const categories = new Set();
      payload.forEach((item) => {
        categories.add(item.category);
      });
      state.categories = Array.from(categories);
    },
  },
  getters: {
    categories: state => state.categories,
    products: state => state.products,
  }
}