import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";

class Modifysauce extends Component {
  constructor(props) {
    super(props);
    this.state = {
      needtext: null,
      needlist: null,
    };
    this.needChange = this.needChange.bind(this);
    this.needSubmit = this.needSubmit.bind(this);
    this.needDelete = this.needDelete.bind(this);
  }
  async componentDidMount() {
    const result = await axios.get("http://192.168.219.103:3001/DBapi/saucelist");
    if (this.state.needlist === null) {
      this.setState({
        needlist: Object.values(result.data.data).map((data, i) => {
          let sort = [];
          sort.push(
            <>
            <Need key={i}>{data.name} </Need>
            </>
          )
          return <>{sort}</>;
        }),
      });
    }
  }

  //category control
  async needChange(event) {
    await this.setState({ needtext: event.target.value });
  }
  async needSubmit(event) {
    if (this.state.needtext === null) {
      alert("소스 이름을 입력해주세요.");
     } else {
      await axios.post("http://192.168.219.103:3001/DBapi/saucesave", {
        sauce: this.state.needtext,
      })
      .then((data) => {
        document.location.href="/modifysauce";
      })
    }
  }
  async needDelete(event) {
    await axios.post("http://192.168.219.103:3001/DBapi/saucedelete", {
      sauce: this.state.needtext,
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
                <label>
                양념 이름 
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
        <div id="need_list">양념 리스트</div>
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
export default Modifysauce;
