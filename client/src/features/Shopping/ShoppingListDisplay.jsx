import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchShoppingLists, removeShoppingList, removeItemFromList } from '../Shopping/ShoppingListSlice'; 
import axios from 'axios';
import { CiCircleRemove } from 'react-icons/ci';
import { FaFilePdf } from 'react-icons/fa6';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import Swal from 'sweetalert2';

const ShoppingListDisplay = ({ id }) => {
  const dispatch = useDispatch();
  const shoppingLists = useSelector((state) => state.shoppingList.items);
  const [filteredLists, setFilteredLists] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      dispatch(fetchShoppingLists(id));
    } else {
      navigate('/Login');
    }
  }, [id, dispatch, navigate]);

  useEffect(() => {
    const filtered = shoppingLists.filter(list =>
      list.listName && list.listName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredLists(filtered);
  }, [searchTerm, shoppingLists]);

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
      try {
        const listResponse = await axios.get(`http://localhost:5000/shoppingLists/${listId}`);
        const list = listResponse.data;
        const updatedItems = list.items.filter(item => item.id !== itemId);
        
        await axios.put(`http://localhost:5000/shoppingLists/${listId}`, {
          ...list,
          items: updatedItems
        });

        dispatch(removeItemFromList({ listId, itemId }));
        Swal.fire('Deleted!', 'Item has been deleted.', 'success');
      } catch (error) {
        console.error("Failed to delete the item", error);
        setError('Failed to delete the item');
        Swal.fire('Error!', 'Failed to delete the item.', 'error');
      }
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
      try {
        await axios.delete(`http://localhost:5000/shoppingLists/${listId}`);
        dispatch(removeShoppingList(listId));
        Swal.fire('Deleted!', 'Shopping list has been deleted.', 'success');
      } catch (error) {
        console.error("Failed to delete the list", error);
        setError('Failed to delete the shopping list');
        Swal.fire('Error!', 'Failed to delete the shopping list.', 'error');
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

  return (
    <section className='text-center p-1'>
      <div className='mt-6 flex flex-col justify-center items-center mb-4'>
        <p className="text-4xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-lime-400 to-pink-500 my-4">Shopping Lists</p>
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-72 border h-10 shadow p-2 rounded-full mb-4 focus:outline-none" 
          placeholder="Search..."
        />
      </div>

      {error && <p className="text-red-500">{error}</p>}
      {filteredLists.length === 0 ? (
        <div className="text-center col-span-3 text-4xl text-red-700">
          No Shopping Lists available. Add your first Shopping List!
        </div>
      ) : (
        <div className="flex flex-col sm:grid sm:grid-cols-2 sm:gap-4">
          {filteredLists.map(list => (
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
                        onClick={() => handleDeleteItem(list.id, item.id)} 
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
                <FaFilePdf 
                  size={30} 
                  className="text-white text-2xl p-1 bg-[#C087BF] rounded-md mr-2" 
                  onClick={() => handlePDFExport(list)}
                />
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
          ))}
        </div>
      )}
    </section>
  );
};

export default ShoppingListDisplay;
