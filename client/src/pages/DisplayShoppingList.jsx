// src/components/DisplayShoppingList.js
import  { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, updateItem, removeItem } from '../features/Shopping/ShoppingListSlice';

const DisplayShoppingList = () => {
  const dispatch = useDispatch();
  const items = useSelector(state => state.shoppingList);

  const [item, setItem] = useState({ id: null, name: '', quantity: '', notes: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem({ ...item, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (item.id) {
      dispatch(updateItem(item));
    } else {
      dispatch(addItem({ ...item, id: Date.now() }));
    }
    setItem({ id: null, name: '', quantity: '', notes: '' });
  };

  const handleEdit = (item) => {
    setItem(item);
  };

  const handleDelete = (id) => {
    dispatch(removeItem(id));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Item Name"
          value={item.name}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={item.quantity}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="notes"
          placeholder="Optional Notes"
          value={item.notes}
          onChange={handleChange}
        />
        <button type="submit">{item.id ? 'Update' : 'Add'} Item</button>
      </form>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            <strong>{item.name}</strong> - {item.quantity} <em>{item.notes}</em>
            <button onClick={() => handleEdit(item)}>Edit</button>
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DisplayShoppingList;