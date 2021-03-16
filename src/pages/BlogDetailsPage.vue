<template>
  <div class="container-fluid mt-4 justify-content-center" v-if="state.blogs.creator">
    <div class="justify-content-center" v-if="state.blogs.creator">
      <form class="col form-inline justify-content-center">
        <div class="form-group m-2">
          <input
            type="text"
            name="body"
            class="form-control"
            placeholder="Comment"
            aria-describedby="helpId"
            v-model="state.newComment.body"
          />
          <button type="button" class="btn btn-primary btn-lg m-4" v-if="state.user.isAuthenticated" @click="createComment()">
            Comment
          </button>
        </div>
      </form>
      <div class="card p-5 text-center">
        <h5 class="m-5">
          <i class="fa fa-user-circle" aria-hidden="true"></i> User:   {{ state.blogs.creator.name }}
          <br>
          <br class="p-4">
          <i class="fa fa-comment" aria-hidden="true"></i>  Comment:   {{ state.blogs.body }}
        </h5>
        <button class="btn-danger text-dark action m-2" v-if="state.user.isAuthenticated" @click="deleteBlog()">
          Delete Blog
        </button>
        <button class="btn btn-primary text-dark action m-2" v-if="state.user.isAuthenticated" @click="editBlog()">
          Edit
        </button>
        <div>
          <div class="card p-5">
            <div>
              <Comments
                v-for="comments in state.comments"
                :key="comments.id"
                :comments="comments"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { blogsService } from '../services/BlogsService'
import { AppState } from '../AppState'
export default {
  name: 'BlogDetailsPage',

  props: {
    blog: { type: Object, ref: 'Blog', required: true },
    creator: { type: String, required: true },
    body: { type: String, required: true }
  },

  setup(props) {
    const route = useRoute()

    const state = reactive({
      blogs: computed(() => AppState.activeBlog),
      comments: computed(() => AppState.blogComments),
      user: computed(() => AppState.user),
      newComment: {}
    })

    onMounted(async() => {
      await blogsService.getBlog(route.params.id)
      await blogsService.getComments(route.params.id)
    })

    return {
      route,
      state,
      async createComment() {
        state.newComment.blog = route.params.id
        await blogsService.createComment(state.newComment)
        state.newComment = {}
      },

      editBlog(props) {
        blogsService.editBlog(props.blog.id)
      },

      deleteBlog() {
        blogsService.deleteBlog(route.params.id)
      }
    }
  },
  components: {}
}
</script>
