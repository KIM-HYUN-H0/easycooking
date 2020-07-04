import React, { Component } from "react";
import axios from "axios";
import "codemirror/lib/codemirror.css";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Viewer } from "@toast-ui/react-editor";
import styled from "styled-components";
import moment from "moment";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import CardMedia from "@material-ui/core/CardMedia";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import CardActions from "@material-ui/core/CardActions";
import VisibilityIcon from "@material-ui/icons/Visibility";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import CardHeader from "@material-ui/core/CardHeader";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import clsx from "clsx";

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detail: null,
    };
    this.recipedelete = this.recipedelete.bind(this);
    this.like = this.like.bind(this);
    this.hate = this.hate.bind(this);
  }
  async componentDidMount() {
    this.recipeview();
    this.recipedetail();
  }
  async like() {
    await axios.get(
      "http://localhost:3001/board/like",
      {
        params: {
          idx: this.props.match.params.recipeidx,
        },
      },
      { withCredentials: true }
    );
  }
  async hate() {
    await axios.get(
      "http://localhost:3001/board/hate",
      {
        params: {
          idx: this.props.match.params.recipeidx,
        },
      },
      { withCredentials: true }
    );
  }
  async recipeview() {
    await axios.get("http://localhost:3001/board/view", {
      params: {
        idx: this.props.match.params.recipeidx,
      },
    });
  }
  async recipedetail() {
    const result = await axios.get(
      "http://localhost:3001/board/recipedetail",
      {
        params: {
          idx: this.props.match.params.recipeidx,
        },
        withCredentials: true,
      }
    );
    if (this.state.detail === null && result) {
      const data = result.data.data[0];
      let result2 = [];
      this.setState({
        detail: await axios
          .get("http://localhost:3001/category/categorycheck", {
            params: { idx: data.category },
          })
          .then((data2) => {
            console.log(data.date);
            result2.push(
              <>
                <Box className={this.props.classes.box} m={0}>
                  <Card className={this.props.classes.root}>
                    <CardHeader title={data.title} subheader={moment(data.board_date).format("YYYY-MM-DD hh:mm")} />
                    <CardMedia
                      className={this.props.classes.media}
                      image={data.thumbnail}
                      title={data.title}
                      style={{ border: "1px solid gray" }}
                    ></CardMedia>
                    <CardContent>
                      <Typography>{data.author} 요리사</Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                      <IconButton color="inherit" aria-label="view">
                        <VisibilityIcon />
                        <Typography>{data.view}</Typography>
                      </IconButton>
                      <IconButton
                        component="a"
                        href={document.location.href}
                        onClick={data.like}
                        color="secondary"
                        aria-label="add to favorites"
                      >
                        <ThumbUpAltIcon />
                        <Typography>{data.like}</Typography>
                      </IconButton>
                      <IconButton
                        component="a"
                        href={document.location.href}
                        onClick={this.hate}
                        color="primary"
                        aria-label="share"
                      >
                        <ThumbDownIcon />
                        <Typography>{data.hate}</Typography>
                      </IconButton>
                    </CardActions>
                    <CardContent>
                      <hr />
                      <div id="viewer">
                      <Viewer style={{border:'5px solid gray'}} initialValue={data.content} />
                      </div>
                    </CardContent>
                  </Card>
                </Box>
              </>
            );

            return <>{result2}</>;
          }),
      });
    }
  }

  //<div dangerouslySetInnerHTML={{__html: data.content }}></div>
  async recipedelete() {
    const result = await axios.get(
      "http://localhost:3001/board/recipedelete",
      {
        params: {
          idx: this.props.match.params.recipeidx,
        },
      }
    );
    console.log(result);
    if (result) {
      console.log("삭제되었습니다.");
    } else {
      console.log("서버와의 연결을 실패했습니다.");
    }
  }

  render() {
    return (
      <>
        <Main>
            <span>
              <Button
                component="a"
                href={"/modify/" + this.props.match.params.recipeidx}
              >
                수정
              </Button>
            </span>
            <span>
              <Button component="a" href="/" onClick={this.recipedelete}>
                삭제
              </Button>
            </span>
            {this.state.detail}
        </Main>
      </>
    );
  }
}
const styles = (theme) => ({
  box: {
    textAlign: 'center',
  },
  root: {
    width: '100%',
    display : 'inline-block',
    maxWidth:'1000px',
    minWidth:'350px'
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
});

const Main = styled.div`
  text-align: center;
`;

export default withStyles(styles)(Detail);
