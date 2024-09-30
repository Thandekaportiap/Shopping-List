import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteShoppingList, editShoppingList } from './ShoppingListSlice';

const ShoppingListCard = ({ listName, lists }) => {
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [newListName, setNewListName] = useState('');

    const handleDelete = (id) => {
        dispatch(deleteShoppingList(id));
    };

    const handleEdit = (id) => {
        if (newListName) {
            dispatch(editShoppingList({ id, updatedData: { listName: newListName } }));
            setNewListName('');
            setIsEditing(false);
        }
    };

    return (
        <div className="max-w-sm mx-auto mt-10 bg-slate-100  shadow-lg rounded-lg overflow-hidden">
            <div className="p-5">
                <h2 className="text-xl font-bold mb-4">{listName}</h2>
                <ul className="list-disc pl-5">
                    {lists.map((list) => (
                        <li key={list.id} className="mb-2">
                            <strong>{list.listName}</strong>
                            {list.items && list.items.length > 0 && (
                                <ul className="list-inside list-disc">
                                    {list.items.map((item, itemIndex) => (
                                        <li key={itemIndex}>
                                            {item.name} - {item.category} 
                                        </li>
                                    ))}
                                </ul>
                            )}
                            <div className="flex justify-between mt-2 bg-slate-900">
                                <button onClick={() => { setIsEditing(true); setNewListName(list.listName); }} className="bg-blue-500 text-white px-3 py-1 rounded">Edit</button>
                                <button onClick={() => handleDelete(list.id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
                            </div>
                            {isEditing && (
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        value={newListName}
                                        onChange={(e) => setNewListName(e.target.value)}
                                        className="border p-1 rounded"
                                        placeholder="New List Name"
                                    />
                                    <button onClick={() => handleEdit(list.id)} className="bg-green-500 text-white px-2 py-1 rounded ml-2">Save</button>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ShoppingListCard;
