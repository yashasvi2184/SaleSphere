import React from "react"
import Header from "./component/layout/Header/Header.js"
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import WebFont from "webfontloader"
import { useEffect,useState } from "react";
import Footer from "./component/layout/Footer/Footer";
import Home from "./component/Home/Home.js";
import ProductDetails from "./component/Product/ProductDetails.js";
import Products from "./component/Product/Products.js"
import Search from "./component/Product/Search.js"
import LoginSignUp from "./component/User/LoginSignUp";
import store from "./Store";
import { loadUser } from "./actions/userAction";
import { useSelector } from "react-redux";
import "./App.css";
import UserOptions from "./component/layout/Header/UserOptions.js";
import Profile from "./component/User/Profile.js";
import ProtectedRoute from "./component/Route/ProtectedRoute.js";
import UpdateProfile from "./component/User/UpdateProfile.js";
import UpdatePassword from "./component/User/UpdatePassword.js";
import ForgotPassword from "./component/User/ForgotPassword.js";
import ResetPassword from "./component/User/ResetPassword.js";
import Cart from "./component/Cart/Cart.js";
import Shipping from "./component/Cart/Shipping.js";
import ConfirmOrder from "./component/Cart/ConfirmOrder.js";
import axios from "axios";
import Payment from "./component/Cart/Payment.js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./component/Cart/OrderSuccess.js";
import MyOrders from "./component/Order/MyOrders.js";
import OrderDetails from "./component/Order/OrderDetails.js";
import Dashboard from "./component/Admin/Dashboard.js";
import ProductList from "./component/Admin/ProductList.js";
import NewProduct from "./component/Admin/NewProduct.js";
import UpdateProduct from "./component/Admin/UpdateProduct.js";
import OrderList from "./component/Admin/OrderList.js";
import ProcessOrder from "./component/Admin/ProcessOrder.js";
import UsersList from "./component/Admin/UsersList.js";
import UpdateUser from "./component/Admin/UpdateUser.js";
import ProductReviews from "./component/Admin/ProductReviews.js";
import Contact from "./component/layout/Contact/Contact.js";
import About from "./component/layout/About/About.js";
import NotFound from "./component/layout/Not Found/NotFound.js";

const App=()=>{
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    })
    store.dispatch(loadUser())
    getStripeApiKey()
  },[]);
  //window.addEventListener("contextmenu", (e) => e.preventDefault());
  return(<>
  <BrowserRouter>
    <Header/>
    {isAuthenticated && <UserOptions user={user} />}
    {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
        <Routes>
       {  isAuthenticated  && < Route exact path="/process/payment" element={<Payment/>}/>}
       </Routes>
        </Elements>
      )}
    <Routes>
    <Route exact path="/" element={<Home />} />
    <Route exact path="/product/:id" element={<ProductDetails />} />
    <Route exact path="/products" element={<Products />} />
    <Route path="/products/:keyword" element={<Products/>} />
    <Route exact path="/search" element={<Search />} />
    <Route exact path="/login" element={<LoginSignUp/>} />
    <Route exact path="/contact" element={<Contact/>} />

    <Route exact path="/about" element={<About/>} />
     {isAuthenticated && <Route exact path="/account" element={<Profile/>}/>}
     {isAuthenticated &&<Route exact path="/me/update" element={<UpdateProfile/>} />}
     {isAuthenticated&& <Route
          exact
          path="/password/update"
          element={<UpdatePassword/>}
        />}
      <Route exact path="/password/forgot" element={<ForgotPassword/>} />
      <Route exact path="/password/reset/:token" element={<ResetPassword/>} />
      <Route exact path="/cart" element={<Cart/>} />
      {isAuthenticated&&<Route exact path="/shipping" element={<Shipping/>} />}
     {isAuthenticated&& <Route exact path="/order/confirm" element={<ConfirmOrder/>} />}
    
     {isAuthenticated&& <Route exact path="/success" element={<OrderSuccess/>} />}
    { isAuthenticated&&<Route exact path="/orders" element={<MyOrders/>} />}
    {isAuthenticated && <Route exact path="/order/:id" element={<OrderDetails/>} />
}
{isAuthenticated?<Route
        //  isAdmin={true}
          exact
          path="/admin/dashboard"
          element={<Dashboard/>}
        />:<Route exact path="/login"/>}

{isAuthenticated?<Route
        //  isAdmin={true}
          exact
          path="/admin/products"
          element={<ProductList/>}
        />:<Route exact path="/login"/>}


{isAuthenticated?<Route
        //  isAdmin={true}
          exact
          path="/admin/product/:id"
          element={<UpdateProduct/>}
        />:<Route exact path="/login"/>}


        {/* <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/dashboard"
          element={<Dashboard/>}
        /> */}
        
{isAuthenticated?<Route
        //  isAdmin={true}
          exact
          path="/admin/product"
          element={<NewProduct/>}
        />:<Route exact path="/login"/>}

{isAuthenticated?<Route
        //  isAdmin={true}
          exact
          path="/admin/orders"
          element={<OrderList/>}
        />:<Route exact path="/login"/>}

{isAuthenticated?<Route
        //  isAdmin={true}
          exact
          path="/admin/order/:id"
          element={<ProcessOrder/>}
        />:<Route exact path="/login"/>}

{isAuthenticated?<Route
        //  isAdmin={true}
          exact
          path="/admin/users"
          element={<UsersList/>}
        />:<Route exact path="/login"/>}

{isAuthenticated?<Route
        //  isAdmin={true}
          exact
          path="/admin/user/:id"
          element={<UpdateUser/>}
        />:<Route exact path="/login"/>}

{isAuthenticated?<Route
        //  isAdmin={true}
          exact
          path="/admin/reviews"
          element={<ProductReviews/>}
        />:<Route exact path="/login"/>}
          <Route
          element={
            window.location.pathname === "/process/payment" ? null : NotFound
          }
        />


    </Routes>
    
    <Footer/>
    </BrowserRouter>
  </>)
}
export default App;