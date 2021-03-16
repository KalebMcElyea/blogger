import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class BlogsService {
  async getAllBlogs() {
    const res = await api.get('api/blogs')
    AppState.blogs = res.data
  }

  async getBlog(id) {
    const res = await api.get('api/blogs/' + id)
    AppState.activeBlog = res.data
  }

  async getAccountBlogs() {
    const res = await api.get('account/blogs')
    AppState.accountBlog = res.data
  }

  async editBlog(id) {
    const res = await api.put('api/blogs/' + id)
    AppState.myBlog = res.data
  }

  async createBlog(rawBlog) {
    await api.post('api/blogs/', rawBlog)
    this.getAllBlogs()
  }

  async deleteBlog(id) {
    await api.delete('api/blogs/' + id)
    this.getAllBlogs()
  }

  async getComments(id) {
    try {
      const res = await api.get('api/blogs/' + id + '/comments')
      AppState.blogComments = res.data
    } catch (error) {
      logger.log(error)
    }
  }

  async createComment(rawComment) {
    await api.post('api/comments/', rawComment)
  }

  async deleteComment(id) {
    await api.delete('api/comments/' + id)
  }

  async editComment(id) {
    await api.put('api/comments/' + id)
  }
}

export const blogsService = new BlogsService()
