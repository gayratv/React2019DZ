import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import {Provider} from "react-redux";
import {BrowserRouter as Router} from "react-router-dom";
import ErrorBoundry from "./components/error-boundry";
import RestoService from "./services/resto-service";
import RestoServiceContext from "./components/resto-service-context";
import store from "./store";
import firebase from "./firebase";
import './index.scss';

import {getDataTest} from "./firebase/testFB";

console.log('авторизация firebase : ',firebase.login("t@t.ru","123456"));
getDataTest();


const restoService = new RestoService();

ReactDOM.render(
    // redux srore
    <Provider store = {store}>
        <ErrorBoundry>
            <RestoServiceContext.Provider value={restoService}>
                <Router>
                    <App />
                </Router>

            </RestoServiceContext.Provider>

        </ErrorBoundry>
    </Provider>

    , document.getElementById('root'));

