<template>
  <div class="flex justify-content-center my-2 col-10" v-if="blogs.creator">
    <router-link :to="{name: 'BlogDetailsPage', params:{id: blogs.id}}">
      <div class="card">
        <div class=" p-2">
          <div class="bg-dark rounded">
          </div>
          <div class="card-body">
            <p><strong>{{ blogs.title }}</strong> </p>
            <p>{{ blogs.creator.name }}</p>
            <div class="text-right absolute top right p-2">
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

  setup() {
    const state = reactive({
      user: computed(() => AppState.user),
      blogs: computed(() => AppState.blogs)
    })

    return {
      state,
      async createBlog() {
        await blogsService.createBlog(state.newBlog)
      },
      async editBlog() {
        await blogsService.editBlog(state.blogs.id)
      },
      async deleteBlog() {
        await blogsService.deleteBlog(state.blogs.id)
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
