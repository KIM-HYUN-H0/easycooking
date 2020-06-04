import React, { Component } from "react";
import axios from "axios";

class Write extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: null,
      detail_title: '-',
      detail_need: '-',
      detail_author: '-',
      detail_content: '-'
    };
  }

  async componentDidMount() {
    this.categorylist();
    this.modifycall();
  }
  async categorylist() {
    const result = await axios.get("http://localhost:3001/DBapi/categorylist");
    if (this.state.list === null) {
      this.setState({
        list: Object.values(result.data.data).map((data, i) => (
          <option value={data.number} key={i}>
            {data.name}
          </option>
        )),
      });
    }
  }
  async modifycall() {
    const temp = this.props.match.params.idx;
    await axios.get("http://localhost:3001/DBapi/recipedetail", {
      params : {
          idx : temp
      }
    })
    .then((data) => {
      const result = data.data.data;
      this.setState({
        detail_author : result[0].author,
        detail_content : result[0].content,
        detail_need : result[0].need,
        detail_title : result[0].title
      })
    })
    /*
    const result = await axios.get("http://localhost:3001/DBapi/recipedetail", {
            params : {
                idx : temp
            }
        });       
    if (this.state.detail_title === '-') {
      this.setState({
        detail_title: result.data.data.title,
        detail_author: result.data.data.author,
        detail_need: result.data.data.need,
        detail_content: result.data.data.content,
      });
    }
    */
  }
  render() {
    return (
      <>
        <form method="post" action="http://localhost:3001/DBapi/recipewrite">
          <div>컨텐츠를 수정중입니다</div>
          <div>요리 이름</div>
          <div>
            <input type="text" name="title" value={this.state.detail_title}/>
          </div>
          <div>주제</div>
          <div>
            <select name="category">
              <option value="default">-</option>
              {this.state.list}
            </select>
          </div>
          <div>작성자</div>
          <div>
            <input type="text" name="author" value={this.state.detail_author}/>
          </div>
          <div>재료</div>
          <div>
            <input type="text" name="need" value={this.state.detail_need}/>
          </div>
          <div>조리 방법</div>
          <div>
            <input type="text" name="content" value={this.state.detail_content}/>
          </div>
          <div>
            <input type="submit" value="작성"/>
          </div>
        </form>
      </>
    );
  }
}
export default Write;
