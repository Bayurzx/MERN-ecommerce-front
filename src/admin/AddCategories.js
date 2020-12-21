import React, { useState } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../authBE';
import { Link } from 'react-router-dom';
import { createCategory } from './apiAdmin';

const AddCategory = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  // destructuring user and info from localStorage
  const { user: { name : nam, _id }, token } = isAuthenticated();

  const handleChange = (event) => {
    setError('');
    setName(event.target.value);
  }

  const clickSubmit = (event) => {
    event.preventDefault();
    setError('')
    setSuccess(false);
    // make request ot api to create category
    createCategory(_id, token, { name })
    .then(data => {
      if (data.error) {
        setError(data.error);
      }
      else {
        setError("");
        setSuccess(true);
      }
    })
  }

  const showSuccess = () => {
    if (success) {
      return <h3 className="text-success">{ name } is created</h3>
    }
  }

  const showError = () => {
    if (error) {
      return <h3 className="text-danger">{ name } is already in use</h3>
    }
  };

  const goBack = () => (
    <div className="mt-5">
      <Link className="text-warning" to="/admin/dashboard">
        Back to Dashboard
      </Link>
    </div>
  )

  const newCateforyForm = () => (
    <form onSubmit= { clickSubmit }>
      <div className="form-group">
        <label htmlFor="" className="text-muted">Name</label>
        <input type="text" required className="form-control" onChange={ handleChange } value={ name } autoFocus />
      </div>
      <button className="btn btn-outline-primary">Create category</button>
    </form>
  )

  return (
    <Layout title="Add a new category" description={ `Hello ${nam}, add a category` }>
      <div className="row">
        <div className="col-md-8 offset-md-2">
          { showSuccess() }
          { showError() }
          { newCateforyForm() }
          { goBack() }
        </div>
      </div>
    </Layout>
  );

};

export default AddCategory;
