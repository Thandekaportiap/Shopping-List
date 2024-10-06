import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  items: [],
  status: 'idle', 
  error: null, 
};

export const fetchShoppingLists = createAsyncThunk(
  'shoppingList/fetchShoppingLists',
  async (userId) => {
    const response = await axios.get(`http://localhost:5000/shoppingLists?userId=${userId}`);
    return response.data;
  }
);

const shoppingListSlice = createSlice({
  name: 'shoppingList',
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
    updateItem: (state, action) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    // Removing a full shopping list
    removeShoppingList: (state, action) => {
      state.items = state.items.filter(list => list.id !== action.payload);
    },
    // Removing a specific item from a shopping list
    removeItemFromList: (state, action) => {
      const { listId, itemId } = action.payload;
      const list = state.items.find(list => list.id === listId);
      if (list) {
        list.items = list.items.filter(item => item.id !== itemId);
      }
    },
    // Updating the items in a shopping list
    updateShoppingList: (state, action) => {
      const { listId, updatedItems } = action.payload;
      const list = state.items.find(list => list.id === listId);
      if (list) {
        list.items = updatedItems;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchShoppingLists.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchShoppingLists.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchShoppingLists.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

// Export the actions
export const { 
  addItem, 
  updateItem, 
  removeShoppingList, 
  removeItemFromList,
  updateShoppingList 
} = shoppingListSlice.actions;


export default shoppingListSlice.reducer;
