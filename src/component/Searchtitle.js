import React, { Component } from "react";
import moment from "moment";
import axios from "axios";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import CardRecipe from "./CardRecipe";

class Searchtitle extends Component {
  constructor() {
    super();
    this.state = {
      submittext: null,
      titleresult: null,
    };
    this.searchSubmit = this.searchSubmit.bind(this);
  }

  async searchSubmit(event) {
    const count = document.getElementsByName("search")[0].value;
    if (count === "") {
      alert("검색어를 입력해주세요");
    } else {
      await axios
        .get("http://localhost:3001/search/titlesearch", {
          params: {
            name: count,
          },
        })
        .then((data) => {
          this.setState({
            titleresult: Object.values(data.data.data).map((data, i) => (
              <span key={i}>
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
  render() {
    const { classes } = this.props;
    return (
      <>
        <Grid className={classes.grid}>
          <TextField id="standard-basic" label="요리명" name="search" />
          <Button 
          style={{marginTop : '20px' , marginBottom : '20px'}}
          variant="contained" onClick={this.searchSubmit}>
            검색
          </Button>
        </Grid>
        {this.state.titleresult}
      </>
    );
  }
}
const styles = (theme) => ({
  grid: {
    display : 'flex',
    flexDirection : 'column',
    alignItems : 'center',
  },
});

export default withStyles(styles)(Searchtitle);
