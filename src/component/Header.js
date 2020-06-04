import React, { Component } from "react";
import axios from 'axios';
import {  Link  } from 'react-router-dom';
import styled from "styled-components";

class Header extends Component {
  constructor() {
    super();
    this.state = {
      Logincheck : 
      <HeaderTop>
      <Link to="/login" style={{ textDecoration: 'none' }}><Topbutton>로그인</Topbutton></Link>
      <Link to="/register" style={{ textDecoration: 'none' }}><Topbutton>회원가입</Topbutton></Link>
      </HeaderTop>
      
    }
  }
  async componentDidMount() {

    await axios.get('http://localhost:3001/DBapi/logincheck',
    {withCredentials : true})
    .then((data) => {
      if(data.data !== false) {
      this.setState({
        Logincheck : 
        <HeaderTop>
        <Text>안녕하세요. {data.data}님.</Text>
        <Topa href="/" onClick={this.logout}>로그아웃</Topa>
        <Link to="#headercenter" style={{ textDecoration: 'none' }}><Topbutton>내정보</Topbutton></Link>
        </HeaderTop>
      })}
    })
  }

  async logout() {
    await axios.get('http://localhost:3001/DBapi/logout',
    { withCredentials : true }
    )
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    })
        
  }
  render() {
    return (
      <>
      <div>
        {this.state.Logincheck}
      </div>
        <div id="headercenter">
            <Main><Home href="/"> 내 냉장고를 부탁해 </Home></Main>
        </div>
      </>
    );
  }
}
const HeaderTop = styled.div`
text-align:right;
`;
const Topbutton = styled.span`
bg-color : blue;
margin-right : 1em;
color : black;
text-decoration:none;
&:hover {
  color : red
}
`;
const Topa = styled.a`
color : gray;
text-decoration : none;
margin-right : 1em;
&:hover {
  color : red
}

`;
const Text = styled.span`
bg-color : blue;
margin-right : 1em;
color : black;
text-decoration:none;
`;
const Main = styled.div`
font-size : 4em;
text-align:center;
`
const Home = styled.a`
text-decoration:none;
color : #AFDB9F;
&:hover {
  color : #F48060; 
}
`
export default Header;
