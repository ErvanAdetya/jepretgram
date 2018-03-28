<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                    <router-link :to="{ name: 'Home'}" class="nav-text">
                        <a class="nav-link" href="#">JEPRETgram <span class="sr-only">(current)</span></a>
                    </router-link>
                </li>
                <li class="nav-item" data-toggle="modal" data-target="#postPhoto" v-if="user">
                    <a class="nav-link" href="#">Post Photo</a>
                </li>
            </ul>
            <ul class="navbar-nav ml-auto">
                <li class="nav-item" v-if="user">
                    <a class="nav-link" href="#">Hi, {{user.name}}</a>
                </li>
                <li class="nav-item" v-if="user" @click="logout">
                    <a class="nav-link" href="#">Logout</a>
                </li>
                <li class="nav-item" data-toggle="modal" data-target="#loginModal" v-else>
                    <a class="nav-link" href="#">Login</a>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      user: 'getUser'
    })
  },
  methods: {
    logout () {
      localStorage.removeItem('apptoken')
      this.$store.commit('setUser', null)
    },
    postPhoto () {
    //   this.$router.push({name: 'NewArticle'})
    }
  },
  watch: {
  }
}
</script>

<style scoped>
.navbar {
    padding: 0;
}
.nav-text {
    text-decoration: none;
}
</style>
