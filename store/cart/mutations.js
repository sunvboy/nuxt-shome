
export default {
    ADD_CART(state,data){
        state.listCart.push({
            ...data,
        })
    },
    UPD_CART(state,{quantity,index,isReplace = false}){
        if(isReplace == false){
            state.listCart[index].quantity += quantity;

        }else{
            state.listCart[index].quantity = quantity;

        }
    },
    DEL_CART(state,data){
        let newListCart = state.listCart.filter(item => {
            return item.product.id !== data.id
        });
        state.listCart = newListCart;
    },
    myMutation(state,data) {
        state.listCart = data
    },
    IS_POPUP_CART(state,data){
        state.isPopupCartProduct = data.isPopupCartProduct
        state.isPopupCart = data.isPopupCart
    },
    SET_RESET_CART(state,data){
        state.listCart =  []
        window.localStorage.removeItem('cart')
    }
}