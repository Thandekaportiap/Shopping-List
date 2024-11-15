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
        // Ensure newItemName, newItemQuantity, and newItemNotes have values
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
            // Ensure list is defined and has an id before posting
            if (!list || !list.id) {
              Swal.fire('Error!', 'List is not defined.', 'error');
              return;
            }
          
            console.log("Sending new item:", newItem); // Log the new item being sent
          
            // Make the PUT request and handle response status explicitly
            const response = await axios.put(
              `http://localhost:5000/shoppingLists/${list.id}`,
              {
                ...list,
                items: [...list.items, newItem] // Add new item to the existing items array
              }
            );
          
            // Check if response status indicates success
            if (response.status === 200 || response.status === 201) {
              console.log("Item added successfully:", response.data); // Log server response
              dispatch(addItemToList({ listId: list.id, newItem }));
              resetItemForm();
              Swal.fire('Success!', 'Item added successfully!', 'success');
            } 
          } catch (error) {
            // Log the full error object for more insight
            console.error("Detailed error:", error);
            Swal.fire('Success!', 'Item added successfully!', 'success');
          }
        }          
    
        const handleDeleteItem = async (itemId) => {
            console.log("Deleting item with ID:", itemId);
            
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
                    // Create a new items array without the item to delete
                    const updatedItems = list.items.filter(item => item.id !== itemId);
                    
                    // Send the updated list to JSON Server
                    const response = await axios.put(
                        `http://localhost:5000/shoppingLists/${list.id}`,
                        { ...list, items: updatedItems }
                    );
          
                    if (response.status === 200) {
                        console.log("Item deleted successfully:", response.data);
                        dispatch(removeItemFromList({ listId: list.id, itemId })); 
                        Swal.fire('Deleted!', 'Item has been deleted.', 'success');
                    } else {
                        console.error("Unexpected response status:", response.status);
                        Swal.fire('Error!', 'Failed to delete item.', 'error');
                    }
                } catch (error) {
                    console.error("Failed to delete item:", error);
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
            await axios.delete(`http://localhost:5000/shoppingLists/${list.id}`);
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

    if (!list) return <p>Loading...</p>;

    return (
        <section className='text-center m-8 p-8 min-h-screen mx-auto border-x-8 border-dotted border-[#B1C98D] shadow-md shadow-[#B1C98D] w-11/12 md:w-6/12'>
            <h2 className='text-4xl font-bold capitalize'>{list.listName}</h2>
            <div className="mt-4">
                <button onClick={() => setShowAddItemForm(prev => !prev)}>
                    {showAddItemForm ? 'Cancel' : <button>Add Item</button>}
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
                            <span className="font-semibold text-2xl mr-5">{item.name}</span> (Qty: {item.quantity})
                            {item.notes && <p>{item.notes}</p>}
                        </div>
                        <div className='flex items-center'>
                            <CiCircleRemove 
                                size={30} 
                                className="text-red-500 cursor-pointer" 
                                onClick={() => handleDeleteItem(item.id)} 
                            />
                        </div>
                    </li>
                ))}
            </ul>

            <div className="mt-4 flex justify-center">
            <Link to="..">
             <button className="flex items-center text-whitesmoke bg-black absolute bottom-[90px] left-2 p-2 rounded-md shadow-md                    hover:bg-gray-800 transition duration-300">
             <FaArrowLeft size={25} className="mr-2" />
                Back to Shopping List
                </button>
                </Link>

                <FaFilePdf 
                    size={30} 
                    className="text-white text-2xl p-1 bg-[#C087BF] rounded-md mr-2 cursor-pointer" 
                    onClick={handlePDFExport} 
                />
                <button 
                    onClick={handleDeleteList} 
                    className="p-2 mb-4 mr-2 bg-red-500 text-white rounded-md"> 
                    Remove List
                </button>
                <button onClick={handleEdit} className="p-2 bg-blue-500 text-white rounded-md mb-4">
                    Edit List
                </button>
            </div>
        </section>
    );
};

export default ShoppingListDisplay;
