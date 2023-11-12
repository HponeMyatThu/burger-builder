import React, { useState, useEffect } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';

function Orders() {
  const [state, setState] = useState({
    orders: [],
  });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('/orders.json');
        const fetchedOrders = [];
        console.log(response.data);
        for (let key in response.data) {
          fetchedOrders.push({
            ...response.data[key],
            id: key,
          });
        }
        setState({ orders: fetchedOrders });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setLoading(false);
        setError(true);
      }
    };
    fetchOrders();
  }, []);

  let ordersOutput = null;

  if (loading) {
    ordersOutput = <Spinner />;
  } else {
    ordersOutput = error ? (
      <p style={{ textAlign: 'center' }}>
        Cannot view orders <br /> Something went wrong!! <br /> Check internet connection.
      </p>
    ) : (
      (ordersOutput = state.orders.map(order => (
        <Order
          key={order.id}
          ingredients={order.ingredients}
          price={order.price}
        />
      )))
    );
  }

  return <div>{ordersOutput}</div>;
}

export default WithErrorHandler(Orders, axios);
