import React from "react";
import StripeCheckout from "react-stripe-checkout";
import { useDispatch } from "react-redux";

import { handleToken } from "../reducers/authReducer";

export default function Payments() {
  const dispatch = useDispatch();
  const processToken = (token) => dispatch(handleToken(token));

  return (
    <StripeCheckout
      name="Emaily"
      description="5 for 5 email credits"
      amount={500}
      token={processToken}
      stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}
    >
      <button>Pay for Credits</button>
    </StripeCheckout>
  );
}
