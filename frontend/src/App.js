import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Cart from "./components/cart/Cart";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./components/Home";
import ProductDetails from "./components/product/ProductDetails";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import { loadUser, updatePassword } from "./actions/userActions";
import store from "./store";
import Profile from "./components/user/Profile";
import ProtectedRoute from "./components/route/ProtectedRoute";
import UpdateProfile from "./components/user/UpdateProfile";
import UpdatePassword from "./components/user/UpdatePassword";
import ForgotPassword from "./components/user/ForgotPassword";
import Shipping from "./components/cart/Shipping";
import ConfirmOrder from "./components/cart/ConfirmOrder";
import axios from "axios";
import { useSelector } from "react-redux";
import Payment from "./components/cart/Payment";
//payment
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
//order imports
import OrderSuccess from "./components/cart/OrderSuccess";
import ListOrders from "./components/order/ListOrders";
import OrderDetails from "./components/order/OrderDetails";
//admin imports
import Dashboard from "./components/admin/Dashboard";
import ProductsList from "./components/admin/ProductList";
import OrdersList from "./components/admin/OrderList";
import NewProduct from "./components/admin/NewProduct";
import UpdateProduct from "./components/admin/UpdateProduct";
import ProcessOrder from "./components/admin/ProcessOrder";
import UsersList from "./components/admin/UserList";
import UpdateUser from "./components/admin/UpdateUser";
import ProductReviews from "./components/admin/ProductReviews";

function App() {
  const [stripeApiKey, setStripeApiKey] = useState("");

  useEffect(() => {
    store.dispatch(loadUser());
    async function getStripeApiKey() {
      const { data } = await axios.get("/api/v1/stripe-api");
      setStripeApiKey(data.stripeApiKey);
    }
    getStripeApiKey();
  }, []);

  const { user, loading } = useSelector((state) => state.auth);
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="container container-fluid">
          <Route exact path="/" component={Home} />
          <Route exact path="/search/:keyword" component={Home} />
          <Route exact path="/product/:id" component={ProductDetails} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/password/forgot" component={ForgotPassword} />
          <ProtectedRoute
            path="/password/update"
            component={UpdatePassword}
            exact
          />
          <ProtectedRoute exact path="/me" component={Profile} />
          <ProtectedRoute exact path="/me/update" component={UpdateProfile} />
          <ProtectedRoute
            exact
            path="/password/update"
            component={UpdatePassword}
          />
          <ProtectedRoute exact path="/shipping" component={Shipping} />
          <ProtectedRoute
            exact
            path="/order/confirm"
            component={ConfirmOrder}
          />
          {stripeApiKey && (
            <Elements stripe={loadStripe(stripeApiKey)}>
              <ProtectedRoute exact path="/payment" component={Payment} />
            </Elements>
          )}
          <ProtectedRoute exact path="/success" component={OrderSuccess} />
          <ProtectedRoute exact path="/orders/me" component={ListOrders} />
          <ProtectedRoute exact path="/order/:id" component={OrderDetails} />

          <Route exact path="/cart" component={Cart} />
        </div>
        <ProtectedRoute
          exact
          path="/dashboard"
          isAdmin={true}
          component={Dashboard}
        />
        <ProtectedRoute
          exact
          path="/admin/products"
          isAdmin={true}
          component={ProductsList}
        />
        <ProtectedRoute
          exact
          path="/admin/orders"
          isAdmin={true}
          component={OrdersList}
        />
        <ProtectedRoute
          exact
          path="/admin/product"
          isAdmin={true}
          component={NewProduct}
        />
        <ProtectedRoute
          exact
          path="/admin/product/:id"
          isAdmin={true}
          component={UpdateProduct}
        />
        <ProtectedRoute
          exact
          path="/admin/order/:id"
          isAdmin={true}
          component={ProcessOrder}
        />
        <ProtectedRoute
          exact
          path="/admin/users"
          isAdmin={true}
          component={UsersList}
        />
        <ProtectedRoute
          exact
          path="/admin/user/:id"
          isAdmin={true}
          component={UpdateUser}
        />
        <ProtectedRoute
          exact
          path="/admin/reviews"
          isAdmin={true}
          component={ProductReviews}
        />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
