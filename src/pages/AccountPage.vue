<template>
  <div class="about text-center m-3">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
    <div class="card">
      <h5>{{ blog.accountBlogs }}</h5>
      <h5> {{ blog.title }} </h5>
      <h5> {{ blog.body }} </h5>
      <h5> {{ blog.comments }} </h5>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, logger } from 'vue'
import { AppState } from '../AppState'
import { api } from '../services/AxiosService'
import { blogsService } from '../services/BlogsService'

export default {
  name: 'Account',
  setup(props) {
    onMounted(async() => {
      await blogsService.getAccountBlogs()
    })
    return {
      account: computed(() => AppState.account),
      blog: computed(() => AppState.myBlog),

      async getAccountBlogs(_id) {
        try {
          const res = await api.get('account/blogs')
          AppState.accountBlog = res.data
        } catch (error) {
          logger.log(error)
        }
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
