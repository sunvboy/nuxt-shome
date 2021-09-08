export default {
    async actFetchListComment({commit},{page = 1,perpage = 3, module = '', moduleid = 0 , parentid = 0, idNoneComments = []} = {} ){
        try{

            const result = await this.$axios.$get('/listComment',{
                params:{
                    page: page,
                    perpage: perpage,
                    module: module,
                    moduleid: moduleid,
                    parentid: parentid,
                    idNoneComments: idNoneComments
                }
            })
            if(result.status === 200){
                const data = {
                    page: page,
                    totalRow: result.totalRow,
                    totalPage: result.totalPage,
                    comments: result.data,
                }
                if(parentid === 0){
                    commit('SET_COMMENT_LIST',data)

                }else{
                    data.parentid = parentid;
                    commit('SET_COMMENT_LIST_REPLY',data)
                }
            }
            return {
                ok: true,
                totalComments: result.totalRow
            }
        }catch(e){
            return {
                ok: false,
            }

        }
      

    },
    async actAddComment({commit,rootState,dispatch},{module = '', moduleid = 0 , comment = '', parentid = 0} = {} ){
        if(rootState.auth.currentUser.id && rootState.auth.token){
            try{
                const data = {
                    module: module,
                    moduleid: moduleid,
                    comment: comment,
                    parentid: Number(parentid),
                    customerid: Number(rootState.auth.currentUser.id),
    
                }
                const config = {
                    headers:{
                        Authorization: `${rootState.auth.token}`
                    }
                }
                const result = await this.$axios.$post('/createComment',data,config)
                if(result.status == 200){
                    if (parentid === 0) {
                        //Update count cmt và load lại cmt
                        //v1
                        // commit(module+'/UPDATE_COUNT_COMMENT', null, { root: true })
                        // commit('pushParentComments', result.data);
                        //v2
                        await dispatch('comment/actFetchListComment', {module,moduleid}, {root:true});

                    } else {
                        commit('increaseCommentReplyCount', parentid);
                        commit('pushReplyComments', {
                          parentid: parentid,
                          newComment: result.data
                        });
                        
                    }
                    return {
                        ok: true,
                        message: result.message,
                        data: result.data
                    }
        
                }else{
                    return {
                        ok: false,
                        message: result.message

                    }
        
                }
                
            }catch(e){
                console.log(e)
                return {
                    ok: false,
                    message: e.response.data.message

                }
    
            }
        }else{
            return
        }
        
      

    }
}