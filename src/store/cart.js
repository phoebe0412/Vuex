import axios from 'axios'

export default {
  state:{
    cart: {
      carts: [],
    },
  },
  actions: {
    getCart(context) {
      context.commit('LOADING', true)
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      axios.get(url).then((response) => {
        if (response.data.data.carts) {
          context.commit('CART', response.data.data)
        }
        context.commit('LOADING', false)
        console.log('取得購物車', response.data.data);
      });
    },
    removeCart(context, id) {
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`;
      context.commit('LOADING', true)
      axios.delete(url).then((response) => {
        context.commit('LOADING', false)
        context.dispatch('getCart')
        console.log('刪除購物車項目', response);
      });
    },
    addtoCart(context, { id, qty }) {
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      context.commit('LOADING', true)
      const item = {
        product_id: id,
        qty,
      };
     context.commit('LOADING', false)
      axios.post(url, { data: item }).then((response) => {
        context.commit('LOADING', false)
        context.dispatch('getCart')
        console.log('加入購物車:', response);
      });
    },
  },
  mutations: {
    CART(state, payload){
      state.cart = payload
    }
  },
  getters: {
    cart: state => state.cart
  },
}