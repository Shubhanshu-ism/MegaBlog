import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import  {logout}  from '../../store/authSlice'
                   
function LogoutBtn() {
    const dispatch  =useDispatch()
    const logoutHandler = ()=>{
        authService
          .logout()
          .then(() => {
            dispatch(logout());
          })
          .catch((error) => {
            // Added error handling for the logout promise
            console.log("Appwrite service :: logoutHandler :: error", error);
          });
    }
  return (
    <button
      className="inline-block m-1 px-6 py-2 cursor-pointer hover:shadow-md shadow-gray-700 duration-200 hover:bg-blue-100 rounded-full duration-300"
      onClick={logoutHandler}
    >
      Logout
    </button>
  );
}


export default LogoutBtn