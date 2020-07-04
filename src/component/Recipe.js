import React, { Component } from "react";
import axios from "axios";
import { observer, inject } from "mobx-react";
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import styled from "styled-components";
import moment from "moment";
import CardRecipe from './CardRecipe';
import Button from "@material-ui/core/Button";

@inject("category")
@observer
class Recipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipelist: null,
      resultcheck: null,
      redirect : false
    };
    this.checkLogin = this.checkLogin.bind(this);
  }
  async componentDidUpdate() {
    this.CTload();
  }
  async componentDidMount() {
    this.CTload();
  }

  async CTload() {
    if (this.props.category !== this.state.resultcheck) {
      await axios
        .get("http://localhost:3001/board/recipelist", {
          params: {
            idx: this.props.category
          }
        })
        .then(data => {
          this.setState({
            resultcheck: this.props.category,
            recipelist: Object.values(data.data.data).map((data, i) => (
              <span key={i}>
                  <CardRecipe 
                  idx={data.idx}
                  thumbnail={data.thumbnail}
                  author={data.author}
                  date={moment(data.board_date).format("YYYY-MM-DD hh:mm")}
                  view={data.view}
                  like={data.like}
                  hate={data.hate}
                  title={data.title}/>
              </span>
            ))
          });
        });
    }
  }
  async checkLogin() {
    await axios.get('http://localhost:3001/users/logincheck', {
      withCredentials : true
    })
    .then(async (data) => {
      await this.setState({ redirect : true});
    })
    .catch((err) => {
      alert('로그인 후 글쓰기가 가능합니다.')
    })
  }
  render() {
    if(this.state.redirect) {
      return <Redirect push to="/write" />;
    }
    return (
      <>
      <Contentwrite>
            <Button variant="outlined" onClick={this.checkLogin}>글쓰기</Button>
      </Contentwrite>
        <Mainlist>
          {this.state.recipelist}
        </Mainlist>
      </>
    );
  }
}
const Mainlist = styled.div`
  text-align:center;
`;
const Contentwrite = styled.div`
  text-align: right;
`;

export default Recipe;
