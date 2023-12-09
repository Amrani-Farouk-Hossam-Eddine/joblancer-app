import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import newRequest from "../../utils/newRequest";
import { useParams } from "react-router-dom";
import CheckoutForm from "../../components/CheckoutForm";
import "./Pay.css";

const stripePromise = loadStripe(
  "pk_test_51OBylgC6ldNEjSiCujh56DFDMeUPh90GidvPdSxSU4Wc2UcZ4jaXXrm6yhRuwHuXQwP2IHRN43mtsl79k6m4JQxO00fau1YFgK"
);

const Pay = () => {
  const { id } = useParams();
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await newRequest.post(
          `/orders/create-payment-intent/${id}`
        );
        setClientSecret(res.data.clientSecret);
      } catch (err) {
        console.log(err);
      }
    };
    makeRequest();
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="flex justify-center">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
};

export default Pay;
