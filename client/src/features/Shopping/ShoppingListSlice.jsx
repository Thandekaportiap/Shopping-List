import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  items: [],
  status: 'idle', 
  error: null, 
};

// Async thunk to fetch shopping lists
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
    addItemToList: (state, action) => {
      const { listId, newItem } = action.payload;
      const list = state.items.find(list => list.id === listId);
      if (list) {
        list.items.push(newItem); // Add new item to the list's items
      }
    },
    updateItem: (state, action) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    removeShoppingList: (state, action) => {
      state.items = state.items.filter(list => list.id !== action.payload);
    },
    removeItemFromList: (state, action) => {
      const { listId, itemId } = action.payload;
      const list = state.items.find(list => list.id === listId);
      if (list) {
        list.items = list.items.filter(item => item.id !== itemId);
      }
    },
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
  addItemToList, 
  updateItem, 
  removeShoppingList, 
  removeItemFromList,
  updateShoppingList 
} = shoppingListSlice.actions;

export default shoppingListSlice.reducer;
