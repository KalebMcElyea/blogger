<template>
  <div class="about text-center m-3">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
    <div class="card">
      <h5> {{ accountBlog.title }} </h5>
      <h5> {{ accountBlog.body }} </h5>
      <h5> {{ accountBlog.comments }} </h5>
      <AccountBlog v-for="accountBlog in state.accountBlog" :key="accountBlog.id" :blogs="accoutBlog" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import { api } from '../services/AxiosService'
import { blogsService } from '../services/BlogsService'

export default {
  name: 'Account',

  setup() {
    const state = reactive({
      account: computed(() => AppState.account),
      blogs: computed(() => AppState.myBlog),
      accountBlog: computed(() => AppState.accountBlog)
    })
    onMounted(async() => {
      await blogsService.getAccountBlogs()
    })

    return {
      state,
      account: computed(() => AppState.account),
      blogs: computed(() => AppState.myBlog),
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
