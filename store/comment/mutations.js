export default {
    SET_COMMENT_LIST(state,{page,totalRow,totalPage,comments}){
        const data = {
            page,
            totalRow,
            totalPage,
            comments
        }
        if(page > 1){
            data.comments = [
                ...state.listComment.comments,
                ...comments
            ]
        }
        state.listComment = data;
    },
    SET_COMMENT_LIST_REPLY(state,{page,totalRow,totalPage,comments,parentid}){
     
        const key = `reply-parent-${parentid}`
        const data = {
            page,
            totalRow,
            totalPage,
            comments
        }
        //neu page lon hon 1 co nghia la da click
        if(page > 1){
            data.comments = [
                ...state.hashCommentReply[key].comments,
                ...comments
            ]
        }

        if ( state.hashCommentReply[key] &&  state.hashCommentReply[key].page === 0) {
            data.comments = [
              ...data.comments,
              ...state.hashCommentReply[key].comments
            ]
        }

        //moi khoi tao
        state.hashCommentReply = {
            ...state.hashCommentReply,
            [key]: data
        }
    },
    increaseCommentReplyCount(state,parentid){
        let isFound = false;

        const newComment = state.listComment.comments.map(cmt => {
            if (Number(cmt.id) === Number(parentid)) {
                isFound = true;
                return {
                  ...cmt,
                  count_parent_comment: cmt.count_parent_comment + 1
                }
            }
            return cmt
        })
        if (isFound === true) {
            state.listComment = {
              ...state.listComment,
              comments: newComment,
            }
          }

    },
    pushReplyComments(state,{parentid,newComment}){
        //tìm đến cmt đã tồn tại hay chưa
        const key = `reply-parent-${parentid}`;
        if(state.hashCommentReply[key]){
            const newCommentsReply = [
                ...state.hashCommentReply[key].comments,
                newComment
            ]
            state.hashCommentReply = {
                ...state.hashCommentReply,
                [key]: {
                  ...state.hashCommentReply[key],
                  comments: newCommentsReply,
                }
            }

        }else {
            //nếu chưa tồn tại tạo 1 cái mới
            state.hashCommentReply = {
              ...state.hashCommentReply,
              [key]: {
                comments: [newComment],
                page: 0,
                totalRow: 1,
                totalPage: 1,
              }
            }
          }

    },
    pushParentComments(state, newComment) {
        state.listComment = {
          ...state.listComment,
          comments: [
            ...state.listComment.comments,
            newComment,
          ]
        }
      },
}