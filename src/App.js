import React from 'react';
import './App.css';
import Header from './component/Header'
import Content from './component/Content'
import Footer from './component/Footer.js'
import { BrowserRouter as Router, Route  } from 'react-router-dom';
import { createBrowserHistory } from 'history'
import List from './component/List'
import Write from './component/Write'
import Detail from './component/Detail'
import Modify from './component/Modify'
import ModifyCT from './component/ModifyCT'
import Search from './component/Search'
import ModifyNeed from './component/ModifyNeed'
import Modifysauce from './component/Modifysauce'
import Login from './component/User/Login'
import Register from './component/User/Register'


function App() {
  return (
    <>
    <Router>
    <Header />
    <Content />

                <Route exact path="/board/:idx" component = {List} />
                <Route exact path="/write" component = {Write} />
                <Route exact path="/modify/:idx" component = {Modify} />
                <Route exact path="/board/detail/:recipeidx" component = {Detail} />
                <Route exact path="/modifyCT" component = {ModifyCT} />
                <Route exact path="/modifyneed" component = {ModifyNeed} />
                <Route exact path="/search" component = {Search} />
                <Route exact path="/login" component = {Login} />
                <Route exact path="/Register" component = {Register} />
                <Route exact path="/modifysauce" component = {Modifysauce} />
            </Router>
    </>
  );
}

export default App;
