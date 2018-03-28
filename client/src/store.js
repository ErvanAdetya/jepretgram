import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: null,
    photos: [],
    loadingStatus: false
  },
  getters: {
    getUser: (state) => {
      return state.user
    },
    getPhotos: (state) => {
      return state.photos
    },
    getLoadingStatus: (state) => {
      return state.loadingStatus
    }
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    setPhotos (state, payload) {
      state.photos = payload
    },
    setLoadingStatus (state, payload) {
      state.loadingStatus = payload
    },
    addPhoto (state, payload) {
      state.photos.push(payload)
    }
  },
  actions: {
    generateData (context) {
      context.commit('setLoadingStatus', true)
      axios
        .get('http://localhost:3000/photos')
        .then(({data}) => {
          context.commit('setPhotos', data.photos)
          context.commit('setLoadingStatus', false)
        })
    },
    register (context, payload) {
      context.commit('setLoadingStatus', true)
      axios
        .post('http://localhost:3000/users/', payload)
        .then((response) => {
          context.commit('setLoadingStatus', false)
          // context.dispatch('login', payload)
        })
    },
    login (context, payload) {
      context.commit('setLoadingStatus', true)
      axios
        .post('http://localhost:3000/login', payload)
        .then(({data}) => {
          context.commit('setUser', data.user)
          localStorage.setItem('apptoken', data.apptoken)
          context.commit('setLoadingStatus', false)
        })
    },
    postPhoto (context, payload) {
      axios
        .post('http://localhost:3000/photos',
          payload,
          {headers: {apptoken: localStorage.getItem('apptoken')}}
        )
        .then(({data}) => {
          context.dispatch('generateData')
        })
    },
    editCaption (context, payload) {
      axios
        .put('http://localhost:3000/photos/' + payload.id,
          payload,
          {headers: {apptoken: localStorage.getItem('apptoken')}}
        )
        .then(({data}) => {
          context.dispatch('generateData')
        })
    },
    deletePhoto (context, payload) {
      axios
        .delete('http://localhost:3000/photos/' + payload.id,
          {headers: {apptoken: localStorage.getItem('apptoken')}}
        )
        .then(({data}) => {
          context.dispatch('generateData')
        })
    },
    commentPhoto  (context, payload) {
      axios
        .post('http://localhost:3000/photos/' + payload.id + '/comment',
          payload,
          {headers: {apptoken: localStorage.getItem('apptoken')}}
        )
        .then(({data}) => {
          context.dispatch('generateData')
        })
    },
    likePhoto  (context, payload) {
      axios
        .post('http://localhost:3000/photos/' + payload.id + '/like',
          {},
          {headers: {apptoken: localStorage.getItem('apptoken')}}
        )
        .then(({data}) => {
          context.dispatch('generateData')
        })
    },
    unlikePhoto  (context, payload) {
      axios
        .post('http://localhost:3000/photos/' + payload.id + '/unlike',
          {},
          {headers: {apptoken: localStorage.getItem('apptoken')}}
        )
        .then(({data}) => {
          context.dispatch('generateData')
        })
    }
  }
})

export default store
