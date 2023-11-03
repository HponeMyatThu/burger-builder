import React,{ Component } from 'react';

import classes from '../Modal/Modal.module.css';
import Auxilitary from '../../../hoc/Auxilitary';
import Backdrop from '../Backdrop/Backdrop';

class Model extends Component{

  shouldComponentUpdate(nextProps, prevState){
    console.log("next",nextProps.show);
    console.log('props', this.props.show, nextProps.show !== this.props.show)
    return nextProps.show !== this.props.show;
  }

  componentWillUpdate(){
    console.log('[Model.js] componentWillUpdate');
  }

  render(){
    return (
      <Auxilitary>
    <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
    <div
      className={classes.Modal}
      style={{
        transform: this.props.show ? 'translateY(0%)' : 'translateY(-100%)',
        opacity: this.props.show ? '1' : '0',
      }}
    >
      {this.props.children}
    </div>
  </Auxilitary>
    )
  }
}

export default Model;
