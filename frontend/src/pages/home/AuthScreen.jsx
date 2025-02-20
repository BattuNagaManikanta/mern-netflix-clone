import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {ChevronRight} from "lucide-react"

const AuthScreen = () => {

  const [email , setEmail] = useState("");
  const navigate = useNavigate();

  const handleFormSubmit=(e)=>{
    e.preventDefault();
    navigate("/signup?email=" + email);
  }
  return (
    <div className='hero-bg'>
      <header className='max-w-6xl mx-auto flex items-center justify-between p-4'>
        <img className='w-52' src='/netflix-logo.png' alt='logo'/>
        <Link to={"/login"} className=' text-white bg-red-600 py-1 px-2 rounded'>
          Sign In
        </Link>
      </header>

      <div className='max-w-6xl mx-auto flex flex-col items-center px-4 justify-center py-40 text-white'>
        <h1 className='text-4xl text-center md:text-6xl font-bold mb-4'>Unlimited movies, TV shows and more</h1>
        <p className='text-xl mb-4 font-medium'>Starts at ₹149. Cancel at any time.</p>
        <p className='mb-4 text-center text-lg'>
          Ready to watch? Enter your email to create or restart your membership.
        </p>
        <form className='flex flex-col md:flex-row gap-4 w-1/2' onSubmit={handleFormSubmit}>
          <input type='email' placeholder='Email address' className='py-3 px-2 rounded flex-1 bg-black/60 border border-gray-700'
          value={email}
          onChange={(e)=>{
            setEmail(e.target.value);
          }}
          />
          <button className=' bg-red-600 text-xl lg:text-2xl px-2 lg:px-6 py-1 md:py-2 rounded flex justify-center items-center'>
            Get Started <ChevronRight className='size-8 md:size-10'/>
          </button>
        </form>
      </div>
      {/* {seperator} */}
      <div className='h-2 w-full bg-[#232323]' aria-hidden = 'true'></div>
      {/* 1st section */}

      <div className='py-10 bg-black text-white'>
        <div className='flex max-w-6xl mx-auto items-center justify-center flex-col md:flex-row px-4 md:px-2'>
          {/* {left side} */}
          <div className=' flex-1 text-center md:text-left '>
            <h2 className='text-4xl md:text-5xl font-extrabold mb-4'>
              Enjoy on your tv
            </h2>
            <p className='text-lg md:text-xl'>
              Watch on smart TVs, playstations , Xbox , Chromecast , Apple Tv , Blu-ray , and more.
            </p>

          </div>
          {/* right side */}
          <div className=' flex-1 relative'>
            <img src='/tv.png' alt='TV image' className='mt-4 relative z-10' />
            <video className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-1/2 z-0'
            playsInline
            autoPlay = {true}
            muted
            loop>
              <source src='/hero-vid.m4v' type='video/mp4'              />
            </video>
          </div>
        </div>
      </div>

      {/* {seperator} */}
      <div className='h-2 w-full bg-[#232323]' aria-hidden = 'true'></div>

      {/* 2nd section */}
      <div className=' py-10 bg-black text-white'>
        <div className='flex max-w-6xl mx-auto items-center justify-center flex-col-reverse md:flex-row px-4 md:px-2'>
          {/* left Section */}
          <div className='flex-1 '>
            <div className="relative">
              <img src='/stranger-things-lg.png' alt='stranger things Imp' className='mt-4'/>
              <div className='flex items-center gap-2 absolute left-1/2 bottom-8 -translate-x-1/2 bg-black w-3/4 lg:w-1/2 h-24 border border-slate-500 rounded-md px-2'>
                <img src='/stranger-things-sm.png' alt='stranger things' className='h-full'/>
                <div className='flex justify-between items-center w-full'>
                  <div className='flex flex-col gap-0'>
                    <span className='text-md lg:text-lg font-bold'>Stranger Things</span>
                    <span className='text-sm text-blue-500'>Downloading......</span>
                  </div>
                  <img src="/download-icon.gif" alt="" className='h-12 ' />
                </div>
             </div>
            </div>
          </div>
          {/* right section */}
          <div className='flex-1 text-center md:text-left'>
            <h2 className='text-4xl md:text-5xl font-extrabold mb-4 text-balance'>Download your shows to watch offline</h2>
            <p className='text-lg md:text-xl'>Save your favorites easily and always have something to watch</p>
          </div>
        </div>
      </div>

      {/* {seperator} */}
      <div className='h-2 w-full bg-[#232323]' aria-hidden = 'true'></div>

      {/* 3rd section */}

      <div className='py-10 bg-black text-white'>
        <div className='flex max-w-6xl mx-auto items-center justify-center flex-col md:flex-row px-4 md:px-2'>
          {/* {left side} */}
          <div className=' flex-1 text-center md:text-left '>
            <h2 className='text-4xl md:text-5xl font-extrabold mb-4'>
              Watch EveryWhere
            </h2>
            <p className='text-lg md:text-xl'>
              Stream Unlimited movies and TV shows on your phone , tablet , laptop  and TV
            </p>

          </div>
          {/* right side */}
          <div className=' flex-1 relative'>
            <img src='/device-pile.png' alt='Device image' className='mt-4 relative z-10' />
            <video className='absolute top-2 left-1/2 -translate-x-1/2 h-4/6 z-0 max-w-[63%]'
            playsInline
            autoPlay = {true}
            muted
            loop>
              <source src='/video-devices.m4v' type='video/mp4'/>
            </video>
          </div>
        </div>
      </div>

      {/* {seperator} */}
      <div className='h-2 w-full bg-[#232323]' aria-hidden = 'true'></div>

      {/* 4th section */}
      <div className=' py-10 bg-black text-white'>
        <div className='flex max-w-6xl mx-auto items-center justify-center flex-col-reverse md:flex-row px-4 md:px-2'>
          {/* left Section */}
          <div className='flex-1 '>
            <div className="relative">
              <img src='/kids.png' alt='stranger things Imp' className='mt-4'/>
            </div>
          </div>
          {/* right section */}
          <div className='flex-1 text-center md:text-left'>
            <h2 className='text-4xl md:text-5xl font-extrabold mb-4 text-balance'>Create Profiles for kids</h2>
            <p className='text-lg md:text-xl'>send kids on adventure with their favourite charecters in a space made just for them. -- free with your membership</p>
          </div>
        </div>
      </div>

    </div>
  )
}

export default AuthScreen
