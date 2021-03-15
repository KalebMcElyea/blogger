
<template>
  <div class="create-post-modal">
    <!-- Modal -->
    <div class="modal fade"
         id="create-post"
         tabindex="-1"
         role="dialog"
         aria-labelledby="modelTitleId"
         aria-hidden="true"
    >
    </div>
    <div class="modal-body">
      <form class="form-inline" @submit.prevent="createComment">
        <div class="form-group">
          <input type="text"
                 name="body"
                 id="comment"
                 class="form-control"
                 placeholder="Comment"
                 aria-describedby="helpId"
                 v-model="state.newComment.body"
          >
        </div>
      </form>
    </div>
    <div class="modal-footer">
      <button class="btn btn-success" @click="createComment">
        Create
      </button>
    </div>
  </div>
</template>

<script>
import { reactive, computed } from 'vue'
import { blogsService } from '../services/BlogsService'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import $ from 'jquery'
export default {
  name: 'CreateComment',
  setup() {
    const state = reactive({
      blogs: computed(() => AppState.activeBlog),
      comments: computed(() => AppState.blogComments),
      user: computed(() => AppState.user),
      newComment: {}
    })
    return {
      state,
      async createComment(newComment) {
        try {
          await blogsService.createComment(newComment)
          state.newComment = {}
          $('#create-Comment')
        } catch (error) {
          logger.log(error)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
