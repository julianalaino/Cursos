import React from 'react';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { render } from 'react-dom';
import { initialState } from './contexto/initialState';
import { StateProvider } from './contexto/store';
import { mainReducer } from './contexto/reducers';



render(
<StateProvider initialState = {initialState} reducer = {mainReducer}>
    <App/>
</StateProvider>
, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();



 
