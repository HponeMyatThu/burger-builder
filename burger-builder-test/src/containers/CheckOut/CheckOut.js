import React, { useState } from 'react';
import {
  useLoaderData,
  useLocation,
  useNavigate,
  Route,
  Routes,
} from 'react-router-dom';
import { connect } from 'react-redux';
import CheckOutSummary from '../../components/Order/CheckOutSummary/CheckOutSummary';
import ContactData from './ContactData/ContactData';

const CheckOut = props => {
  const navigate = useNavigate();
  const location = useLocation();
  const ingredient = location.state?.ingredient;
  const totalPrice = location.state?.totalPrice;

  const CheckoutContinuedHandler = () => {
    navigate('/checkout/contact-data', { state : {ingredient: props.ings, totalPrice: props.price }});
  };

  const CheckoutCanceledHandler = () => {
    navigate('/', { state: { ingredient: props.ings } });
  };

  return (
    <div>
      <CheckOutSummary
        ingredient={props.ings}
        checkoutCanceled={CheckoutCanceledHandler}
        checkoutContinued={CheckoutContinuedHandler}
      />
      <Routes>
        <Route path='contact-data' element={<ContactData ingredient={props.ings} price={props.price} />} />
      </Routes>
    </div>
  );
};

const mapStateToProps = state =>{
  return {
    ings: state.ingredient,
    price: state.totalPrice
  }
}

export default connect(mapStateToProps)(CheckOut);
