import Nav from './components/Nav'
import Register from './components/Register'
import MainContent from './components/MainContent'
import Cart from './components/Cart'
import Footer from './components/Footer'
import { BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import ProductCard from './components/ProductCard'

const App = () => {
  return (
    <Router>
      <div className="App flex flex-col min-h-screen">
        <Nav />
        <Switch>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/product">
            <ProductCard />
          </Route>
          <Route path="/cart">
            <Cart />
          </Route>
          <Route path="/">
            <MainContent />
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App
