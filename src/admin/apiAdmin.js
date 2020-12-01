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
