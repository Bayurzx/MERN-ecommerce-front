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
import Shop from './core/Shop';


const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/signin" exact component={Signin} />
        <PrivateRoute path="/user/dashboard" exact component={Dashboard} />
        <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
        <AdminRoute path="/create/category" exact component={AddCategory} />
        <AdminRoute path="/create/product" exact component={AddProduct} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes;
