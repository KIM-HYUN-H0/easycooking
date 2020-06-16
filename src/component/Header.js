import React, { Component } from "react";
import axios from 'axios';
import {  Link  } from 'react-router-dom';
import styled from "styled-components";
import { Container } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

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

    await axios.get('http://192.168.219.103:3001/DBapi/logincheck',
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
    await axios.get('http://192.168.219.103:3001/DBapi/logout',
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
        <Container><Typography className={this.props.classes.main} variant="h4">내 냉장고를 부탁해</Typography></Container>
      </>
    );
  }
}
const styles = theme => ({
  main: {
    textAlign:'center',
    textDecoration : 'none',
    color : '#AFDB9F',
    '&:hover' : {
      color : '#F48060'
    }
  }
});
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

export default withStyles(styles)(Header);
