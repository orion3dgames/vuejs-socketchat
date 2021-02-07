<template>
  <div>

      <div>
        <div class="bg-light p-3 mb-3 text-center">
          <h1>Super CHAT</h1>
          <p>Communication made perfection.</p>
        </div>

        <div class="container ">
        <div class="row">
          <div class="col-sm-4"></div>
          <div class="col-sm-4">
            <form class="m-t" role="form" @submit.prevent="handleSubmit">
              <div class="form-group">
                <input type="text" class="form-control" placeholder="Email / Login" required="" v-model="username" name="username">
              </div>
              <div class="form-group">
                <input type="password" class="form-control" placeholder="Password" required="" v-model="password" name="password">
              </div>
              <button type="submit" class="btn btn-primary">Login</button>
            </form>
          </div>
          <div class="col-sm-4"></div>
        </div>

      </div>
    </div>

  </div>
</template>

<script>

import { userService } from '../services/UserService';

export default {
  data () {
    return {
      username: '',
      password: '',
      submitted: false,
      loading: false,
      returnUrl: '',
      error: ''
    }
  },
  created () {
    // reset login status
    userService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.$route.query.returnUrl || '/home';
  },
  methods: {
    handleSubmit (e) {
      this.submitted = true;
      const { username, password } = this;

      // stop here if form is invalid
      if (!(username && password)) {
        return;
      }

      this.loading = true;
      userService.login(username, password)
          .then(
              user => this.$router.push(this.returnUrl),
              error => {
                console.log(error)
              }
          );
    }
  }
};
</script>
