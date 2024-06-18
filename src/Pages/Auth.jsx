import React, { useState } from 'react';
import logo from "../assets/images/logo1.png";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import { getAllShows } from '../Services/ShowsService';
import {login, signup} from '../Services/AuthService'
import { getLocations } from '../Services/locationService';
const Auth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [userData, setUserData] = useState({username: '', email: '', password: '', remember: false});
    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setUserData({
            ...userData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };


    const userLogin = async (payload) => {

        try {
            setIsLoading(true);
            // auth login (returns user id and token if successful)
            const result = await login( payload);
            payload.token = result.token;
            payload.user_id = result.user_id;
           
            localStorage.setItem('token', result.token);
            localStorage.setItem('user_id', result.user_id);
            localStorage.setItem("email", payload.email);
            localStorage.setItem("user_id", result.user_id);


            // get locations of all users and shows data
            const locations = await getLocations()
            const showsData  = await getAllShows()
          

            dispatch({ type: 'LOGIN', payload: { ...payload, locations, showsData } })
            if (payload.remember) {
             

                localStorage.setItem('token', result.token);
                localStorage.setItem("remember", true);

            }else {
                localStorage.setItem("remember", false);
            }
            navigate('/maps');
        } catch (error) {
            setIsLoading(false);
            console.log(error)
            console.log('Error occurred', error.response?.data?.message);
            setError(error.response?.data?.message || error.message);
        }
    }

    const signup = async (endpoint, payload) => {

        try {
            setIsLoading(true);
            const response = await axios.post(endpoint, payload);
            const result = response.data;
            alert('Signup successful. Please login.');
            setIsLogin(true);
            setIsLoading(false);

        } catch (error) {
            setIsLoading(false);
            alert(error.message)

            console.log('Error occurred', error.response?.data?.message);
            setError(error.response?.data?.message || error.message);
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault();


        try {
        
            if (isLogin) {

                userLogin({ ...userData });
            } else {
             
                signup('https://shlaimanfinderbackend.onrender.com/auth/signup', { ...userData });
            }
        } catch (error) {
            console.log('Error occurred', error.response?.data?.message);
            if (!error.response) {
                setError(error.message);
                return
            }
            setError(error.response?.data?.message || error.message);

        }
    };




    return (
        <div className="wrapper fadeInDown">
            <div id="formContent">
                <h2 className={isLogin ? 'active' : 'inactive'} onClick={() => setIsLogin(true)}> Sign In </h2>
                <h2 className={isLogin ? 'inactive underlineHover' : 'active'} onClick={() => setIsLogin(false)}>Sign Up </h2>

                <div className="fadeIn first">
                    <img src={logo} id="icon" alt="User Icon" />
                </div>

                {error && <div>** {error} **</div>}

                <div id={isLogin ? "loginForm" : "signupForm"}>
                    <form method="POST" onSubmit={handleSubmit}>
                        <input type="hidden" name={isLogin ? "login" : "signup"} value={isLogin ? "login" : "signup"} />
                        {!isLogin && (
                            <input type="text" id="signupUsername" className="fadeIn second" name="username" placeholder="username" required onChange={handleChange} />
                        )}
                        <input type="email" id={isLogin ? "loginEmail" : "signupEmail"} className="fadeIn second" name="email" placeholder="email" required onChange={handleChange} />
                        <input type="password" id={isLogin ? "loginPassword" : "signupPassword"} className="fadeIn third" name="password" placeholder="password" required onChange={handleChange} />
                        {isLogin && (
                            <div className="checkbox-wrapper-5 fadeIn fourth">
                                <label htmlFor="check-5">
                                    <input type="checkbox" id="check-5" name="remember" onChange={handleChange} />
                                    <span className="tick_mark"></span>
                                </label>
                                <span> Remember me?</span>
                            </div>
                        )}
                        {isLoading ? <CircularProgress /> : <input type="submit" className="fadeIn fifth" value={isLogin ? "Log In" : "Sign Up"} />}   
                    </form>
                    <div id="formFooter">
                        {isLogin ? (
                            <a className="underlineHover" href="/request-reset">Forgot Password?</a>
                        ) : (
                            <a className="underlineHover" href="#" onClick={() => setIsLogin(true)}>Already have an account? Sign In</a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Auth;
