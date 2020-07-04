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
import Container from '@material-ui/core/Container';
import Manage from './component/Manage';
import Test from './component/Test';
import Info from './component/User/Info';
import Wait from './component/Wait';
import MyRefri from './component/User/MyRefri';


function App() {
  return (
    <>
    <Router>
    <Header />
    
    <Content />
    <Container style={{marginBottom : '100px'}}>
                <Route exact path="/board/:idx" component = {List} />
                <Route exact path="/write" component = {Write} />
                <Route exact path="/modify/:idx" component = {Modify} />
                <Route exact path="/board/detail/:recipeidx" component = {Detail} />
                <Route exact path="/modifyCT" component = {ModifyCT} />
                <Route exact path="/modifyneed" component = {ModifyNeed} />
                <Route exact path="/search" component = {Search} />
                <Route exact path="/login" component = {Login} />
                <Route exact path="/register" component = {Register} />
                <Route exact path="/modifysauce" component = {Modifysauce} />
                <Route exact path="/test" component = {Test} />
                <Route exact path="/manage" component = {Manage} />
                <Route exact path="/myrefri" component = {MyRefri} />
                <Route exact path="/info" component = {Info} />
                <Route exact path="/wait" component = {Wait} />
                </Container></Router>
            
    </>
  );
}

export default App;
