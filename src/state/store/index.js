import { configureStore } from "@reduxjs/toolkit";
import  userProfileReducer from '../userProfile'

 export const store = configureStore({
    reducer:{
        userProfile:userProfileReducer
    }
});
