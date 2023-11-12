import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import CheckOut from './containers/CheckOut/CheckOut';
import ContactData from './containers/CheckOut/ContactData/ContactData';
import Orders, { orderLoader } from './containers/Orders/Orders';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Routes>
            <Route path='/' exact  element={<BurgerBuilder />} />
            <Route path='/checkout/*' element={<CheckOut />} />
            <Route path='/order' element={<Orders />}/>
            {/* <Route path='/checkout/contact-data' element={<ContactData />} /> */}
          </Routes>
        </Layout>
      </div>
    );
  }
}

export default App;
