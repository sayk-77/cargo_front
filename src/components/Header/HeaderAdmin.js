import React from 'react';
import {Link} from "react-router-dom";
import './style_header.css'

export const Header = () => (
    <header className='header'>
        <ul>
            <Link to="/drivers">Водители</Link>
            <Link to="/customers">Клиенты</Link>
            <Link to="/contracts">Контракты</Link>
            <Link to="/new-contract">Создать контракт</Link>
        </ul>
    </header>
);