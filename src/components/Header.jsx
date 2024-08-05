import { useContext } from 'react'
import { MovieContext } from '../context/MovieContext'
import { SlMenu } from "react-icons/sl";

const Header = () => {
  const { header, setMobileMenu } = useContext(MovieContext)

  const MobileMenuShow = () => {
    setMobileMenu(true)
  }
  return (
    <>
      <header>
        <div className="flex md:hidden md:mr-6 cursor-pointer justify-center h-10 w-10 rounded-full hover:bg-[#303030]/[0.6] mt-3" onClick={MobileMenuShow} >
          <SlMenu className='text-white text-xl' />
        </div>
      <h2 className='text-2xl text-gray-100 font-bold md:mt-0 mt-8'>
        {header}
      </h2>
      </header>
    </>
  )
}

export default Header
