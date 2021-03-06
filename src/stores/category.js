import { observable, action } from "mobx";
import axios from "axios";
import { observer, inject } from "mobx-react";
import React, { Component } from "react";
import {  Link  } from 'react-router-dom';
import styled from "styled-components";

export default class category {
  @observable categorylist = null;

  @observable categorylist2 = null;
  

  @action async getCategoryList() {
    
    const result = await axios.get("http://localhost:3001/category/categorylist");
    if (this.categorylist === null) {
      this.categorylist = Object.values(result.data.data)
        .map((data, i) => (
          <Listli key={i}>
            <CTtitle to={"/board/" + data.number}>{data.name}</CTtitle>
          </Listli>
        ));
        this.categorylist2 = Object.values(result.data.data)
        .map((data, i) => {
            return data;
        })    
    }
  }

}
const Listli = styled.li
`
display : inline-block;
list-style: none;
font-size : 20px;
margin-left:1rem;

`
const CTtitle = styled(Link)
`color : black;
text-decoration : none`