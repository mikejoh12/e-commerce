import Nav from './components/Nav'
import Register from './components/login/Register'
import Account from './components/account/Account'
import OrderDetail from './components/account/OrderDetail'
import Cart from './components/cart/Cart'
import CheckOut from './components/checkout/CheckOut'
import CheckOutDone from './components/checkout/CheckOutDone'
import Login from './components/login/Login'
import GoogleLogin from './components/login/GoogleLogin'
import GoogleUserRegister from './components/login/GoogleUserRegister'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'
import { BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import { selectIsLoggedIn } from './features/users/usersSlice'
import { useSelector } from 'react-redux'
import ProductDetail from './components/products/ProductDetail'
import ProductList from './components/products/ProductList'
import {Elements} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js'

const promise = loadStripe('pk_test_51I904uBSQJkm3JDXKbckPcWBdvtxBy53ZWHJPlU802XUsXyP4cLr6bwOqhvwYu5itpHPwgkBmye8MkaVFil4c4lp00IDOUmarR');

const App = () => {

  const isLoggedIn = useSelector(selectIsLoggedIn)

  return (
    <Elements stripe={promise}>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Nav />
          <div className="mt-24 flex flex-col flex-grow">
            <Switch>
              <Route path="/login" component={Login} />
              <Route exact path="/google-login" component={GoogleLogin} />
              <Route exact path="/google-login/user-register" component={GoogleUserRegister} />
              <Route path="/register" component={Register} />
              <Route path="/account/orders/:id" component={OrderDetail} />
              <ProtectedRoute path="/account" isLoggedIn={isLoggedIn} component={Account} />
              <Route path="/product/:id" component={ProductDetail} />
              <ProtectedRoute path="/cart" isLoggedIn={isLoggedIn} component={Cart} />
              <ProtectedRoute path="/checkout" isLoggedIn={isLoggedIn} component={CheckOut} />
              <ProtectedRoute path="/checkout-done/:id" isLoggedIn={isLoggedIn} component={CheckOutDone} />
              <Route exact path="/" component={ProductList} />
            </Switch>
          </div>
          <Footer />
        </div>
      </Router>
    </Elements>
  )
}

export default App
