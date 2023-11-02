import React from 'react';

import Auxilitary from '../../hoc/Auxilitary';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';

const Layout = props => (
  <Auxilitary>
    <Toolbar />
    <main className={classes.Content}>{props.children}</main>
  </Auxilitary>
);

export default Layout;
