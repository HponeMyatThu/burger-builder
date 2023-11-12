import React from 'react';

import classes from '../Order/Order.module.css';

export default function Order(props) {
  const ingredients = [];

  for (let igName in props.ingredients) {
    ingredients.push({ name: igName, amount: props.ingredients[igName] });
  }

  const ingredientOutput = ingredients.map(ig => (
    <span
      style={{
        textTransform: 'capitalize',
        display: 'inline-block',
        margin: '5px 8px',
        border: '1px solid #ccc',
        boxShadow: '0 2px 3px #ccc',
        padding: '5px'
      }}
      key={ig.name}
    >
      {ig.name} ({ig.amount})
    </span>
  ));
  return (
    <div className={classes.Order}>
      <p>Ingredients:<br/> {ingredientOutput}</p>
      <p>
        Total Price <strong>USD : {props.price.toFixed(2)} $</strong>
      </p>
    </div>
  );
}
