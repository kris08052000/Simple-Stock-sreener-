import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useDebounce from './usedebounce';
import Link from 'next/link';
import dashboard from '../app/(dashboard)/dashboard';
import { useRouter } from 'next/navigation';

type SearchResult = {
  description: string;
  symbol: string;
};


const Search: React.FC = () => {
  const [query, setQuery] = useState<string>();
  const [suggestions, setSuggestions] = useState<SearchResult[]>([]);
  const [count, setCount] = useState<number>(0);
  // Debounce the query with a delay of 500 milliseconds
  const debouncedQuery = useDebounce(query || '', 500);

  const [detailt, setdetail] = useState('')

  useEffect(() => {
    const fetchSuggestions = async (searchQuery: string) => {
      try {
        const response = await axios.get<{ result: SearchResult[] }>(`https://finnhub.io/api/v1/search?q=${searchQuery}&token=cou9jj1r01qr7r8gn3h0cou9jj1r01qr7r8gn3hg`);
        const { result } = response.data;
        setSuggestions(result);
        setCount(result.length);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      }
    };

    // Only fetch suggestions if the debounced query is not empty
    if (debouncedQuery.trim() !== '') {
      fetchSuggestions(debouncedQuery);
    } else {
      // Reset suggestions and count if query is empty
      setSuggestions([]);
      setCount(0);
    }
  }, [debouncedQuery]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setQuery(value);
  };


  function Detail(symbol:any){
    useEffect(()=>{
     async function abc(symbol :any){
        const a =await axios.get(`https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=cou9jj1r01qr7r8gn3h0cou9jj1r01qr7r8gn3hg`);
        const b = a.data;
        setdetail(b);
      }
    })
    return (<div>
      {detailt}
    </div>)
  }

  return (
    <div className="relative">
      <div className="container mx-auto mt-8 lg:w-3/4 xl:w-2/3">
        <p>Total records: {count}</p>
        <input type="text" value={query} onChange={handleInputChange} className="w-full px-2 py-1 border rounded border-slate-600" placeholder="Search..." />
        <ul>
          {suggestions.map(({ description, symbol }) => (
            <div>
            <div key={symbol} className="cursor-pointer" onClick={Detail} >
              Symbol & Name : {symbol}  - {description}
              <hr className="border-gray-400 border-opacity-75 h-3" />
            </div>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};




export default Search;
