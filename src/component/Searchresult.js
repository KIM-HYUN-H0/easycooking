import React, { Component } from "react";
import axios from "axios";

class Searchresult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result : null,
    };
  }

  async componentDidUpdate() {
    if((this.props.titleresult !== this.state.result) && this.props.isChecked === 0) {
      this.setState({
        result : this.props.titleresult
      })
    }
  }
  

  render() {
    return (
      <>
        <div id="center">검색 결과</div>
        {this.state.result}
      </>
    );
  }
}
export default Searchresult;
