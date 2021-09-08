export default {
    isPopupCart({commit},data){
        commit('IS_POPUP_CART',data)
    },
    addBuyProduct({commit,state},data) {   
        //check
        const index = state.listCart.findIndex(function(cart){
            return cart.product.id === data.product.id;
        });

        if(index === -1){
            commit('ADD_CART', data)

        }else{
            let quantity = data.quantity;
            commit('UPD_CART',{quantity,index})
        }
        
    },
    async deletetocart({commit},data) {   
         await commit('DEL_CART',data)
    },
    updateQuantity({commit,state},{objProduct,quantity}){
        const index = state.listCart.findIndex(function(cart){
            return cart.product.id === objProduct.product.id;
        });
        if(index != -1){
            let data = {
                index,
                quantity,
                isReplace: true
            }
            commit('UPD_CART',data)
        }

    },
    async actShipmentGHTK({ commit }) {
        try {
            const dataS = {
                "pick_province" : "Hà Nội",
                "pick_district" : "Quận Hai Bà Trưng",
                "province" : "Hà nội",
                "district" : "Quận Cầu Giấy",
                "address" : "P.503 tòa nhà Auu Việt, số 1 Lê Đức Thọ",
                "weight" : 1000,
                "value" : 3000000,
                "transport" : "fly",
                "deliver_option" : "xteam",
                "tags"  : [1]
            }
            const { data } = await this.$api.get(`/request-sample`,{headers: { "content-type":'application/x-www-form-urlencoded','Token': '2BEbAc88EFB9A9cAB21779D293E11c13D7E3F808' }})
            console.log(data)
        } catch (e) {
            console.log(e);
          
        }
    },
    async actgetLocation({ commit },{parentid=0,table="",select="",text="",parentField=''} = {}) {
        try {
            const params = {
                parentid: parentid,
                table: table,
                select:select,
                text:text,
                parentField:parentField,
            }
            const result = await this.$axios.$get(`/address`,{params})
            // console.log(result);
            if(result.status === 200 && result.data) {
                return {
                    ok: true,
                    data: result.data
                }
            }else{
                return {
                    ok: false
                }

            }
        } catch (e) {
            console.log(e);
            return {
                ok: false
            }
        }
    },
    async actgetpriceShip({ commit },{provinceid="",districtid="",wardid="",address="",price=""} = {}) {
        try {
            const params = {
                province: provinceid,
                district: districtid,
                ward:wardid,
                price:price,
                address:address,
            }
            const result = await this.$axios.$get(`/shipment`,{params})
            if(result.status === 200 && result.data.fee) {
                return {
                    ok: true,
                    data: result.data.fee
                }
            }else{
                return {
                    ok: false
                }
            }
        } catch (e) {
            console.log(e);
            return {
                ok: false
            }
        }
    },
    async actSubmitCart({ commit },data = {}) {
        try {
            const params = {
                email: data.email,
                fullname: data.fullname,
                phone: data.phone,
                address: data.address,
                cityid: data.cityid,
                districtid: data.districtid,
                wardid: data.wardid,
                quantity: data.quantity,
                total_cart_final: data.total_cart_final,
                payment: data.payment,
                cart_json: data.cart_json,
                ship: data.ship,
                userid: data.userid,
                message: data.message,
            }
            const result = await this.$axios.$post(`/payment`,params)
            if(result.status === 200) {
                commit('SET_RESET_CART')
                return {
                    ok: true,
                    message: result.message,
                    data: result.data,
                }
            }else{
                return {
                    ok: false,
                    message: result.message
                }
            }
        } catch (e) {
            console.log(e);
            return {
                ok: false
            }
        }
    },
    async actDetailPayment({ commit },id = 0) {
        try {
            const params = {
                id: id
            }
            const result = await this.$axios.$get(`/detailPayment`,{params})
            if(result.status === 200 && result.data) {
                return {
                    ok: true,
                    detailPayment: result.data,
                }
            }else{
                return {
                    ok: false,
                }
            }
        } catch (e) {
            console.log(e);
            return {
                ok: false
            }
        }
    }

}