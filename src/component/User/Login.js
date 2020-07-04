import React, { Component } from "react";
import axios from 'axios';
import styled from 'styled-components';
import TextField from "@material-ui/core/TextField";
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

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
    await axios.post('http://localhost:3001/users/login', 
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
        result : <Typography>아이디나 비번이 맞지 않습니다.</Typography>
      })
    })
      
    }
  render() {
    return (
      <>
        <Container maxWidth="xs">
          <Typography component="h1" variant="h5">로그인하기</Typography>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="ID"
            name="username"
            autoComplete="email"
            autoFocus
            onChange={(e) => this.IDChange(e)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => this.PWChange(e)}
            onKeyPress={(e) => this.handleKeyPress(e)}
          />
            <Button
            className={this.props.classes.button}
            type="submit"
            fullWidth
            variant="contained"
            onClick={() => this.Login()}
          >
            로그인
          </Button>
            {this.state.result}
            <Grid container>
            <Grid item xs>
              <Link to="/wait" variant="body2" style={{color : 'black', textDecoration:'none'}}>
                비밀번호 찾기
              </Link>
            </Grid>
            <Grid item>
              <Link to="/register" variant="body2"style={{color : 'black', textDecoration:'none'}}>
                회원가입
              </Link>
            </Grid>
          </Grid>
        </Container>
      </>
    );
  }
}
const styles = theme => ({

  button : {
    backgroundColor : '#AFDB9F',
    color : 'white'
  }
});
export default withStyles(styles)(Login);
