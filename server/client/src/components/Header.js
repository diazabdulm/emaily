import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Payments from "./Payments";

export default function Header() {
  const user = useSelector((state) => state.auth.currentUser);
  const numCredits = useSelector((state) => state.auth.currentUser?.credits);

  return (
    <div>
      <Link to={user ? "/surveys" : "/"}>Header</Link>
      {user ? (
        <Fragment>
          <a href="/auth/api/logout">Log out</a>
          <span>{numCredits}</span>
          <Payments />
        </Fragment>
      ) : (
        <a href="/auth/google"> Log in with Google</a>
      )}
    </div>
  );
}
