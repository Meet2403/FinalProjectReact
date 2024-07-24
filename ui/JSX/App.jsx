import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import Navbar from './Navbar.jsx';

const element = (
    <Router>
        <Navbar />
    </Router>
);

ReactDOM.render(element, document.getElementById('root'));