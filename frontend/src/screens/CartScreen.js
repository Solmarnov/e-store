import { useEffect } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import { addToCart } from '../actions/cartActions'
import Message from '../components/Message'
import Loader from '../components/Loader'

const useQuery = () => {
  const location = useLocation()
  return location.search
}

const CartScreen = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { id: productId } = useParams()
  const query = useQuery()
  
  const qty = query ? Number(query.split('=')[1]) : 1

  const cart = useSelector(state => state.cart)
  const { cartItems } = cart

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty))
    }
  }, [dispatch, productId, qty])

  return (
    <div>Cart</div>
  )
}

export default CartScreen
