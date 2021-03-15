import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class BlogsService {
  async getAllBlogs() {
    const res = await api.get('api/blogs')
    AppState.blogs = res.data
    logger.log(res.data)
  }

  async getBlog(id) {
    try {
      const res = await api.get('api/blogs/' + id)
      AppState.activeBlog = res.data
    } catch (error) {
      logger.log(error)
    }
  }

  async getAccountBlogs(id) {
    try {
      const res = await api.get('account/blogs/' + id)
      AppState.accountBlog = res.data
    } catch (error) {
      logger.log(error)
    }
  }

  async editBlog(id) {
    try {
      const res = await api.put('api/blogs/' + id)
      AppState.myBlog = res.data
    } catch (error) {
      logger.log(error)
    }
  }

  async createBlog(rawBlog) {
    try {
      await api.post('api/blogs/', rawBlog)
      this.getAllBlogs()
    } catch (error) {
      logger.log(error)
    }
  }

  async deleteBlog(id) {
    await api.delete('api/blogs/' + id)
    this.getBlog()
  }

  async getComments(id) {
    try {
      const res = await api.get('api/blogs/' + id + '/comments')
      AppState.blogComments = res.data
    } catch (error) {
      logger.log(error)
    }
  }

  async creatComment(rawComment) {
    await api.post('api/comments/', rawComment)
    this.getComments()
  }
}

export const blogsService = new BlogsService()
