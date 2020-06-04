import React, { Component } from "react";
import axios from "axios";
import "codemirror/lib/codemirror.css";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import { observer, inject } from "mobx-react";
import styled from "styled-components";

@inject("category")
@observer
class Write extends Component {
  editorRef = React.createRef();

  constructor() {
    super();
    this.state = {
      list: null,
      needlist: null,
      saucelist : null,
      title: null,
      category: null,
      need: [],
      content: null,
    };
    this.needchange = this.needchange.bind(this);
    this.categoryChange = this.categoryChange.bind(this);
    this.titleChange = this.titleChange.bind(this);
    this.handlesubmit = this.handlesubmit.bind(this);
  }

  async componentDidMount() {
    this.needlist();
    this.categorylist();
    this.saucelist();
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
  async saucelist() {
    await axios.get('http://localhost:3001/DBapi/saucelist')
    .then((data) => {
      this.setState({
        saucelist: Object.values(data.data.data).map((data2, i) => (
            <>
                <label key={i}>
                  <input
                    id="needcheckbox"
                    type="checkbox"
                    value={data2.name}
                    onChange={this.saucechange}
                  ></input>
                  {data2.name}
                </label>
              </>
          )

        )
      })
    })
  }
  async needchange(event) {
    if (event.target.checked) {
      this.setState({
        need: this.state.need.concat(event.target.value),
      });
    } else {
      const a = this.state.need;
      const b = event.target.value;
      a.splice(a.indexOf(b), 1);
      this.setState({
        need: a,
      });
    }
  }
  async needlist() {
    const result = await axios.get("http://localhost:3001/DBapi/needlist");
    if (this.state.needlist === null) {
      let count = "";
      this.setState({
        needlist: Object.values(result.data.data).map((data, i) => {
          let sort = [];
          if (data.class !== count) {
            count = data.class;
            sort.push(
              <>
                <div>{data.class}</div>
                <label>
                  <input
                    id="needcheckbox"
                    type="checkbox"
                    name={data.class}
                    value={data.name}
                    onChange={this.needchange}
                  ></input>
                  {data.name}
                </label>
              </>
            );
          } else {
            sort.push(
              <>
                <label>
                  <input
                    id="needcheckbox"
                    type="checkbox"
                    name={data.class}
                    value={data.name}
                    onChange={this.needchange}
                  ></input>
                  {data.name}
                </label>
              </>
            );
          }
          return <>{sort}</>;
        }),
      });
    }
  }
  titleChange(event) {
    this.setState({
      title: event.target.value,
    });
  }
  categoryChange(event) {
    this.setState({
      category: event.target.value,
    });
  }
  async handlesubmit() {
    axios.post(
      "http://localhost:3001/DBapi/recipewrite",
      {
        title: this.state.title,
        category: this.state.category,
        need: this.state.need,
        sauce: "",
        source: "",
        content: this.editorRef.current.getInstance().getHtml(),
      },
      { withCredentials: true }
    );
  }
  uploadImage(blob) {
    let formData = new FormData();
    // file in a 'multipart/form-data' request
    formData.append('image', blob);

    return axios('http://localhost:3001/DBapi/imageupload', {
        method: 'POST',
        body: formData
    }).then(response => {
        if (response.ok) {
            return response.json();
        }

        throw new Error('Server or network error');
    });
};

onAddImageBlob(blob, callback) {
    this.uploadImage(blob)
        .then(response => {
            if (!response.success) {
                throw new Error('Validation error');
            }

            callback(response.data.url, 'alt text');
        }).catch(error => {
            console.log(error);
        });
};

  render() {
    return (
      <>
        <Main>
          <Sub>
            <Detailrecipe>
              <thead>
                <tr>
                  <th colSpan="7">
                    <img src="http://placehold.it/400X200"></img>
                  </th>
                </tr>
                <tr>
                  <th colSpan="7">
                    <input type="file" name="thumbnail" />
                  </th>
                </tr>
                <tr>
                  <Title colSpan={7}>
                    <input
                      type="text"
                      name="title"
                      placeholder="제목"
                      onChange={this.titleChange}
                    />
                  </Title>
                </tr>
              </thead>
              <thead>
                <tr>
                  <Th>카테고리</Th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <Td>
                    <select name="category" onChange={this.categoryChange}>
                      <option value="default">-</option>
                      {this.state.list}
                    </select>
                  </Td>
                </tr>
              </tbody>
              <thead>
                <tr>
                  <Th>재료 선택</Th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <Td>{this.state.needlist}</Td>
                </tr>
              </tbody>

              <thead>
                <tr>
                  <Th>양념 선택</Th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <Td>{this.state.saucelist}</Td>
                </tr>
              </tbody>
            </Detailrecipe>

            <Editor
              previewStyle="vertical"
              height="300px"
              initialEditType="wysiwyg"
              placeholder="글쓰기"
              ref={this.editorRef}
              hooks={{

                addImageBlobHook: (blob, callback) => {
                  const upload = this.onAddImageBlob();
                  callback(upload, "alt text");
                  return false;
                }
            }}
            />
            <div>
              <a href="/" onClick={this.handlesubmit}>
                작성
              </a>
            </div>
          </Sub>
        </Main>
      </>
    );
  }
}
const Content = styled.div`
  margin-top: 2em;
  background-color: white;
  border: 1px solid gray;
`;
const Sub = styled.div`
  display: inline-block;
  width: 70%;
`;
const Main = styled.div`
  text-align: center;
`;
const Detailrecipe = styled.table`
  width: 100%;
  color: #549a39;
  background-color: white;
  border: 1px solid gray;
`;
const Td = styled.td``;
const Th = styled.th`
  color: #b8dea8;
`;
const Title = styled.th`
  font-size: 30px;
`;

export default Write;
