import React, { Component } from "react";
import { Row, Input, Button } from "react-materialize";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as actionCreators from "../../store/actions/authActions"; //connect to authActions

class Register extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    password2: ""
  };
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  handleSubmit(e) {
    e.preventDefault();
    this.props.registerUser(this.state);
  }
  render() {
    if (this.props.auth.registerStatus) return <Redirect to="/login" />;
    let errorName = "";
    let errorEmail = "";
    let errorPassword2 = "";
    let errorPassword = "";
    if (this.props.auth.authError != null) {
      errorName = this.props.auth.authError.name || "";
      errorEmail = this.props.auth.authError.email || "";
      errorPassword = this.props.auth.authError.password || "";
      errorPassword2 = this.props.auth.authError.password2 || "";
    }
    return (
      <form
        onSubmit={this.handleSubmit.bind(this)}
        className="center container"
      >
        <Row>
          <Input
            s={12}
            label="Name"
            id="name"
            error={errorName}
            onChange={this.handleChange}
          />
          <Input
            s={12}
            type="email"
            label="Email"
            id="email"
            error={errorEmail}
            onChange={this.handleChange}
          />
          <Input
            s={12}
            type="password"
            label="Password"
            id="password"
            error={errorPassword}
            onChange={this.handleChange}
          />
          <Input
            s={12}
            type="password"
            label="Confirm Password"
            id="password2"
            error={errorPassword2}
            onChange={this.handleChange}
          />
        </Row>
        <Button type="submit" value="Submit">
          Register
        </Button>
      </form>
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
)(Register);
