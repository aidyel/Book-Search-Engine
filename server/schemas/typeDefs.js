// import the gql tagged template function
const { gql } = require('apollo-server-express');

// create our typeDefs
const typeDefs = gql`

type Query {
    me: User
}

type User {
    _id: ID!
    username: String!
    email: String!
    bookCount: Int
    savedBooks: [Book]

  }

type Book { 
    # api id ?
    bookId: ID!
    authors: [String]
    description: String
    title: String!
    image: String
    link: String
}

input savedBook {
    description: String!
    title: String!
    bookId: String!
    image: String
    lik: String
    authors: [String]
}

type Auth {
 token: ID
 user: User
}

type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(input: savedBook!): User
    removeBook(bookId: ID!): User
}

`;

// export the typeDefs
module.exports = typeDefs;