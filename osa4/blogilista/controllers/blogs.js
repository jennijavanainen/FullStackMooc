const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger');
const { userExtractor } = require("../utils/middleware");

blogRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})
    .populate('user', { username: 1 , name: 1})
  res.json(blogs)
})

blogRouter.get('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id)

  blog ? res.json(blog) : res.status(404).end()

})

blogRouter.post('/', userExtractor, async (req, res) => {
  const user = req.user

  const blog = new Blog({
    title: req.body.title,
    author: req.body.author,
    url: req.body.url,
    likes: req.body.likes || 0,
    user: user._id
  })

  const savedBlog = await blog.save()
  if (user.blogs) {
    user.blogs = user.blogs.concat(savedBlog._id)
  } else {
    user.blogs = [savedBlog._id]
  }

  await user.save()
  res.status(201).json(savedBlog)

})

blogRouter.delete('/:id', userExtractor, async (req, res) => {
  const user = req.user
  const blogToDelete = await Blog.findById(req.params.id)

  if (blogToDelete && blogToDelete.user.toString() === user._id.toString()) {
    await Blog.findByIdAndRemove(req.params.id)
    res.status(204).end()
  } else {
    return res.status(401).json({
      error: 'Current user cannot delete this blog'
    })
  }


})

blogRouter.put('/:id', async (req, res) => {
  const { likes } = req.body

  const updatedBlog = await Blog.findByIdAndUpdate(
    req.params.id,
    { likes },
    { new: true }
  )

  res.status(201).json(updatedBlog)
})

module.exports = blogRouter