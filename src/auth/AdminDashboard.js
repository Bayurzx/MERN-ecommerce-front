import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../core/Layout';
import { isAuthenticated } from '../authBE';

const AdminDashboard = () => {
  // flaw : The role can be changed in the client end ensure that you authenticate with token
  const { user: { _id, name, email, role } } = isAuthenticated();

  const adminInfo = () => {
    return (
      <div className="card mb-5">
        <h3 className="card-header">User Information</h3>
        <ul className="list-group">
          <li className="list-group-item">{name}</li>
          <li className="list-group-item">{email}</li>
          <li className="list-group-item">{role === 1 ? "Admin" : "Registered User" }</li>
        </ul>
      </div>

    )
  }


  const adminLinks = () => {
    return (
      <div className="card">
        <h4 className="card-header">Admin Links</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link className="nav-link" to="/create/category">Create category</Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to="/create/product">Create Product</Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to="/admin/orders">View Orders</Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to="/admin/products">Manage Products</Link>
          </li>
        </ul>
      </div>
    )
  }

  return (
    <Layout title="Admin Dashboard" description={`Hello ${name}!`} className="container-fluid">
      <div className="row">
        <div className="col-3">
          {adminLinks()}
        </div>
        <div className="col-9">
          {adminInfo()}
        </div>
      </div>
    </Layout>
  )
}

export default AdminDashboard;
