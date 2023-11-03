import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from '../SideDrawer/SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Auxilitary from '../../../hoc/Auxilitary';

const SideDrawer = props => {
    let attachedClass = [classes.SideDrawer, classes.Close];
    if(props.opened){
        attachedClass = [classes.SideDrawer, classes.Open]
    }
  return (
    <Auxilitary>
      <Backdrop show={props.opened} clicked={props.closed}/>
      <div className={attachedClass.join(' ')}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Auxilitary>
  );
};

export default SideDrawer;
