import React, { Component } from "react";
import axios from 'axios';
import styled from 'styled-components';

class Login extends Component {
  constructor() {
      super();
    this.state = {
      id: "",
      pw: "",
      result : ''
    };
    this.PWChange = this.PWChange.bind(this);
    this.IDChange = this.IDChange.bind(this);
    this.Login = this.Login.bind(this);
  }
  handleKeyPress = (e) => {
    if (e.key === "Enter") {
      this.Login();
    }
  };

  PWChange = (event) => {
      this.setState({
          pw : event.target.value
      })
  };
  IDChange = (event) => {
    this.setState({
        id : event.target.value
    })
  };
  async Login() {
    await axios.post('http://localhost:3001/DBapi/login', 
    {
      username : this.state.id,
      password : this.state.pw,
    },
    { withCredentials : true }
    )
    .then((data) => {
      document.location.href = '/';
    })
    .catch(err => {
      this.setState({
        result : <Text2>아이디나 비번이 맞지 않습니다.</Text2>
      })
    })
      
    }
  render() {
    return (
      <>
        <Main>
          <Text>로그인</Text>
            <Inputform
              type="text"
              name="id"
              placeholder="ID"
              onChange={this.IDChange}
            />
            <Inputform
              type="password"
              name="password"
              placeholder="PASSWORD"
              onChange={this.PWChange}
              onKeyPress={this.handleKeyPress}
            />
            <Submitform type="submit" onClick={this.Login}>로그인</Submitform>
            {this.state.result}
        </Main>
      </>
    );
  }
}
const Main = styled.div
`text-align:center;`
const Text = styled.div
`
font-size : 30px;
color : #549A39;
`
const Text2 = styled.div
`
font-size : 20px;
color : red;
`
const Inputform = styled.input
`
display : block;
padding-left : 1em;
margin:auto;
width : 500px;
height : 60px;
margin-top: 1em;
color : #F48060;
border : 1px solid #CFCFCF;
&:focus {
  outline : 2px solid #AFDB9F;
}
`
const Submitform = styled.button
`
display : block;
margin:auto;
width:400px;
height : 60px;
border:1px solid gray;
border-radius : 10px;
background-color : #AFDB9F;
color : white;
font-size : 25px;
font-family : 'KyoboHand';
text-decoration : none;
margin-top : 1em;
text-align:center;

&:hover {
  background-color : #549A39;
}
`;
export default Login;
