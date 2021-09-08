export default {
    async actFetchDetailProudct({ rootState,commit }, { slug = ''} = {}) {
        try {
            
            const token = rootState.auth.token;
            const config = {
                params: {
                    slug: slug
                },
                headers: {
                    Authorization: `${token}`
                }
            }
            const result = await this.$axios.$get('/detailProduct', config)
            if (result.status === 200) {
                commit('SET_DETAIL_PRODUCT', result.data)
                return {
                    ok: true
                }
            }else{
                return {
                    ok: false,
                }
            }
        } catch (e) {
            console.log(e);
            return {
                ok: false,
            }
        }
    }
}