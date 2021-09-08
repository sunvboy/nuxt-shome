export default {
    SET_DETAIL_PRODUCT(state, data){
        state.detailProduct = data;
    },
    SET_PRODUCT_WISHLIST(state, productid){
        const array = state.detailProduct.relaList
        let newComment = array.filter((item) => {
            if (Number(item.id) === Number(productid)) {
                return item.wishlist = 1
            }
        })

    },
    DEL_WISHLIST_PRODUCT(state, productid){
        const array = state.detailProduct.relaList
        let newComment = array.filter((item) => {
            if (Number(item.id) === Number(productid)) {
                return item.wishlist = 0
            }
        })

    }
}