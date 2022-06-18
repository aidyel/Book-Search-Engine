// import the gql tagged template function
const { gql } = require('apollo-server-express');

// create our typeDefs
const typeDefs = gql`

type Query {
    me: User
}

type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [books]

  }

type Book { 
    # api id ?
    bookId: ID 
    authors: [String]
    description: String
    title: String
    image: String
    link: String
}

type Auth {
 token: ID
 user: User
}

type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(bookAuthor: [books], description: String, title: String, bookId: ID, image: ?, link: ?): User
    removeBook(bookId: ID): User
}

`;

// export the typeDefs
module.exports = typeDefs;