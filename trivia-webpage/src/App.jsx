﻿import React, { useState } from 'react';
import './App.css';
import logo from './images/logo-rm.png';
import profile from './images/profile.jpg';

function App() {

    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');
    const [correctAnswer, setCorrectAnswer] = useState('');

    const leaderboardData = [
        { name: 'John', score: 100 },
        { name: 'Jane', score: 95 },
        { name: 'Bob', score: 90 },
        { name: 'Alice', score: 85 },
        { name: 'Eve', score: 80 },
    ];

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
    };

    const handleAnswerSubmit = () => {
        if (selectedOption === correctAnswer) {
            alert('Correct!');
        } else {
            alert('Incorrect!');
        }
    };

    const loadTrivia = () => {
        setQuestion('What is the capital of France?');
        setOptions(['London', 'Berlin', 'Madrid', 'Paris']);
        setCorrectAnswer('Paris');
    };

    const [selectedTopic, setSelectedTopic] = useState(''); // Initialize the selected topic

    const handleTopicChange = (event) => {
        setSelectedTopic(event.target.value);
    };


    return (

        <div className="trivia-app">

            <div className="navbar bg-base-1000 flex items-center justify-center" style={{ height: '3rem', marginTop: '0px', position: 'relative', overflow: 'hidden',  backgroundImage: 'linear-gradient(to right, #ff5d6c 47%, #5FAFFF 53%)' }}>


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
                </div>

                <div className="navbar-end space-x-4 pr-4">
                    <button className="btn btn-ghost btn-circle">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>
                    <button className="btn btn-ghost btn-circle">
                        <div className="indicator">
                            <svg xmlns="http://w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v 3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                            <span className="badge badge-xs badge-primary indicator-item"></span>
                        </div>
                    </button>

                    <div>
                    Welcome James!
                    </div>
                    <div className="avatar">
                        <div className="w-12 rounded-full">
                            <img src={profile} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="absolute stats stats-vertical shadow ml-20 mt-20">
                <div className="stat">
                    <div className="stat-title">Questions Answered</div>
                    <div className="stat-value">31K</div>
                    <div className="stat-desc">Jan 1st - Feb 1st</div>
                </div>
            </div>

            <div className="absolute stats stats-vertical shadow ml-20 mt-80 bg-[#5FAFFF]">
                <div className="stat">
                    <div className="stat-title text-white">Percentage Correct</div>
                    <div className="radial-progress ml-5 mt-3 mb-3 text-white font-bold" style={{ "--value": "70", "--size": "5rem", "--thickness": "10px" }}>70%</div>
                    <div className="stat-desc text-white">31k / 40k</div>
                </div>
            </div>

            <div className="absolute stats stats-vertical shadow ml-20 mt-52 bg-[#ff5d6c] text-white">
                <div className="stat">
                    <div className="stat-title text-white">Favorite Category</div>
                    <div className="stat-value">Fiction</div>
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
                                className={`bg-${index % 2 === 0 ? '[#5FAFFF]' : '[#F7C75E]'} p-2 rounded-lg border border-[#D1D5DB] flex items-center justify-between flex-1`}
                            >
                                <div className="flex items-center">
                                    <div className="avatar rounded-full">
                                        {/* Add the URL of the user's profile picture as the src */}
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
                        <div className="absolute inset-0 bg-[#5FAFFF] rounded-md text-white font-retro text-5xl font-bold flex items-center justify-center">
                            U
                        </div>
                        <div className="h-1 bg-[#319eb3] absolute bottom-0 w-full rounded-b-md"></div>
                    </div>
                    <div className="w-20 h-24 relative">
                        <div className="absolute inset-0 bg-[#ff5d6c] rounded-md text-white font-retro text-5xl font-bold flex items-center justify-center">
                            I
                        </div>
                        <div className="h-1 bg-[#e74351] absolute bottom-0 w-full rounded-b-md"></div>
                    </div>
                    <div className="w-20 h-24 relative">
                        <div className="absolute inset-0 bg-[#5FAFFF] rounded-md text-white font-retro text-5xl font-bold flex items-center justify-center">
                            Z
                        </div>
                        <div className="h-1 bg-[#319eb3] absolute bottom-0 w-full rounded-b-md"></div>
                    </div>
                </div>

                <div className="flex flex-col items-center">
                    <button className="btn btn-lg w-120 h-20 text-4xl mt-10 bg-[#F7C75E]">
                        Start {selectedTopic ? selectedTopic : 'a'} quiz!
                    </button>

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

            <div className="trivia-card">
                <p className="trivia-question">{question}</p>
                <div className="trivia-options">
                    {options.map((option, index) => (
                        <div
                            key={index}
                            className={`trivia-option ${selectedOption === option ? 'selected' : ''}`}
                            onClick={() => handleOptionSelect(option)}
                        >
                            {option}
                        </div>
                    ))}
                </div>
                <button
                    className="trivia-submit-button"
                    onClick={handleAnswerSubmit}
                    disabled={!selectedOption}
                >
                    Submit Answer
                </button>
            </div>
            <button className="load-trivia-button" onClick={loadTrivia}>
                Load New Trivia
            </button>
           
        </div>
    );
}

export default App;
