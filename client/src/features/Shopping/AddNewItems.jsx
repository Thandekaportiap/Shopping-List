import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../Shopping/ShoppingListSlice';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

const AddItemForm = ({ currentListId, userId }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [items, setItems] = useState([{ id: uuidv4(), name: '', quantity: 1, notes: '', tags: '', category: '' }]);
    const [listName, setListName] = useState('');

    useEffect(() => {
        if (!userId) {
            navigate('/Login');
        }
    }, [userId, navigate]);

    const handleInputChange = (index, field, value) => {
        const newItems = [...items];
        newItems[index][field] = value;
        setItems(newItems);
    };

    const handleAddItemField = () => {
        setItems([...items, { id: uuidv4(), name: '', quantity: 1, notes: '', tags: '', category: '' }]);
    };

    const handleSubmit = async () => {
        const itemsToSend = items.filter(item => item.name);

        itemsToSend.forEach(item => {
            dispatch(addItem({ listId: currentListId, item }));
        });

        try {
            const response = await fetch('http://localhost:5000/shoppingLists', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId, listName, items: itemsToSend }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            // Reset the form fields after successful submission
            setItems([{ id: uuidv4(), name: '', quantity: 1, notes: '', tags: '', category: '' }]);
            setListName('');
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };

    return (
        <section>
            <div className="addnew p-8 rounded shadow-md max-w-lg mx-auto">
                <h2 className="text-lg">Add New Items to your Shopping List</h2>
                <input
                    type="text"
                    value={listName}
                    onChange={(e) => setListName(e.target.value)}
                    placeholder="List Name"
                    className="p-2 border my-1"
                />
                
                {items.map((item, index) => (
                    <div key={item.id} className="flex flex-col mb-2">
                        <input
                            type="text"
                            value={item.name}
                            onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                            placeholder="Item name"
                            className="p-2 border my-1"
                        />
                        <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => handleInputChange(index, 'quantity', e.target.value)}
                            placeholder="Quantity"
                            className="p-2 border my-1"
                        />
                        <select
                            value={item.category}
                            onChange={(e) => handleInputChange(index, 'category', e.target.value)}
                            className="w-full px-4 py-2 border rounded"
                            required
                        >
                            <option value="">Select Category</option>
                            <option value="Grocery">Grocery</option>
                            <option value="Household">Household</option>
                            <option value="Clothing">Clothing</option>
                            <option value="Other">Other</option>
                        </select>
                        <textarea
                            value={item.notes}
                            onChange={(e) => handleInputChange(index, 'notes', e.target.value)}
                            placeholder="Notes"
                            className="p-2 border my-1"
                        />
                    </div>
                ))}
                
                <button onClick={handleAddItemField} className="p-2 bg-lime-500 text-white mb-2 rounded-md">Add Another Item</button>
                <button onClick={handleSubmit} className="p-2 bg-blue-500 text-white rounded-md">Submit Items</button>
            </div>
        </section>
    );
};

export default AddItemForm;
