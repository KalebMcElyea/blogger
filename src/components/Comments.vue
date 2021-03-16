<template>
  <div class="comments">
    <div class="card p-5 text-center">
      <h5 class="m-5">
        <i class="fa fa-user-circle" aria-hidden="true"></i> User:   {{ comments.creator.name }}
        <br>
        <br class="p-4">
        <i class="fa fa-comment" aria-hidden="true"></i>  Comment:   {{ comments.body }}
      </h5>
      <button class="btn btn-primary text-dark action m-2" v-if="state.user.isAuthenticated" @click="editBlog()">
        Edit
      </button>
      <button type="button" class="btn btn-danger btn-lg m-4" v-if="state.user.isAuthenticated" @click="deleteComment()">
        Delete
      </button>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { blogsService } from '../services/BlogsService'
import { AppState } from '../AppState'

export default {
  name: 'Comments',
  props: {
    comments: { type: Object, required: true },
    body: { type: String, required: true },
    creator: { type: String, required: true }
  },
  setup(props) {
    const route = useRoute()

    const state = reactive({
      user: computed(() => AppState.user),
      newComment: {}
    })

    return {
      route,
      state,
      async editComment() {
        state.newComment.blog = route.params.id
        await blogsService.editComment()
      },
      async deleteComment() {
        await blogsService.deleteComment(props.comments.id, route.params.id)
      }

    }
  }
}
</script>

<style lang="scss" scoped>

</style>
