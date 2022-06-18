const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');


const {Book, User} =require('../models');

const resolvers = {
    Query: {
        me: async (parent, args) => {
            if (context.user) {
                const userData = await User.findOne({_id: context.user._id
                }).select('-__v -password')
                .populate('books');
            
                return userData;
            }
            throw new AuthenticationError('Not logged in')
        },
        users: async () => {
            return User.find()
            .select('-__v -password')
            .populate('books');
        },
        
        user: async (parent, { username }) => {
            return User.findOne({ username })
            .select('-__v -password')
            .populate('books');
        },
    },

    Mutation: {
        createUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return {token, user}
        },

        login: async (parent, {email, password}) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }
            const token = signToken(user);

            return { token, user }
        },

        saveBook: async (parent, {user, body}, context) => {
            if (context.user) {
              const updatedUser = await User.findOneAndUpdate(
                { _id: user._id },
                { $addToSet: { savedBooks: body } },
                { new: true, runValidators: true }
              );
              return updatedUser;
            }
            throw new AuthenticationError('You need to be logged in!');
          },

          deleteBook: async (parent, {user, params}, context) => {
              if(context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: user._id },
                    { $pull: { savedBooks: { bookId: params.bookId } } },
                    { new: true }
                  );

                  return updatedUser
              }
              throw new AuthenticationError('You need to be logged in!');
          }

    }
}