import React, { Component } from "react";
import { Row, Input, Button } from "react-materialize";
import axios from "axios";

class EditUrl extends Component {
  state = {
    title: this.props.props.title,
    urlCode: this.props.props.urlCode,
    originalUrl: this.props.props.originalUrl,
    shortUrl: this.props.props.shortUrl,
    response: ""
  };
  handleChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    axios
      .put(
        "http://localhost:5000/api/shorters/update/" + this.props.props._id,
        {
          ...this.state,
          shortUrl: "http://localhost:5000/" + this.state.urlCode
        }
      )
      .then(res => {
        this.setState({
          response: res.status
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          response: 404
        });
      });
  }
  render() {
    let response = "";
    if (this.state.response === 200)
      response = <p className="green-text">Success</p>;
    if (this.state.response === 404)
      response = <p className="red-text">Failed, URL already axist</p>;
    return (
      <form
        onSubmit={this.handleSubmit.bind(this)}
        className="center container"
      >
        <Row>
          <Input
            s={12}
            defaultValue={this.props.props.title}
            label="title"
            id="title"
            onChange={this.handleChange.bind(this)}
          />
          <Input
            s={12}
            defaultValue={this.props.props.urlCode}
            label="http://localhost:5000/"
            id="urlCode"
            onChange={this.handleChange.bind(this)}
          />
        </Row>
        <div>{response}</div>
        <Button type="submit" value="Submit">
          Edit
        </Button>
      </form>
    );
  }
}

export default EditUrl;
