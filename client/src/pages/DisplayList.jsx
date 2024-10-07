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
   <section className='min-h-screen flex flex-col items-center justify-center'>
   <p className="text-4xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-lime-400 to-pink-500 my-4">Shopping Lists</p>
   <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
        {shoppingLists.map((list) => (
            <div 
                key={list.id} 
                className="transform rounded-xl h-40 w-full sm:h-64 shadow-xl transition duration-300 hover:scale-105 flex flex-col justify-between"
            >
                <div className="flex-grow flex items-center justify-center text-center p-4">
                    <h1 className='text-2xl font-bold'>{list.listName} List</h1>
                </div>
                <button 
                    className='bg-[#C087BF] text-[black] rounded-full p-2 mb-2 self-center' 
                    onClick={() => handleViewList(list.id)}
                >
                    View List
                </button>
            </div>
        ))}
    </div>
</section>


    </>
  )
}

export default DisplayList
