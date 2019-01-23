import React from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/authActions"; //connect to authActions
import { Row } from "react-materialize";

const Profile = props => {
  return (
    <div className="blue lighten-5 ">
      <Row className="container">
        <img src={props.auth.user.avatar} alt="profile" className="circle" />
        {props.auth.user.name}
      </Row>
    </div>
  );
};

//connect redux store to component
const mapStateToProps = state => {
  return state;
};

export default connect(
  mapStateToProps,
  actionCreators
)(Profile);
