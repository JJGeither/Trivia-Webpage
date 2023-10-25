import React, { useState, useEffect } from 'react';
import { createClient } from "@supabase/supabase-js";
import './App.css';
import profile from './images/profile.jpg';
import { BrowserRouter, Routes, Route, NavLink, useNavigate } from "react-router-dom"; 
import Quiz from "./Quiz.jsx";
import Home from "./Home.jsx";
import Score from "./Score.jsx";
import Login from "./Login.jsx"

const supabase = createClient("https://oxwswcbraxegyjpdkzpm.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im94d3N3Y2JyYXhlZ3lqcGRrenBtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5ODAxMDkwMiwiZXhwIjoyMDEzNTg2OTAyfQ.7WMXpuc_gBQpO99zMDVVaUqdEc_ZF7mBP7r8Ir74TL4");

function App() {
    const [user, setUser] = useState({});

    useEffect(() => {
        async function getUserData() {
            await supabase.auth.getUser().then((value) => {
                // value.data.user
                if (value.data?.user) {
                    console.log(value.data.user);
                    setUser(value.data.user)
                }
            })
        }
        getUserData();
    }, []);

    async function signOutUser() {
        const { error } = await supabase.auth.signOut();
        if (!error) {
            window.location.reload(); // Refresh the page after successful sign-out
        }
    }

    return (

        <div className="trivia-app">

            <BrowserRouter>
                <div className="navbar bg-base-1000 flex items-center justify-center" style={{ height: '3rem', marginTop: '0px', position: 'static', overflow: 'hidden', backgroundImage: 'linear-gradient(to right, #ff5d6c 47%, #646CFF 53%)' }}>


                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost btn-circle">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
                            </svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            <li><a>Homepage</a></li>
                            <li><a>Portfolio</a></li>
                            <li><a>About</a></li>
                        </ul>
                        </div>
                        <NavLink to="/" className="text-3xl ml-20 font-retro whitespace-nowrap">
                            <span className="text-stroke text-white">Trivia Trove</span>
                        </NavLink>
                </div>



                    <div className="navbar-end space-x-4 pr-4">


                        <div className="absolute dropdown dropdown-bottom dropdown-end">
                            <img tabIndex={0} src={user.user_metadata?.avatar_url || profile} className="btn btn-ghost btn-circle avatar" alt="User Profile" />
                            <ul tabIndex={0} className="dropdown-content z-[10] menu p-2 shadow bg-base-100 rounded-box w-52">
                                {user.email ? <li><a onClick={() => signOutUser()}>Sign Out</a></li>
                                    :
                                <li><NavLink to="/login">Login</NavLink></li>}
                            </ul>
                        </div>

                        <button className="absolute right-20 btn btn-ghost btn-circle">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>


                        <button className="absolute right-32 btn btn-ghost btn-circle">
                            <div className="indicator">
                                <svg xmlns="http://w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v 3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                </svg>
                                <span className="badge badge-xs badge-primary indicator-item"></span>
                            </div>
                        </button>

                        {user.email && (
                            <div className="absolute right-48">
                                Welcome, {user.user_metadata?.full_name}!
                            </div>
                        )}

                    </div>

            </div>

                <Routes>
                    <Route exact path="/quiz" element={<Quiz />} />
                    <Route exact path="/score" element={<Score />} />
                    <Route exact path="/login" element={<Login />} />
                    <Route exact path="/" element={< Home />} />
                </Routes>
            </BrowserRouter> 
            </div>
           
    );
}

export default App;
