import React from 'react';

import classes from '../SideDrawerToggle/SideDrawerToggle.module.css';

const SideDrawerToggle = props => (
  <div className={classes.SideDrawerToggle} onClick={props.clicked}>
    <div></div>
    <div></div>
    <div></div>
  </div>
);

export default SideDrawerToggle;
