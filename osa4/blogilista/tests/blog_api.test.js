const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})
describe('returning all blogs from db', () => {
  test('blog information is returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('a specific blog is returned', async () => {
    const response = await api.get('/api/blogs')
    const contents = response.body.map(r => r.title)
    expect(contents).toContain('Canonical string reduction')
  })

  test('id field of returned blogs is called "id"', async () => {
    const response = await api.get('/api/blogs')
    const contents = response.body
    contents.forEach(blog => {
      expect(blog).toHaveProperty('id')
    })
  })
})

describe('posting a blog', () => {
  test('added blog can be found', async () => {
    const newBlog = {
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const contents = blogsAtEnd.map(blog => blog.title)
    expect(contents).toContain(
      'Type wars'
    )
  })
})


afterAll(() => {
  mongoose.connection.close()
})