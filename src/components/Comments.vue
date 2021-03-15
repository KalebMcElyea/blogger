<template>
  <div class="comments">
    <div class="card p-5 text-center">
      <h5 class="m-5">
        <i class="fa fa-user-circle" aria-hidden="true"></i> User:   {{ comments.creator.name }}
        <br>
        <br class="p-4">
        <i class="fa fa-comment" aria-hidden="true"></i>  Comment:   {{ comments.body }}
      </h5>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { computed } from 'vue'

import { AppState } from '../AppState'
export default {
  name: 'Comments',
  props: {
    comments: { type: Object, required: true },
    body: { type: String, required: true },
    // blog: { type: ObjectId, ref: 'Blog', required: true },
    creator: { type: String, required: true }
  },
  setup() {
    const state = reactive({
      user: computed(() => AppState.user),
      newComment: {}
    })

    return {
      state

    }
  }
}
</script>

<style lang="scss" scoped>

</style>
