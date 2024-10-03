// Dependencies: @reduxjs/toolkit
import { createSlice } from '@reduxjs/toolkit';

const shoppingListSlice = createSlice({
  name: 'shoppingList',
  initialState: {
    lists: [],
  },
  reducers: {
    addList: (state, action) => {
      state.lists.push(action.payload);
    },
    removeList: (state, action) => {
      state.lists = state.lists.filter(list => list.id !== action.payload);
    },
    addItem: (state, action) => {
      const { listId, item } = action.payload;
      const list = state.lists.find(list => list.id === listId);
      if (list) {
        list.items = list.items || [];
        list.items.push(item);
      }
    },
    removeItem: (state, action) => {
      const { listId, itemId } = action.payload;
      const list = state.lists.find(list => list.id === listId);
      if (list) {
        list.items = list.items.filter(item => item.id !== itemId);
      }
    },
    clearListItems: (state, action) => {
      const list = state.lists.find(list => list.id === action.payload);
      if (list) {
        list.items = [];
      }
    },
    editList: (state, action) => {
      const { id, updatedList } = action.payload;
      const listIndex = state.lists.findIndex(list => list.id === id);
      if (listIndex !== -1) {
        state.lists[listIndex] = { 
          ...state.lists[listIndex], 
          ...updatedList 
        };
      }
    },
    editItem: (state, action) => {
      const { listId, itemId, updatedItem } = action.payload;
      const list = state.lists.find(list => list.id === listId);
      if (list) {
        const itemIndex = list.items.findIndex(item => item.id === itemId);
        if (itemIndex !== -1) {
          list.items[itemIndex] = { 
            ...list.items[itemIndex], 
            ...updatedItem 
          };
        }
      }
    },
  },
});

export const { 
  addList, 
  removeList, 
  addItem, 
  removeItem, 
  clearListItems, 
  editList, 
  editItem 
} = shoppingListSlice.actions;

export default shoppingListSlice.reducer;
