import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../authBE';
import { Link } from 'react-router-dom';
import { createProduct, getCategories } from './apiAdmin';

const AddProduct = () => {

  const { user , token } = isAuthenticated();
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    categories: [],
    category: "",
    shipping: "",
    quantity: "",
    photo: "",
    loading: false,
    error: "",
    createdProduct: "",
    redirectToProfile: false,
    formData: ""
  })

  const { name,
    description,
    price,
    categories,
    category,
    shipping,
    quantity,
    photo,
    loading,
    error,
    createdProduct,
    redirectToProfile,
    formData } = values;

  // loAD CATEGORIES AND SET FORM data
  const init = () => {
    getCategories().then(data => {
      if (data.error) {
        setValues({...values, error: data.error})
      } else {
        setValues({...values, categories: data, formData: new FormData()})
      }
    })
  }

  useEffect(() => {
    init()
  }, [])

  const handleChange = key => event => {
    const value = key === 'photo' ? event.target.files[0] : event.target.value
    formData.set(key, value)
    setValues({
      ...values,
      [key]: value
    })
  }

  const clickSumbit = (event) => {
    setValues({...values, error: '', loading: true})
    event.preventDefault();

    createProduct(user._id, token, formData)
    .then(data => {
      if(data.error) {
        setValues({...values, error: data.error})
      } else {
        setValues({
          ...values,
          name: '',
          description: '',
          photo: '',
          price: '',
          error: "",
          quantity: '',
          loading: false,
          createdProduct: data.name
        })
      }
    })
  };

  const productForm = () => {
    return (
      <form onSubmit={ clickSumbit } className="mb-3">
        <h4>Post Photo</h4>
        <div className="form-group">
          <label className="btn btn btn-secondary">
            <input type="file" onChange={ handleChange('photo') } name="photo" accept="image/*" />
          </label>
        </div>
        <div className="form-group">
          <label className="text-muted">Name</label>
          <input type="text" className="form-control" value={name} onChange={ handleChange('name') }/>
        </div>
        <div className="form-group">
          <label className="text-muted">Description</label>
          <textarea type="text" className="form-control" value={description} onChange={ handleChange('description') }/>
        </div>
        <div className="form-group">
          <label className="text-muted">Price</label>
          <input type="number" className="form-control" value={price} onChange={ handleChange('price') }/>
        </div>
        <div className="form-group">
          <label className="text-muted">Quantity</label>
          <input type="number" className="form-control" value={quantity} onChange={ handleChange('quantity') }/>
        </div>
        <div className="form-group">
          <label className="text-muted">Category</label>
          <select className="form-control" onChange={ handleChange('category') }>
            <option>Please Select...</option>
            { categories && categories.map(
              (c, i) => (
                <option value={c._id} key={i}>{c.name}</option>
              )
            ) }
          </select>
        </div>
        <div className="form-group">
          <label className="text-muted">Shipping</label>
          <select className="form-control" onChange={ handleChange('shipping') }>
            <option>Please Select...</option>
            <option value="0">No</option>
            <option value="1">Yes</option>
          </select>
        </div>
        <button className="btn btn-outline-primary">Create Product</button>
      </form>
    )
  }

  const showError = () => (
      <div className="alert alert-danger" style={{ display: error ? "" : "none" }}>
        { error }
      </div>
  )

  const showSuccess = () => (
      <div className="alert alert-info" style={{ display: createdProduct ? "" : "none" }}>
        <h2>{ `${createdProduct} was created successfully!` }</h2>
      </div>
  )

  const showLoading = () => (
    loading && (
      <div className="alert alert-success">
        <h2>Loading...</h2>
      </div>
    )
  )

// The reurn page
  return (

      <Layout title="Add a new product" description={ `Hello ${user.name}, add a product` }>
        <div className="row">
          <div className="col-md-8 offset-md-2">
            { showError() }
            { showSuccess() }
            { showLoading() }
            { productForm() }
          </div>
        </div>
      </Layout>
  )

};

export default AddProduct;
