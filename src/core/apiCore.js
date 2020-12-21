import { API } from '../config';
import queryString from 'query-string';

export const getProducts = (sortBy) => {
  return fetch(`${API}/products?sortBy=${sortBy}&order=desc&limit=6`, {
    method: "GET"
  })
  .then(result => result.json())
  .catch(error => console.log(error));
};

export const getCategories = () => {
  return fetch(`${API}/categories`, {
    method: "GET"
  })
  .then(result => result.json())
  .catch(error => console.log(error));
}

export const getFilteredProducts = (skip, limit, filters={}) => {
  const data = {
    limit,
    skip,
    filters
  }
  return fetch(`${API}/products/by/search`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
  .then(result => result.json())
  .catch(error => console.log(error));
};

export const list = (params) => {
  const query = queryString.stringify(params)

  return fetch(`${API}/products/search?${query}`, {
    method: "GET"
  })
  .then(response => response.json())
  .catch(error => console.log(error));
}

export const read = (productId) => {
  return fetch(`${API}/product/${productId}`, {
    method: "GET"
  })
  .then(result => result.json())
  .catch(error => console.log(error));
}

export const listRelated = (productId) => {
  return fetch(`${API}/products/related/${productId}`, {
    method: "GET"
  })
  .then(result => result.json())
  .catch(error => console.log(error));
}

export const getBraintreeClientToken = (userId, token) => {
  return fetch(`${API}/braintree/getToken/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  })
  .then(result => result.json())
  .catch(error => console.log(error));
}

export const processPayment = (userId, token, paymentData) => {
  return fetch(`${API}/braintree/payment/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(paymentData)
  })
  .then(result => result.json())
  .catch(error => console.log(error));
}


export const createOrder = (userId, token, createOrderData) => {
  return fetch(`${API}/order/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ order: createOrderData })
  })
  .then(result => result.json())
  .catch(error => console.log(error));
}
