import React, { Component } from "react";
import axios from "axios";
import {  Link  } from 'react-router-dom';
import styled from "styled-components";

class ModifyCT extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryname : null,
      categorytext: null,
      categorynum : null,
      categorylist : null,
    };
    this.categoryChange = this.categoryChange.bind(this);
    this.categoryChange2 = this.categoryChange2.bind(this);
    this.categorySubmit = this.categorySubmit.bind(this);
    this.categorydelete = this.categorydelete.bind(this);
  }

  async componentDidUpdate() {
    const {idx} = this.props.match.params;
    if(this.state.categorynum !== idx){
      this.setState({ categorynum : idx})
    }
  }
  componentDidMount() {
    this.categorylist();
  }
  //category control
  async categoryChange(event) {
    await this.setState({ categorytext: event.target.value });
  }
  async categorySubmit(event) {
    await axios.post(
      "http://localhost:3001/category/categorysave",
      {
        name: this.state.categorytext,
      }
    ).then((data) => {
      console.log('submit')
      document.location.href = '/modifyCT';
    });
  }
  async categorydelete(event) {
    await axios.post(
      "http://localhost:3001/category/categorydelete",
      {
        name: this.state.categorytext,
      }
    )
    .then((data)=> {
      console.log('delete')
      document.location.href = '/modifyCT';
    });
  }

  async categoryChange2(event) {
    this.setState({
      categorytext : event.target.value
    })
  }
  handleKeyPress = (e) => {
    if (e.key === "Enter") {
      this.categorySubmit();
    }
  };
  async categorylist() {
    const result = await axios.get("http://localhost:3001/category/categorylist");
    if (this.state.categorylist === null) {
      this.setState({ 
        categorylist : Object.values(result.data.data)
        .map((data, i) => (
          <label id="categorySet" key={i}>
                  <input
                    type="radio"
                    name="category"
                    value={data.name}
                    onChange={this.categoryChange2}
                  ></input>
                  {data.name}
                </label>
        ))
      })
    }
  }
  //category control end
  render() {    
    return (
      <>
        <Listdiv>
          <Category>
          <Categorytitle>Category</Categorytitle>
            <Listul>
              {this.state.categorylist}
            </Listul>
          </Category>
          <Inputform
                type="text"
                value={this.state.categorytext}
                placeholder="등록할 카테고리 입력"
                onChange={this.categoryChange}
                onKeyPress={this.handleKeyPress}
              ></Inputform>
              <Submitform type="submit" onClick={this.categorySubmit}>
                등록
              </Submitform>
              <Submitform type="submit" onClick={this.categorydelete}>
                삭제
              </Submitform>
        </Listdiv>
      </>
    );
  }
}
const Category = styled.div
`
`;
const Listdiv = styled.div
`padding-top: 0;
text-align:center;
margin-top:0px;
color : #549A39;`
const Listul = styled.ul
`vertical-align: top;
text-align:left;
border : 1px solid #CFCFCF;
display : inline-block;
width:20%;`
const Listli = styled.li
`list-style: none;
margin-top:1rem;`
const Categorytitle = styled.p
`font-size : 30px;
`
const Inputform = styled.input
`
display : block;
margin:auto;
text-align:center;
font-size : 30px;
width : 300px;
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
margin:30px;
width:60px;
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

export default ModifyCT;
