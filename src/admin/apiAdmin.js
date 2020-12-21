import { API } from '../config';

export const createCategory = (userId, token, category) => {

  return fetch(`${API}/category/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(category)
  })
  .then(result => result.json())
  .catch(error => console.log(error))
};

export const createProduct = (userId, token, product) => {

  return fetch(`${API}/product/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    },
    body: product
  })
  .then(result => result.json())
  .catch(error => console.log(error))
};

export const getCategories = () => {
  return fetch(`${API}/categories`, {
    method: "GET"
  })
  .then(result => result.json())
  .catch(error => console.log(error));
}

export const listOrders = (userId, token) => {
  return fetch(`${API}/order/list/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    }
  })
  .then(result => result.json())
  .catch(error => console.log(error));
}


export const getStatusValues = (userId, token) => {
  return fetch(`${API}/order/status-values/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    }
  })
  .then(result => result.json())
  .catch(error => console.log(error));
}

export const updateOrderStatus = (userId, token, orderId, status) => {
  return fetch(`${API}/order/${orderId}/status/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      'Content-Type': "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({status, orderId})
  })
  .then(result => result.json())
  .catch(error => console.log(error));
}


// Perform all CRDU operations for the ManageProducts component
export const getProducts = () => {
  return fetch(`${API}/products?limit=undefined`, {
    method: "GET"
  })
  .then(result => result.json())
  .catch(error => console.log(error));
}

export const deleteProduct = (productId, userId, token) => {
  return fetch(`${API}/product/${productId}/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      'Content-Type': "application/json",
      Authorization: `Bearer ${token}`
    }
  })
  .then(result => result.json())
  .catch(error => console.log(error));
}

export const getOneProduct = (productId) => {
  return fetch(`${API}/product/${productId}`, {
    method: "GET"
  })
  .then(result => result.json())
  .catch(error => console.log(error));
}

export const updateProduct = (productId, userId, token, product) => {
  return fetch(`${API}/product/${productId}/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    },
    body: product
  })
  .then(result => result.json())
  .catch(error => console.log(error));
}
