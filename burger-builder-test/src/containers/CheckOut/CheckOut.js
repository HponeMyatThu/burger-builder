import React, { useState } from 'react';
import {
  useLoaderData,
  useLocation,
  useNavigate,
  Route,
  Routes,
} from 'react-router-dom';
import CheckOutSummary from '../../components/Order/CheckOutSummary/CheckOutSummary';
import ContactData from './ContactData/ContactData';

const CheckOut = props => {
  const navigate = useNavigate();
  const location = useLocation();
  const ingredient = location.state?.ingredient;
  const totalPrice = location.state?.totalPrice;

  console.log(ingredient, totalPrice);

  const CheckoutContinuedHandler = () => {
    navigate('/checkout/contact-data', { state : {ingredient, totalPrice}});
  };

  const CheckoutCanceledHandler = () => {
    navigate('/', { state: { ingredient } });
  };

  return (
    <div>
      <CheckOutSummary
        ingredient={ingredient}
        checkoutCanceled={CheckoutCanceledHandler}
        checkoutContinued={CheckoutContinuedHandler}
      />
      <Routes>
        <Route path='contact-data' element={<ContactData ingredient={ingredient} price={totalPrice} />} />
      </Routes>
    </div>
  );
};

export default CheckOut;
