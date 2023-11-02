import React from 'react';

import Auxilitary from '../../../hoc/Auxilitary';
import Button from '../../UI/Button/Button';

const OrderSummary = props => {
  const ingredientSummary = Object.keys(props.ingredient).map(igKey => (
    <li key={igKey}>
      <span style={{ textTransform: 'capitalize' }}>{igKey}</span>:{' '}
      {props.ingredient[igKey]}
    </li>
  ));
  return (
    <Auxilitary>
      <p><strong>Your Order</strong></p>
      <p>A delicious burger with the following ingredient:</p>
      <ul>{ingredientSummary}</ul>
      <p><strong>The total price of your burger is : {props.price.toFixed(2)} $ </strong></p>
      <p>Continue to CheckOut?</p>
      <Button btnType='Danger' clicked={props.purchaseCancelled}>CHANCEL</Button>
      <Button btnType='Success' clicked={props.purchaseContinued}>CONTINUE</Button>
    </Auxilitary>
  );
};

export default OrderSummary;
