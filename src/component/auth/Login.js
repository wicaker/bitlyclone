import React, { Component } from "react";
import { Row, Input, Button } from "react-materialize";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as actionCreators from "../../store/actions/authActions"; //connect to authActions

class Login extends Component {
  state = {
    email: "",
    password: ""
  };
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.loginUser(this.state);
  };
  render() {
    const { auth } = this.props;
    if (auth.isAuthenticated) return <Redirect to="/" />;
    return (
      <form
        onSubmit={this.handleSubmit.bind(this)}
        className="center container"
      >
        <Row>
          <Input
            name="email"
            s={12}
            type="email"
            label="Email"
            id="email"
            onChange={this.handleChange}
          />
          <Input
            name="password"
            s={12}
            type="password"
            label="Password"
            id="password"
            onChange={this.handleChange}
          />
        </Row>
        <Button type="submit" value="Submit">
          Login
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
)(Login);
