import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/authActions"; //connect to authActions
const SignedInLinks = props => {
  const { logoutUser } = props;
  return (
    <div>
      <ul className="right">
        <li>
          <NavLink to="/myurl">My Url</NavLink>
        </li>
        <li>
          <NavLink to="/logout" onClick={logoutUser}>
            Log Out
          </NavLink>
        </li>
      </ul>
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
)(SignedInLinks);
