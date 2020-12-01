import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Layout from '../core/Layout';
import { signin, authenticate, isAuthenticated } from '../authBE';

const Signin = () => {
  // useState
  const [value, setValue] = useState({
    email: '',
    password: '',
    error: '',
    loading: false,
    redirectToReferrer: false

  });

  const { email, password, error, loading, redirectToReferrer } = value;
const { user } = isAuthenticated()


  const handleChange = theInput => event => {
    setValue({ ...value, error: false, [theInput]: event.target.value })
  }

  const clickSubmit = (event) => {
    event.preventDefault();
    setValue({ ...value, error: false, loading: true });
    signin({ email, password })
    .then(data => {
      if (data.error) {
        setValue({ ...value, error: data.error, loading: false })
      } else {
        authenticate(data, () => {
          setValue({
            ...value,
            redirectToReferrer: true
          });
        });
      }
    });
  };

  // Form variable component
  const signInForm = () => (
    <form>
      <div className="form-group">
        <label htmlFor="" className="text-muted">Email</label>
      <input type="email" value ={email} className="form-control" onChange={ handleChange('email') } />
      </div>
      <div className="form-group">
        <label htmlFor="" className="text-muted">Password</label>
      <input type="password" value ={password} className="form-control" onChange={ handleChange('password') } />
      </div>
      <button className="btn btn-primary" onClick={clickSubmit}>Submit</button>
    </form>
  )

  const showError = () => (
      <div className="alert alert-danger" style={{ display: error ? "" : "none" }}>
        { error }
      </div>
  )

  const showLoading = () => (
    loading && (
      <div className="alert alert-info">
        <h2>Loading...</h2>
      </div>
    )
  );

  const redirectUser = () => {
    if (redirectToReferrer) {
      if ( user && user.role  === 1) {
        return <Redirect to="/admin/dashboard" />;
      }else {
        return <Redirect to="/user/dashboard" />;
      }
    }
    if (isAuthenticated()) {
      return <Redirect to="/user/dashboard" />;
    }
  };

  return (
    <Layout title="Signin Page" description="Node React E-commerce App" className="container col-md-8">

      <div className="jumbotron" style={{ backgroundColor: '#c7e0f2'}}>
        { showLoading() }
        { showError() }
        { signInForm() }
        { redirectUser() }
        <span>{JSON.stringify(value)}</span>

      </div>
    </Layout>
  )
}

export default Signin;
