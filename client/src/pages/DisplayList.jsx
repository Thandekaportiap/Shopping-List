import React, { useEffect } from 'react'
import { fetchShoppingLists } from '../features/Shopping/ShoppingListSlice'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const DisplayList = ({id}) => {

    const dispatch = useDispatch();
    const shoppingLists = useSelector((state) => state.shoppingList.items);
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            dispatch(fetchShoppingLists(id));
        } else {
            navigate('/Login');
        }
    }, [id, dispatch, navigate]);

    const handleViewList = (listId) => {
        navigate(`/shoppingList/${listId}`); 
    };

    console.log(shoppingLists);
  return (
    <>
    <h1 className='text-4xl font-bold text-center'>Shopping Lists</h1>
<div className='flex flex-row'>
    {shoppingLists.map((list) => (
        <div 
            key={list.id} 
            className="transform rounded-xl h-40 w-40 sm:h-64 sm:w-64 shadow-xl transition duration-300 hover:scale-105"
        >
            <div className="flex  h-full justify-center items-center">
                <h1 className='text-2xl font-bold text-center'>{list.listName}</h1><br />
                <button 
                className='bg-[#C087BF] text-[black] rounded-full p-2' 
                 onClick={() => handleViewList(list.id)}>
                View List
                </button>
            </div>
        </div>
    ))}
</div>
    </>
  )
}

export default DisplayList
