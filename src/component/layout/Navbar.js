import React from "react";
import { Navbar } from "react-materialize";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";
import * as actionCreators from "../../store/actions/authActions"; //connect to authActions

const MyNavbar = props => {
  const { auth } = props;
  const links =
    auth.isAuthenticated === true ? (
      <SignedInLinks props={props} />
    ) : (
      <SignedOutLinks />
    );

  return (
    <Navbar className="green">
      <div className="container">
        <Link to="/" className="brand-logo">
          URL Shorter
        </Link>
        {links}
      </div>
    </Navbar>
  );
};

//connect redux store to component
const mapStateToProps = state => {
  return state;
};

export default connect(
  mapStateToProps,
  actionCreators
)(MyNavbar);
