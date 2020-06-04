import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import {  Link  } from 'react-router-dom';
import Recipe from "./Recipe";
import styled from "styled-components";

@inject('category')
@observer

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {    
    
    const {category} = this.props;
    category.getCategoryList();
    return (
      <>
          <Category>
            <Listul>
              <Categorytitle>Category</Categorytitle>
                <Listli>
                  <CTtitle to="/board/0" style={{ textDecoration: 'none' }}>전체보기</CTtitle>
                </Listli>
              {category.categorylist}
            </Listul>
          </Category>
          <Recipe category={this.props.match.params.idx} />
      </>
    );
  }
}

const Category = styled.span
``;
const Listul = styled.ul
`width:15%;
display : inline-block;`;
const Categorytitle = styled.span
`text-align:center;
color : #B8DEA8`
const Listli = styled.li
`list-style: none;
font-size : 20px;
margin-top:1rem;
`
const CTtitle = styled(Link)
`color : black;`
export default List;
