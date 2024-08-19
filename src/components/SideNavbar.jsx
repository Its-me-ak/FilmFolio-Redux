import { useContext, useEffect, useRef } from "react"
import { MovieContext } from "../context/MovieContext"
import { Link, useNavigate } from "react-router-dom"
import { useAuth0 } from "@auth0/auth0-react";
import toast from "react-hot-toast";
import { CgClose } from "react-icons/cg";


const SideNavbar = () => {
  const { isAuthenticated, loginWithPopup, logout, user } = useAuth0()
  console.log(isAuthenticated);
  console.log(user);
  
  
  const sidebarRef = useRef()
  const navigate = useNavigate()
  const NavData = [
    { id: 1, name: "Genres", headerName: "Genres", link: "/" },
    { id: 2, name: "My Collection", headerName: "My Collection", link: "/bookmarked-movie" },
    { id: 3, name: "Trending", headerName: "Trending Movies", link: "/trending" },
    { id: 4, name: "Popular", headerName: "Popular Movies", link: "/popular" },
    { id: 5, name: "Top Rated", headerName: "Top Rated Movies", link: "/top-rated" },
    { id: 6, name: "Bollywood", headerName: "Bollywood Movies", link: "/bollywood" },
    { id: 7, name: "Anime", headerName: "Anime", link: "/anime" },
    { id: 8, name: "Upcoming", headerName: "Upcoming Movies", link: "/upcoming" },
    { id: 9, name: "TV Shows", headerName: "TV Shows", link: "/tv-show" },

  ]

  const { header, setHeader, mobileMenu, setMobileMenu } = useContext(MovieContext)

  const handleNavClick = (name) => {
    setHeader(name);
  };

  const MobileMenuHide = () => {
    setMobileMenu(false)
  }

  const handleLogout = async () => {
    try {
      await logout({ returnTo: window.location.origin });
     setTimeout(() =>{
       toast.success('Logged out succesfully',
         {
           style: {
             borderRadius: '10px',
             background: '#21263a',
             color: '#fff',
           },
         }
       )
     }, 700)

    } catch (error) {
      toast.error('Logout failed',
        {
          style: {
            borderRadius: '10px',
            background: '#21263a',
            color: '#fff',
          },
        }
      );
    }
  }

  const handleLogin = async () => {
    try {
      await loginWithPopup();

      // Check if the user object is populated
      if (user) {
        toast.success('Logged in successfully', {
          style: {
            borderRadius: '10px',
            background: '#21263a',
            color: '#fff',
          },
        });
      } else {
        toast.error('Login canceled', {
          style: {
            borderRadius: '10px',
            background: '#21263a',
            color: '#fff',
          },
        });
      }
    } catch (error) {
      console.error(error);
      toast.error('Login failed', {
        style: {
          borderRadius: '10px',
          background: '#21263a',
          color: '#fff',
        },
      });
    }
  };


  useEffect(() => {
    const handleSidebar = (e) => {
      if(!sidebarRef.current) return;

      if(!sidebarRef.current.contains(e.target)){
        setMobileMenu(false)
      }
    }
    document.addEventListener('click', handleSidebar, true)

    return () => {
      document.removeEventListener('click', handleSidebar)
    }
  }, [setMobileMenu])

  const handleLogoClick = () => {
    navigate("/");
    setHeader("Genres");
  };

  return (
    <div ref={sidebarRef} className={`block md:fixed md:w-52 h-full bg-[#21263a] absolute w-52 z-30 md:translate-x-0 transition-all ${mobileMenu ? "translate-x-0" : "translate-x-[-240px]"}`}>
      <span className="mt-2 flex justify-end me-2 text-white text-xl md:hidden p-1">
        <CgClose className="cursor-pointer" onClick={MobileMenuHide} />
      </span>
      <div className="logo">
        <span onClick={handleLogoClick} className="flex items-center justify-center w-full h-20 text-2xl">
          <h3 className="text-3xl text-gray-100 font-bold cursor-pointer">FilmFolio</h3>
        </span>
      </div>
      <nav className="navbar">
        <ul className="flex flex-col justify-between h-full">
          {NavData.map((item) => (
            <li key={item.id} className="my-0">
              <Link
                to={item.link}
                className={`block p-2 pl-5 font-semibold ${header === item.headerName ? 'bg-[#455e94] shadow-md border-l-4 text-gray-100 border-[#38ccd4]' : 'text-gray-400'}`}
                onClick={() => handleNavClick(item.headerName)}
              >
                {item.name}

              </Link>
            </li>
          ))}
        </ul>
        <div className="absolute bottom-2 mx-4">
          {
            isAuthenticated && user && (
              <button className="flex items-center justify-between gap-2 font-semibold text-lg bg-[#455e94] shadow-md border-2 py-[6px] px-4 rounded-lg text-gray-100 border-[#38ccd4] mb-2">
                <img src={user?.picture} alt={user.name} className="w-8 h-8" />

                <span>{user ? user.name : ""}</span>
              </button>
            )
          }
          {isAuthenticated ? (
            <button className="font-semibold text-lg bg-[#455e94] shadow-md border-2 py-1 rounded-lg px-14 text-gray-100 border-[#38ccd4]" onClick={handleLogout}>Logout</button>
          ) : (
            <button className="font-semibold text-lg bg-[#455e94] shadow-md border-2 py-1 rounded-lg px-[60px] text-gray-100 border-[#38ccd4]" onClick={handleLogin}>Login</button>
          )}
        </div>
      </nav>
    </div>
  )
}

export default SideNavbar
