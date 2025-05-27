import { useDispatch } from "react-redux";
import "./App.css";
import { useEffect, useState } from "react";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Footer, Header } from "./components";
import { Outlet } from "react-router-dom";
import Loading from "./components/Loading/Loading";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })

      .finally(() => setLoading(false));
  }, [dispatch]);
  return (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-400 duration-200">
      <div className="w-full block">
        <Header />
        <main>
          {!loading ? <Outlet /> :  <Loading/>}
          {/* todo */}
        </main>
        <Footer /> 
      </div>
    </div>
  )
}

export default App;
