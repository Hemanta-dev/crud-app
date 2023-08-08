// import './App.css';
// import { useGetPostByIdQuery, useGetPostByLimitQuery, useDeletePostByIdMutation, useGetAllPostQuery, useCreatePostMutation, useUpdatePostMutation } from './services/post';


// function App() {

//   //get all data 
//   const responseDataAll = useGetAllPostQuery();
//   //get specific data
//   const responseDataById = useGetPostByIdQuery(6);
//   // get data in limit
//   const responseDataByIdLimit = useGetPostByLimitQuery(6);
//   const newData = responseDataAll.data;

//   console.log("data", newData);





//   //create new post  
//   const [createPost, responseData] = useCreatePostMutation();
//   const newPost =
//   {
//     userId: "1",
//     title: "hero",
//     body: "bar",
//   }

//   const handlePost = () => {
//     createPost(newPost);
//     console.log(responseData.isSuccess, "data:", responseData.data);
//   }

//   //Editing
//   const updatePostData = {
//     id: 1,
//     userId: "2",
//     title: "nepal",
//     body: "hero"

//   }
//   const [updatePost, editData] = useUpdatePostMutation();
//   const isEditPost = () => {
//     updatePost(updatePostData);
//     console.log(editData.status);
//     console.log(editData.data, "999999999999999999999999999999")
//   }

//   //delete specific data
//   const [deletePost, responseDataDelete] = useDeletePostByIdMutation();
//   console.log(deletePost, "8888888888888");
//   const handleDelete = (id) => {
//     deletePost(2);
//     console.log(responseDataDelete.isSuccess);
//   }



//   return (
//     <>
//       <input type="button" onClick={handlePost} value="New Add" />
//       <input type="button" onClick={isEditPost} value="Edit Post" />
//       <input type="button" onClick={handleDelete} value="Delete Post" />
//       {/**get  all data */}
//       {newData ? newData.map((eachData, index) => (
//         <div key={index}>
//           <p>id: {eachData.id}</p>
//           <p>title: {eachData.title}</p>
//           <p>body:{eachData.body}</p>
//         </div>

//       )) : (
//         <p>no data found</p>
//       )}
//     </>

//   )
// }


// export default App;
import React from 'react';
import '@elastic/eui/dist/eui_theme_light.css';

import { EuiProvider, EuiText } from '@elastic/eui';

import Test1 from "./components/test1";
import Flyout from "./components/flyout";
const App = () => {
  return (
    <EuiProvider colorMode="light">
       <Test1/>
       {/* <Flyout/> */}
      
    </EuiProvider>
  )
}

export default App;






