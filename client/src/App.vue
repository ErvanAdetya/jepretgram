<template>
  <div id="app">
    <nav-bar></nav-bar>
    <router-view/>
    <login-modal></login-modal>
    <register-modal></register-modal>
    <post-photo></post-photo>
    <comment-modal></comment-modal>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'
import LoginModal from '@/components/LoginModal'
import RegisterModal from '@/components/RegisterModal'
import PostPhoto from '@/components/PostPhoto'
import CommentModal from '@/components/CommentModal'

export default {
  name: 'App',
  components: {
    NavBar,
    LoginModal,
    RegisterModal,
    PostPhoto,
    CommentModal
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
