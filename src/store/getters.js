
/*
基于state的计算属性
 */
export default {
  totalCount (state) {

      return state.cartFoods.reduce((pre,nextFood) => {
        return pre+nextFood.count
      },0)
  },
  totalPrice (state) {

    return state.cartFoods.reduce((pre,nextFood) => {
      return pre+nextFood.count*nextFood.price
    },0)
  }

}
