import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Auth from './Pages/Auth';
// import "./App.css"
import NavbarComp from './components/Navbar';
import ResponsiveAppBar from './components/Navbar';
import Profile from './Pages/Profile';
import Maps from './Pages/Map';
import { useDispatch, useSelector } from 'react-redux';
import { BottomNavigation } from '@mui/material';
import LabelBottomNavigation from './Components/BottomNavigation';
import axios from 'axios';
import Shows from './Pages/Shows';
import { getAllShows } from './Services/ShowsService';
import Variants from './Components/Skeleton';
import { useNavigate } from 'react-router-dom';
import { login } from './Services/AuthService';
import { getLocations } from './Services/locationService';


const App = () => {
  const user = useSelector(state => state.userData)
  const dispatch = useDispatch()
  const [isScreenUnder1000px, setIsScreenUnder1000px] = useState(window.innerWidth < 1000);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate()


  const fetchLocationsAndLogin = async () => {
    setIsLoading(true)
    try {
      const token = localStorage.getItem("token")
      const tokenFromRedux  = user.token
      if (!token && !tokenFromRedux ) {
        navigate('/auth')
      }


      if (localStorage.getItem('remember') === 'false') {
        localStorage.clear()
        window.location.reload()
      }
     
      const showsData = await getAllShows()
      const locations = await getLocations()
      dispatch({ type: 'LOGIN', payload: { showsData, locations, user_id: localStorage.getItem("user_id") } })

      setIsLoading(false)
    } catch (e) {
      console.log(e)
      alert("Error occurred", e.message)
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      fetchLocationsAndLogin()

    } else {
      navigate('/auth')
    }

    const handleResize = () => {
      setIsScreenUnder1000px(window.innerWidth < 1000);
    };
    handleResize()



  }, [])



  return (
    <div>

      {user.isLogged ? <div>

        <ResponsiveAppBar />
      </div> : null}



      {
        user.isLogged  ? <Routes>
          <Route path='/' element={<Profile />} />
          <Route path='/maps' element={<Maps />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/shows' element={<Shows />} />

        </Routes> :
          !isLoading ? <Routes>
            <Route path='/' element={<Auth />} />
            <Route path='/auth' element={<Auth />} />

          </Routes> : <div style={{ display: 'flex', flexDirection: 'row', gap: "50px", flexWrap: 'wrap' }}> <Variants /> <Variants /> <Variants /> <Variants /></div>
      }


      {user.isLogged ? <div >

        <br /><br /><br />
        <LabelBottomNavigation />
      </div> : null}

    </div>
  );
};

export default App;
