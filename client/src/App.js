import Nav from './components/Nav'
import Register from './components/Register'
import Account from './components/Account'
import OrderDetail from './components/OrderDetail'
import Cart from './components/Cart'
import CheckOut from './components/CheckOut'
import CheckOutDone from './components/CheckOutDone'
import Login from './components/Login'
import GoogleLogin from './components/GoogleLogin'
import GoogleUserRegister from './components/GoogleUserRegister'
import Footer from './components/Footer'
import { BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import ProductDetail from './components/ProductDetail'
import ProductList from './components/ProductList'
import {Elements} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js'

const promise = loadStripe('pk_test_51I904uBSQJkm3JDXKbckPcWBdvtxBy53ZWHJPlU802XUsXyP4cLr6bwOqhvwYu5itpHPwgkBmye8MkaVFil4c4lp00IDOUmarR');

const App = () => {
  return (
    <Elements stripe={promise}>
      <Router>
        <div className="App flex flex-col min-h-screen">
          <Nav />
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route exact path="/google-login">
              <GoogleLogin />
            </Route>
            <Route exact path="/google-login/user-register">
              <GoogleUserRegister />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/account/orders/:id">
              <OrderDetail />
            </Route>     
            <Route path="/account">
              <Account />
            </Route>       
            <Route path="/product/:id">
              <ProductDetail />
            </Route>
            <Route path="/cart">
              <Cart />
            </Route>
            <Route path="/checkout">
              <CheckOut />
            </Route>
            <Route path="/checkout-done/:id">
              <CheckOutDone />
            </Route>
            <Route exact path="/">
              <ProductList />
            </Route>
          </Switch>
          <Footer />
        </div>
      </Router>
    </Elements>
  )
}

export default App
