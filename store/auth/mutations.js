export default {
    setCurrentUser(state,{token,user}){
        state.token = token;
        state.currentUser = user;
    },
    SET_VIEW_ADDRESS(state,{ page, totalRow, totalPage, posts }){
        const data = {
            page,
            totalRow,
            totalPage,
            posts
        }
        if (page > 1) {
            data.posts = [
                ...state.address.posts,
                ...posts
            ]
        }
        state.address = data;
    },
    SET_VIEW_ORDERS(state,{ page, totalRow, totalPage, posts }){
        const data = {
            page,
            totalRow,
            totalPage,
            posts
        }
        if (page > 1) {
            data.posts = [
                ...state.orders.posts,
                ...posts
            ]
        }
        state.orders = data;
    },
    SET_VIEW_WISHLIST(state,{ page, totalRow, totalPage, posts }){
        const data = {
            page,
            totalRow,
            totalPage,
            posts
        }
        if (page > 1) {
            data.posts = [
                ...state.wishlist.posts,
                ...posts
            ]
        }
        state.wishlist = data;
    },
    DEL_WISHLIST(state,id){
        let newPosts = state.wishlist.posts.filter(item => {
            return item.id !== id
        });
        state.wishlist.totalRow = Number(state.wishlist.totalRow)-1
        state.wishlist.posts = newPosts;
    },
    DEL_ADDRESS(state,id){
        let newPosts = state.address.posts.filter(item => {
            return item.id !== id
        });
        state.currentUser.count_address = state.currentUser.count_address-1
        state.address.totalRow = Number(state.address.totalRow)-1
        state.address.posts = newPosts;
    },
    SET_COUNT_ADDRESS(state){
        state.currentUser.count_address = Number(state.currentUser.count_address)+1
        state.address.totalRow = Number(state.address.totalRow)+1
    }
}