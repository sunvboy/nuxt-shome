export default {
    SET_PRODUCTS_LIST_BY_CATALOGUE(state,  { page, totalRow, totalPage, posts }){
        const data = {
            page, totalRow, totalPage, posts
        }
        if (page > 1) {
            data.posts = [
                ...state.productsListByCatalogue.posts,
                ...posts
            ]
        }
        state.productsListByCatalogue = data;
    },
    IS_POPUP_QUICKVIEW(state, data){
        state.isPopupQuickView = data.isPopupQuickView
        state.isPopupQuickViewItem = data.isPopupQuickViewItem

    },
    SET_PRODUCT_WISHLIST(state, productid){
        const array = state.productsListByCatalogue.posts
        let newComment = array.filter((item) => {
            if (Number(item.id) === Number(productid)) {
                return item.wishlist = 1
            }
        })

    },
    DEL_WISHLIST_PRODUCT(state, productid){
        const array = state.productsListByCatalogue.posts
        let newComment = array.filter((item) => {
            if (Number(item.id) === Number(productid)) {
                return item.wishlist = 0
            }
        })

    }
}