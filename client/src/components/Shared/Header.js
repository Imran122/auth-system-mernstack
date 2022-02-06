import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

import Home from '../Home/Home';
const Header = () => {
    const { user, logOut } = useAuth()
    return (
        <div>
            <ul>
                <li>
                    <Link to="/home">Home</Link>


                </li>
                <li>
                    <span>{user?.displayName}</span>
                    {user?.email && <button onClick={logOut}>logOut</button>}
                </li>
            </ul>
        </div>
    );
};

export default Header;