import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchShoppingLists, updateShoppingList } from '../Shopping/ShoppingListSlice'; // Replace removeItem with updateShoppingList
import axios from 'axios';
import { CiCircleRemove } from 'react-icons/ci';
import { FaFilePdf } from 'react-icons/fa6';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';

const ShoppingListDisplay = ({ id }) => {
  const dispatch = useDispatch();
  const shoppingLists = useSelector((state) => state.shoppingList.items);
  const [filteredLists, setFilteredLists] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const filtered = shoppingLists.filter(list =>
      list.listName && list.listName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredLists(filtered);
  }, [searchTerm, shoppingLists]);

  useEffect(() => {
    if (id) {
      dispatch(fetchShoppingLists(id));
    } else {
      navigate('/Login');
    }
  }, [id, dispatch, navigate]);

  // Delete an individual item from the shopping list
  const handleDeleteItem = async (listId, itemId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this item?");
    if (confirmDelete) {
      try {
        // Fetch the current shopping list
        const listResponse = await axios.get(`http://localhost:5000/shoppingLists/${listId}`);
        const list = listResponse.data;
  
        // Filter out the item to be deleted
        const updatedItems = list.items.filter(item => item.id !== itemId);
  
        // Update the shopping list with the modified items
        await axios.put(`http://localhost:5000/shoppingLists/${listId}`, {
          ...list,
          items: updatedItems
        });
  
        // Dispatch action to remove item from the Redux state
        dispatch(removeItemFromList({ listId, itemId }));
        alert("Item deleted successfully!");
      } catch (error) {
        console.error("Failed to delete the item", error);
        setError('Failed to delete the item');
      }
    }
  };
  

  const handleDeleteList = async (listId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this shopping list?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/shoppingLists/${listId}`);
        dispatch(removeItem(listId));
        alert("Shopping list deleted successfully!");
      } catch (error) {
        console.error("Failed to delete the list", error);
        setError('Failed to delete the shopping list');
      }
    }
  };

  const handleEdit = (listId) => {
    navigate(`/edit/${listId}`);
  };

  const handlePDFExport = (list) => {
    const doc = new jsPDF();
    doc.text(`Shopping List: ${list.listName}`, 10, 10);
    list.items.forEach((item, index) => {
      doc.text(`${item.name} - Quantity: ${item.quantity}`, 10, 20 + (index * 10));
    });
    doc.save(`${list.listName}.pdf`);
  };

  const groupedLists = shoppingLists.reduce((acc, list) => {
    if (!acc[list.listName]) {
      acc[list.listName] = [];
    }
    acc[list.listName].push(list);
    return acc;
  }, {});

  return (
    <section className='text-center p-1'>
      <div className='mt-6 flex flex-col justify-center items-center mb-4'>
        <p className="text-4xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-lime-400 to-pink-500 my-4">Shopping Lists</p>
        <div className="max-w-[480px] w-full px-4">
          <div className="relative">
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border h-12 shadow p-4 rounded-full"
              placeholder="Search..."
            />
            <svg className="text-gray-400 h-5 w-5 absolute top-3.5 right-3 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 56.966 56.966">
              <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
            </svg>
          </div>
        </div>
      </div>

      {error && <p className="text-red-500">{error}</p>}
      {Object.keys(groupedLists).length === 0 ? (
        <div className="text-center col-span-3 text-4xl text-red-700">
          No Shopping Lists available. Add your first Shopping List!
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(groupedLists).map(([listName, lists]) => (
            lists.map(list => (
              <div key={list.id} className="flex flex-col mb-4 border border-[#B1C98D] rounded-lg p-4 shadow-md">
                <h2 className="text-xl">{list.listName} lists</h2>
                <ul className="mt-4 flex-grow">
                  {list.items.map((item) => (
                    <li key={item.id} className="flex justify-between items-center border-b mb-2 pb-2">
                      <div>
                        <span className="font-semibold text-2xl">{item.name}</span> (Qty: {item.quantity})
                        {item.notes && <p className="text-[white]">{item.notes}</p>}
                      </div>
                      <div className='flex items-center'>
                        <CiCircleRemove 
                          size={30} 
                          className="text-red-500" 
                          onClick={() => handleDeleteItem(list.id, item.id)} // Delete item instead of the list
                        />
                        <IoIosAddCircleOutline 
                          size={30} 
                          className='text-green-500' 
                          onClick={() => handleEdit(list.id)} 
                        />
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex items-center">
                  <FaFilePdf size={30} className="text-white text-2xl p-1 bg-[#C087BF] rounded-md mr-2" 
                  onClick={() => handlePDFExport(list)}/>
                  <button 
                    onClick={() => handleEdit(list.id)} 
                    className="p-1 bg-[#B1C98D] text-[black] mr-2 rounded-md"
                  >
                    Edit List
                  </button>
                  <button 
                    onClick={() => handleDeleteList(list.id)} 
                    className="p-1 bg-red-500 text-white rounded-md"> 
                    Remove List
                  </button>
                </div>
              </div>
            ))
          ))}
        </div>
      )}
    </section>
  );
};

export default ShoppingListDisplay;
