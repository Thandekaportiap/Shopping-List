import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchShoppingLists, removeShoppingList, removeItemFromList, addItemToList } from '../Shopping/ShoppingListSlice';
import axios from 'axios';
import { CiCircleRemove } from 'react-icons/ci';
import { FaFilePdf } from 'react-icons/fa6';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import Swal from 'sweetalert2';
import { FaArrowLeft } from "react-icons/fa";

const ShoppingListDisplay = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const shoppingLists = useSelector((state) => state.shoppingList.items);
    const [list, setList] = useState(null);
    const [newItemName, setNewItemName] = useState('');
    const [newItemQuantity, setNewItemQuantity] = useState('');
    const [newItemNotes, setNewItemNotes] = useState('');
    const [showAddItemForm, setShowAddItemForm] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOrder, setSortOrder] = useState('asc'); // 'asc' for ascending, 'desc' for descending
    const [filterByNotes, setFilterByNotes] = useState(false); // Filter items with notes
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            const fetchedList = shoppingLists.find(list => list.id === id);
            if (fetchedList) {
                setList(fetchedList);
            } else {
                dispatch(fetchShoppingLists());
            }
        } else {
            navigate('/Login');
        }
    }, [id, dispatch, shoppingLists, navigate]);

    const handleAddItem = async () => {
        if (!newItemName || !newItemQuantity) {
            Swal.fire('Error!', 'Please provide both item name and quantity.', 'error');
            return;
        }

        const newItem = {
            id: Date.now(),
            name: newItemName,
            quantity: Number(newItemQuantity),
            notes: newItemNotes
        };

        try {
            if (!list || !list.id) {
                Swal.fire('Error!', 'List is not defined.', 'error');
                return;
            }

            const response = await axios.put(
                `https://task-9-online-recipe-3.onrender.com/shoppingLists/${list.id}`,
                {
                    ...list,
                    items: [...list.items, newItem]
                }
            );

            if (response.status === 200 || response.status === 201) {
                dispatch(addItemToList({ listId: list.id, newItem }));
                resetItemForm();
                Swal.fire('Success!', 'Item added successfully!', 'success');
            }
        } catch (error) {
            Swal.fire('Error!', 'Failed to add item.', 'error');
        }
    };

    const handleDeleteItem = async (itemId) => {
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
            try {
                const updatedItems = list.items.filter(item => item.id !== itemId);

                const response = await axios.put(
                    `https://task-9-online-recipe-3.onrender.com/shoppingLists/${list.id}`,
                    { ...list, items: updatedItems }
                );

                if (response.status === 200) {
                    dispatch(removeItemFromList({ listId: list.id, itemId }));
                    Swal.fire('Deleted!', 'Item has been deleted.', 'success');
                }
            } catch (error) {
                Swal.fire('Error!', 'Failed to delete item.', 'error');
            }
        }
    };

    const handleDeleteList = async () => {
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
            await axios.delete(`https://task-9-online-recipe-3.onrender.com/shoppingLists/${list.id}`);
            dispatch(removeShoppingList(list.id));
            Swal.fire('Deleted!', 'Shopping list has been deleted.', 'success');
            navigate('/shoppingList');
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

    const handleEdit = () => {
        navigate(`/edit/${list.id}`);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSortChange = (e) => {
        setSortOrder(e.target.value);
    };

    const handleFilterChange = () => {
        setFilterByNotes((prev) => !prev);
    };

    if (!list) return <p>Loading...</p>;

    // Check if `list.items` is defined before attempting to access it
    const filteredItems = list.items?.filter((item) => {
        const isSearchMatch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
        const isFilteredByNotes = filterByNotes ? item.notes : true;
        return isSearchMatch && isFilteredByNotes;
    }) || [];

    const sortedItems = filteredItems.sort((a, b) => {
        if (sortOrder === 'asc') {
            return a.name.localeCompare(b.name);
        }
        return b.name.localeCompare(a.name);
    });

    return (
        <section className="text-center m-8 p-8 min-h-screen mx-auto border-x-8 border-dotted border-[#B1C98D] shadow-md shadow-[#B1C98D] w-full md:w-6/12 lg:w-5/12">
        <h2 className="text-4xl font-bold capitalize mb-4">{list.listName}</h2>
    
        <div className="mt-4">
            <input
                type="text"
                placeholder="Search items..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="border p-2 rounded-md mb-4 w-full sm:w-3/4 md:w-2/3 text-slate-700"
            />
    
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4 ">
                <select
                    value={sortOrder}
                    onChange={handleSortChange}
                    className="border p-2 rounded mb-2 sm:mb-0 sm:w-1/4 text-black"
                >
                    <option value="asc">Sort by Name (Asc)</option>
                    <option value="desc">Sort by Name (Desc)</option>
                </select>
    
                <label className="flex items-center mb-2 sm:mb-0 sm:w-1/4">
                    <input
                        type="checkbox"
                        checked={filterByNotes}
                        onChange={handleFilterChange}
                        className="mr-2"
                    />
                    Filter by Notes
                </label>
            </div>
    
            <button
                onClick={() => setShowAddItemForm(prev => !prev)}
                className="mb-4 p-2 bg-blue-500 text-white rounded-md"
            >
                {showAddItemForm ? 'Cancel' : 'Add Item'}
            </button>
    
            {showAddItemForm && (
                <div className="mt-4">
                    <input
                        type="text"
                        value={newItemName}
                        onChange={(e) => setNewItemName(e.target.value)}
                        placeholder="Item Name"
                        className="border p-2 rounded mb-2 w-full sm:w-3/4 md:w-2/3"
                    />
                    <input
                        type="number"
                        value={newItemQuantity}
                        onChange={(e) => setNewItemQuantity(e.target.value)}
                        placeholder="Quantity"
                        className="border p-2 rounded mb-2 w-full sm:w-3/4 md:w-2/3"
                    />
                    <input
                        type="text"
                        value={newItemNotes}
                        onChange={(e) => setNewItemNotes(e.target.value)}
                        placeholder="Notes"
                        className="border p-2 rounded mb-2 w-full sm:w-3/4 md:w-2/3"
                    />
                    <button
                        onClick={handleAddItem}
                        className="p-2 bg-blue-500 text-white rounded-md w-full sm:w-1/3"
                    >
                        Add Item
                    </button>
                </div>
            )}
        </div>
    
        <ul className="mt-4 space-y-4">
            {sortedItems.map((item) => (
                <li
                    key={item.id}
                    className="flex justify-between items-center border-b pb-2 w-full md:w-3/4 mx-auto"
                >
                    <div>
                        <span className="font-semibold text-2xl">{item.name}</span> (Qty: {item.quantity})
                        {item.notes && <p>Notes: {item.notes}</p>}
                    </div>
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => handleDeleteItem(item.id)}
                            className="text-red-600"
                        >
                            <CiCircleRemove size={20} />
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    
        <div className="flex justify-between mt-6">
            <button onClick={handlePDFExport} className="text-blue-600 ">
                <FaFilePdf size={24} />
            </button>
    
            <button onClick={handleDeleteList} className="text-red-600 border border-red-600 p-2 rounded-md">
                Delete List
            </button>
    
            <button onClick={handleEdit} className="text-yellow-600 border border-yellow-600 p-2 rounded-md">
                Edit List
            </button>
        </div>
    </section>
    
    );
};

export default ShoppingListDisplay;
