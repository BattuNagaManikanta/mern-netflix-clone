import React, { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useContentStore } from '../store/content';
import axios from 'axios';
import Navbar from '../components/Navbar'
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ReactPlayer from "react-player"
import { formatReleaseDate } from '../utils/dateFunction';
import { ORIGINAL_IMG_BASE_URL, SMALL_IMG_BASE_URL } from '../utils/constant';
import WatchPageSkeleton from '../components/skeleton/WatchPageSkeleton';

const WatchPage = () => {
  const {id} = useParams();
  const [trailers,setTrailers] = useState([]);
  const [currentTrailerIdx , setCurrentTrailerIdx] = useState(0);
  const [loading,setLoading] = useState(true);
  const [content,setContent] = useState(null);
  const [similarContent,setSimilarContent] = useState([]);
  const sliderRef = useRef();
  const {contentType} = useContentStore();
  useEffect(()=>{
    const getTrailers = async ()=>{
      try {
        const res = await axios.get(`/api/v1/${contentType}/${id}/trailers`);
        setTrailers(res.data.trailers);
      } catch (error) {
        if(error.message.includes("404")){
          setTrailers([]);
        }
      }
    }
    getTrailers();
  },[id,contentType]);

  useEffect(()=>{
    const getSimilarContent = async ()=>{
      try {
        const res = await axios.get(`/api/v1/${contentType}/${id}/similar`);
        setSimilarContent(res.data.similar);
      } catch (error) {
        if(error.message.includes("404")){
          setSimilarContent([]);
        }
      }
    }
    getSimilarContent();
  },[id,contentType]);

  useEffect(()=>{
    const getContentDetails = async ()=>{
      try {
        const res = await axios.get(`/api/v1/${contentType}/${id}/details`);
        setContent(res.data.content);
      } catch (error) {
        if(error.message.includes("404")){
          setContent(null);
        }
      }
      finally{
        setLoading(false);
      }
    }
    getContentDetails();
  },[id,contentType]);

  const handleNext = ()=>{
    if(currentTrailerIdx < trailers.length -1) setCurrentTrailerIdx(currentTrailerIdx+1);
  }

  const handlePrev = ()=>{
    if(currentTrailerIdx > 0 ) setCurrentTrailerIdx(currentTrailerIdx-1);
  }

  const slideLeft = ()=>{
    if(sliderRef.current){
      sliderRef.current.scrollBy({left : -sliderRef.current.offsetWidth, behavior:"smooth"})
    }
  }

  const slideRight = ()=>{
    if(sliderRef.current){
      sliderRef.current.scrollBy({left : sliderRef.current.offsetWidth, behavior:"smooth"})
    }
  }

  if(loading){
    return (
			<div className='min-h-screen bg-black p-10'>
				<WatchPageSkeleton />
			</div>
		);
  }
  if(!content){
    return (
      <div className="bg-black h-screen text-white">
        <div className="max-w-6xl mx-auto"></div>
        <Navbar/>
        <div className="text-center mx-auto px-4 py-8 h-full mt-40">
          <h2 className='text-2xl sm:text-5xl font-bold text-balance'>Content not found 😥</h2>
        </div>
      </div>
    )
  }



  return (
    <div className='bg-black min-h-screen text-white'>
      <div className="mx-auto container px-4 py-8 h-full">
        <Navbar/>
        {trailers.length > 0 && (
          <div className="flex justify-between items-center mb-4">
            <button className={`bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded ${currentTrailerIdx === 0 ? " opacity-40 cursor-not-allowed":"" }`} disabled={currentTrailerIdx === 0} onClick={handlePrev}>
              <ChevronLeft size={24}/>
            </button>
            <button className={`bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded ${currentTrailerIdx === trailers.length-1 ? " opacity-40 cursor-not-allowed":"" }`} disabled={currentTrailerIdx === trailers.length-1} onClick={handleNext}>
              <ChevronRight size={24}/>
            </button>
          </div>
        )}
        <div className='aspect-video mb-8 p-2 sm:px-10 md:px-32'>
          {trailers.length > 0 ? (
            <ReactPlayer
              controls={true}
              width="100%"
              height={"70vh"}
              className="mx-auto overflow-hidden rounded-lg"
              url={`https://www.youtube.com/watch?v=${trailers[currentTrailerIdx].key}`}
            />
          ):(
            trailers.length === 0 && (
              <h2 className='text-xl text-center mt-5'>
                No trailer available for <span className='font-bold text-red-600'>{content?.title || content?.name} 🤔</span>
              </h2>
            )
          )}
          {}
      </div>

      <div className='flex flex-col md:flex-row items-center justify-between gap-20 max-w-6xl mx-auto md:-mt-28'>
        <div className="mb-4 md:mb-0">
          <h1 className="text-5xl font-bold text-balance">{content?.title || content?.name}</h1>
          <p className='mt-2 text-lg'>
            {formatReleaseDate(content?.release_date || content?.first_air_date)} | {content?.adult ? (
              <span className='text-red-500'>18+</span>
            ) : (
              <span className='text-green-500'>PG-13</span>
            )}
          </p>
          <p className='mt-4 text-lg'>
            {content?.overview}
          </p>
        </div>
        <img src={ORIGINAL_IMG_BASE_URL+content?.poster_path} alt='poster image' className='max-h-[400px] md:max-h-[600px] rounded-md'/>
      </div>
      {similarContent.length > 0 && (
        <div className="mt-12 max-w-5xl mx-auto relative">
          <h3 className="text-3xl font-bold mb-4">Similar Movies/TV Shows</h3>
          <div className="flex overflow-x-scroll gap-4 pb-4 group scrollbar-hidden" style={{
            scrollbarWidth: "none", // For Firefox
            msOverflowStyle: "none", // For Internet Explorer & Edge
            }} ref={sliderRef}>
            {similarContent?.map((content)=>{
              if(content?.poster_path === null) return null;
              return (
                <Link key={content.id} to={`/watch/${content.id}`} className='w-52 flex-none'>
										<img
											src={SMALL_IMG_BASE_URL + content.poster_path}
											alt='Poster path'
											className='w-full h-auto rounded-md'
										/>
										<h4 className='mt-2 text-center text-lg font-semibold'>{content.title || content.name}</h4>
								</Link>
              )
            })}
            <ChevronRight className='absolute top-1/2 -translate-y-1/2 right-2 w-8 h-8 opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer bg-red-600 text-white rounded-full' onClick={slideRight}/>
            <ChevronLeft className='absolute top-1/2 -translate-y-1/2 left-2 w-8 h-8 opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer bg-red-600 text-white rounded-full' onClick={slideLeft}/>
          </div>
        </div>
      )}

      </div>
    </div>
  )
}

export default WatchPage
