import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

class Content extends Component {
  render() {
    return (
      <>
        <Mainnav>
          <Navul>
            <Navli>
              <Text to="/board/0" style={{ textDecoration: 'none' }}>레시피</Text>
            </Navli>
            <Navli>
              <Text to="/search" style={{ textDecoration: 'none' }}>검색</Text>
            </Navli>
            <Navli>
              <Text to="/modifyCT" style={{ textDecoration: 'none' }}>카테고리 편집</Text>
            </Navli>
            <Navli>
              <Text to="/modifyneed" style={{ textDecoration: 'none' }}>재료 편집</Text>
            </Navli>
            <Navli>
              <Text to="/modifysauce" style={{ textDecoration: 'none' }}>양념 편집</Text>
            </Navli>
          </Navul>
        </Mainnav>
      </>
    );
  }
}
const Mainnav = styled.nav`
  margin-top: 1em;
  width: 100%;
  background-color : #AFDB9F;
`;
const Navul = styled.ul`
  text-align: center;
`;
const Navli = styled.li`
  padding: 1em;
  display: inline-block;
  font-size: 20px;
`;
const Text = styled(Link)
`color : white;
&:hover {
    color : #F48060
};`;
export default Content;
