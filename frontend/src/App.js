import React, { useState } from 'react';
import {
  Route,
  Routes,
} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//layouts
import Navbar from './components/layouts/Navbar';

//pages
import Home from './components/pages/Home';
import SignIn from './components/pages/auth/SignIn';
import SignUp from './components/pages/auth/SignUp';
import SignUpSeller from './components/pages/auth/SignUpSeller';
import Product from './components/pages/Product';

// pages admin
import HomeAdmin from "./components/pages/admin/Home";
import ManageAdmin from './components/pages/admin/ManageAdmin';
import Category from './components/pages/admin/Category';
import Payment from './components/pages/admin/payment/Payment';

//pages seller
import HomeSeller from "./components/pages/seller/Home";
import CreateProduct from './components/pages/seller/product/CreateProduct';
import UpdateProduct from './components/pages/seller/product/UpdateProduct';
import ProductSeller from './components/pages/seller/product/Product';
import PaymentSeller from './components/pages/seller/payment/Payment';


// pages user
import HomeUser from "./components/pages/user/Home";
import WalletUser from "./components/pages/user/wallet/Wallet";

// functions
import { currentUser } from "./components/functions/auth";

// redux
import { useDispatch } from "react-redux";

// Routes
import UserRoute from "./components/routes/UserRoute";
import AdminRoute from "./components/routes/AdminRoute";
import SellerRoute from './components/routes/SellerRoute';

//antd
import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;


function App() {
  const dispatch = useDispatch();
  const idtoken = localStorage.token;

  if (idtoken) {
    currentUser(idtoken)
      .then((res) => {
        //code
        dispatch({
          type: "LOGIN",
          payload: {
            token: idtoken,
            email: res.data.email,
            username: res.data.username,
            role: res.data.role,
            walletUser: res.data.walletUser
          },
        });
      })
      .catch((err) => {
        //err
        console.log(err.message);
      });
  }


  return (
    <div className="App">
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/register-seller" element={< SignUpSeller />} />
        <Route path="/login" element={<SignIn />} />
        {/* admin */}
        <Route
          path="/admin/index"
          element={
            <AdminRoute>
              <HomeAdmin />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/manage-admin"
          element={
            <AdminRoute>
              <ManageAdmin />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/category"
          element={
            <AdminRoute>
              <Category />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/payment"
          element={
            <AdminRoute>
              <Payment />
            </AdminRoute>
          }
        />
        {/* seller */}
        <Route
          path="/seller/index"
          element={
            <SellerRoute>
              <HomeSeller />
            </SellerRoute>
          }
        />
        <Route
          path="/seller/product"
          element={
            <SellerRoute>
              <ProductSeller />
            </SellerRoute>
          }
        />
        <Route
          path="/seller/create-product"
          element={
            <SellerRoute>
              <CreateProduct />
            </SellerRoute>
          }
        />
        <Route
          path="/seller/update-product/:id"
          element={
            <SellerRoute>
              <UpdateProduct />
            </SellerRoute>
          }
        />
        <Route
          path="/seller/payment"
          element={
            <SellerRoute>
              <PaymentSeller />
            </SellerRoute>
          }
        />
        {/* user */}
        <Route
          path="/user/index"
          element={
            <UserRoute>
              <HomeUser />
            </UserRoute>
          }
        />
        <Route
          path="/user/wallet"
          element={
            <UserRoute>
              <WalletUser />
            </UserRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
