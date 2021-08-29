import axios from 'axios'

const AUTH_REQUEST = "AUTH_REQUEST";
const AUTH_LOGOUT = "AUTH_LOGOUT";
const AUTH_DATA = "AUTH_DATA";
const IS_AUTHENTICATED = "IS_AUTHENTICATED";
const DESTROY_LOCAL_SESSION = "DESTROY_LOCAL_SESSION";

import router from "../../router/index"

export default {
    state: {
        user: {},
        token: localStorage.getItem('user-token') || '',
        status: ''
    },

    getters: {
        isAuthenticated: state => !!state.token,
        authStatus: state => state.status,
        getToken: state => state.token,
        getUser: state => state.user
    },

    mutations: {
        SET_STATUS: (state, status) => {
          state.status = status;
        },
        SET_TOKEN: (state, token) => {
          state.token = token;
        },
        SET_USER: (state, data) => {
          state.user = data
        },
    },

    actions: {
        [AUTH_REQUEST]: async({ commit, dispatch }, user) => {
            try {
                commit('SET_STATUS', 'loading');
                let auth = await axios.post('/api/login', { email: user.email, password: user.password })
                const token = auth.data.access_token
                return dispatch('AUTH_DATA', token);
            } catch (error) {
                localStorage.removeItem('user-token')
                commit('SET_STATUS', 'error');
                let err = new Error(error.response.data)
                err.data = error.response.data;
                throw err;
            }
        }, 

        [AUTH_LOGOUT]: async ({ commit }) => {
            try {
                let response = await axios.post('/api/logout')
                localStorage.removeItem('user-token');
                delete axios.defaults.headers.common['Authorization'];
                await commit('SET_TOKEN', '');
                return response;
            } catch (error) {
                commit('SET_STATUS', 'error');
            }
        },

        [AUTH_DATA]: async({ commit, state, dispatch }, token) => {
            if (token) {
                localStorage.setItem('user-token', token)
                axios.defaults.headers.common['Authorization'] = "Bearer " + token
                commit('SET_TOKEN', token);
            }
            if (!state.token) {
                return;
            }
            try {
                let profile = await axios.get('/api/me');
                commit('SET_USER', profile.data.data);
                commit('SET_STATUS', 'success');
            } catch (error) {
                if (error.response.status === 401) {
                    dispatch(DESTROY_LOCAL_SESSION);
                }
        
            }
        },

        [DESTROY_LOCAL_SESSION]: async({ commit }) => {
            localStorage.removeItem('user-token');
            delete axios.defaults.headers.common['Authorization'];
            await commit('SET_TOKEN', '');
            router.push('/login');
          },
      
        [IS_AUTHENTICATED]: async({ state, dispatch }) => {
            if (state.token) {
              let profile = await axios.get('/api/me');
              if (profile.status === 200) return true;
            }
            return dispatch(DESTROY_LOCAL_SESSION);
        }
    }
};