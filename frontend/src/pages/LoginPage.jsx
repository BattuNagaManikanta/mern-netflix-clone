import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useAuthUser from '../store/authUser';

const LoginPage = () => {
  const [email , setEmail] = useState("");
  const [password,setPassword] = useState("");
  const {login} = useAuthUser();

  function handleSubmit(e){
    e.preventDefault();
    login({email,password});
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
            Sign In
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

            <button type='submit' className='text-white w-full bg-red-600 py-2 font-semibold rounded-md'>
              Log In
            </button>
          </form>
          <div className='text-center text-gray-400'>
            Don't have an account ? <Link className='text-red-500 hover:underline' to={'/signup'}>Sign Up</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
