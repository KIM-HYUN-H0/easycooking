import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import Modal from "@material-ui/core/Modal";
import IconButton from "@material-ui/core/IconButton";
import ListAltIcon from '@material-ui/icons/ListAlt';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

class Sauce extends Component {
  constructor() {
    super();
    this.state = {
      need1: [],
      saucelist: null,
      values: [],
      open : false,
      test : null
    };
    this.saucechange = this.saucechange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  componentDidMount() {
    this.LoadSauce();
  }

  async LoadSauce() {
    await axios.get("http://localhost:3001/sauce/saucelist").then((result) => {
      const sort = Object.values(result.data.data).map((data,i) => {
          const obj = {};
          obj.title = data['name']
          return obj;
      });
      this.setState({
        saucelist: sort
      });
    });
  }

  handleChange(event, values) {
    this.setState({
      values: values,
    });
  }
  saucechange(event) {
    if (event.target.checked) {
      this.setState({
        values: this.state.values.concat(this.state.saucelist[this.state.saucelist.findIndex(i => i.title === event.target.value)])
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
          need: this.state.values.reduce((a,b) => a.concat(b.title),[])
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
          options={this.state.saucelist === null ? [''] : 
          this.state.saucelist}
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
                label="양념검색"
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
            width : '30%' }}
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
              {this.state.saucelist === null ? 'API 서버가 응답하지 않습니다.' :
              Object.values(this.state.saucelist).map((data) => {
                return (
                <FormControlLabel
                          control={
                            <Checkbox
                              onChange={(e) => this.saucechange(e)} 
                              color="primary"
                              value={data.title}
                              checked={
                                this.state.values.findIndex(i => i.title === data.title) !== -1
                                  ? true
                                  : false
                              }
                            />
                          }
                          label={data.title}
                        />
                )
              })}
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
export default withStyles(styles)(Sauce);
