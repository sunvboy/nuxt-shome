export const state = () => {
    return {
        newsListByCatalogue: {
            page: 1,
            totalRow: 0,
            totalPage: 0,
            posts: []
        },
    }

}
export const actions = {
    async actFetchListArticleByCatalogue({ commit }, { page = 1, perpage = 5, slug = '', catalogueid = 0 } = {}) {
        try {
            const params = {
                page: page,
                perpage: perpage,
                catalogueid: catalogueid,
                slug: slug,
            }
            const result = await this.$axios.$get('/listArticleByCatalogue', { params })
            if (result.status === 200) {
                const data = {
                    page: page,
                    totalRow: result.totalRow,
                    totalPage: result.totalPage,
                    posts: result.data,
                    category: result.category,
                }
                commit('SET_NEWS_LIST_BY_CATALOGUE', data)
                return {
                    ok: true,
                    category: result.category
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
    }
}
export const mutations = {
    SET_NEWS_LIST_BY_CATALOGUE(state, { page, totalRow, totalPage, posts }) {
        const data = {
            page,
            totalRow,
            totalPage,
            posts
        }
        if (page > 1) {
            data.posts = [
                ...state.newsListByCatalogue.posts,
                ...posts
            ]
        }
        state.newsListByCatalogue = data;
    },
}