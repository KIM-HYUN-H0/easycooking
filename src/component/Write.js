import React, { Component } from "react";
import axios from "axios";
import "codemirror/lib/codemirror.css";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import { observer, inject } from "mobx-react";
import styled from "styled-components";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Paper from "@material-ui/core/Paper";
import Button from '@material-ui/core/Button';
import Need from './Repeat/Need'
import Sauce from './Repeat/Sauce'

@inject("category")
@observer
class Write extends Component {
  editorRef = React.createRef();

  constructor() {
    super();
    this.state = {
      list: null,
      needlist: null,
      saucelist: null,
      title: null,
      category: null,
      need: [],
      sauce: [],
      source: null,
      content: null,
      thumbnailcheck: 0,
      thumbnail: null,
      need1: null,
    };
    this.sourceChange = this.sourceChange.bind(this);
    this.categoryChange = this.categoryChange.bind(this);
    this.titleChange = this.titleChange.bind(this);
    this.handlesubmit = this.handlesubmit.bind(this);
    this.LoadNeedState = this.LoadNeedState.bind(this);
    this.LoadSauceState = this.LoadSauceState.bind(this);
  }

  async componentDidMount() {
    this.categorylist();
  }
  async categorylist() {
    const result = await axios.get(
      "http://localhost:3001/category/categorylist"
    );
    if (this.state.list === null) {
      this.setState({
        list: Object.values(result.data.data).map((data, i) => (
          <MenuItem value={data.number} key={i}>
            {data.name}
          </MenuItem>
        )),
      });
    }
  }

  titleChange(event) {
    this.setState({
      title: event.target.value,
    });
  }
  categoryChange(event) {
    this.setState({
      category: event.target.value,
    });
  }
  sourceChange(event) {
    this.setState({
      source: event.target.value,
    });
  }
  async handlesubmit() {
    axios.post(
      "http://localhost:3001/board/recipewrite",
      {
        thumbnail: this.state.thumbnail,
        title: this.state.title,
        category: this.state.category,
        need: this.state.need,
        sauce: this.state.sauce,
        source: this.state.source,
        content: this.editorRef.current.getInstance().getHtml(),
      },
      { withCredentials: true }
    );
  }
  uploadImage(blob) {
    let formData = new FormData();
    formData.append("image", blob);
    return axios("http://localhost:3001/board/imageupload", {
      method: "POST",
      data: formData,
      headers: { "Content-type": "multipart/form-data" },
    }).then((response) => {
      if (response.data) {
        if (this.state.thumbnailcheck === 0) {
          this.setState({
            thumbnailchekc: 1,
            thumbnail: response.data,
          });
        }
        return response.data;
      }
      throw new Error("Server or network error");
    });
  }

  onAddImageBlob(blob, callback) {
    this.uploadImage(blob)
      .then((response) => {
        if (!response) {
          throw new Error("Validation error");
        } else callback(response, "alt text");
      })
      .catch((error) => {
        console.log(error);
      });
  }
  
  LoadNeedState(text) {
    if(this.state.need.length !== text.length) {
      this.setState({ 
        need : text.map(data => data = data.title)
      })
    }
  }
  LoadSauceState(text) {
    if(this.state.sauce.length !== text.length) {
      this.setState({ 
        sauce : text.map(data => data = data.title)
      })
    }
  }

  render() {
    return (
      <>
        
          <TextField 
          fullWidth 
          style={{margin : 'auto' }}
          label="요리 이름" onChange={this.titleChange} />

          <FormControl 
          fullWidth 
          style={{margin : 'auto' }}
          >
            <InputLabel>요리 종류</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              onChange={this.categoryChange}
            >
              {this.state.list}
            </Select>
          </FormControl>

        <Need func={this.LoadNeedState}/>
        <Sauce func = {this.LoadSauceState}/>

        <TextField 
        fullWidth
        label="출처도 적어주세요 !" onChange={this.sourceChange} />
        <Editor
          previewStyle="vertical"
          height="300px"
          initialEditType="wysiwyg"
          placeholder="가장 마지막 사진이 썸네일로 자동저장됩니다."
          ref={this.editorRef}
          toolbarItems={["image"]}
          hooks={{
            addImageBlobHook: async (blob, callback) => {
              const upload = await this.uploadImage(blob);
              callback(upload, "alt text");
              return false;
            },
          }}
        />
        <div>
          <Button variant="outlined"
          href="/" onClick={this.handlesubmit}>작성</Button>
        </div>
      </>
    );
  }
}
const styles = (theme) => ({
  paper: {


  },
  details: {
    flexDirection: "column",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
});

export default withStyles(styles)(Write);
