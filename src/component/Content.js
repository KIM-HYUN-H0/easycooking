import React, { Component } from "react";
import { Link } from "react-router-dom";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import SearchIcon from "@material-ui/icons/Search";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
class Content extends Component {
  render() {
    return (
      <>
        <Paper className={this.props.classes.root}>
          <Tabs variant="fullWidth">
            <Tab
              component={Link}
              to="/board/0"
              icon={<MenuBookIcon />}
              label="Recipe"
            />
            <Tab
              component={Link}
              to="/search"
              icon={<SearchIcon />}
              label="Search"
            />
          </Tabs>
        </Paper>
      </>
    );
  }
}
const styles = (theme) => ({
  root: {
    marginTop:'500px',
    width:'100%',
    position:'fixed',
    bottom: 0,
  },
});

export default withStyles(styles)(Content);
