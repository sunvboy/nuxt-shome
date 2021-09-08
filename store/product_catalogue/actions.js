export default {
    async actFetchListProductByCatalogue({ rootState,commit }, { page = 1, perpage = 21, slug = '', id = 0 , isAttr = 0 ,attr = '' ,sort = ''} = {}) {
        try {
            const token = rootState.auth.token;
            const config = {
                params: {
                    page: page,
                    perpage: perpage,
                    id: id,
                    slug: slug,
                    isAttr: isAttr,
                    attr: attr,
                    sort: sort,
                    isCmt: true,
                    isbrand: true
                },
                headers: {
                    Authorization: `${token}`
                }
            }
            const result = await this.$axios.$get('/listProductByCatalogue', config)
            if (result.status === 200) {
                const data = {
                    page: page,
                    totalRow: result.totalRow,
                    totalPage: result.totalPage,
                    posts: result.data,
                    category: result.category,
                }
                commit('SET_PRODUCTS_LIST_BY_CATALOGUE', data)
                return {
                    ok: true,
                    category: result.category,
                    attribute_catalogue: result.attribute_catalogue,
                    totalRow: result.totalRow,
    
                }
            }else{
                return {
                    ok: false,
                }
            }
           
        } catch (e) {

            return {
                ok: false,
            }
        }
    },
    isPopupQuickView({commit},data){
        commit('IS_POPUP_QUICKVIEW',data)
    }
}