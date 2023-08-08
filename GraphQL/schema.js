import {gql} from "apollo-server";
const typeDefs =gql`
   type Query{
     users:[User]
     user(id:ID!):User
  
   }
   type User{
     id:ID!
     firstName:String
     lastName:String
     email:String

   }
   type Mutation{
      userAdd(UserNew: UserInput!):User
      userDelete(id: ID!): User
      userUpdate(id: ID!, updatedUser: UserInput!): User 
   }
   input UserInput{
      firstName:String!
      lastName:String!
      email:String!

   }
`
export default typeDefs;