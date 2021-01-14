import React, { Fragment } from "react";
import { NavLink } from "reactstrap";
import { connect } from "react-redux";
import { logout } from "../../actions/authActions";
import { useHistory } from "react-router-dom";

export const Logout = ({ logout }) => {
  let history = useHistory();
  const handleClick = async (e) => {
    const result = await logout();
    if (result) history.push("/");
  };
  return (
    <Fragment>
      <NavLink onClick={handleClick} href="#">
        Logout
      </NavLink>
    </Fragment>
  );
};

export default connect(null, { logout })(Logout);
