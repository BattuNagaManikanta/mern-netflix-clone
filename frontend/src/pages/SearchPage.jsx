import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import { Search } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { ORIGINAL_IMG_BASE_URL } from '../utils/constant';
import { Link } from 'react-router-dom';
import { useContentStore } from '../store/content';

const SearchPage = () => {
  const [activeTab,setActiveTab] = useState("movie");
  const [searchTerm,setSearchTerm] = useState("");
  const [results,setResults] = useState([]);
  const {setContentType} = useContentStore();

  console.log("Results : ",results);
  

  const handleSubmit = async(e)=>{
    setResults([]);
    e.preventDefault();
    try{
      const response = await axios.get(`/api/v1/search/${activeTab}/${searchTerm}`);
      setResults(response.data.content);
    }
    catch(error){
      if(error.response.status === 404){
        toast.error("Nothing found, make sure you are searching under the right category")
      }
      else{
        toast.error("An error Occured, please try again")
      }
    }
  }

  useEffect(()=>{
    const changeTab =async ()=>{
      setResults([]);
      if(searchTerm === ""){
        return;
      }
      try{
        const response = await axios.get(`/api/v1/search/${activeTab}/${searchTerm}`);
        setResults(response.data.content);
      }
      catch(error){
        if(error.response.status === 404){
          toast.error("Nothing found, make sure you are searching under the right category")
        }
        else{
          toast.error("An error Occured, please try again")
        }
      }
    }
    changeTab();
  },[activeTab])
  
  return (
    <div className='bg-black min-h-screen text-white'>
      <Navbar/>
      <div className='container mx-auto px-4 py-8'>
        <div className="flex justify-center gap-3 mb-4">
          <button className={`py-2 px-4 rounded ${activeTab === "movie" ? "bg-red-500" : "bg-gray-500"} hover:bg-red-600 cursor-pointer`} onClick={()=>setActiveTab("movie")}>
            Movies
          </button>
          <button className={`py-2 px-4 rounded ${activeTab === "tv" ? "bg-red-500" : "bg-gray-500"} hover:bg-red-600 cursor-pointer`} onClick={()=>setActiveTab("tv")}>
            TV Shows
          </button>
          <button className={`py-2 px-4 rounded ${activeTab === "person" ? "bg-red-500" : "bg-gray-500"} hover:bg-red-600 cursor-pointer`} onClick={()=>setActiveTab("person")}>
            Person
          </button>
        </div>
        <form className='flex gap-2 max-w-2xl mx-auto mb-8' onSubmit={handleSubmit}>
          <input type='text' value={searchTerm} placeholder={'Search for a '+activeTab} className='w-full p-2 rounded bg-gray-800 text-white' onChange={(e)=>setSearchTerm(e.target.value)}/>
          <button className='bg-red-500 hover:bg-red-600 text-white p-2 rounded'>
            <Search className='size-6'/>
          </button>
        </form>
        {results.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-1/2 md:w-full mx-auto">
            {results.map((result)=>{
              if(!result.poster_path && !result.profile_path) return null;
              return (
                <div key={result.id} className=' bg-gray-600 p-4 rounded'>
                  {activeTab === "person" ? (
                    <div className='flex flex-col'>
                      <img src={ORIGINAL_IMG_BASE_URL+result.profile_path} alt={result.name} className='max-h-80 rounded'/>
                      <h2 className='mt-2 text-sm md:text-xl font-bold'>{result.name}</h2>
                    </div>
                  ) : (<Link to={"/watch/"+result.id} onClick={()=>setContentType(activeTab)}>
                    <img src={ORIGINAL_IMG_BASE_URL+result.poster_path} alt={result.title || result.name} className=' md:w-full h-auto rounded'/>
                    <h2 className='mt-2 text-sm md:text-xlfont-bold'>{result.title || result.name}</h2>
                  </Link>)}
                </div>
              )
            })}
          </div>
        )}

      </div>
    </div>
  )
}

export default SearchPage
