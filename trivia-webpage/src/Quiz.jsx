import React, { useState } from 'react';

const Quiz = () => {
    const [question, setQuestion] = useState('What is the capital of France?');
    const [options, setOptions] = useState(['London', 'Berlin', 'Madrid', 'Paris']);
    const [selectedOption, setSelectedOption] = useState('');

    // Array of unique colors
    const buttonColors = ['[#ff5d6c]', '[#646CFF]', '[#F7C75E]', '[#50C878]'];

    const handleOptionSelect = (option) => {
        alert(`Selected Option: ${option}`);
        setSelectedOption(option);
    };

    return (
        <div className="quiz-container text-center flex flex-col justify-center items-center h-screen">
            <h2 className="quiz-question font-bold text-white text-4xl">{question}</h2>

            <div className="quiz-options mt-4 space-y-4">
                <div className="quiz-row flex justify-center">
                    <button
                        className={`quiz-option bg-${buttonColors[0]} text-white text-3xl m-8 btn btn-xl w-96 h-48 font-bold rounded-lg ${selectedOption === options[0] ? 'selected' : ''}`}
                        onClick={() => handleOptionSelect(options[0])}
                    >
                        {options[0]}
                    </button>

                    <button
                        className={`quiz-option bg-${buttonColors[1]} text-white text-3xl m-8 btn btn-xl w-96 h-48 font-bold rounded-lg ${selectedOption === options[1] ? 'selected' : ''}`}
                        onClick={() => handleOptionSelect(options[1])}
                    >
                        {options[1]}
                    </button>
                </div>

                <div className="quiz-row flex justify-center">
                    <button
                        className={`quiz-option bg-${buttonColors[2]} text-white text-3xl m-8 btn btn-xl w-96 h-48 font-bold rounded-lg ${selectedOption === options[2] ? 'selected' : ''}`}
                        onClick={() => handleOptionSelect(options[2])}
                    >
                        {options[2]}
                    </button>

                    <button
                        className={`quiz-option bg-${buttonColors[3]} text-white text-3xl m-8 btn btn-xl w-96 h-48 font-bold rounded-lg ${selectedOption === options[3] ? 'selected' : ''}`}
                        onClick={() => handleOptionSelect(options[3])}
                    >
                        {options[3]}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Quiz;
