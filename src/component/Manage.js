import React, { Component } from "react";
import { Container } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import { Link } from "react-router-dom";

class Manage extends Component {
  render() {
    return (
      <>
        <Container><Typography className={this.props.classes.main} variant="h4">내 냉장고를 부탁해</Typography></Container>
        <Mainnav>
        <Navul>
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
const styles = theme => ({
  main: {
    textAlign:'center',
    textDecoration : 'none',
    color : '#AFDB9F',
    '&:hover' : {
      color : '#F48060'
    }
  }
});
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
export default withStyles(styles)(Manage);
