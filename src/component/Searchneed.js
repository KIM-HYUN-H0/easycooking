import React, { Component } from "react";
import axios from "axios";
import moment from "moment";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CardRecipe from "./CardRecipe";
import Need from "./Repeat/Need";
import Grid from "@material-ui/core/Grid";

class Searchneed extends Component {
  constructor() {
    super();
    this.state = {
      needsearch: [],
      needresult: null,
    };
    this.LoadNeedState = this.LoadNeedState.bind(this);
    this.searchSubmit = this.searchSubmit.bind(this);
  }
  componentDidMount() {}

  async searchSubmit() {
    if (this.state.needsearch.length === 0) {
      alert("재료를 선택해주세요");
    } else {
      await axios
        .get("http://localhost:3001/search/needsearch", {
          params: {
            data: this.state.needsearch,
          },
        })
        .then((data) => {
          this.setState({
            needresult: Object.values(data.data.data).map((data) => (
              <span>
                <CardRecipe
                  idx={data.idx}
                  thumbnail={data.thumbnail}
                  author={data.author}
                  date={moment(data.board_date).format("YYYY-MM-DD hh:mm")}
                  view={data.view}
                  like={data.like}
                  hate={data.hate}
                  title={data.title}
                />
              </span>
            )),
          });
        });
    }
  }
  LoadNeedState(text) {
    if (this.state.needsearch.length !== text.length) {
      this.setState({
        needsearch: text.map((data) => (data = data.title)),
      });
    }
  }

  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <div>
          <Need func={this.LoadNeedState} />
        </div>
        <div style={{marginBottom : '30px'}}>
          <Button variant="contained" onClick={this.searchSubmit}>
            검색
          </Button>
        </div>
        {this.state.needresult}
      </div>
    );
  }
}
const styles = (theme) => ({
  grid: {
    flexDirection: "column",
    alignItems: "center",
  },
});
export default withStyles(styles)(Searchneed);
