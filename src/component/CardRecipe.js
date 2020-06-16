import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import CardActions from "@material-ui/core/CardActions";
import VisibilityIcon from "@material-ui/icons/Visibility";
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Box from '@material-ui/core/Box';
import styled from "styled-components";
import axios from "axios";

class CardRecipe extends Component {
  constructor(props) {
    super(props);
    this.like = this.like.bind(this);
    this.hate = this.hate.bind(this);
  }
  async like() {
    await axios.get('http://192.168.219.103:3001/DBapi/like', {
      params : {
        idx : this.props.idx
      }
    }, {withCredentials : true})
  }
  async hate() {
    await axios.get('http://192.168.219.103:3001/DBapi/hate', {
      params : {
        idx : this.props.idx
      }
    }, {withCredentials : true})
  }

  render() {
    const { classes } = this.props;
    return (
      <>
      <Box className={classes.box} m={0}>
        <Card className={classes.root}>
          <Link2 to={"/board/detail/" + this.props.idx} style={{textDecoration:'none'}}>
          <CardHeader title={this.props.title} subheader={this.props.date} />
          <CardMedia
            className={classes.media}
            image={this.props.thumbnail}
            title={this.props.title}
          ></CardMedia>
          <CardContent>
            <Typography>{this.props.author} 요리사</Typography>
          </CardContent>
          </Link2>
          <CardActions disableSpacing>
            <IconButton color="inherit" aria-label="view">
              <VisibilityIcon />
              <Typography>{this.props.view}</Typography>
            </IconButton>
            <IconButton onClick={this.like} color="secondary" aria-label="add to favorites">
              <ThumbUpAltIcon />
              <Typography>{this.props.like}</Typography>
            </IconButton>
            <IconButton onClick={this.hate} color="primary" aria-label="share">
              <ThumbDownIcon />
              <Typography>{this.props.hate}</Typography>
            </IconButton>
          </CardActions>
        </Card>
        </Box>
      </>
    );
  }
}
const styles = (theme) => ({
  box : {
    display : 'inline-block',
  },
  root: {
    width: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
});
const Link2 = styled(Link)`
  color : black;
`;

export default withStyles(styles)(CardRecipe);
