import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
// import { postApi } from '../services/post'
import { Api } from '../services/postDataUsingGql'
export const store = configureStore({
  reducer: {
 
    // [postApi.reducerPath]: postApi.reducer,
    [Api.reducerPath]: Api.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    // getDefaultMiddleware().concat(postApi.middleware),
    getDefaultMiddleware().concat(Api.middleware),
})


setupListeners(store.dispatch)