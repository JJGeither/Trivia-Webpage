import React, { useState } from 'react';
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


    return (

        <div className="trivia-app">

            <div className="navbar bg-base-1000 flex items-center justify-center" style={{ height: '5rem', marginTop: '0px', position: 'relative', overflow: 'hidden',  backgroundImage: 'linear-gradient(to right, #ff5d6c 47%, #35cdce 53%)' }}>
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '0.5rem', backgroundColor: '#000', opacity: 0.3 }}></div>

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
                    <div className="avatar">
                        <div className="w-12 rounded-full">
                            <img src={profile} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="fixed top-40 right-0 h-full w-1/4 p-4">
                <h2 className="bg-white text-3xl font-bold text-center text-black mb-4">Leaderboard</h2>
                <div className="space-y-2">
                    {leaderboardData.map((user, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between"
                        >
                            <div
                                className={`bg-[#ff5d6c] font-bold p-2 border border-[#D1D5DB] w-12 h-12 flex items-center justify-center mr-2 text-black`}
                            >
                                {index + 1}
                            </div>
                            <div className={`bg-${index % 2 === 0 ? '[#35cdce]' : '[#F7C75E]'} p-2 border border-[#D1D5DB] flex items-center justify-between flex-1`}>
                                <span className="text-xl font-bold text-[#283249]">
                                    {user.name}
                                </span>
                                <span className="text-xl font-bold text-[#283249]">
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
                        <div className="absolute inset-0 bg-[#35cdce] rounded-md text-white font-retro text-5xl font-bold flex items-center justify-center">
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
                        <div className="absolute inset-0 bg-[#35cdce] rounded-md text-white font-retro text-5xl font-bold flex items-center justify-center">
                            Z
                        </div>
                        <div className="h-1 bg-[#319eb3] absolute bottom-0 w-full rounded-b-md"></div>
                    </div>
                </div>
                <button className="btn btn-lg w-96 h-20 text-4xl mt-10 bg-[#F7C75E]">
                    Start quiz!
                </button>
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
