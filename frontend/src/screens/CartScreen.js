import { useEffect } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col, ListGroup, InputGroup, Image, Form, Button, Card } from 'react-bootstrap'
import { addToCart } from '../actions/cartActions'
import { formatNumber } from '../helpers/formatHelpers'
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

  const quantityHandler = (operator, item, event) => {
    const { target: { value }} = event, { countInStock, qty } = item
    let editQty = qty

    if (operator === 'input') {
      console.log(isNaN(value))
      value === '' ? editQty = '' :
      isNaN(value) ? editQty = qty :
      value > countInStock ? editQty = countInStock :
      editQty = value
    }
    if (operator === 'increment' && qty !== countInStock) {
      editQty++
    }
    if (operator === 'decrement' && qty !== 0) {
      editQty--
    }

    return editQty ? dispatch(addToCart(item._id, Number(editQty))) : dispatch(addToCart(item._id, editQty))
  }

  const removeFromCartHandler = (id) => {
    console.log('remove')
  }

  const checkoutHandler = () => {
    navigate(`/login?redirect=shipping`)
  }

  return (
    <Container>
      <Row>
        <Col md={8}>
          <h1>Shopping Cart</h1>
          {
            cartItems.length === 0 ? (
              <Message>Your cart is empty <Link to='/'>Go back.</Link></Message> 
            ) : (
              <ListGroup variant='flush'>
                {
                  cartItems.map(item => (
                    <ListGroup.Item key={item._id}>
                      <Row>
                        <Col md={2}>
                          <Image src={item.image} alt={item.name} fluid rounded />
                        </Col>
                        <Col md={3}>
                          <Link to={`/product/${item._id}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={2}>
                          ${item.price}
                        </Col>
                        <Col md={2}>

                          <Row>
                            <InputGroup size='sm'>
                              <InputGroup.Text 
                                id='quantity-decrement'
                                style={{ padding: '0 12px' }}
                                onClick={(e) => quantityHandler('decrement', item, e)}
                              >
                                <i className="fas fa-minus fa-sm"></i>
                              </InputGroup.Text>
                              <Form.Control
                                type='text'
                                aria-label='quantity'
                                style={{ padding: '0 12px', textAlign: 'center' }}
                                value={item.qty}
                                onChange={(e) => quantityHandler('input', item, e)}
                              >
                              </Form.Control>
                              <InputGroup.Text
                                id='quantity-increment'
                                style={{ padding: '0 12px' }}
                                onClick={(e) => quantityHandler('increment', item, e)}
                              >
                                <i className='fas fa-plus fa-sm'></i>
                              </InputGroup.Text>
                            </InputGroup>
                          </Row>
                        </Col>
                        <Col md={2}>
                          <Button 
                            type='button' 
                            variant='light'
                            onClick={
                              () => removeFromCartHandler(item._id)
                            }
                          >
                            <i className='fas fa-trash'></i>
                          </Button>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))
                }
              </ListGroup>
            )
          }
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>{`
                  Subtotal (${cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
                `}</h2>
                {`
                  $${formatNumber(
                    cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)
                  )}
                `}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type='button' 
                  className='btn-block'
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                  Proceed to Checkout
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default CartScreen
