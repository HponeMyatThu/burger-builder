import * as actionType from '../store/action';

const initialState = {
  ingredient: {
    salad: 0,
    meat: 0,
    bacon: 0,
    cheese: 0,
  },
  totalPrice: 3,
};

const INGREDIENT_PRICE = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.4,
  bacon: 0.7,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.ADD_INGREDIENT:
      return {
        ...state,
        ingredient: {
          ...state.ingredient,
          [action.ingredientName]: state.ingredient[action.ingredientName] + 1,
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ingredientName],
      };
    case actionType.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredient: {
          ...state.ingredient,
          [action.ingredientName]: state.ingredient[action.ingredientName] - 1,
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICE[action.ingredientName],
      };
    default:
      return state;
  }
};

export default reducer;
