import { useEffect, useState } from 'react';
import axios from 'axios';

const DisplayShoppingList = ({ id }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredLists, setFilteredLists] = useState([]);
    const [shoppingLists, setShoppingLists] = useState([]);

    useEffect(() => {
        const fetchShoppingLists = async () => {
            try {
                const result = await axios.get(`http://localhost:5000/shoppingLists?userId=${id}`);
                setShoppingLists(result.data || []);
                setFilteredLists(result.data || []);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };
        fetchShoppingLists();
    }, [id]);

    useEffect(() => {
        setFilteredLists(
            shoppingLists.filter(list =>
                list.listName.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [searchTerm, shoppingLists]);

    // Group shopping lists by list name
    const groupedLists = filteredLists.reduce((acc, list) => {
        if (!acc[list.listName]) {
            acc[list.listName] = [];
        }
        acc[list.listName].push(list);
        return acc;
    }, {});

    const handleSearch = (e) => {
      e.preventDefault(); 
      setFilteredLists(
          shoppingLists.filter(list =>
              list.listName.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
  };

    return (
        <section>
            <div className='mt-6 flex flex-col justify-center items-center'>
            <p className="text-4xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-lime-400 to-pink-500 my-4">Shopping Lists</p>
            <form onSubmit={handleSearch} className="max-w-[480px] w-full px-4">
                <div className="relative">
                    <input
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full border h-12 shadow p-4 rounded-full"
                        placeholder="Search..."
                    />
                    <button type="submit">
                        <svg className="text-gray-400 h-5 w-5 absolute top-3.5 right-3 fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 56.966 56.966">
                            <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                        </svg>
                    </button>
                </div>
            </form>
            </div>
            {Object.keys(groupedLists).length === 0 ? (
                <div className="text-center col-span-3 text-4xl text-red-700">
                    No Shopping Lists available that match your search. Add your first Shopping List!
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Object.entries(groupedLists).map(([listName, lists]) => (
                        <div key={listName} className="max-w-sm mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden">
                            <div className="p-5">
                                <h2 className="text-xl font-bold mb-4">{listName}</h2>
                                <ul className="list-disc pl-5">
                                    {lists.map((list, index) => (
                                        <li key={index} className="mb-2">
                                            <strong>{list.listName}</strong>
                                            {list.items && list.items.length > 0 && (
                                                <ul className="list-inside list-disc">
                                                    {list.items.map((item, itemIndex) => (
                                                        <li key={itemIndex}>
                                                            {item.name} - {item.category} {item.notes && `(${item.notes})`}
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}

export default DisplayShoppingList;
