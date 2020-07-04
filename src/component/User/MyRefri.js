import React, { Component } from "react";

class MyRefri extends Component {
  /*
  async LoadRefri() {
    await axios
      .get("http://localhost:3001/users/loadneed", { withCredentials: true })
      .then((data) => {
        let sort = [];
        data.data.map((data2, i) => {
          sort.push(data2.title);
        });

        this.setState({
          values: sort,
        });
      })
      .then(async () => {
        await this.LoadNeed();
      })
      .then(() => {
        let sort = [];
        Object.values(this.state.need1).map((data, i) => {
          if(this.state.values.indexOf(data.title) !== -1) {
            sort.push(this.state.need1[i]);
          }
        })
        this.setState({
          values : sort
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  */
 
  render() {
    return (
      <>
        <footer id="footer">
                내냉장고
        </footer>
      </>
    );
  }
}
export default MyRefri;
