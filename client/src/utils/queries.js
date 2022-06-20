import { gql } from '@apollo/client';

export const ME_QUERY = gql`
{
    me {
        _id
        username
        email
        bookCount
        savedBooks {
            bookId
            authors
            image
            title
            description
        }
    }
}
`;
