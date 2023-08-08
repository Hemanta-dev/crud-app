import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const Api = createApi({
  reducerPath: 'postApi',
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/",
  }),

  endpoints: (builder) => ({
    getAllPost: builder.query({
      query: () => ({
        url: "/graphql",
        method: "POST",
        body: { query: "query { users { id, firstName, lastName, email } }" },
      }),
    }),
    getUserById:builder.query({
      query:(id)=>({
        url:`/graphql/${id}`,
        method:"POST",
        body:{query:`
        query{
          user(id:"${id}"){
            id
            firstName
            lastName
            email
        }
        }
         
        `
        }
      })
    }),
    createPost: builder.mutation({
      query: (newUser) => ({
        url: '/graphql',
        method: 'POST',
        body: {
          query: `
            mutation CreateUser($UserNew: UserInput!) {
              userAdd(UserNew: $UserNew) {
                id
                firstName
                lastName
                email
              }
            }
          `,
          variables: {
            UserNew: newUser,
          },
        },
        headers: {
          'Content-type': 'application/json;charset=UTF-8',
        },
      }),
    }),
    updatePost: builder.mutation({
      query: ({ id, updatedUser }) => ({
        url: '/graphql',
        method: 'POST',
        body: {
          query: `
            mutation UpdateUser($id: ID!, $updatedUser: UserInput!) {
              userUpdate(id: $id, updatedUser: $updatedUser) {
                id
                firstName
                lastName
                email
              }
            }
          `,
          variables: {
            id: id,
            updatedUser: updatedUser,
          },
        },
        headers: {
          'Content-type': 'application/json;charset=UTF-8',
        },
      }),
    }),
    
    
    deletePost:builder.mutation({
      query:(id)=>({
        url:`/graphql/${id}`,
        method:'POST',
        body:{query:`
        mutation {
          userDelete(id: "${id}") {
            id
            firstName
            lastName
            email
          }
        }
        `}

      })
    })
  }),
});

export const { useGetAllPostQuery,useGetUserByIdQuery, useCreatePostMutation,useUpdatePostMutation,useDeletePostMutation} = Api;
