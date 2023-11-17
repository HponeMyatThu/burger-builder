import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from '../ContactData/ContactData.module.css';
import axios from '../../../axios-order';
import Input from '../../../components/Input/Input';

const ContactData = props => {
  const [formData, setFormData] = useState({
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Zip Code',
        },
        value: '',
        validation: {
          required: true,
          // minLength: 5,
          // maxLength: 5,
        },
        valid: false,
        touched: false,
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your E-Mail',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'fastest', displayValue: 'Fastest' },
            { value: 'cheapest', displayValue: 'Cheapest' },
          ],
        },
        validation: {},
        valid: true,
        value: 'fastest',
      },
    },
  });

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);

  const orderHandler = event => {
    event.preventDefault();
    setLoading(true);

    const fData = {};
    for (let id in formData.orderForm) {
      fData[id] = formData.orderForm[id].value;
    }

    const order = {
      ingredients: props.ings,
      price: props.price,
      orderData: fData,
    };

    axios
      .post('/orders.json', order)
      .then(response => {
        setLoading(false);
        navigate('/');
        console.log(response.data);
      })
      .catch(error => {
        setLoading(false);
      });
  };

  function checkValidity(value, rule) {
    let isValid = true;

    if (!rule) {
      return true;
    }

    if (rule.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rule.minLength) {
      isValid = value.trim() >= rule.minLength && isValid;
    }

    if (rule.maxLength) {
      isValid = value.trim() <= rule.maxLength && isValid;
    }

    return isValid;
  }

  const inputChangeHandler = (event, identifier) => {
    const updatedOrderForm = { ...formData.orderForm };
    const updatedFormElement = { ...updatedOrderForm[identifier] };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation,
    );
    updatedFormElement.touched = true;
    updatedOrderForm[identifier] = updatedFormElement;

    let formIsValid = true;
    for (let inputIDs in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIDs].valid && formIsValid;
    }
    setFormData({ orderForm: updatedOrderForm });
    setFormIsValid(formIsValid);
  };

  const formElementArray = [];
  for (let key in formData.orderForm) {
    formElementArray.push({
      id: key,
      config: formData.orderForm[key],
    });
  }
  let form = (
    <form onSubmit={orderHandler}>
      {formElementArray.map(formElement => (
        <Input
          id={formElement.id}
          key={formElement.id} 
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          placeholder={formElement.config.value}
          invalid={!formElement.config.valid}
          shouldValidation={formElement.config.validation}
          touched={formElement.config.touched}
          changed={event => inputChangeHandler(event, formElement.id)}
        />
      ))}
      <Button btnType='Success' disabled={!formIsValid}>
        ORDER
      </Button>
    </form>
  );

  if (loading) {
    form = <Spinner />;
  }

  return (
    <div className={classes.ContactData}>
      <h4>Enter your Contact Data</h4>
      {form}
    </div>
  );
};

const mapStateToProps = state => {
  return{
    ings: state.ingredient,
    price: state.totalPrice
  }
}

export default connect(mapStateToProps)(ContactData);
