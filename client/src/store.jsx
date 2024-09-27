import { configureStore } from '@reduxjs/toolkit'
import shoppingListReducer from './features/ShoppingListSlice'

export const store = configureStore({
  reducer: {
    shoppingList: shoppingListReducer,
  },
})