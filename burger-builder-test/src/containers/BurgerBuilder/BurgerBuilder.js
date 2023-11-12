import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Auxilitary from '../../hoc/Auxilitary/Auxilitary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import axios from '../../axios-order';

const INGREDIENT_PRICE = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.4,
  bacon: 0.7,
};

const BurgerBuilder = props => {
  const [ingredient, setIngredient] = useState(null);
  const [totalPrice, setTotalPrice] = useState(4);
  const [purchasable, setPurchasable] = useState(false);
  const [purchasing, setPurchasing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        '/ingredient.json',
      )
      .then(response => setIngredient(response.data))
      .catch(err => setError(true));
  }, [props.match, props.history]);

  useEffect(() => {
    if (ingredient) {
      const sum = Object.keys(ingredient)
        .map(igKey => ingredient[igKey])
        .reduce((sum, el) => sum + el, 0);
      setPurchasable(sum > 0);
    }
  }, [ingredient]);

  const addIngredientHandler = type => {
    const oldCount = ingredient[type];
    const updatedCount = oldCount + 1;
    const updatedIngredient = { ...ingredient };
    updatedIngredient[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICE[type];
    const newPrice = totalPrice + priceAddition;

    setTotalPrice(newPrice);
    setIngredient(updatedIngredient);
  };

  const removeIngredientHandler = type => {
    const oldCount = ingredient[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredient = { ...ingredient };
    updatedIngredient[type] = updatedCount;
    const priceDeduction = INGREDIENT_PRICE[type];
    const newPrice = totalPrice - priceDeduction;

    setTotalPrice(newPrice);
    setIngredient(updatedIngredient);
  };

  const purchasingHandler = () => {
    setPurchasing(true);
  };

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  };

  const purchaseContinueHandler = () => {
    navigate('/checkout', { state: { ingredient , totalPrice}});
  };

  const disableInfo = { ...ingredient };
  for (const key in disableInfo) {
    disableInfo[key] = disableInfo[key] <= 0;
  }

  let orderSummary = null;

  if (loading) {
    orderSummary = <Spinner />;
  }

  let burger = error ? (
    <p style={{ textAlign: 'center' }}>
      Ingredients can't be loaded.
      <br /> Something went wrong!! 
      <br /> Plz check internet
    </p>
  ) : (
    <Spinner />
  );

  if (ingredient) {
    burger = (
      <Auxilitary>
        <Burger ingredient={ingredient} />
        <BuildControls
          ingredientAdded={addIngredientHandler}
          ingredientRemoved={removeIngredientHandler}
          disabled={disableInfo}
          price={totalPrice}
          purchasable={purchasable}
          ordered={purchasingHandler}
        />
      </Auxilitary>
    );

    if (!loading) {
      orderSummary = (
        <OrderSummary
          ingredient={ingredient}
          purchaseCancelled={purchaseCancelHandler}
          purchaseContinued={purchaseContinueHandler}
          price={totalPrice}
        />
      );
    }
  }

  return (
    <Auxilitary>
      <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
        {orderSummary}
      </Modal>
      {burger}
    </Auxilitary>
  );
};

export default WithErrorHandler(BurgerBuilder, axios);
