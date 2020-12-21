import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from './Layout';
import { getProducts, getBraintreeClientToken, processPayment, createOrder } from './apiCore';
import Card from './Card';
import { emptyCart } from './cartHelpers';
import {isAuthenticated} from '../authBE';
import DropIn from "braintree-web-drop-in-react";

const Checkout = ({ products }) => {
  const [data, setData] = useState({
    success: false,
    clientToken: null,
    error: '',
    instance: {},
    address: ''
  })

  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  const getToken = (userId, token) => {
    getBraintreeClientToken(userId, token).then(data => {
      if (data.error) {
        setData({...data, error: data.error})
      } else {
        setData({ clientToken: data.clientToken})
      }
    })
  }

  useEffect(() => {
    getToken(userId, token);
  }, [])

  const getTotal = () => {
    return products.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price
    }, 0)
  }

  const showCheckout = () => {
    return isAuthenticated() ? (
      <div className="">{showDropIn()}</div>
    ) : (
      <Link to='/signin'><button className="btn btn-primary">Signin first</button></Link>
    )
  }

  let deliveryAddress = data.address;

  const buy = () => {
    // send the nonce to server
    // nonce = data.instance.requestPaymentMethod()
    let nonce;
    let getNonce = data.instance.requestPaymentMethod().then(data => {
      // console.log(data)
      nonce = data.nonce
      //once you have nonce (card type, card nmber) send nonce as 'requestPaymentMethod'
      // and also total to be charged
      // console.log('send nonce and total to process:', nonce, getTotal(products));
      const paymentData = {
        paymentMethodNonce: nonce,
        amount: getTotal(products).toFixed(2)
      }
      // send the processed payment to the backend
      processPayment(userId, token, paymentData)
      .then(response => {
        console.log('response', response)
        const createOrderData = {
          products: products,
          transaction_id: response.transaction.id,
          amount: response.transaction.amount,
          address: deliveryAddress
        }

        createOrder(userId, token, createOrderData);

        //remember
        // empty cart
        // create order
        emptyCart(() => console.log("Payment success and cart emptied") )

        setData({ ...data, success: true })
        // had to reload still learning React
        window.location.reload(false);


      })
      .catch(error => console.log(error))

    })
    .catch(error => {
      // console.log('DropIn error: ', error)
      setData({...data, error: error.message})
    })
  }

  const handleAddress = (event) => {
    setData({...data, address: event.target.value})
  }

  const showDropIn = () => {
    return (
      <div onBlur = {() => setData({...data, error: ''})} >
        {data.clientToken !== null && products.length > 0 ? (
          <div>
            <div className="form-group mb-3">
              <label htmlFor="" className="text-muted">Delivery Address: </label>
              <textarea name="" id="" cols="30" rows="4" onChange={handleAddress} className="form-control" value={data.address} placeholder="Type the delivery address here"></textarea>
            </div>
            <DropIn options={{ authorization: data.clientToken, paypal: {flow: 'vault'} }} onInstance={ instance => (data.instance = instance) } />
            <button onClick={buy} className="btn btn-success btn-block">Pay!</button>
          </div>
        ): null}
      </div>
    )
  }

  const showError = (error) => (
    <div className="alert alert-danger" style={{display: error ? '' : 'none' }}>
      {error}
    </div>
  )

  const showSuccess = (success) => (
    <div className="alert alert-info" style={{display: success ? '' : 'none' }}>
      <h3>Payment successful!, Thank You!</h3>
    </div>
  )

  return (<div>
    <h2>Total: &#x20A6;{getTotal().toFixed(2)}</h2>

    { showError(data.error) }
    { showSuccess(data.success) }
    {showCheckout()}
  </div>)
}


export default Checkout;
