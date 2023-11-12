import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from '../ContactData/ContactData.module.css';
import axios from '../../../axios-order';

const ContactData = props => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: '',
    },
  });
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const orderHandler = event => {
    event.preventDefault();
    setLoading(true);

    const order = {
      ingredients: props.ingredient,
      price: props.price,
      customer: {
        name: 'Hpone Myat Thu',
        address: {
          street: '159',
          zipCode: '11211',
        },
        email: 'someone@example.com',
      },
      deliveryMethod: 'fastest',
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

  // const inputChangeHandler = (event, identifier) => {
  //   if (identifier.includes('address')) {
  //     setFormData({
  //       ...formData,
  //       address: {
  //         ...formData.address,
  //         [identifier.split('.')[1]]: event.target.value,
  //       },
  //     });
  //   } else {
  //     setFormData({
  //       ...formData,
  //       [identifier]: event.target.value,
  //     });
  //   }
  // };

  let form = (
    <form>
      <input
        className={classes.Input}
        type='text'
        name='name'
        placeholder='Your Name'
        // onChange={event => inputChangeHandler(event, 'name')}
      />
      <input
        className={classes.Input}
        type='email'
        name='email'
        placeholder='Your Mail'
        //onChange={event => inputChangeHandler(event, 'email')}
      />
      <input
        className={classes.Input}
        type='text'
        name='street'
        placeholder='Street'
        //onChange={event => inputChangeHandler(event, 'address.street')}
      />
      <input
        className={classes.Input}
        type='text'
        name='postal'
        placeholder='Postal Code'
        //onChange={event => inputChangeHandler(event, 'address.postalCode')}
      />
      <Button btnType='Success' clicked={orderHandler}>
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

export default ContactData;
