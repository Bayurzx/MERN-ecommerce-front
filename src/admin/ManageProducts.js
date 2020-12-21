import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../authBE';
import { Link } from 'react-router-dom';
import { getProducts, deleteProduct } from './apiAdmin';


const ManageProducts = () => {
  const { user: { name : nam, _id }, token } = isAuthenticated();
  const [products, setProducts] = useState([])

  const loadProducts = () => {
    getProducts().then(response => {
      if (response.error) {
        console.log(response.error);
      } else {
        setProducts(response)
      }
    })
  }

  const destroy = (productId) => {
    deleteProduct(productId, _id, token).then(data => {
      if (data.error) {
        console.log(data.error)
      } else {
        loadProducts()
      }
    })
  }

  useEffect(() => {
    loadProducts()
  }, [])

  return (
    <Layout title="Manage Products" description={ `Hello ${nam}, you can perform CRUD operations on products` }>
      <div className="row">
        <div className="col-12">
          <h2 className="text-center">Total: {products.length}</h2>
          <ul className="list-group">
            {products.map((p, i) => (
              <li key={i} className="list-group-item d-flex justify-content-between align-items-center">
                <strong>{p.name}</strong>
                <Link to={`/admin/product/update/${p._id}`}>
                  <span className="badge badge-warning badge-pill">
                    Update
                  </span>
                </Link>
                <span onClick={() => {destroy(p._id)}} className="badge badge-danger badge-pill">
                  Delete
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );

};

export default ManageProducts;
