import React from 'react';

import classes from '../Modal/Modal.module.css';
import Auxilitary from '../../../hoc/Auxilitary';
import Backdrop from '../Backdrop/Backdrop';

const Model = props => (
  <Auxilitary>
    <Backdrop show={props.show} clicked={props.modalClosed}/>
    <div
      className={classes.Modal}
      style={{
        transform: props.show ? 'translateY(0%)' : 'translateY(-100%)',
        opacity: props.show ? '1' : '0',
      }}
    >
      {props.children}
    </div>
  </Auxilitary>
);

export default Model;
