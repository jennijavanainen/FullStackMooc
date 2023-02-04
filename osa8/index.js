const { ApolloServer, gql, UserInputError} = require('apollo-server')
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
require('dotenv').config()
const Book = require('./models/book')
const Author = require('./models/author')

const MONGODB_URI = process.env.MONGODB_URI

mongoose.connect(MONGODB_URI)
  .then(res => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })


const typeDefs = gql`
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int
  }
  
  type Book {
    title: String!
    published: Int
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book]!
    allAuthors: [Author!]!
  }
  
  type Mutation {
    addBook(
      title: String!,
      author: String!,
      published: Int
      genres: [String!]!
    ): Book!
    addAuthor(
      name: String!
      born: Int
    ): Author!
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) =>  { return Book.find({}) },
    allAuthors: async (root) => { return Author.find({}) },
  },
  Author: {
    //bookCount: (root) =>  { return countBooks(root.name) }
  },
  Mutation: {
    addBook: async (root, args) => {
      const author = await Author.findOne({ name: args.author }) || await new Author( {
        name: args.author
      }).save()

      const book = new Book( { ...args, author: author })

      try {
        await book.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }

      return book
    },
    /*
    editAuthor: (root, args) =>  {
      const author = authors.find(a => a.name === args.name)
      if (!author) {
        return null
      }
      const updatedAuthor = { ...author, born: args.setBornTo }
      authors = authors.map(a => a.name === args.name ? updatedAuthor : a)
      return updatedAuthor
    }

     */
  }
}
/*
const countBooks = (author) => {
  return books.reduce((total, currentBook) =>
    total + (currentBook.author === author ? 1 : 0), 0)
}

const getAllBooks = (root, args) => {
  if (args.author !== undefined && args.genre !== undefined) {
    return books.filter(book => book.author === args.author).filter(book => book.genres.includes(args.genre))
  }
  if (args.author !== undefined) {
    return books.filter(book => book.author === args.author)
  }
  else if (args.genre !== undefined) {
    return books.filter(book => book.genres.includes(args.genre))
  }
  else {
    return books
  }
}

 */


const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})