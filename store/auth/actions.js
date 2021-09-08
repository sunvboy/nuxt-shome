export default {
    async actFetchCurrentUser({ commit }, token) {


        try {
            const response = await this.$axios.$get('/detailUser', {
                headers: {
                    Authorization: `${token}`
                }
            });
            if (response.status === 200 && response.data) {
                commit('setCurrentUser', {
                    token,
                    user: response.data
                })
            }

        } catch (e) {
            return {
                ok: false,
                error: e.message
            }
        }
    },
    async actLogin({ dispatch }, { email, password }) {
        try {
            const result = await this.$axios.$post('/login', {
                email,
                password
            });
            if (result.status === 200) {
                document.cookie = `access_token=${result.data.token}`;
                dispatch('actFetchCurrentUser', result.data.token);
                return {
                    ok: true,
                    message: "Đăng nhâp thành công"
                }
            } else {
                return {
                    ok: false,
                    message: result.message
                }
            }
        } catch (e) {
            return {
                ok: false,
                message: e.response,
            }
        }
    },
    async actRegister({ dispatch }, objData) {
        try {
            const result = await this.$axios.$post('/register', objData);
            if (result.status === 200) {
                return {
                    ok: true,
                    message: "Đăng ký tài khoản thành công"
                }
            } else {
                return {
                    ok: false,
                    message: result.message
                }
            }
        } catch (e) {
            return {
                ok: false,
                message: e.response,
            }
        }
    },
    actLogout({ commit }) {
        document.cookie = `access_token=`;
        commit('setCurrentUser', {
            token: '',
            user: null
        })
    },
    async actUploadAvatar({ state }, { file }) {
        try {
            const token = state.token;
            const config = {
                headers: {
                    Authorization: `${token}`
                }
            }
            const formData = new FormData();
            formData.append('file', file);
            const result = await this.$axios.post('/uploadAvatar', formData, config);
            if (result.data.status === 200) {
                return {
                    ok: true,
                    data: result.data
                }
            } else {
                return {
                    ok: false,
                    message: result.data.message
                }
            }
        } catch (e) {
            return {
                ok: false,
                message: e.message
            }
        }
    },
    async actUpdateProfile({ commit, dispatch, state }, { file, fullname, phone, address }) {
        try {
            const token = state.token;
            const config = {
                headers: {
                    Authorization: `${token}`
                }
            }
            const data = { fullname, phone, address }

            if (file) {
                const resMedia = await dispatch('actUploadAvatar', { file });
                if (!resMedia.ok) {
                    return {
                        ok: false,
                        message: resMedia.message
                    }
                }
                data.avatar = resMedia.data.data

            }
            const resUser = await this.$axios.$post('/editProfile', data, config);
                if(resUser.status === 200){
                    const user = resUser.data;
                    commit('setCurrentUser', { user, token });
                    return {
                        ok: true,
                        data: user,
                        message: resUser.message
                    }
                }else{
                    return {
                        ok: false,
                        message: resUser.message
                    }
                }
               
        } catch (e) {
            return {
                ok: false,
                message: e.message
            }
        }
    },
    async actChangePassword({ state },data) {
        try {
            console.log(data)
            const token = state.token;
            const config = {
                headers: {
                    Authorization: `${token}`
                }
            }
            const result = await this.$axios.$post('/changPassword', data, config);
            if(result.status === 200){
                return {
                    ok: true,
                    message: result.message
                }
            }
            return {
                ok: false,
                message: result.message
            }
        } catch (e) {
            return {
                ok: false,
                message: e.message
            }
        }
    },
    //address
    async actAllAddress({ state,commit }) {

        try {
            const token = state.token;
            const config = {
                headers: {
                    Authorization: `${token}`
                }
            }
            const result = await this.$axios.$get('/address/all',  config);
            if(result.status === 200){
            
                return {
                    ok: true,
                    message: result.message,
                    data: result.data
                }
            }
            return {
                ok: false,
                message: result.message
            }
        } catch (e) {
            console.log(e.message)
            return {
                ok: false,
                message: e.message
            }
        }
    },
    async actViewAddress({ state,commit },{ page = 1, perpage = 5 } = {}) {

        try {
            const token = state.token;
            const config = {
                params: {page: page,perpage: perpage},
                headers: {
                    Authorization: `${token}`
                }
            }
            const result = await this.$axios.$get('/address/view',  config);
            if(result.status === 200){
                const data = {
                    page: page,
                    totalRow: result.totalRow,
                    totalPage: result.totalPage,
                    posts: result.data,
                }
                commit('SET_VIEW_ADDRESS', data)
                return {
                    ok: true,
                    message: result.message,
                }
            }
            return {
                ok: false,
                message: result.message
            }
        } catch (e) {
            console.log(e.message)
            return {
                ok: false,
                message: e.message
            }
        }
    },
    async actCreateAddress({ state,commit },data) {
        try {
            const token = state.token;
            const config = {
                headers: {
                    Authorization: `${token}`
                }
            }
            const result = await this.$axios.$post('/address/create', data, config);
            if(result.status === 200){
                commit('SET_COUNT_ADDRESS')
                return {
                    ok: true,
                    message: result.message
                }
            }
            return {
                ok: false,
                message: result.message
            }
        } catch (e) {
            return {
                ok: false,
                message: e.message
            }
        }
    },
    async actUpdateAddress({ state },data) {
        try {
            const token = state.token;
            const dataJson = JSON.stringify(data);
            const config = {
                headers: {
                    'Authorization': `${token}`,
                    'Content-Type': 'application/json'
                }
            }
            const result = await this.$axios.$put('/address/update',dataJson, config);
            if(result.status === 200){
                return {
                    ok: true,
                    message: result.message
                }
            }
            return {
                ok: false,
                message: result.message
            }
        } catch (e) {
            return {
                ok: false,
                message: e.message
            }
        }
    },
    async actDeleteAddress({ state,commit },id) {
        try {
            const token = state.token;
            const config = {
                headers: {
                    Authorization: `${token}`
                }
            }
            const result = await this.$axios.$delete(`/address/${id}/delete`, config);
            if(result.status === 200){
                commit('DEL_ADDRESS',id)
                return {
                    ok: true,
                    message: result.message
                }
            }
            return {
                ok: false,
                message: result.message
            }
        } catch (e) {
            console.log(e.message)
            return {
                ok: false,
                message: e.message
            }
        }
    },
    async actDetailAddress({ state },id) {
        try {
            const token = state.token;
            const config = {
                params: id,
                headers: {
                    Authorization: `${token}`
                }
            }
            const result = await this.$axios.$get(`/address/detail`, config);
            if(result.status === 200 && result.data){
                return {
                    ok: true,
                    message: result.message,
                    data: result.data
                }
            }
            return {
                ok: false,
                message: result.message
            }
        } catch (e) {
            console.log(e.message)
            return {
                ok: false,
                message: e.message
            }
        }
    },
    //orders
    async actViewOrders({ state,commit },{ page = 1, perpage = 5 } = {}) {

        try {
            const token = state.token;
            const config = {
                params: {page: page,perpage: perpage},
                headers: {
                    Authorization: `${token}`
                }
            }
            const result = await this.$axios.$get('/orders/view',  config);
          
            if(result.status === 200){
                const data = {
                    page: page,
                    totalRow: result.totalRow,
                    totalPage: result.totalPage,
                    posts: result.data,
                }
                commit('SET_VIEW_ORDERS', data)
                return {
                    ok: true,
                    message: result.message
                }
            }
            return {
                ok: false,
                message: result.message
            }
        } catch (e) {
            console.log(e.message)
            return {
                ok: false,
                message: e.message
            }
        }
    },
    async actDetailOrders({ state },id) {
        try {
            const token = state.token;
            const config = {
                params: id,
                headers: {
                    Authorization: `${token}`
                }
            }
            const result = await this.$axios.$get(`/orders/detail`, config);
            if(result.status === 200 && result.data){
                return {
                    ok: true,
                    message: result.message,
                    data: result.data
                }
            }
            return {
                ok: false,
                message: result.message
            }
        } catch (e) {
            console.log(e.message)
            return {
                ok: false,
                message: e.message
            }
        }
    },
    //actViewWishList
    async actViewWishList({ state,commit },{ page = 1, perpage = 10 } = {}) {

        try {
            const token = state.token;
            const config = {
                params: {page: page,perpage: perpage},
                headers: {
                    Authorization: `${token}`
                }
            }
            const result = await this.$axios.$get('/wishlist/view',  config);
          
            if(result.status === 200){
                const data = {
                    page: page,
                    totalRow: result.totalRow,
                    totalPage: result.totalPage,
                    posts: result.data,
                }
                commit('SET_VIEW_WISHLIST', data)
                return {
                    ok: true,
                    message: result.message
                }
            }
            return {
                ok: false,
                message: result.message
            }
        } catch (e) {
            console.log(e.message)
            return {
                ok: false,
                message: e.message
            }
        }
    },
    async actDeleteWishList({ state,commit },id) {
        try {
            const token = state.token;

            const config = {
                headers: {
                    Authorization: `${token}`
                }
            }
            const result = await this.$axios.$delete(`/wishlist/${id}/delete`, config);
            console.log(result)
            if(result.status === 200){
                commit('DEL_WISHLIST',id)
                commit('product_catalogue/DEL_WISHLIST_PRODUCT',id, { root: true })
                commit('product/DEL_WISHLIST_PRODUCT',id, { root: true })
                return {
                    ok: true,
                    message: result.message
                }
            }
            return {
                ok: false,
                message: result.message
            }
        } catch (e) {
            console.log(e.message)
            return {
                ok: false,
                message: e.message
            }
        }
    }, 
    async actCreateWishList({ state,commit },productid) {
        try {
            const token = state.token;
            const config = {
                headers: {
                    Authorization: `${token}`
                }
            }
            const result = await this.$axios.$post('/wishlist/create', {productid : productid}, config);
            if(result.status === 200){
                commit('product_catalogue/SET_PRODUCT_WISHLIST',productid, { root: true })
                commit('product/SET_PRODUCT_WISHLIST',productid, { root: true })
                return {
                    ok: true,
                    message: result.message
                }
            }
            return {
                ok: false,
                message: result.message
            }
        } catch (e) {
            return {
                ok: false,
                message: e.message
            }
        }
    },
}