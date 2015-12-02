import React from 'react';
import { createHistory, createHashHistory } from 'history';
import Main from './main.js';
import ReactDOM from 'react-dom';

const rootEl = document.getElementById('main');
const history = process.env.NODE_ENV === 'production' ?
    createHashHistory() :
    createHistory();

ReactDOM.render(<Main history={history} />, rootEl)