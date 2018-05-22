
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
  },
  positiveSize (state) {
    return state.ratings.reduce( (pre,rating) => {
      const value = (rating.rateType===0)?1:0
      return pre + value
    },0)
  }

}
