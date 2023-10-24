﻿import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import './App.css';
import profile from './images/profile.jpg';

const Home = () => {

        const leaderboardData = [
            { name: 'John', score: 100 },
            { name: 'Jane', score: 95 },
            { name: 'Bob', score: 90 },
            { name: 'Alice', score: 85 },
            { name: 'Eve', score: 80 },
    ];

        const [selectedTopic, setSelectedTopic] = useState(''); // Initialize the selected topic

        const handleTopicChange = (event) => {
            setSelectedTopic(event.target.value);
        };



        return (

            <div className="trivia-app">

                <div className="absolute stats stats-vertical shadow ml-20 top-40">
                    <div className="stat">
                        <div className="stat-title">Questions Answered</div>
                        <div className="stat-value">31K</div>
                        <div className="stat-desc">Jan 1st - Feb 1st</div>
                    </div>
                </div>

                <div className="absolute stats stats-vertical shadow ml-20 top-72 bg-[#ff5d6c] text-white">
                    <div className="stat">
                        <div className="stat-title text-white">Favorite Category</div>
                        <div className="stat-value">Fiction</div>
                    </div>
                </div>

                <div className="absolute stats stats-vertical shadow ml-20 top-96 mt-5 bg-[#646CFF]">
                    <div className="stat">
                        <div className="stat-title text-white">Percentage Correct</div>
                        <div className="radial-progress ml-5 mt-3 mb-3 text-white font-bold" style={{ "--value": "70", "--size": "5rem", "--thickness": "10px" }}>70%</div>
                        <div className="stat-desc text-white">31k / 40k</div>
                    </div>
                </div>



                <div className="absolute top-40 right-10 w-1/4 p-4">
                    <div className="text-center">
                        <h2 className="text-5xl font-bold text-white p-4 rounded-lg">
                            Leaderboard
                        </h2>
                        <div className="border-b-2 border-white w-100 mb-4 mx-auto"></div>
                    </div>


                    <div className="space-y-2">
                        {leaderboardData.map((user, index) => (
                            <div key={index} className="flex items-center justify-between">
                                <div
                                    className={`bg-[#ff5d6c] font-bold p-2 rounded-lg border border-[#D1D5DB] w-12 h-12 flex items-center justify-center mr-2 text-white`}
                                >
                                    {index + 1}
                                </div>
                                <div
                                    className={`bg-${index % 2 === 0 ? '[#646CFF]' : '[#F7C75E]'} p-2 rounded-lg border border-[#D1D5DB] flex items-center justify-between flex-1`}
                                >
                                    <div className="flex items-center">
                                        <div className="avatar rounded-full">
                                            <img src={profile} style={{ width: '25px', height: '25px' }} />
                                        </div>
                                        <span className="text-xl font-bold text-[#283249] text-center ml-4">
                                            {user.name}
                                        </span>
                                    </div>
                                    <span className="text-xl font-bold text-[#283249] text-center">
                                        {user.score}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col items-center h-screen mt-80">
                    <div className="flex space-x-2">
                        <div className="w-20 h-24 relative">
                            <div className="absolute inset-0 bg-[#ff5d6c] rounded-md text-white font-retro text-5xl font-bold flex items-center justify-center">
                                Q
                            </div>
                            <div className="h-1 bg-[#e74351] absolute bottom-0 w-full rounded-b-md"></div>
                        </div>
                        <div className="w-20 h-24 relative">
                            <div className="absolute inset-0 bg-[#646CFF] rounded-md text-white font-retro text-5xl font-bold flex items-center justify-center">
                                U
                            </div>
                            <div className="h-1 bg-[#4D539B] absolute bottom-0 w-full rounded-b-md"></div>
                        </div>
                        <div className="w-20 h-24 relative">
                            <div className="absolute inset-0 bg-[#ff5d6c] rounded-md text-white font-retro text-5xl font-bold flex items-center justify-center">
                                I
                            </div>
                            <div className="h-1 bg-[#e74351] absolute bottom-0 w-full rounded-b-md"></div>
                        </div>
                        <div className="w-20 h-24 relative">
                            <div className="absolute inset-0 bg-[#646CFF] rounded-md text-white font-retro text-5xl font-bold flex items-center justify-center">
                                Z
                            </div>
                            <div className="h-1 bg-[#4D539B] absolute bottom-0 w-full rounded-b-md"></div>
                        </div>
                    </div>

                    <div className="flex flex-col items-center">

                            <NavLink to="/quiz">
                                <button className="btn btn-lg w-120 h-20 text-4xl mt-10 bg-[#F7C75E]">
                                    Start {selectedTopic ? selectedTopic : 'a'} quiz!
                                </button>
                            </NavLink>


                        <select
                            className="select mt-5 w-full max-w-xs"
                            value={selectedTopic}
                            onChange={handleTopicChange}
                        >
                            <option disabled value="">
                                Pick your topic
                            </option>
                            <option value="Fiction">Fiction</option>
                            <option value="History">History</option>
                            <option value="Science">Science</option>
                            <option value="Art">Art</option>
                            <option value="Sports">Sports</option>
                        </select>
                    </div>


                </div>

            </div>
        );
}
export default Home;
