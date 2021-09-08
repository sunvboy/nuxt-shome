export default {
    async actFetchLatestArticles({commit}){
        try{

            const result = await this.$axios.$get('/listArticle',{
                params:{
                    page: 1,
                    perpage: 3,
                    order_by: 'order asc,id desc'
                }
            })
            if(result.status === 200){
                commit('SET_LATEST_ARTICLES',result.data)
            }
            return {
                ok: true,
               
            }
        }catch(e){
            console.log(e);
            return {
                ok: false,
               
            }

        }
      

    },
    async actFetchPopularNews({commit}){
        try{

            const result = await this.$axios.$get('/listArticle',{
                params:{
                    page: 1,
                    perpage: 3,
                    order_by: 'viewed desc,id desc'
                }
            })
            if(result.status === 200){
                commit('SET_POPULAR_NEWS',result.data)
            }
            return {
                ok: true,
               
            }
        }catch(e){
            console.log(e.response);
            return {
                ok: false,
               
            }

        }
    },
    async actFetchNewsList({commit},{page = 1,perpage = 2, keyword = ''} = {}){
        try{

            const result = await this.$axios.$get('/listArticle',{
                params:{
                    page: page,
                    perpage: perpage,
                    order_by: 'order asc,id desc',
                    keyword: keyword
                }
            })
            if(result.status === 200){
                const data = {
                    page: page,
                    totalRow: result.totalRow,
                    totalPage: result.totalPage,
                    posts: result.data,

                }
                commit('SET_NEWS_LIST',data)
            }
            return {
                ok: true,
               
            }
        }catch(e){
            return {
                ok: false,
            }

        }
      

    },
    async actFetchDetailArticle({commit} ,{slug = '' } = {}){
        try{

            const result = await this.$axios.$get('/detailArticle',{
                params:{
                    canonical: slug
                }
            })
            if(result.status === 200 && result.data){
                commit('SET_DETAIL_ARTICLE', result.data)
                return {
                    ok: true,
                    data: result.data
                }
            }else{
                return {
                    ok: false
                }
            }
            
        }catch(e){

           console.log(e.response);
            return {
                ok: false,
              
            }

        }
      

    },
    async actFetchRelatedPosts({commit} ,{authid = 0 ,id = 0} = {}){
        try{

            const result = await this.$axios.$get('/listArticleAuth',{
                params:{
                    authid: authid,
                    id:id,
                }
            })
            if(result.status === 200 && result.data){
                return {
                    ok: true,
                    data: result.data
                }
            }else{
                return {
                    ok: false
                }
            }
            
        }catch(e){

           console.log(e.response);
            return {
                ok: false,
                
            }

        }
      

    }
}