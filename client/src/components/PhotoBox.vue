<template>
  <div>
    <div v-for="(photo, i) in photos" :key="i">
      <button class="btn btn-outline-danger" v-if="user">Like</button>
      <button class="btn btn-primary" v-if="user">Comment</button>
      <img :src="photo.imageUrl" alt="not found">
      {{photo.caption}}
      <div v-for="(comment, j) in photo.comments" :key="j">
        {{comment.comment}}
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      photos: 'getPhotos',
      user: 'getUser'
    })
  },
  created () {
    this.$store.dispatch('generateData')
  }
}
</script>

<style>
</style>
