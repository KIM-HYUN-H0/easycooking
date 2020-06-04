import React, { Component } from "react";
import axios from "axios";
import Recipe from "./Recipe";
import styled from "styled-components";

class ModifyNeed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      needclass: null,
      needtext: null,
      needlist: null,
      classtext : null,
      classlist : null
    };
    this.needChange = this.needChange.bind(this);
    this.needSubmit = this.needSubmit.bind(this);
    this.needDelete = this.needDelete.bind(this);
    this.classChange2 = this.classChange2.bind(this);
    this.classSubmit = this.classSubmit.bind(this);
    this.classDelete = this.classDelete.bind(this);
    this.classChange = this.classChange.bind(this);
  }
  async componentDidMount() {
    const result = await axios.get("http://localhost:3001/DBapi/needlist");
    console.log(result);
    if (this.state.needlist === null) {
      this.setState({
        classlist : Object.values(result.data.data).map((data, i) => (
          <label key={i}>
            <input type="radio" name="class" onChange={this.classChange} value={data.class}></input>
            {data.class}
          </label>          
        )),
        needlist: Object.values(result.data.data).map((data, i) => {
          let sort = [];
          sort.push(
            <>
            <Needclass key={i}>{data.class}</Needclass>
            </>
          )
          Object.values(data.need).map((data2, i) => {
            sort.push(
              <>
              <Need key={i}>{data2.name} </Need>
              </>
            )
          })
          
          return <>{sort}</>;
        }),
      });
    }
  }

  //category control
  async classChange(event) {
    await this.setState({ needclass: event.target.value });
  }
  async classChange2(event) {
    await this.setState({ classtext: event.target.value });
  }
  async needChange(event) {
    await this.setState({ needtext: event.target.value });
  }
  async needSubmit(event) {
    if (this.state.needtext === null) {
      alert("재료명을 입력해주세요.");
    } else if (this.state.needclass === null) {
      alert("재료의 종류를 선택해주세요.");
    } else {
      await axios.post("http://localhost:3001/DBapi/needsave", {
        name: this.state.needtext,
        class: this.state.needclass,
      })
      .then((data) => {
        document.location.href="/modifyneed";
      })
    }
  }
  async needDelete(event) {
    await axios.post("http://localhost:3001/DBapi/needdelete", {
      name: this.state.needtext,
      class: this.state.needclass,
    });
  }
  async classSubmit(event) {
    if (this.state.classtext === null) {
      alert("재료명을 입력해주세요.");
    }  else {
      await axios.post("http://localhost:3001/DBapi/classsave", {
        class: this.state.classtext,
      });
    }
  }
  async classDelete(event) {
    await axios.post("http://localhost:3001/DBapi/classdelete", {
      class: this.state.classtext,
    });
  }
  handleKeyPress = (e) => {
    if (e.key === "Enter") {
      this.needSubmit();
    }
  };

  //category control end
  render() {
    return (
      <>
        <div id="need_modify">
            <ul>
              <div>
                <div>
              <label>
                종류명
              <input type="text" onChange={this.classChange2}></input>
              </label>
              <br />
              <a href="/modifyneed" onClick={this.classSubmit}>
                등록
              </a>
              <a href="/modifyneed" onClick={this.classDelete}>
                삭제
              </a>
              </div>

              {this.state.classlist}

            </div>
            <div>
                <label>
                재료 이름
              <input type="text" onChange={this.needChange} onKeyPress={this.handleKeyPress}></input>
              
              </label>
              </div><div>
              <button type="submit" onClick={this.needSubmit}>
                등록
              </button>
              <button type="submit" onClick={this.needDelete}>
                삭제
              </button>
              </div>
            </ul>
        </div>
        <hr />
        <div id="need_list">재료 리스트</div>
        <Needlist>
        {this.state.needlist}
        </Needlist>
      </>
    );
  }
}
const Needclass = styled.div`
color : #549A39;
font-size : 30px;`
const Need = styled.span
`color : #B8DEA8;
font-size : 25px;`
const Needlist = styled.div
`text-align:center;
margin-top : 1em;`
export default ModifyNeed;
