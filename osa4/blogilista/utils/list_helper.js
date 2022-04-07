const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favouriteBlog = (blogs) => {
  return blogs.length === 0 ? 'empty array' : blogs.reduce((max, blog) => max.likes > blog.likes ? max : blog )
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return 'empty array'
  }
  const authors = blogs.map(blog => blog.author)
  const author = authors.reduce((result, blog) => (authors.filter(v => v === result).length >= authors.filter(v => v === blog ).length ? result : blog),
    {})
  const authorBlogs = blogs.filter(blog => blog.author === author)
  return {author: author, blogs: authorBlogs.length}
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return 'empty array'
  }

  const totals = blogs.reduce((result, blog) => {
    const {author, likes} = blog
    return {...result, [author]: (result[author] || 0)  + likes}
  }, {})

  const findMostLiked = totals => {
    const maxLikes = Math.max.apply(Math, Object.values(totals))
    const author = Object.keys(totals).reduce((a,b) => (totals[a] > totals[b]) ? a : b )
    return {author: author, likes: maxLikes}
  }

  return findMostLiked(totals)

}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes
}