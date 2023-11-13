import React from 'react'

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from '../CheckOutSummary/CheckOutSummary.module.css';

export default function CheckOutSummary(props) {
  return (
    <div className={classes.CheckOutSummary}>
        <h1>We hope it's tastes well!</h1>
        <div style={{width:'100%', margin:'auto'}}>
            <Burger ingredient={props.ingredient}/>
        </div>
        <Button btnType='Danger' clicked={props.checkoutCanceled}>BUILD-ANOTHER</Button>
        <Button btnType='Success' clicked={props.checkoutContinued}>CONTINUE</Button>
    </div>
  )
}
