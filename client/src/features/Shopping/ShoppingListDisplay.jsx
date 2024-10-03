import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeItem, removeList, editList, editItem } from '../Shopping/ShoppingListSlice';
import axios from 'axios';
import { CiCircleRemove } from "react-icons/ci";
import { FaFilePdf } from "react-icons/fa6";
import { IoIosAddCircleOutline } from "react-icons/io";

const ShoppingListDisplay = ({ id }) => {
  const dispatch = useDispatch();
  const [shoppingLists, setShoppingLists] = useState([]);
  const [filteredLists, setFilteredLists] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingListId, setEditingListId] = useState(null);
  const [listNameInput, setListNameInput] = useState('');
  const [itemInputs, setItemInputs] = useState({});

  useEffect(() => {
    const fetchShoppingLists = async () => {
      setLoading(true);
      try {
        const result = await axios.get(`http://localhost:5000/shoppingLists?userId=${id}`);
        setShoppingLists(result.data || []);
        setFilteredLists(result.data || []);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setError("Failed to load shopping lists.");
      } finally {
        setLoading(false);
      }
    };
    fetchShoppingLists();
  }, [id]);

  useEffect(() => {
    const filtered = shoppingLists.filter(list =>
      list.listName && list.listName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredLists(filtered);
  }, [searchTerm, shoppingLists]);

  const handleRemoveList = (listId) => {
    dispatch(removeList(listId)); 
    setShoppingLists(shoppingLists.filter(list => list.id !== listId));
  };

  const handleRemoveItem = (listId, itemId) => {
    dispatch(removeItem({ listId, itemId }));
  };

  const handleEditList = (list) => {
    setEditingListId(list.id);
    setListNameInput(list.listName);
    const currentItems = {};
    list.items.forEach(item => {
      currentItems[item.id] = { name: item.name, quantity: item.quantity, notes: item.notes };
    });
    setItemInputs(currentItems);
  };

  const handleUpdateList = async () => {
    if (editingListId) {
      try {
        const response = await axios.put(`http://localhost:5000/shoppingLists/${editingListId}`, { listName: listNameInput });
        console.log('List updated:', response.data);
      
        for (const itemId in itemInputs) {
          const item = itemInputs[itemId];
          await axios.put(`http://localhost:5000/shoppingLists/${editingListId}/items/${itemId}`, item);
        }
      
        setEditingListId(null);
        setListNameInput('');
        setItemInputs({});
      } catch (error) {
        console.error("Error updating list:", error.response ? error.response.data : error.message);
        setError("Failed to update the list.");
      }
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
  };

  return (
    <section className='text-center p-1'>
      <div className='mt-6 flex flex-col justify-center items-center mb-4'>
        <p className="text-4xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-lime-400 to-pink-500 my-4">Shopping Lists</p>
        <form onSubmit={handleSearch} className="max-w-[480px] w-full px-4">
          <div className="relative">
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border h-12 shadow p-4 rounded-full"
              placeholder="Search..."
            />
            <button type="submit" aria-label="Search">
              <svg className="text-gray-400 h-5 w-5 absolute top-3.5 right-3 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 56.966 56.966">
                <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
              </svg>
            </button>
          </div>
        </form>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-2 gap-4">
        {filteredLists.map((list) => (
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
                      onClick={() => handleRemoveItem(list.id, item.id)} 
                    />
                    <IoIosAddCircleOutline 
                      size={30} 
                      className='text-green-500' 
                      onClick={() => handleEditItem(list.id, item)} 
                    />
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-auto flex items-center">
              <FaFilePdf size={30} className="text-white text-2xl p-1 bg-[#C087BF] rounded-md mr-2" />
              <button 
                onClick={() => handleEditList(list)} 
                className="p-1 bg-[#B1C98D] text-[black] mr-2 rounded-md"
              >
                Edit List
              </button>
              <button 
                onClick={() => handleRemoveList(list.id)} 
                className="p-1 bg-red-500 text-white rounded-md"> 
                Remove List
              </button>
            </div>
          </div>
        ))}
      </div>

      {editingListId && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex flex-col justify-center items-center">
          <div className="bg-white p-4 rounded shadow-md">
            <h2>Edit List</h2>
            <input
              type="text"
              value={listNameInput}
              onChange={(e) => setListNameInput(e.target.value)}
              placeholder="List Name"
              className="border p-2 mb-2"
            />
            {Object.keys(itemInputs).map((itemId) => (
              <div key={itemId} className="mb-2">
                <input
                  type="text"
                  value={itemInputs[itemId].name}
                  onChange={(e) => setItemInputs({
                    ...itemInputs,
                    [itemId]: { ...itemInputs[itemId], name: e.target.value }
                  })}
                  placeholder="Item Name"
                  className="border p-2 mb-1"
                />
                <input
                  type="number"
                  value={itemInputs[itemId].quantity}
                  onChange={(e) => setItemInputs({
                    ...itemInputs,
                    [itemId]: { ...itemInputs[itemId], quantity: Number(e.target.value) }
                  })}
                  placeholder="Quantity"
                  className="border p-2 mb-1"
                />
                <textarea
                  value={itemInputs[itemId].notes}
                  onChange={(e) => setItemInputs({
                    ...itemInputs,
                    [itemId]: { ...itemInputs[itemId], notes: e.target.value }
                  })}
                  placeholder="Notes"
                  className="border p-2 mb-2"
                />
              </div>
            ))}
            <button onClick={handleUpdateList} className="bg-blue-500 text-white p-2 rounded">
              Update List
            </button>
            <button onClick={() => setEditingListId(null)} className="bg-gray-500 text-white p-2 rounded ml-2">
              Cancel
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default ShoppingListDisplay;
