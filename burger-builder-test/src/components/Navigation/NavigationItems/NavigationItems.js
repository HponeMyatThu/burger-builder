import React from "react";

import classes from '../NavigationItems/NavigationItems.module.css';
import NavigationItem from "./NavigationItem/NavigationItem";

const NavigationItems = () => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link='/' exact>Burger-Builder</NavigationItem>
        <NavigationItem link='/order'>Order</NavigationItem>
    </ul>
);

export default NavigationItems;