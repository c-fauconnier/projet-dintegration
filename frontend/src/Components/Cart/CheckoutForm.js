import React from 'react';
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
import CardSection from './CardSection';
import './Cart.css';
import axios from 'axios';
import {useHistory} from 'react-router-dom'

const API = 'https://bangoo-deploy.herokuapp.com/api/cart/'

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const state = {
    token:'',
    name:'',
    address:'',
    cardHolder:'',
    cardNumber:'',
    expiMonth:'',
    expiYear:'',
    CVC:'',
    items:[],
    totalPrice : ''}

    const history = useHistory()

   function stripeTokenHandler (token) {
      const paymentData = {token: token.id};
      state.token = paymentData.token;
   }
  const handleSubmit = async (event) => {

    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }
     const payload = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
      billing_details: {
        name: event.target.name.value,
        email: event.target.email.value,
      },

    });

    console.log(payload)
    const card = elements.getElement(CardElement);
    const result = await stripe.createToken(card);

    if (result.error) {
      // Show error to your customer.
      console.log(result.error.message);
    } else {
      // Send the token to your server.
      // This function does not exist yet; we will define it in the next step.
      stripeTokenHandler(result.token);
    }
    state.name = payload.paymentMethod.billing_details.name
    state.email = payload.paymentMethod.billing_details.email
    const order = {name: state.name, email: state.email, token: state.token}
    console.log(order)
    axios.get(API+'/purge',{
            withCredentials:true,
            }
        )
      .then((res) => console.log('Order posted'),
      )
      .catch(err => {});
    axios.post(API+'/checkout', order,{
      withCredentials: true,
    },
    );

    history.push('/')
  };

  return (

    <form onSubmit={handleSubmit} className="checkout-form" >
      <CardSection
      />
    </form>
  );
}

export default CheckoutForm;