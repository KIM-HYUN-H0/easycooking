import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Searchresult from "./Searchresult";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submittext: null,
      needlist: null,
      needsearch: [],
      searchcheck: 1,
      needresult : null,
      titleresult : null,
      
    };
    this.searchSubmit = this.searchSubmit.bind(this);
    this.needchange = this.needchange.bind(this);
    this.searchChange = this.searchChange.bind(this);
  }
  componentDidMount() {
    this.needlist();
  }

  searchChange(event) {
    if (event.target.value === "text") {
      this.setState({
        searchcheck: 1,
      });
    } else {
      this.setState({
        searchcheck: 2,
      });
    }
  }

  async needchange(event) {
    if (event.target.checked) {
      this.setState({
        needsearch: this.state.needsearch.concat(event.target.value),
      });
    } else {
      const a = this.state.needsearch;
      const b = event.target.value;
      a.splice(a.indexOf(b), 1);
      this.setState({
        needsearch: a,
      });
    }
  }

  async searchSubmit(event) {
    const count = document.getElementsByName("search")[0].value;
    let result;
    if (count === "" && this.state.searchcheck === 0) {
      alert("검색어를 입력해주세요");
    } else if (
      this.state.needsearch.length === 0 &&
      this.state.searchcheck === 1
    ) {
      alert("재료를 선택해주세요");
    } else {
      if (this.state.searchcheck === 0) {
        result = await axios.get("http://localhost:3001/DBapi/titlesearch", {
          params: {
            name: count,
          },
        });
        if (result.data.data.length) {
          this.setState({
            titleresult: Object.values(result.data.data).map((data, i) => (
              <span id="recipespan" key={i}>
                <a href={"/board/detail/" + data.idx}>
                  <img src="http://placehold.it/80x100"></img>
                  <span id="recipelist">
                    <div id="recipeidx">
                      {data.idx}
                    </div>
                    <div id="recipetitle">{data.title}</div>
                    <div id="recipeauthor">{data.author}</div>
                    <div id="recipedate">{data.board_date}</div>
                    <div id="recipecontent">{data.content}</div>
                  </span>
                </a>
              </span>
            )),
          });
        } else {
          this.setState({
            titleresult: "검색 결과가 존재하지 않습니다",
          });
        }
      } else {
        result = await axios.get("http://localhost:3001/DBapi/needsearch", {
          params : {
            data: this.state.needsearch,
        }});
        console.log(result);

      }
    }
  }
  async needlist() {
    const result = await axios.get("http://localhost:3001/DBapi/needlist");
    if (this.state.needlist === null) {
      this.setState({
        needlist: Object.values(result.data.data).map((data, i) => {
          let sort = [];
          sort.push(<div key={i}>{data.class}</div>);
          Object.values(data.need).map((data2, i) => {
            sort.push(
              <>
                <label key={i}>
                  <input
                    id="needcheckbox"
                    type="checkbox"
                    name={data.class}
                    value={data2.name}
                    onChange={this.needchange}
                  ></input>
                  {data2.name}
                </label>
              </>
            );
          })
          return <>{sort}</>;
        }),
      });
    }
  }

  render() {
    console.log(this.state.searchcheck)
    return (
      <>
        <label>
          <input
            type="radio"
            name="check"
            value="text"
            onChange={this.searchChange}
          ></input>
          제목으로 검색
        </label>

        <label>
          <input
            type="radio"
            name="check"
            value="need"
            onChange={this.searchChange}
          ></input>
          재료로 검색
        </label>
        <div>
          <input type="text" name="search" placeholder="검색어 입력"></input>
        </div>

        <div>{this.state.needlist}</div>

        <div id="center">
          <input type="button" value="검색" onClick={this.searchSubmit}></input>
        </div>
        <Searchresult
          titleresult={this.state.titleresult}
          needresult={this.state.needresult}
          isChecked={this.state.searchcheck}

        />
      </>
    );
  }
}
export default Search;
