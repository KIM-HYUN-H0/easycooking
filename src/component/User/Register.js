import React, { Component } from "react";
import axios from "axios";
import styled from 'styled-components';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      pw: "",
      pw2 : '',
      nickname: "",
      result : ''
    };
    this.PWChange = this.PWChange.bind(this);
    this.PW2Change = this.PW2Change.bind(this);
    this.IDChange = this.IDChange.bind(this);
    this.NICKChange = this.NICKChange.bind(this);
    this.Register = this.Register.bind(this);
  }
  handleKeyPress = (e) => {
    if (e.key === "Enter") {
      this.Register();
    }
  };

  PWChange = (event) => {
    this.setState({
      pw: event.target.value,
    });
  };
  PW2Change = (event) => {
    this.setState({
      pw2: event.target.value,
    });
  };
  IDChange = (event) => {
    this.setState({
      id: event.target.value,
    });
  };
  NICKChange = (event) => {
    this.setState({
      nickname: event.target.value,
    });
  };

  async Register() {
    await axios
      .post("http://192.168.219.103:3001/DBapi/signup", {
        username: this.state.id,
        password: this.state.pw,
        password2 : this.state.pw2,
        nickname: this.state.nickname,
      })
      .then(data => {
        if(data.data !== 200) {
            this.setState({ 
              result : <Text>{data.data}</Text>
            })
        }
        else {
          document.location.href = '/';
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  }
  render() {
    return (
      <>
        <Main>
          <Text>회원가입</Text>
            <Inputform
              type="text"
              name="id"
              placeholder="ID"
              onChange={this.IDChange}
            />
            <Inputform
              type="password"
              name="password"
              placeholder="Password"
              onChange={this.PWChange}
            />
            <Inputform
              type="password"
              name="password2"
              placeholder="Password Confirm"
              onChange={this.PW2Change}
            />
            <Inputform
              type="text"
              name="nickname"
              placeholder="Nickname"
              onChange={this.NICKChange}
              onKeyPress={this.handleKeyPress}
            />
            <Submitform value="Signup" onClick={this.Register}>Signup</Submitform>
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

export default Register;
