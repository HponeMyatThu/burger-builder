import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import Auxilitary from '../../hoc/Auxilitary/Auxilitary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import axios from '../../axios-order';
import * as actionType from '../../store/action';

const BurgerBuilder = props => {
  const [purchasable, setPurchasable] = useState(false);
  const [purchasing, setPurchasing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // axios
    //   .get(
    //     '/ingredient.json',
    //   )
    //   .then(response => setIngredient(response.data))
    //   .catch(err => setError(true));
  }, [props.match, props.history]);

  useEffect(() => {
    if (props.ings) {
      const sum = Object.keys(props.ings)
        .map(igKey => props.ings[igKey])
        .reduce((sum, el) => sum + el, 0);
      setPurchasable(sum > 0);
    }
  }, [props.ings]);

  const purchasingHandler = () => {
    setPurchasing(true);
  };

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  };

  const purchaseContinueHandler = () => {
    navigate('/checkout', {state: {ingredient: props.ings, totalPrice: props.price}});
  };

  const disableInfo = { ...props.ings };
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

  if (props.ings) {
    burger = (
      <Auxilitary>
        <Burger ingredient={props.ings} />
        <BuildControls
          ingredientAdded={props.onIngredientAdded}
          ingredientRemoved={props.onIngredientRemoved}
          disabled={disableInfo}
          price={props.price}
          purchasable={purchasable}
          ordered={purchasingHandler}
        />
      </Auxilitary>
    );

    if (!loading) {
      orderSummary = (
        <OrderSummary
          ingredient={props.ings}
          purchaseCancelled={purchaseCancelHandler}
          purchaseContinued={purchaseContinueHandler}
          price={props.price}
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

const mapStateToProps = state => {
  return{
    ings: state.ingredient,
    price: state.totalPrice
  }
}

const mapDispatchToProps = dispatch => {
  return{
    onIngredientAdded: (igName) => dispatch({type: actionType.ADD_INGREDIENT, ingredientName: igName}),
    onIngredientRemoved: (igName) => dispatch({type: actionType.REMOVE_INGREDIENT, ingredientName: igName})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(BurgerBuilder, axios));
