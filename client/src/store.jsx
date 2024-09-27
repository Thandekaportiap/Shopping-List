import { configureStore } from '@reduxjs/toolkit'
import shoppingListReducer from './features/Shopping/ShoppingListSlice'
import loginReducer from './features/Login/LoginSlice'
import signupReducer from './features/Signup/SignupSlice'

export const store = configureStore({
  reducer: {
    login: loginReducer,
    shoppingList: shoppingListReducer,
    signup: signupReducer,
  },
})