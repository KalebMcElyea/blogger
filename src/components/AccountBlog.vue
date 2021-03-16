<template>
  <div class="about text-center m-3">
    <!-- <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
    <div class="card"> -->
    <h5> {{ accountBlog[0].title }} </h5>
    <hr>
    <h5> {{ accountBlog[0].body }} </h5>
  </div>
  <!-- </div> -->
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
import { api } from '../services/AxiosService'

export default {
  name: 'AccountBlog',

  setup() {
    return {
      account: computed(() => AppState.account),
      blog: computed(() => AppState.myBlog),
      accountBlog: computed(() => AppState.accountBlog),

      async getAccountBlogs() {
        await api.get('account/blogs')
      }
    }
  }
}

</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
