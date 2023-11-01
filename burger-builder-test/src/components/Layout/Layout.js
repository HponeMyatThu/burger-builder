import React from 'react';

import Auxilitary from '../../hoc/Auxilitary';
import classes from './Layout.module.css';

const Layout = props => (
  <Auxilitary>
    <div>ToolBar, SideDraw, Backdrop</div>
    <main className={classes.Content}>{props.children}</main>
  </Auxilitary>
);

export default Layout;
