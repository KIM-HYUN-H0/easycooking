import React, { Component } from "react";
import Searchtitle from "./Searchtitle";
import Searchneed from "./Searchneed";
import Tab from "@material-ui/core/Tab";
import TabPanel from "@material-ui/lab/TabPanel";
import TabList from '@material-ui/lab/TabList';
import Paper from "@material-ui/core/Paper";
import TabContext from '@material-ui/lab/TabContext';
import { withStyles } from '@material-ui/core/styles';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value : 1
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e,value) {
    this.setState({ value : value })
  }

  render() {
    const { classes } = this.props;
    return (
      <> 
      <TabContext value={this.state.value}>
        <Paper className={classes.paper}>
        <TabList onChange={this.handleChange} aria-label="simple tabs example">
          <Tab label="제목으로 검색" value="1" />
          <Tab label="재료로 검색" value="2" />
        </TabList>
        </Paper>
        <TabPanel value="1">
        <Searchtitle />
      </TabPanel>
      <TabPanel value="2">
        <Searchneed />
      </TabPanel>
      </TabContext>
      </>
    );
  }
}
const styles = theme => ({

  paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
  },
});

export default withStyles(styles)(Search);
