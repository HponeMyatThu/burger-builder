import React, { Component } from 'react';

import Auxilitary from '../../../hoc/Auxilitary';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
  // this could be the functional component
  componentWillUpdate(){
    console.log('[OrderSummary] componentwillupdate');
  }
  render() {
    const ingredientSummary = Object.keys(this.props.ingredient).map(igKey => (
      <li key={igKey}>
        <span style={{ textTransform: 'capitalize' }}>{igKey}</span>:{' '}
        {this.props.ingredient[igKey]}
      </li>
    ));
    return (
      <Auxilitary>
        <p>
          <strong>Your Order</strong>
        </p>
        <p>A delicious burger with the following ingredient:</p>
        <ul>{ingredientSummary}</ul>
        <p>
          <strong>
            The total price of your burger is : {this.props.price.toFixed(2)} ${' '}
          </strong>
        </p>
        <p>Continue to CheckOut?</p>
        <Button btnType='Danger' clicked={this.props.purchaseCancelled}>
          CHANCEL
        </Button>
        <Button btnType='Success' clicked={this.props.purchaseContinued}>
          CONTINUE
        </Button>
      </Auxilitary>
    );
  }
}

export default OrderSummary;
