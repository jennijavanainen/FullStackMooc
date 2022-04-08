const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger');

blogRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})
  res.json(blogs)
})

blogRouter.get('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id)
  if (blog) {
    res.json(blog)
  } else {
    res.status(404).end()
  }
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

blogRouter.delete('/:id', async (req, res) => {
  await Blog.findByIdAndRemove(req.params.id)
  res.status(204).end()
})

blogRouter.put('/:id', async (req, res) => {
  const { likes } = req.body

  const updatedBlog = await Blog.findByIdAndUpdate(
    req.params.id,
    {likes},
    {new: true}
  )

  res.status(201).json(updatedBlog)
})

module.exports = blogRouter