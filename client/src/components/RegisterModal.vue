<template>
  <div id="registerModal" class="modal fade text-center">
    <div class="modal-dialog">
      <div class="col-lg-8 col-sm-8 col-12 main-section">
        <div class="modal-content">
          <div class="col-lg-12 col-sm-12 col-12 user-img">
            <img src="@/assets/man.png">
          </div>
          <div class="col-lg-12 col-sm-12 col-12 user-name">
            <h1>Create New User</h1>
            <button type="button" class="close" data-dismiss="modal">×</button>
          </div>
          <div class="col-lg-12 col-sm-12 col-12 form-input">
            <form>
              <div class="form-group">
                <input type="text" class="form-control" placeholder="Enter your name" v-model="name">
              </div>
              <div class="form-group">
                <input type="email" class="form-control" placeholder="Enter email" v-model="email">
              </div>
              <div class="form-group">
                <input type="password" class="form-control" placeholder="Password" v-model="password">
              </div>
              <button type="submit" class="btn btn-success" @click="register()" data-dismiss="modal">Register</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: ``,
      email: ``,
      password: ``
    }
  },
  methods: {
    register () {
      this.$store.dispatch('register', {
        name: this.name,
        email: this.email,
        password: this.password
      })
    }
  }
}
</script>

<style scoped>
.main-section{
margin: 0 auto;
margin-top: 100px;
background-color: #fff;
border-radius: 5px;
padding: 0px;
}
.user-img{
margin-top: -50px;
}
.user-img img{
height: 100px;
width: 100px;
}
.user-name{
margin:10px 0px;
}
.user-name h1{
font-size: 30px;
color:#676363;
}
.user-name button{
position:absolute;
top:-50px;
right:20px;
font-size:30px;
}
.form-input button{
width: 100%;
margin-bottom: 20px;
}
</style>
