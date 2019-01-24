import React, { Component } from "react";
import "../App.css";
import { Modal, Button, Row, Input } from "react-materialize";
import { connect } from "react-redux";
import * as actionCreators from "../store/actions/shortUrlActions"; //connect to shortUrlActions

class Home extends Component {
  state = {
    originalUrl: ""
  };
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.createShortUrl(this.state);
  };
  render() {
    const urlShort = this.props.shortUrl.urlShort || "";
    return (
      <div className="App App-header">
        <Modal header="Shorting URL" trigger={<Button>Create</Button>}>
          <form
            onSubmit={this.handleSubmit.bind(this)}
            className="center container"
          >
            <Row>
              <Input
                s={12}
                label="Paste your url"
                id="originalUrl"
                onChange={this.handleChange}
              />
            </Row>
            <p>
              Your short url :{" "}
              {this.props.auth.isAuthenticated ? (
                <a href={urlShort}>{urlShort}</a>
              ) : (
                "Your login session outdated, You must login first"
              )}
            </p>
            <Button type="submit" value="Submit">
              Create
            </Button>
          </form>
        </Modal>
      </div>
    );
  }
}

//connect redux store to component
const mapStateToProps = state => {
  return state;
};

export default connect(
  mapStateToProps,
  actionCreators
)(Home);
