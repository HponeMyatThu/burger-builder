import React, { Component } from 'react';

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

class BurgerBuilder extends Component {
  state = {
    ingredient: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false,
  };

  componentDidMount() {
    axios
      .get(
        'https://react-my-burger-5bbfd-default-rtdb.asia-southeast1.firebasedatabase.app/ingredient.json',
      )
      .then(response => this.setState({ ingredient: response.data }))
      .catch(err => this.setState({error: true}));
  }

  updatePurchaseState(ingredient) {
    const sum = Object.keys(ingredient)
      .map(igKey => {
        return ingredient[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    this.setState({ purchasable: sum > 0 });
  }

  addIngredientHandler = type => {
    const oldCount = this.state.ingredient[type];
    const updatedCount = oldCount + 1;
    const updatedIngredient = {
      ...this.state.ingredient,
    };
    updatedIngredient[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICE[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({ totalPrice: newPrice, ingredient: updatedIngredient });
    this.updatePurchaseState(updatedIngredient);
  };

  removeIngredientHandler = type => {
    const oldCount = this.state.ingredient[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredient = {
      ...this.state.ingredient,
    };
    updatedIngredient[type] = updatedCount;
    const priceDeduction = INGREDIENT_PRICE[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    this.setState({ totalPrice: newPrice, ingredient: updatedIngredient });
    this.updatePurchaseState(updatedIngredient);
  };

  purchasingHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    //alert('You continue!');
    this.setState({ loading: true });
    const order = {
      ingredient: this.state.ingredient,
      price: this.state.totalPrice,
      customer: {
        name: 'HponeMyatThu',
        address: {
          street: 'testStreet',
          zipCode: '11211',
          country: 'Germany',
        },
        email: 'Test@gmail.com',
      },
      delivaryMethod: 'fastest',
    };
    axios
      .post('orders.json', order)
      .then(response => {
        this.setState({ loading: false, purchasing: false });
        console.log(response.data);
      })
      .catch(err => {
        this.setState({ loading: false, purchasing: false });
      });
  };

  render() {
    const disableInfo = {
      ...this.state.ingredient,
    };
    for (const key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }

    let orderSummary = null;

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    let burger = this.state.error ? <p style={{textAlign: 'center'}}>Ingredients can't be loaded.<br/> Plz check internet</p> : <Spinner />;
    if (this.state.ingredient) {
      burger = (
        <Auxilitary>
          <Burger ingredient={this.state.ingredient} />
          <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabled={disableInfo}
            price={this.state.totalPrice}
            purchasable={this.state.purchasable}
            ordered={this.purchasingHandler}
          />
        </Auxilitary>
      );
      if (!this.state.loading) {
        orderSummary = (
          <OrderSummary
            ingredient={this.state.ingredient}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
            price={this.state.totalPrice}
          />
        );
      }
    }
    return (
      <Auxilitary>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Auxilitary>
    );
  }
}

export default WithErrorHandler(BurgerBuilder, axios);
