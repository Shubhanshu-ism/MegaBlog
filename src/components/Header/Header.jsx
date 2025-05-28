import React from 'react'
import {Container, Logo,LogoutBtn} from '../index'
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'
import { useNavigate, useLocation } from "react-router-dom";
function Header() {
    const authStatus = useSelector((state) => state.auth.status);
    const navigate = useNavigate()
    const location = useLocation();
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
  return (
    <header className="py-3 shadow-xl   bg-gray-500 rounded-xl items-center shadow-gray-600">
      <Container>
        <nav className="flex items-center">
          <div className="mr-4 ">
            <Link to="/">
              <Logo width="70px" />
            </Link>
          </div>

          <ul className="flex ml-auto ">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    className={`inline-block m-1 px-6 py-2 rounded-full duration-200 shadow-gray-800 cursor-pointer hover:shadow-md hover:bg-blue-100
                      ${location.pathname === item.slug ? "bg-blue-100" : ""} ${
                      location.pathname === item.slug ? "shadow-md" : ""
                    } duration-100`}
                    onClick={() => navigate(item.slug)}
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