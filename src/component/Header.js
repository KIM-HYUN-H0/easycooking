import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Container } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/Home";
import Avatar from "@material-ui/core/Avatar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

class Header extends Component {
  constructor() {
    super();
    this.state = {
      Logincheck: <TopLink to="/login">LOGIN</TopLink>,
      anchorEl: null,
    };
    this.handleclick = this.handleclick.bind(this);
    this.handleclose = this.handleclose.bind(this);
  }
  handleclick(e) {
    this.setState({
      anchorEl: e.currentTarget,
    });
  }
  handleclose() {
    this.setState({
      anchorEl : null,
    })
  }
  async componentDidMount() {
    await axios
      .get("http://localhost:3001/users/logincheck", {
        withCredentials: true,
      })
      .then((data) => {
        if (data.data !== false) {
          this.setState({
            Logincheck: (
              <>
                <Avatar
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={this.handleclick}
                >
                  H
                </Avatar>
              </>
            ),
          });
        }
      });
  }

  async logout() {
    await axios
      .get("http://localhost:3001/users/logout", {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    return (
      <>
        <div className={this.props.classes.flex}>
          <AppBar position="static" className={this.props.classes.appbar}>
            <Toolbar>
              <IconButton
                component="a"
                href="/"
                edge="start"
                className={this.props.classes.homebutton}
                color="inherit"
                aria-label="menu"
              >
                <HomeIcon />
              </IconButton>

              <Typography variant="h6" className={this.props.classes.flex}>
                내 냉장고를 부탁해
              </Typography>
              <Button color="inherit">{this.state.Logincheck}</Button>
              <Menu
                  id="simple-menu"
                  anchorEl={this.state.anchorEl} 
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(this.state.anchorEl)}
                  onClose={this.handleclose}
                >
                  <MenuItem component={Link} to="/myrefri" onClick={this.handleclose}>내 냉장고</MenuItem>
                  <MenuItem component={Link} to="/info" onClick={this.handleclose}>내 정보</MenuItem>
                  <MenuItem onClick={this.handleclose}>로그아웃</MenuItem>
                </Menu>
            </Toolbar>
          </AppBar>
        </div>
      </>
    );
  }
}
const styles = (theme) => ({
  homebutton: {
    marginRight: theme.spacing(2),
  },
  flex: {
    flexGrow: 1,
  },
  appbar: {
    backgroundColor: "#AFDB9F",
    color: "white",
  },
});
const Topa = styled.a`
  color: white;
  text-decoration: none;
`;
const TopLink = styled(Link)`
  color: white;
  text-decoration: none;
`;
export default withStyles(styles)(Header);
