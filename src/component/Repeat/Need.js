import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import axios from "axios";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import Modal from "@material-ui/core/Modal";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";
import ListAltIcon from '@material-ui/icons/ListAlt';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

class Test extends Component {
  constructor() {
    super();
    this.state = {
      need1: [],
      needlist: null,
      values: [],
      open : false,
      test : null
    };
    this.needchange = this.needchange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.SaveNeed = this.SaveNeed.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  componentDidMount() {
    this.LoadNeed();
  }

  async LoadNeed() {
    await axios.get("http://localhost:3001/need/needlist").then((result) => {
      let sort2 = [];
      const sort = Object.values(result.data.data).map((data,i) => {
        data.need = Object.values(data.need).map((data2,i) => {
          const obj = {};
          obj.title = data2['name']
          sort2.push(obj);
          return obj;
        })
        return data;
      });
      this.setState({
        test : sort2,
        needlist: sort
      });
    });
  }

  handleChange(event, values) {
    this.setState({
      values: values,
    });
  }
  needchange(event) {
    if (event.target.checked) {
      console.log('넣니?')
      this.setState({
        values: this.state.values.concat(this.state.test[this.state.test.findIndex(i => i.title === event.target.value)])
      });
    } else {
      const a = this.state.values;
      const b = this.state.values.findIndex(i => i.title === event.target.value);
      a.splice(b, 1);
      this.setState({
        values: a,
      });
    }
  }
  async SaveNeed() {
    await axios
      .post(
        "http://localhost:3001/users/saveneed",
        {
          need: this.state.values,
        },
        { withCredentials: true }
      )
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  openModal() {
    this.setState({
      open: true,
    });
  }
  closeModal() {
    this.setState({
      open: false,
    });
  }
  

  render() {
    this.props.func(this.state.values);
    return (
      <>
        <Autocomplete
          multiple
          style={{
            display : 'inline-block',
            width : '70%'
          }}
          id="checkboxes-tags-demo"
          options={this.state.needlist === null ? [''] : 
          Object.values(this.state.needlist).map((data) => {
            return data.need;
          }).reduce((a,b) => a.concat(b),[])}
          //배열 묶기
          disableCloseOnSelect
          getOptionLabel={(option) => option.title}
          onChange={this.handleChange}
          value = {this.state.values}
          renderOption={(option, { selected }) => {
            return (
              <>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {option.title}
              </>
            );
          }}
          renderInput={(params) => {
            return (
              <>
              <TextField
                {...params}
                variant="outlined"
                label="재료검색"
                placeholder="Favorites"
              />
              </>
            );
          }}
        />
        <IconButton
          style={{ 
            marginTop : '30px',
            display : 'inline-block',
            width : '100px' }}
          color="inherit"
          aria-label="search"
        >
          <ListAltIcon fontSize="large" onClick={this.openModal} />
        </IconButton>

        <Modal
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          open={this.state.open}
          onClose={this.closeModal}
          aria-labelledby="CategoryModal"
          aria-describedby="Category"
        >
          <>
            <div className={this.props.classes.modal}>
              {this.state.needlist === null ? 'API 서버가 응답하지 않습니다.' :
              Object.values(this.state.needlist).map((data) => {
                let sort = [];
                sort.push(
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>{data.class}</Typography>
                  </ExpansionPanelSummary>
                );
                Object.values(data.need).map((data2) => {
                  sort.push(
                    <>
                      <ExpansionPanelDetails>
                        <FormControlLabel
                          control={
                            <Checkbox
                              onChange={(e) => this.needchange(e)} //여길보고 기억해내!!
                              name={data.class}
                              color="primary"
                              value={data2.title}
                              checked={
                                this.state.values.findIndex(i => i.title === data2.title) !== -1
                                  ? true
                                  : false
                              }
                            />
                          }
                          label={data2.title}
                        />
                      </ExpansionPanelDetails>
                    </>
                  );
                });
                return <ExpansionPanel>{sort}</ExpansionPanel>;
              })
              }
            </div>
          </>
        </Modal>
      </>
    );
  }
}
const styles = (theme) => ({
  details: {
    flexDirection: "column",
  },
  modal: {
    overflow: "scroll",
    position: "absolute",
    width: 300,
    height: "30%",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
});
export default withStyles(styles)(Test);
