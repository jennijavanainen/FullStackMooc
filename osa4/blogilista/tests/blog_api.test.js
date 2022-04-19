const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')
const User = require('../models/user')

let token

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  const defaultUser = {
    username: 'name',
    password: 'password'
  }

  await api.post("/api/users").send(defaultUser)
  await Blog.insertMany(helper.initialBlogs)

  const result = await api.post("/api/login").send(defaultUser)

  token = result.body.token

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

  test('a specific blog is returned with all', async () => {
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

describe('getting only a specific blog from db', () => {
  test('returns correct blog', async () => {
    const allBlogs = await helper.blogsInDb()
    const blogToFind = allBlogs[0]
    const response = await api
      .get(`/api/blogs/${blogToFind.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body).toEqual(allBlogs[0])
  })

  test('with invalid id returns code 400', async () => {

    await api
      .get('/api/blogs/600')
      .expect(400)

  })
})

describe('posting a blog', () => {
  test('added blog can be found', async () => {
    const newBlog = {
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 6
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
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

  test('without likes returns exactly 0 likes', async () => {
    const newBlog = {
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    const likes = blogsAtEnd.find(blog => blog.title === 'Type wars').likes
    expect(likes).toBe(0)
  })

  test('without title/url results code 400', async () => {
    const newBlog = {
      title: 'Type wars',
      author: 'Robert C. Martin',
      likes: 2
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
})

describe('deleting a blog', () => {
  test('with valid id results code 204', async () => {
    const newBlog = {
      _id: "5a422b891b54a676234d18fa",
      title: "Deletion test",
      author: "Unknown",
      url: "www.test.fi",
      __v: 0
    }

    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(newBlog)
      .expect(201);

    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[blogsAtStart.length - 1]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    console.log(blogsAtEnd)

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length
    )

    const contents = blogsAtEnd.map(r => r.title)
    expect(contents).not.toContain(blogToDelete.title)
  })
})

afterAll(() => {
  mongoose.connection.close()
})