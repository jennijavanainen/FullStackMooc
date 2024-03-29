const { ApolloServer, gql, UserInputError, AuthenticationError} = require('apollo-server')
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
require('dotenv').config()
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const jwt = require('jsonwebtoken')
const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'

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
  
  type User {
  username: String!
  favoriteGenre: String!
  id: ID!
  }
  
  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book]!
    allAuthors: [Author!]!
    me: User
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
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
`

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) =>  { return getAllBooks(root, args) },
    allAuthors: async (root) => { return Author.find({}) },
    me: async (root, args, context) => {
      const user = await User.findOne({ username: context.currentUser.username })
      return user
    }
  },
  Author: {
    bookCount: (root) =>  { return countBooks(root) }
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      const author = await Author.findOne({ name: args.author }) || await new Author( {
        name: args.author
      }).save()

      const book = new Book( { ...args, author: author })

      if (!currentUser) {
        throw new AuthenticationError("no authentication")
      }

      try {
        await book.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }

      return book
    },
    editAuthor: async (root, args, { currentUser }) =>  {
      const author = await Author.findOne({ name: args.name })

      if (!currentUser) {
        throw new AuthenticationError("no authentication")
      }

      if (!author) {
        return null
      }

      author.born = args.setBornTo

      try {
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }

      return author
    },
    createUser: async (root, args) => {
      const user = new User({ ...args })

      try {
        await user.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      return user
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if ( !user || args.password !== 'secret' ) {
        throw new UserInputError("wrong credentials")
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  }
}

const countBooks = async (author) => {
  const books = await Book.find({}).populate('author', { name: 1 })

  return books.reduce((total, currentBook) =>
    total + (currentBook.author.name === author.name ? 1 : 0), 0)
}

const getAllBooks = async (root, args) => {
  const books = await Book.find({}).populate('author', { name: 1, born: 1 })

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



const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})