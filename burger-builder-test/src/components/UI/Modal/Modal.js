import React from 'react';
import classes from '../Modal/Modal.module.css';

const Model = props => (
  <div
    className={classes.Modal}
    style={{
      transform: props.show ? 'translateY(0%)' : 'translateY(-100%)',
      opacity: props.show ? '1' : '0',
    }}
  >
    {props.children}
  </div>
);

export default Model;
