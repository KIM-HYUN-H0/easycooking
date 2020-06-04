import React, { Component } from "react";
import axios from "axios";
import "codemirror/lib/codemirror.css";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Viewer } from "@toast-ui/react-editor";
import styled from "styled-components";
import moment from "moment";

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detail: null,
    };
    this.recipedelete = this.recipedelete.bind(this);
  }
  async componentDidMount() {
    const result = await axios.get("http://localhost:3001/DBapi/recipedetail", {
      params: {
        idx: this.props.match.params.recipeidx,
      },
      withCredentials: true,
    });
    if (this.state.detail === null && result) {
      const data = result.data.data[0];
      this.setState({
        detail: (
          <>
            <Detailrecipe>
              <thead>
              <tr>
                  <th colSpan="7"><img src="http://placehold.it/400X200"></img></th>
                </tr>
                <tr>
                  <Title colSpan={7}>{data.title}</Title>
                </tr>
              </thead>
              <thead>
                <tr>
                  <Th>작성자</Th>
                  <Th>작성일</Th>
                  <Th>카테고리</Th>
                  <Th>글번호</Th>
                  <Th>조회수</Th>
                  <Th>좋아요</Th>
                  <Th>싫어요</Th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <Td>{data.author}</Td>
                  <Td>{moment(data.board_date).format("YYYY-MM-DD hh:mm")}</Td>
                  <Td>{data.category}</Td>
                  <Td>{data.idx}</Td>
                  <Td>{data.view}</Td>
                  <Td>{data.like}</Td>
                  <Td>{data.hate}</Td>
                </tr>
              </tbody>
              <thead>
                <tr>
                  <Th colSpan={7}>재료</Th>
                </tr>
              </thead>
              <thead>
                <tr>
                  <Td colSpan={7}>{data.need.join(", ")}</Td>
                </tr>
              </thead>
              <thead>
                <tr>
                  <Th colSpan={7}>양념</Th>
                </tr>
              </thead>
              <thead>
                <tr>
                  <Td colSpan={7}>{data.sauce.join(", ")}</Td>
                </tr>
              </thead>
            </Detailrecipe>
            <Content>
              <Viewer initialValue={data.content} />
            </Content>
          </>
        ),
      });
    }
  }
  //<div dangerouslySetInnerHTML={{__html: data.content }}></div>
  async recipedelete() {
    const result = await axios.get("http://localhost:3001/DBapi/recipedelete", {
      params: {
        idx: this.props.match.params.recipeidx,
      },
    });
    console.log(result);
    if (result) {
      console.log("삭제되었습니다.");
    } else {
      console.log("서버와의 연결을 실패했습니다.");
    }
  }

  render() {
    return (
      <>
        <Main>
          <Sub>
            <span>
              <a href={"/modify/" + this.props.match.params.recipeidx}>수정</a>
            </span>
            <span>
              <a href="/" onClick={this.recipedelete}>
                삭제
              </a>
            </span>
            {this.state.detail}
          </Sub>
        </Main>
      </>
    );
  }
}
const Content = styled.div`
margin-top : 2em;
background-color : white;
border : 1px solid gray;
`;
const Sub = styled.div`
    display : inline-block;
  width : 70%;
`;
const Main = styled.div`
  text-align: center;
`;
const Detailrecipe = styled.table`
  width: 100%;
  color : #549A39;
  background-color : white;
  border : 1px solid gray;
`;
const Td = styled.td`

`;
const Th = styled.th`
    color : #B8DEA8;
`;
const Title = styled.th`
  font-size: 30px;
`;
export default Detail;
