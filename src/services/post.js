import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const postApi = createApi({
    reducerPath:'postApi',
    baseQuery:fetchBaseQuery({
        baseUrl:"https://jsonplaceholder.typicode.com/",
    }),
    endpoints:(builder)=>({
        getAllPost:builder.query({
            query:()=>({
                url:'posts',
                method:'GET',
            })
        }),
        getPostById:builder.query({
            query:(id)=>({
                url:`posts/${id}`,
                method:'GET'

            })
        }),
        getPostByLimit:builder.query({
            query:(id)=>({
                url:`posts?_limit=${id}`,
                method:"GET"
            })
        }),
        deletePostById:builder.mutation({
            query:(id)=>({
                url:`posts/${id}`,
                method:'DELETE',
            })
        }),
        createPost:builder.mutation({
            query:(newPost)=>({
                url:'posts',
                method:'POST',
                body:newPost,
                headers:{
                    'Content-type':'application/json;charset=UTF-8',
                 
                }
            })
        }),
        updatePost:builder.mutation({
            query:(updatePostData)=>{
            const {id , ...updatePost} = updatePostData;
            // console.log(id,"1111111111111111111111111");
            // console.log(updatePost,"222222222222222222");
            return {
                url:`posts/${id}`,
                method:"PUT",
                body:updatePost,
                headers:{
                    'Content-type':'application/json;charset=UTF-8',
                },
            }
        }
            
        })
    

    })

    
})

export const {useGetAllPostQuery,useGetPostByIdQuery,useGetPostByLimitQuery,useDeletePostByIdMutation,useCreatePostMutation,useUpdatePostMutation} =postApi;