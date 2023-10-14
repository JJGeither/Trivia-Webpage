import React, { useState } from 'react';
import './App.css';

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
            
            <nav className="navbar">
                <h1 className="navbar-title">Trivia Game</h1>
            </nav>
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
