import React, { useState } from 'react';
import './App.css';
import logo from './images/logo-rm.png';


function App() {

    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');
    const [correctAnswer, setCorrectAnswer] = useState('');

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

                <div className="navbar-end">
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
                </div>
            </div>

            <div className="flex flex-col items-center h-screen">
                <div className="flex space-x-4">
                    <div className="w-20 h-20 bg-[#ff5d6c] flex items-center justify-center rounded-md text-white font-retro text-4xl">
                        Q
                    </div>
                    <div className="w-20 h-20 bg-[#35cdce] flex items-center justify-center rounded-md text-white font-retro text-4xl">
                        U
                    </div>
                    <div className="w-20 h-20 bg-[#ff5d6c] flex items-center justify-center rounded-md text-white font-retro text-4xl">
                        I
                    </div>
                    <div className="w-20 h-20 bg-[#35cdce] flex items-center justify-center rounded-md text-white font-retro text-4xl">
                        Z
                    </div>
                </div>
                <button className="btn btn-lg w-96 mt-4" style={{ backgroundColor: '#F8C85F', color: '#283249', fontSize: '24px' }}>
                    <span className="font-bold text-4xl">Start quiz!</span>
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
