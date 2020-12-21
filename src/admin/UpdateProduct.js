import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../authBE';
import { Link, Redirect } from 'react-router-dom';
import { getOneProduct, getCategories, updateProduct } from './apiAdmin';

const UpdateProduct = ({match: {params}}) => {

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
    error: false,
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

  const init = (productId) => {
    getOneProduct(productId).then(data => {
      if (data.error) {
        setValues({...values, error: data.error})
      } else {
        // populate the state
        setValues({
          ...values,
          name: data.name,
          description: data.description,
          price: data.price,
          category: data.category._id,
          shipping: data.shipping,
          quantity: data.quantity,
          formData: new FormData()
        })
        // load categories
        initCategories()
      }
    })
  }

  // loAD CATEGORIES AND SET FORM data
  const initCategories = () => {
    getCategories().then(response => {
      if (response.error) {
        setValues({...values, error: response.error})
      } else {
        setValues({ categories: response, formData: new FormData()})
      }
    })
  }

  useEffect(() => {
    init(params.productId)
  }, [])

  const handleChange = key => event => {
    const value = key === 'photo' ? event.target.files[0] : event.target.value
    formData.set(key, value)
    setValues({
      ...values,
      [key]: value
    })
  }

  const clickSubmit = (event) => {
    setValues({...values, error: '', loading: true})
    event.preventDefault();

    updateProduct(params.productId, user._id, token, formData).then(data => {
      // if you find any error and was not properly returned, you
      // It might be due to change in "product model" not well exchanged
      if(data.error) {
        setValues({...values, error: data.error})
        console.log("data.error", data.error)
      } else {
        setValues({
          ...values,
          name: '',
          description: '',
          photo: '',
          price: '',
          error: false,
          quantity: '',
          loading: false,
          redirectToProfile: true,
          createdProduct: data.name
        })
      }
    })
  };

  const productForm = () => {
    return (
      <form onSubmit={ clickSubmit } className="mb-3">
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
          <input type="text" className="form-control" value={price} onChange={ handleChange('price') }/>
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
        <button className="btn btn-outline-primary">Update Product</button>
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
        <h2>{ `${createdProduct} was updated successfully!` }</h2>
      </div>
  )

  const showLoading = () => (
    loading && (
      <div className="alert alert-success">
        <h2>Loading...</h2>
      </div>
    )
  )

  const redirectUser = () => {
    if (redirectToProfile) {
      if (!error) {
        return <Redirect to='/' />
      }
    }
  }

// The reurn page
  return (

      <Layout title="Update Product" description={ `Hello ${user.name}, update a product` }>
        <div className="row">
          <div className="col-md-8 offset-md-2">
            { showError() }
            { showSuccess() }
            { showLoading() }
            { productForm() }
            { redirectUser() }
          </div>
        </div>
      </Layout>
  )

};

export default UpdateProduct;
