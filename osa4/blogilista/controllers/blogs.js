const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger');

blogRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})
  res.json(blogs)
})

blogRouter.post('/', async (req, res) => {
  const blog = new Blog({
    title: req.body.title,
    author: req.body.author,
    url: req.body.url,
    likes: req.body.likes || 0,
  })

  const savedBlog = await blog.save()
  res.status(201).json(savedBlog)

})

module.exports = blogRouter