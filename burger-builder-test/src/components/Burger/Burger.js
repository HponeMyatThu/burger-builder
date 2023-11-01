import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger = props => {
  let transformedIngredients = props.ingredient
    ? Object.keys(props.ingredient)
        .map((igKey, index) => {
          return [...Array(props.ingredient[igKey])].map((_, i) => {
            return <BurgerIngredient key={igKey + i + index} type={igKey} />;
          });
        })
        .reduce((arr, el) => {
          return arr.concat(el);
        }, [])
    : [];

    if(transformedIngredients.length === 0){
      transformedIngredients = <p>Please add ingredient</p>
    }

  console.log('trans', transformedIngredients);
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type='bread-top' />
      {transformedIngredients}
      <BurgerIngredient type='bread-bottom' />
    </div>
  );
};

export default Burger;
