
import { getTokenFromCookie } from '@/helpers';
const localStorage = store => {
    store.subscribe((mutations,state) => {
        process.server ? '' : window.localStorage.setItem('cart',JSON.stringify(state.cart));
    })
}
export const plugins = [localStorage]


export const state =  () =>{
  
    return {
        appMenuHeader: [],
        fcSystem: [],
        isLoading: false
    }

}

export const actions = {
    async nuxtServerInit({dispatch},{req}){
        const token = getTokenFromCookie(req);
        await Promise.all([
            dispatch('actFetchMenu','main'),
            dispatch('actFetchFcSystem'),
            dispatch('auth/actFetchCurrentUser',token),
        ])
    },
    async actFetchFcSystem({commit}){
        try{
            const result = await this.$axios.$get('/fcSystem')
            if(result.status === 200){
                commit('SET_FCSYSTEM',result.data)
            }
        }catch(e){
            console.log(e);
        }
      
    },
    async actFetchMenu({commit}, keyword = 'main'){
        try{
            const result = await this.$axios.$get('/listMenu',{
                params:{
                    keyword: keyword,
                }
            })
            if(result.status === 200){
                commit('SET_MENUS',result.data)
            }
        }catch(e){
            console.log(e);
        }
      
    },
    showLoading({commit},isLoading = false){
        commit('SHOWLOADING',isLoading);
    }
}

export const mutations = {
    SET_MENUS(state,data){
        state.appMenuHeader = data;
    },
    SET_FCSYSTEM(state,data){
        state.fcSystem = data;

    },
    SHOWLOADING(state,isLoading){
        state.isLoading = isLoading;
    }
}
