export default {
    cartInfo: state => {
        let { listCart } = state;
        let initObjSum = {countItem: 0,totalPrice: 0}
        return listCart.reduce(function(sum,objCart){
            let countItem = sum.countItem + objCart.quantity;
            let totalPrice = sum.totalPrice + objCart.product.price * objCart.quantity;
            return {countItem,totalPrice}
        },initObjSum)
    }
}