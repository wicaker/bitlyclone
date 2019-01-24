import React, { Component } from "react";
import axios from "axios";
import { Row, Col, Input, Button, Modal } from "react-materialize";
import Profile from "./profile";
import openSocket from "socket.io-client";
import EditUrl from "./editUrl";

class MyUrl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listUrl: [],
      from: "2001-01-01",
      to: "9999-12-31"
    };
  }

  componentWillMount() {
    axios
      .get("http://localhost:5000/api/shorters")
      .then(res => {
        this.setState({
          listUrl: res.data
        });
      })
      .catch(err => console.log(err));
    const socket = openSocket("http://localhost:5000");
    socket.on("shorter", res => {
      const data = this.state.listUrl.map(value => {
        if (value.shortUrl === res.shortUrl) {
          value.totalClicks = res.totalClicks;
        }
        return value;
      });
      this.setState({
        listUrl: data
      });
    });
    socket.on("shorterUpdate", res => {
      const data = this.state.listUrl.map(value => {
        if (value._id === res._id) {
          value = res;
        }
        return value;
      });
      this.setState({
        listUrl: data
      });
    });
  }

  handleChange(e) {
    this.setState({
      [e.target.id]: this.formatDate(e.target.value)
    });
  }
  handleSubmit(e) {
    e.preventDefault();
  }
  handlDelete(urlId) {
    axios("http://localhost:5000/api/shorters/delete/" + urlId, {
      method: "DELETE"
    })
      .then(resData => {
        this.setState(prevState => {
          const updatedPosts = prevState.listUrl.filter(p => p._id !== urlId);
          return { listUrl: updatedPosts };
        });
      })
      .catch(err => {
        console.log(err);
      });
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
        this.formatDate(new Date(value.createdAt)) >= from &&
        this.formatDate(new Date(value.createdAt)) <= to
      );
    });
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
              Short Url :{" "}
              <a href={item.shortUrl} id={item.shortUrl}>
                {item.shortUrl}
              </a>
            </Col>
            <Col s={12}>
              Total Clicks : <h4>{item.totalClicks}</h4>
            </Col>
            <Col s={12}>
              <Button
                s={2}
                className="red "
                onClick={this.handlDelete.bind(this, item._id)}
              >
                Delete
              </Button>
              <Modal header="Shorting URL" trigger={<Button>Edit</Button>}>
                <EditUrl props={item} />
              </Modal>
            </Col>
          </div>
        </Row>
      );
    });
    return (
      <div className="center">
        <Profile />
        <form onSubmit={this.handleSubmit.bind(this)} className="container">
          <Row>
            <Input
              s={6}
              type="date"
              className="datepicker"
              label="from"
              id="from"
              onChange={this.handleChange.bind(this)}
            />
            <Input
              s={6}
              type="date"
              className="datepicker"
              label="to"
              id="to"
              onChange={this.handleChange.bind(this)}
            />
          </Row>
        </form>
        {dataUrl.length !== 0 ? dataUrl : "Data not found"}
      </div>
    );
  }
}

export default MyUrl;
