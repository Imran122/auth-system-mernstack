import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from '../Shared/Header';

const Home = () => {
    return (
        <div>
            <Header></Header>
            <h2>home</h2>
        </div>
    );
};

export default Home;