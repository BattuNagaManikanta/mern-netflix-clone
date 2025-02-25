import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useAuthUser from '../store/authUser'

const SignUpPage = () => {
  const {searchParams} = new URL(document.location)
  const emailValue = searchParams.get("email")
  const [email , setEmail] = useState(emailValue || "");
  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");

  const {signup,isSigningUp} = useAuthUser();

  function handleSubmit(e){
    e.preventDefault();
    signup({email,username,password});
  }
  return (
    <div className='h-screen hero-bg w-full'>
      <header className='max-w-6xl mx-auto flex items-center justify-between p-4'>
        <Link to={"/"}>
          <img className='w-52' src='/netflix-logo.png' alt='logo'/>
        </Link>
      </header>
      <div className='flex justify-center items-center mt-20 mx-3'>
        <div className='bg-black/60 w-full max-w-md space-y-6 p-8 rounded-lg shadow-md'>
          <h1 className='text-center text-white text-2xl font-bold'>
            Sign Up
          </h1>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div>
              <label htmlFor='email' className='text-sm font-medium text-gray-300 block'>
                Email
              </label>
              <input type='email' className='w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring' 
              placeholder='you@example.com' 
              id='email'
              value={email}
              onChange={(e)=>{
                setEmail(e.target.value)
              }}/>
            </div>

            <div>
              <label htmlFor='username' className='text-sm font-medium text-gray-300 block'>
                Username
              </label>
              <input type='text' className='w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring' 
              placeholder='mani kanta' 
              id='username'
              value={username}
              onChange={(e)=>{
                setUsername(e.target.value)
              }}/>
            </div>

            <div>
              <label htmlFor='password' className='text-sm font-medium text-gray-300 block'>
                password
              </label>
              <input type='password' className='w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring' 
              placeholder='**********' 
              id='password'
              value={password}
              onChange={(e)=>{
                setPassword(e.target.value)
              }}/>
            </div>

            <button className='text-white w-full bg-red-600 py-2 font-semibold rounded-md' disabled = {isSigningUp}>
              {isSigningUp ? "Loading.....":"Sign Up"}
            </button>
          </form>
          <div className='text-center text-gray-400'>
            Already a member ? <Link className='text-red-500 hover:underline' to={'/login'}>Sign In</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUpPage
