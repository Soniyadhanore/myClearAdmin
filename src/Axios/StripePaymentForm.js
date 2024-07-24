import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { Button } from "components";

const StripePaymentForm = ({
  setStripePaymentMethod,
}) => {
  const stripe = useStripe();
  const elements = useElements();

  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    // const result = await stripe.createPaymentMethod({
    //   type: 'card',
    //   card: elements.getElement(CardElement),
    // });
    const result2 = await stripe.createToken(elements.getElement(CardElement));
    if (result2.error) {
      setError(result2.error.message);
    } else {
      setStripePaymentMethod(result2.token.id);
    }
  };

  return (
    <form onSubmit={handleSubmit}
      className='stripe-card'
    >
      {/* <label> Card details </label> */}
      <div className="mt-[6px]">
        <CardElement
          onChange={(e) => setError(e.error?.message)}
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
        {error && <div>{error}</div>}
      {/* <CardElement /> */}
      </div>

      <Button
        className="mt-[6px] ease-linear transition-all duration-150 w-[180px]"
        variant={"FillRed900"}
        size={"md"}
        type="submit"
      > Add Credit Card </Button>

  
    </form>
  );
};

export default StripePaymentForm;
