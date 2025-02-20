import { LogOut, Menu, Search } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import useAuthUser from '../store/authUser'
import { useContentStore } from '../store/content'

const Navbar = () => {
  const [isMobileMenuOpen,setIsMobileMenuOpen] = useState(false);
  const {user,logout} = useAuthUser();
  const {contentType,setContentType} = useContentStore();
  

  const toggleMobileMenu = ()=>{
    setIsMobileMenuOpen(!isMobileMenuOpen);
  }
  return (
    <header>
      <div className=' p-4 max-w-6xl mx-auto flex items-center justify-between text-white'>
        <div className='flex items-center gap-10 z-50'>
          <Link to={"/"}>
            <img className='w-32 sm:w-40'  src="/netflix-logo.png" alt="netflix logo" />  
          </Link>
          <div className='hidden sm:flex gap-2 items-center'>
            <Link to={"/"} className='hover:underline' onClick={()=>setContentType("movie")}>
              Movies
            </Link>
            <Link to={"/"} className='hover:underline' onClick={()=>setContentType("tv")}>
              Tv Shows
            </Link>
            <Link to={"/history"} className='hover:underline'>
              Search History
            </Link>
          </div>
        </div>

        <div className='flex gap-2 items-center z-50'>
          <Link to={"/search"}>
            <Search className='size-6 cursor-pointer'/>
          </Link>
          <img src={user.image} alt='user image' className='h-6 rounded cursor-pointer'/>
          <LogOut className='size-6 cursor-pointer' onClick={()=>logout()}/>
          <div className='sm:hidden'>
            <Menu className='size-6 cursor-pointer' onClick={toggleMobileMenu}/>
          </div>
        </div>
      </div>
      {isMobileMenuOpen && <div className='p-4 w-full relative z-50 sm:hidden mt-4 bg-black border border-gray-700 rounded flex flex-col text-white'> 
            <Link to={"/"} className='hover:underline' onClick={()=>setContentType("movie")}>
              Movies
            </Link>
            <Link to={"/"} className='hover:underline' onClick={()=>setContentType("tv")}>
              Tv Shows
            </Link>
            <Link to={"/history"} className='hover:underline'>
              Search History
            </Link>
        </div>}
    </header>
      
  )
}

export default Navbar;
