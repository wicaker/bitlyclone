import React, { Component } from "react";
import axios from "axios";
import { Row, Col, Input, Button } from "react-materialize";
import Profile from "./profile";

class MyUrl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listUrl: [],
      from: '2001-01-01',
      to: '9999-12-31'
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/api/shorters")
      .then(res => {
        this.setState({
          listUrl: res.data
        });
      })
      .catch(err => console.log(err));
  }
  handleChange(e) {
    this.setState({
      [e.target.id]: this.formatDate(e.target.value)
    });
  }
  handleSubmit(e) {
    e.preventDefault();
  }

  formatDate = val => {
    const time = new Date(val);
    const date = `${time.getFullYear()}-${time.getMonth() +
      1}-${time.getDate()}`;
    return date;
  };

  render() {
    const { from, listUrl, to } = this.state;
    const data = listUrl.filter(value => {
      return (
        this.formatDate(new Date(value.createdAt)) >= from && this.formatDate(new Date(value.createdAt)) <= to
      );
    });
    console.log("data = ", data);
    const dataUrl = data.map(item => {
        return (
          <Row key={item._id} className="z-depth-1">
            <div className="container">
              <Col s={12}>Created At : {item.createdAt}</Col>
              <Col s={12}>
                <h4>{item.title || "No Title"}</h4>
              </Col>
              <Col s={12}>
                Original Url : <a href={item.originalUrl}>{item.originalUrl}</a>
              </Col>
              <Col s={12}>
                Short Url : <a href={item.shortUrl}>{item.shortUrl}</a>
              </Col>
              <Col s={12}>Total Clicks : {item.totalClicks}</Col>
            </div>
          </Row>
        );
      
    });
    return (
      <div>
        <Profile />
        <form onSubmit={this.handleSubmit.bind(this)} className="container">
          <Row>
            <Input
              s={2}
              type="date"
              className="datepicker"
              label="from"
              id="from"
              onChange={this.handleChange.bind(this)}
            />
            <Input
              s={2}
              type="date"
              className="datepicker"
              label="to"
              id="to"
              onChange={this.handleChange.bind(this)}
            />
            <Button s={2} type="submit" value="Submit">
              Check
            </Button>
          </Row>
        </form>
        {dataUrl ? dataUrl : "Your short url not found in this period"}
      </div>
    );
  }
}

export default MyUrl;
