import React, { useEffect, useRef, useState } from 'react'
import { useContentStore } from '../store/content'
import axios from 'axios';
import toast from 'react-hot-toast';
import { SMALL_IMG_BASE_URL } from '../utils/constant';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const MovieSlider = ({category}) => {
  const [contentData , setContentData] = useState([]);
  const {contentType} = useContentStore();
  const [showArrows,setShowArrows] = useState(true);
  const sliderRef = useRef();


  console.log(contentData);
  const formattedCategoryName = category[0].toUpperCase()+category.replaceAll("_"," ").slice(1);
  const formattedContentName = contentType == "movie" ? "Movies" : "TV Shows"
  useEffect(()=>{
    async function fetchContent(){
      try {
        const response = await axios.get(`/api/v1/${contentType}/${category}`);
        setContentData(response.data.content);
        
      } catch (error) {
        toast.error("Unable to fetch data");
      }
    }
    fetchContent();
  },[category])

  const slideLeft = ()=>{
    if(sliderRef.current){
      console.log(sliderRef.current);
      sliderRef.current.scrollBy({left : -sliderRef.current.offsetWidth, behavior:"smooth"})
    }
  }

  const slideRight = ()=>{
    if(sliderRef.current){
      console.log(sliderRef.current);
      sliderRef.current.scrollBy({left : sliderRef.current.offsetWidth, behavior:"smooth"})
    }
  }

  return (
    <div className='bg-black text-white relative px-5 md:px-20' onMouseEnter={()=>setShowArrows(true)} onMouseLeave={()=>setShowArrows(false)}>
      <h2 className='mb-4 text-2xl font-bold'>
        {formattedCategoryName} {formattedContentName}
      </h2>
      <div className='flex space-x-4 overflow-x-scroll scrollbar-hidden' style={{
            scrollbarWidth: "none", // For Firefox
            msOverflowStyle: "none", // For Internet Explorer & Edge
            }}  ref={sliderRef}>
        {contentData.map(item =>(
          <Link to={`/watch/${item.id}`} className='min-w-[250px] relative group' key={item.id}>
            <div className='rounded-lg overflow-hidden'>

              <img src={SMALL_IMG_BASE_URL+item.backdrop_path} alt='Movie image' className='transition-transform duration-300 ease-in-out group-hover:scale-125'/>
            </div>
            <p className=' mt-2 text-center'> {item.title || item.name} </p>
          </Link>
          
        ))}
      </div>

      {showArrows && (
        <>
          <button className='absolute  top-1/2 -translate-y-1/2 left-5 md:left-24 flex items-center justify-center size-12 rounded-full bg-black/50 hover:bg-black/75 text-white z-1' onClick={slideLeft}>
            <ChevronLeft size={24}/>
          </button>

          <button className='absolute top-1/2 right-5 md:right-24 -translate-y-1/2 flex items-center justify-center size-12 rounded-full bg-black/50 hover:bg-black/75 text-white z-1 cursor-pointer' onClick={slideRight}>
            <ChevronRight size={24}/>
          </button>

        </>
      )}


    </div>
    
  )
}

export default MovieSlider
