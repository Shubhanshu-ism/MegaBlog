import React, { useState, useEffect } from "react";
import {Container, Logo,LogoutBtn} from '../index'
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'
import { useNavigate, useLocation } from "react-router-dom";
function Header() {
    const authStatus = useSelector((state) => state.auth.status);
    const navigate = useNavigate()
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navItems = [
      {
        name: "Home",
        slug: "/",
        active: true,
      },
      {
        name: "Login",
        slug: "/login",
        active: !authStatus,
      },
      {
        name: "Signup",
        slug: "/signup",
        active: !authStatus,
      },
      {
        name: "All Post",
        slug: "/all-posts",
        active: authStatus,
      },
      {
        name: "Add Post",
        slug: "/add-post",
        active: authStatus,
      },
    ];
    const toggleMenu = () => {
      setIsMenuOpen((prev) => !prev);
    };
    
    useEffect(() => {
      const handleScroll = () => {
        if (window.scrollY > 100 && isMenuOpen) {
          setIsMenuOpen(false);
        }
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, [isMenuOpen]);
    
  return (
    <header className="py-3 shadow-xl   bg-gray-500 rounded-xl items-center shadow-gray-600 relative">
      <Container>
        <nav className="flex items-center justify-between">
          <div className="mr-4 ">
            <Link to="/">
              <Logo width="70px" />
            </Link>
          </div>
          <button
            className="md:hidden text-white text-3xl rounded-lg  shadow-gray-600 shadow-xl hover:shadow-md  focus:outline-none"
            onClick={toggleMenu}
          >
            ☰
          </button>
          <ul
            className={`flex-col md:flex-row md:flex gap-2 ml-auto 
              absolute md:static top-16 right-4 z-50 
              ${isMenuOpen ? "flex" : "hidden"} md:flex 
              bg-gray-500/70 backdrop-blur-md p-4 rounded-xl shadow-md md:shadow-none 
              transition-all duration-200`}
          >
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    className={`inline-block m-1 px-6 py-2 rounded-full duration-200 shadow-gray-800 cursor-pointer hover:shadow-md hover:bg-blue-100
                      ${location.pathname === item.slug ? "bg-blue-100" : ""} ${
                      location.pathname === item.slug ? "shadow-md" : ""
                    } duration-100`}
                    onClick={() => {
                      navigate(item.slug);
                      setIsMenuOpen(false);
                    }}
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header