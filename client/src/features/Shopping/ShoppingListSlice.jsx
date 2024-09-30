
import { createSlice } from '@reduxjs/toolkit';

const shoppingListSlice = createSlice({
  name: 'shoppingList',
  initialState: [],
  reducers: {
    addItem: (state, action) => {
      state.push(action.payload);
    },
    editShoppingList : (state, action) => {
      const index = state.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    deleteShoppingList: (state, action) => {
      return state.filter(item => item.id !== action.payload);
    },
  },
});

export const { addItem, editShoppingList ,  deleteShoppingList } = shoppingListSlice.actions;
export default shoppingListSlice.reducer;