import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import CartScreen from './screens/CartScreen'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import ProductScreen from './screens/ProductScreen'
import RegisterScreen from './screens/RegisterScreen'

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Routes>
          <Route path='/cart' element={<CartScreen />} />
          <Route path='/cart/:id' element={<CartScreen />} />
          <Route path='/' element={<HomeScreen />} />
          <Route path='/login' element={<LoginScreen />} />
          <Route path='/product/:id' element={<ProductScreen />} />
          <Route path='/register' element={<RegisterScreen />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App
