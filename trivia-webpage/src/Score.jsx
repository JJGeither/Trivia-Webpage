import React from 'react';
import { NavLink } from "react-router-dom";
import './App.css'; // Create a separate CSS file for custom styling

const Score = () => {
    const text = window.location.hash.substring(1);

    return (
        <div className="flex flex-col items-center mt-96">
            <div className="text-white score-text font-retro font-bold text-4xl">Score: {text}</div>
            <NavLink to="/" className="go-home-button mt-10 p-4 rounded-lg bg-blue-500 text-white">Go Home</NavLink>
        </div>
    );
};

export default Score;
