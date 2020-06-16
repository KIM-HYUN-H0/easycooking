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
    };
    this.needchange = this.needchange.bind(this);
    this.saucechange = this.saucechange.bind(this);
    this.sourceChange = this.sourceChange.bind(this);
    this.categoryChange = this.categoryChange.bind(this);
    this.titleChange = this.titleChange.bind(this);
    this.handlesubmit = this.handlesubmit.bind(this);
  }

  async componentDidMount() {
    this.needlist();
    this.categorylist();
    this.saucelist();
  }
  async categorylist() {
    const result = await axios.get(
      "http://192.168.219.103:3001/DBapi/categorylist"
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
  async saucelist() {
    await axios
      .get("http://192.168.219.103:3001/DBapi/saucelist")
      .then((data) => {
        this.setState({
          saucelist: Object.values(data.data.data).map((data2, i) => (
            <>
              <label key={i}>
                <input
                  id="saucecheckbox"
                  type="checkbox"
                  value={data2.name}
                  onChange={this.saucechange}
                ></input>
                {data2.name}
              </label>
            </>
          )),
        });
      });
  }
  async needchange(event) {
    if (event.target.checked) {
      this.setState({
        need: this.state.need.concat(event.target.value),
      });
    } else {
      const a = this.state.need;
      const b = event.target.value;
      a.splice(a.indexOf(b), 1);
      this.setState({
        need: a,
      });
    }
  }
  async saucechange(event) {
    if (event.target.checked) {
      this.setState({
        sauce: this.state.sauce.concat(event.target.value),
      });
    } else {
      const a = this.state.sauce;
      const b = event.target.value;
      a.splice(a.indexOf(b), 1);
      this.setState({
        sauce: a,
      });
    }
  }
  async needlist() {
    const result = await axios.get(
      "http://192.168.219.103:3001/DBapi/needlist"
    );
    console.log(result);
    if (this.state.needlist === null) {
      this.setState({
        classlist: Object.values(result.data.data).map((data, i) => (
          <label key={i}>
            <input type="radio" name="class" value={data.class}></input>
            {data.class}
          </label>
        )),
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
                <ExpansionPanelDetails
                  className={this.props.classes.theme}
                  key={i}
                >
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
    console.log(this.state.thumbnail);
    axios.post(
      "http://192.168.219.103:3001/DBapi/recipewrite",
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
    return axios("http://192.168.219.103:3001/DBapi/imageupload", {
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
  render() {
    console.log(this.state);
    return (
      <>
        <Main>
          <Sub>
            <Detailrecipe>
              <thead>
                <tr>
                  <Title colSpan={7}>
                    <TextField
                      id="outlined-basic"
                      label="요리 이름"
                      variant="outlined"
                      onChange={this.titleChange}
                    />
                  </Title>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <Td>
                    <FormControl className={this.props.classes.formControl}>
                      <InputLabel>요리 종류</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        onChange={this.categoryChange}
                      >
                        {this.state.list}
                      </Select>
                    </FormControl>
                  </Td>
                </tr>
              </tbody>
              <thead>
                <tr>
                  <Th>재료 선택</Th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <Td>{this.state.needlist}</Td>
                </tr>
              </tbody>

              <thead>
                <tr>
                  <Th>양념 선택</Th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <Td>{this.state.saucelist}</Td>
                </tr>
              </tbody>
              <thead>
                <tr>
                  <Th>출처</Th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <Td>
                    <input type="text" onChange={this.sourceChange} />
                  </Td>
                </tr>
              </tbody>
            </Detailrecipe>

            <Editor
              previewStyle="vertical"
              height="300px"
              initialEditType="wysiwyg"
              placeholder="가장 마지막 사진이 썸네일로 자동저장됩니다."
              ref={this.editorRef}
              hooks={{
                addImageBlobHook: async (blob, callback) => {
                  const upload = await this.uploadImage(blob);
                  callback(upload, "alt text");
                  return false;
                },
              }}
            />
            <div>
              <a href="/" onClick={this.handlesubmit}>
                작성
              </a>
            </div>
          </Sub>
        </Main>
      </>
    );
  }
}
const styles = (theme) => ({
  details: {
    display: "flex",
    flexDirection: "row",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
});

const Sub = styled.div`
  display: inline-block;
  width: 70%;
`;
const Main = styled.div`
  text-align: center;
`;
const Detailrecipe = styled.table`
  width: 100%;
  color: #549a39;
  background-color: white;
  border: 1px solid gray;
`;
const Td = styled.td``;
const Th = styled.th`
  color: #b8dea8;
`;
const Title = styled.th`
  font-size: 30px;
`;

export default withStyles(styles)(Write);
