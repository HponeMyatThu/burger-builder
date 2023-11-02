import React from 'react';

import Auxilitary from '../../../hoc/Auxilitary';

const OrderSummary = props => {
  const ingredientSummary = Object.keys(props.ingredient).map(igKey => (
    <li key={igKey}>
      <span style={{ textTransform: 'capitalize' }}>{igKey}</span>:{' '}
      {props.ingredient[igKey]}
    </li>
  ));
  return (
    <Auxilitary>
      <p>Your Order</p>
      <p>A delicious burger with the following ingredient:</p>
      <ul>{ingredientSummary}</ul>
      <p>Continue to CheckOut?</p>
    </Auxilitary>
  );
};

export default OrderSummary;
