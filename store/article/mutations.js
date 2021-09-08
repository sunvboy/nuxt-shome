export default {
    UPDATE_COUNT_COMMENT(state){
        state.detailArticle.count_comment = Number(state.detailArticle.count_comment)+1
    },
    SET_DETAIL_ARTICLE(state,data){
        state.detailArticle = data;
    },
    SET_LATEST_ARTICLES(state,data){
        state.latestArticles = data;
    },
    SET_POPULAR_NEWS(state,data){
        state.popularNews = data;
    
    },
    SET_NEWS_LIST(state,{page,totalRow,totalPage,posts}){
        const data = {
            page,
            totalRow,
            totalPage,
            posts
        }
        if(page > 1){
            data.posts = [
                ...state.newsList.posts,
                ...posts
            ]
        }
        state.newsList = data;
    },
    // SET_CATALOGUE(state,arrayCatalogue){

    //     //array=>hash
    //     let hashCatalogue = {}
    //     arrayCatalogue.forEach((v) => {
    //         const catalogueID = v.id;
    //         hashCatalogue[catalogueID] = v;
    //     })
    //     state.articleCatalogue = hashCatalogue;

    // }
} 