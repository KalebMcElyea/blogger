<template>
  <div class="flex justify-content-center my-2 col-10" v-if="blog.creator">
    <router-link :to="{name: 'BlogDetailsPage', params:{id: blogs._id}}">
      <div class="card">
        <div class=" p-2">
          <div class="bg-dark rounded">
            <img class="card-img-top">
          </div>
          <div class="card-body">
            <button class="btn-primary text-dark action m-2" v-if="blog.creator" @click="editBlog">
              Edit
            </button>
            <button class="btn-danger text-dark action m-2" @click="deleteBlog" v-if="blog.creator.email == state.user.email">
              Delete
            </button>
            <p><strong>{{ blogs.title }}</strong> </p>
            <p>{{ blogs.creator.name }}</p>
            <div class="text-right absolute top right p-2 z-2">
            </div>
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { computed } from '@vue/runtime-core'
import { blogsService } from '../services/BlogsService'
import { AppState } from '../AppState'

export default {

  name: 'Blog',
  props: {
    blogs: { type: Object, required: true }
  },

  setup(props) {
    const state = reactive({
      user: computed(() => AppState.user),
      blogs: computed(() => AppState.blogs),
      creator: computed(() => AppState.creator)
    })

    return {
      state,
      async createBlog() {
        await blogsService.createBlog(state.newBlog)
      },
      async editBlog() {
        await blogsService.editBlog(state.blogs._id)
      },
      async deleteBlog() {
        await blogsService.deleteBlog(props.blogs._id)
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
