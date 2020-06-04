import React, { Component } from "react";
import axios from "axios";
import { observer, inject } from "mobx-react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import styled from "styled-components";
import moment from 'moment';

@inject("category")
@observer
class Recipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipelist: null,
      resultcheck: null,
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
        .get("http://localhost:3001/DBapi/recipelist", {
          params: {
            idx: this.props.category,
          },
        })
        .then((data) => {
          this.setState({
            resultcheck: this.props.category,
            recipelist: Object.values(data.data.data).map((data, i) => (
              <Recipespan key={i}>
                <Link to={"/board/detail/" + data.idx}>
                  <Recipethumbnail src="http://placehold.it/200X100"></Recipethumbnail>
                  <Recipelist>
                    <Recipeauthor>작성자 {data.author}  </Recipeauthor>
                    <Recipedate>{moment(data.board_date).format('YYYY-MM-DD hh:mm')}</Recipedate>
                    <Data>
                    <Recipeview>조회 {data.view} </Recipeview>
                    <Recipelike>좋아요 {data.like}</Recipelike>
                    <Recipehate>싫어요 {data.hate}</Recipehate>
                    </Data>
                    <Recipetitle>{data.title}</Recipetitle>
                    
                  </Recipelist>
                </Link>
              </Recipespan>
            )),
          });
        });
    }
  }
  render() {
    return (
      <>
        <Mainlist>
          <Contentwrite>
            {this.props.category}
            <Link to="/write">글쓰기</Link>
          </Contentwrite>
          {this.state.recipelist}
        </Mainlist>
      </>
    );
  }
}
const Mainlist = styled.span`
  display: inline-block;
  width: 70%;
  border : 1px solid gray;
`;
const Contentwrite = styled.div`
  display: block;
  text-align: right;
  margin-top: 0px;
  border : 1px solid gray;
`;
const Recipespan = styled.span`
  border: 1px solid gray;
  display: block;
`;
const Recipelist = styled.span`
  width:40em;
  display: inline-block;
  margin-left: 1em;
  margin-top : 1em;
  vertical-align: top;
`;
const Recipethumbnail = styled.img`
display : inline-block;
border : 1px solid gray;
width : 200px;
height : 150px;
`;
const Data = styled.div`
color : #CFCFCF;
text-align:right;
`;
const Recipeidx = styled.span``;

const Recipeview = styled.span`
color : #CFCFCF`;
const Recipelike = styled.span``;
const Recipehate = styled.span``;
const Recipetitle = styled.div`
margin-top : 1em;
font-size : 1.5em;
color : #549A39`;
const Recipeauthor = styled.span`
color : #549A39;
`
const Recipedate = styled.span`
float : right;
text-align:right;
color : #B8DEA8;
`;

export default Recipe;
