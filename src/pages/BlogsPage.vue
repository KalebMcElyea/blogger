<template>
  <div class="row home flex-grow-1 flex-column">
    <h1>
      Blogs
    </h1>
  </div>
  <div class="row col justify-content-center">
    <div>
      <form class="col form-inline justify-content-center" v-if="state.user.isAuthenticated" @submit.prevent="createBlog">
        <div class="form-group m-2">
          <input
            type="text"
            name="title"
            class="form-control"
            placeholder="Title"
            aria-describedby="helpId"
            v-model="state.newBlog.title"
          >
        </div>
        <div class="form-group m-2">
          <input
            type="text"
            name="body"
            class="form-control"
            placeholder="Body"
            aria-describedby="helpId"
            v-model="state.newBlog.body"
          />
          <button class="btn btn-primary m-2" v-if="state.user.isAuthenticated" @submit.prevent="createBlog">
            Create
          </button>
          <button class="btn-primary text-dark action m-2" v-if="state.user.isAuthenticated" @click="editBlog">
            Edit
          </button>
        </div>
      </form>
      <Blog v-for="blog in state.blogs" :key="blog.id" :blogs="blog" />
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { computed, onMounted } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { blogsService } from '../services/BlogsService'

export default {
  name: 'BlogsPage',

  setup() {
    const state = reactive({
      blogs: computed(() => AppState.blogs),
      user: computed(() => AppState.user),
      newBlog: {},

      mounted() {
        this.$store.dispatch('getBlog', this.$route.params.id)
      }
    })

    onMounted(async() => {
      await blogsService.getAllBlogs()
    })

    return {
      state,
      async createBlog() {
        await blogsService.createBlog(state.newBlog)
      },

      computed: {
        blog() {
          return this.$store.state.activeBlog
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.home{
  text-align: center;
  user-select: none;
  > img{
    height: 200px;
    width: 200px;
  }
}
</style>
