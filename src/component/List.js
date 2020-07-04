import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { Link } from "react-router-dom";
import Recipe from "./Recipe";
import styled from "styled-components";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

@inject("category")
@observer
class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.handleclose = this.handleclose.bind(this);
    this.handleopen = this.handleopen.bind(this);
  }

  handleopen() {
    this.setState({
      open: true,
    });
  }
  handleclose() {
    this.setState({
      open: false,
    });
  }
  render() {
    const { category } = this.props;
    category.getCategoryList();
    return (
      <>
        <Button style={{ color: "#b8dea8" }} onClick={this.handleopen}>
          Category
        </Button>
        <Modal
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          open={this.state.open}
          onClose={this.handleclose}
          aria-labelledby="CategoryModal"
          aria-describedby="Category"
        >
          <>
            <div className={this.props.classes.modal}>
              <Category>카테고리 선택</Category>
              <CTtitle to="/board/0" style={{ textDecoration: "none" }}>
                전체보기
              </CTtitle>
              {category.categorylist}
            </div>
          </>
        </Modal>

        <Recipe category={this.props.match.params.idx} />
      </>
    );
  }
}

const styles = (theme) => ({
  modal: {
    position: "absolute",
    width: 300,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
});

const Category = styled.span`
  color: #b8dea8;
  display: block;
`;
const Listul = styled.ul`
  display: inline-block;
  text-align: center;
`;
const Listli = styled.li`
  display: inline-block;
  list-style: none;
  font-size: 20px;
  margin-left: 1rem;
`;
const CTtitle = styled(Link)`
  color: black;
`;
export default withStyles(styles)(List);
