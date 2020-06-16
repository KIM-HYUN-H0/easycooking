import React, { Component } from "react";
import axios from "axios";
import { observer, inject } from "mobx-react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import styled from "styled-components";
import moment from "moment";
import CardRecipe from './CardRecipe';

@inject("category")
@observer
class Recipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipelist: null,
      resultcheck: null
    };
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
        .get("http://192.168.219.103:3001/DBapi/recipelist", {
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
  render() {
    return (
      <>
      <Contentwrite>
            <Link to="/write">글쓰기</Link>
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
