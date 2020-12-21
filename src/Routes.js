import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Signup from './auth/Signup';
import Signin from './auth/Signin';
import Home from './core/Home';
import PrivateRoute from './authBE/PrivateRoutes';
import AdminRoute from './authBE/AdminRoutes';
import Dashboard from './auth/UserDashboard';
import AdminDashboard from './auth/AdminDashboard';
import AddCategory from './admin/AddCategories';
import AddProduct from './admin/AddProduct';
import Orders from './admin/Orders';
import Shop from './core/Shop';
import Cart from './core/Cart';
import Product from './core/Product';
import Profile from './auth/Profile';
import ManageProducts from './admin/ManageProducts';
import UpdateProduct from './admin/UpdateProduct';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/shop" exact component={Shop} />
        <Route path="/cart" exact component={Cart} />
        <Route path="/product/:productId" exact component={Product} />
        <PrivateRoute path="/user/dashboard" exact component={Dashboard} />
        <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
        <AdminRoute path="/admin/orders" exact component={Orders} />
        <AdminRoute path="/create/category" exact component={AddCategory} />
        <AdminRoute path="/create/product" exact component={AddProduct} />
        <PrivateRoute path="/profile/:userId" exact component={Profile} />
        <AdminRoute path="/admin/products" exact component={ManageProducts} />
        <AdminRoute path="/admin/product/update/:productId" exact component={UpdateProduct} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes;
