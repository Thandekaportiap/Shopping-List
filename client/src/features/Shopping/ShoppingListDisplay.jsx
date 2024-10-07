import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchShoppingLists, removeShoppingList, removeItemFromList, addItemToList, updateItem } from '../Shopping/ShoppingListSlice'; 
import axios from 'axios';
import { CiCircleRemove } from 'react-icons/ci';
import { FaFilePdf } from 'react-icons/fa6';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { useNavigate, useParams } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import Swal from 'sweetalert2';

const ShoppingListDisplay = () => {
    const { id } = useParams(); // Get the ID from the URL
    const dispatch = useDispatch();
    const shoppingLists = useSelector((state) => state.shoppingList.items);
    const [list, setList] = useState(null);
    const [newItemName, setNewItemName] = useState('');
    const [newItemQuantity, setNewItemQuantity] = useState('');
    const [newItemNotes, setNewItemNotes] = useState('');
    const [showAddItemForm, setShowAddItemForm] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            const fetchedList = shoppingLists.find(list => list.id === id);
            if (fetchedList) {
                setList(fetchedList);
            } else {
                dispatch(fetchShoppingLists(id));
            }
        } else {
            navigate('/Login');
        }
    }, [id, dispatch, shoppingLists, navigate]);

    const handleAddItem = () => {
        if (!newItemName || !newItemQuantity) {
            Swal.fire('Error!', 'Please provide both item name and quantity.', 'error');
            return;
        }

        const newItem = {
            id: Date.now(), // Generate IDs this way for now
            name: newItemName,
            quantity: newItemQuantity,
            notes: newItemNotes,
        };

        dispatch(addItemToList({ listId: list.id, newItem }));

        setNewItemName('');
        setNewItemQuantity('');
        setNewItemNotes('');
        setShowAddItemForm(false);
    };

    const handleDeleteItem = async (listId, itemId) => {
        const confirmDelete = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        });

        if (confirmDelete.isConfirmed) {
            dispatch(removeItemFromList({ listId, itemId }));
            Swal.fire('Deleted!', 'Item has been deleted.', 'success');
        }
    };

    const handleDeleteList = async (listId) => {
        const confirmDelete = await Swal.fire({
            title: "Are you sure?",
            text: "This will delete the entire shopping list!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        });

        if (confirmDelete.isConfirmed) {
            await axios.delete(`http://localhost:5000/shoppingLists/${listId}`);
            dispatch(removeShoppingList(listId));
            Swal.fire('Deleted!', 'Shopping list has been deleted.', 'success');
            navigate('/display-list'); // Navigate back to the display list after deletion
        }
    };

    const handlePDFExport = () => {
        const doc = new jsPDF();
        doc.text(`Shopping List: ${list.listName}`, 10, 10);
        list.items.forEach((item, index) => {
            doc.text(`${item.name} - Quantity: ${item.quantity}`, 10, 20 + (index * 10));
        });
        doc.save(`${list.listName}.pdf`);
    };

    if (!list) return <p>Loading...</p>;

    return (
        <section className='text-center p-1'>
            <h2 className='text-4xl font-bold'>{list.listName}</h2>
            <div className="mt-4">
                <button onClick={() => setShowAddItemForm(prev => !prev)}>
                    {showAddItemForm ? 'Cancel' : 'Add Item'}
                </button>
                {showAddItemForm && (
                    <div className="mt-4">
                        <input
                            type="text"
                            value={newItemName}
                            onChange={(e) => setNewItemName(e.target.value)}
                            placeholder="Item Name"
                            className="border p-2 rounded mr-2"
                        />
                        <input
                            type="number"
                            value={newItemQuantity}
                            onChange={(e) => setNewItemQuantity(e.target.value)}
                            placeholder="Quantity"
                            className="border p-2 rounded mr-2"
                        />
                        <input
                            type="text"
                            value={newItemNotes}
                            onChange={(e) => setNewItemNotes(e.target.value)}
                            placeholder="Notes"
                            className="border p-2 rounded mr-2"
                        />
                        <button onClick={handleAddItem} className="p-2 bg-blue-500 text-white rounded-md">
                            Add Item
                        </button>
                    </div>
                )}
            </div>

            <ul className="mt-4">
                {list.items.map((item) => (
                    <li key={item.id} className="flex justify-between items-center border-b mb-2 pb-2">
                        <div>
                            <span className="font-semibold text-2xl">{item.name}</span> (Qty: {item.quantity})
                            {item.notes && <p>{item.notes}</p>}
                        </div>
                        <div className='flex items-center'>
                            <CiCircleRemove 
                                size={30} 
                                className="text-red-500" 
                                onClick={() => handleDeleteItem(list.id, item.id)} 
                            />
                        </div>
                    </li>
                ))}
            </ul>

            <div className="mt-4 flex justify-center">
                <FaFilePdf 
                    size={30} 
                    className="text-white text-2xl p-1 bg-[#C087BF] rounded-md mr-2" 
                    onClick={handlePDFExport} 
                />
                <button 
                    onClick={() => handleDeleteList(list.id)} 
                    className="p-1 bg-red-500 text-white rounded-md"> 
                    Remove List
                </button>
            </div>
        </section>
    );
};

export default ShoppingListDisplay;
