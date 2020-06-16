import React, { Component } from "react";
import axios from "axios";
import moment from "moment";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "@material-ui/core/Button";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import CardRecipe from './CardRecipe';

class Searchneed extends Component {
  constructor() {
    super();
    this.state = {
      needlist: null,
      needsearch: [],
      needresult: null,
    };
    this.searchSubmit = this.searchSubmit.bind(this);
    this.needchange = this.needchange.bind(this);
  }
  componentDidMount() {
    this.needlist();
  }
  async needlist() {
    const { classes } = this.props;
    const result = await axios.get("http://192.168.219.103:3001/DBapi/needlist");
    if (this.state.needlist === null) {
      this.setState({
        needlist: Object.values(result.data.data).map((data, i) => {
          let sort = [];
          sort.push(
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              key={i}
            >
              <Typography>{data.class}</Typography>
            </ExpansionPanelSummary>
          );
          Object.values(data.need).map((data2, i) => {
            sort.push(
              <>
                <ExpansionPanelDetails className={classes.details} key={i}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={(e) => this.needchange(e)}
                        name={data.class}
                        color="primary"
                        value={data2.name}
                      />
                    }
                    label={data2.name}
                  />
                </ExpansionPanelDetails>
              </>
            );
          });
          return <ExpansionPanel>{sort}</ExpansionPanel>;
        }),
      });
    }
  }
  needchange(event) {
    console.log("gg");
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
  async searchSubmit() {
    if (this.state.needsearch.length === 0) {
      alert("재료를 선택해주세요");
    } else {
      await axios
        .get("http://192.168.219.103:3001/DBapi/needsearch", {
          params: {
            data: this.state.needsearch,
          },
        })
        .then((data) => {
          this.setState({
            needresult: Object.values(data.data.data).map((data, i) => (
              <span key={i}>
                  <CardRecipe 
                  idx={data.idx}
                  thumbnail={data.thumbnail}
                  author={data.author}
                  date={moment(data.board_date).format("YYYY-MM-DD hh:mm")}
                  view={data.view}
                  like={data.like}
                  hate={data.hate}
                  title={data.title}/>
              </span>
            )),
          });
        });
    }
  }

  render() {
    return (
      <>
        
        <div>{this.state.needlist}</div>
        <Button variant="contained" onClick={this.searchSubmit}>
          검색
        </Button>
        {this.state.needresult}
      </>
    );
  }
}
const styles = theme => ({
  details: {
    display : 'flex',
    flexDirection: "row"
  }
});
export default withStyles(styles)(Searchneed);
