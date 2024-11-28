import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddShoppingList = ({ userId}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      navigate('/Login'); 
    }
  }, [userId, navigate]);

  const [listName, setListName] = useState('');
  const [items, setItems] = useState([{ name: '', category: '', notes: '', quantity: '' }]);

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const addItem = () => {
    setItems([...items, { name: '', category: '', notes: '', quantity: '' }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const shoppingList = {
      userId: userId,
      listName,
      items,
    };

    axios.post('http://localhost:5000/shoppingLists', shoppingList)
      .then(result => {
        alert("Successfully added the shopping list!");
        navigate('/shoppingList');
      });
  };

  return (
    <section className='bg-no-repeat bg-cover'>
      <div className="max-w-lg p-8 mx-auto rounded shadow-md addnew">
        <h2 className="mb-6 text-2xl font-bold text-center" style={{ color: '#C087BF' }}>Add New Shopping List</h2>
        <form onSubmit={handleSubmit} className='text-slate-700'>
          <div className="mb-4">
            <label className="block text-white">List Name</label>
            <input
              type="text"
              value={listName}
              onChange={(e) => setListName(e.target.value)}
              className="w-full px-4 py-2 capitalize border rounded"
              required
            />
          </div>

          {items.map((item, index) => (
            <div key={index} className="mb-4">
              <label className="block text-white">Item Name</label>
              <input
                type="text"
                value={item.name}
                onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                className="w-full px-4 py-2 border rounded"
                required
              />
              <label className="block text-white">Category</label>
              <select
                value={item.category}
                onChange={(e) => handleItemChange(index, 'category', e.target.value)}
                className="w-full px-4 py-2 border rounded"
                required
              >
                <option value="">Select Category</option>
                <option value="Grocery">Grocery</option>
                <option value="Household">Household</option>
                <option value="Clothing">Clothing</option>
                <option value="Other">Other</option>
              </select>
              <label className="block text-white">Notes</label>
              <input
                type="text"
                value={item.notes}
                onChange={(e) => handleItemChange(index, 'notes', e.target.value)}
                className="w-full px-4 py-2 border rounded"
              />
              <label className="block text-white">Quantity</label>
              <input
                type="number"
                value={item.quantity}
                onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                className="w-full px-4 py-2 border rounded"
                required
              />
            </div>
          ))}

          <button type="button" onClick={addItem} className="mb-4 text-2xl text-blue-500">
            Add Another Item
          </button>

          <button
            type="submit"
            className="w-full bg-[#C087BF] text-white py-2 rounded hover:bg-pink-500 transition duration-300"
          >
            Add Shopping List
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddShoppingList;