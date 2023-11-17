import React, { Component } from 'react';

import Model from '../../components/UI/Modal/Modal';
import Auxilitary from '../Auxilitary/Auxilitary';

const WithErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null,
    };

    componentWillMount() {
      this.reqInterceptor = axios.interceptors.request.use(req => {
        this.setState({ error: null });
        return req
      });
      this.resInterceptor = axios.interceptors.response.use(null, err => {
        this.setState({ error: err });
        return Promise.reject(err);
      });      
    }

    componentWillUnmount(){
        axios.interceptors.request.eject(this.reqInterceptor);
        axios.interceptors.response.eject(this.resInterceptor);
    }

    ErrorConfirmHandler = () => {
      this.setState({ error: null });
    };
    render() {
      return (
        <Auxilitary>
          <Model show={this.state.error} modalClosed={this.ErrorConfirmHandler}>
            {this.state.error ? this.state.error.message : null}
          </Model>
          <WrappedComponent {...this.props} />
        </Auxilitary>
      );
    }
  };
};

export default WithErrorHandler;
