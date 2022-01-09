import { useEffect } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col, ListGroup, InputGroup, Image, Form, Button, Card } from 'react-bootstrap'
import { addToCart, removeFromCart } from '../actions/cartActions'
import { formatNumber } from '../helpers/formatHelpers'
import Message from '../components/Message'

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
  const numberOfCartItems = cartItems.reduce((acc, item) => acc + item.qty, 0)

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty))
    }
  }, [dispatch, productId, qty])

  const quantityHandler = (operator, item, event) => {
    const { target: { value }} = event, { countInStock, qty } = item
    let editQty = qty

    if (operator === 'input') {
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
    dispatch(removeFromCart(id))
  }

  const checkoutHandler = () => {
    navigate(`/login?redirect=shipping`)
  }

  return (
    <Container>
      <h1>Shopping Cart</h1>
      {
        cartItems.length === 0 ? (
          <>
            <Row>
              <Col>
                <Message className='block'>Your cart is empty.</Message>
              </Col>
            </Row>
            <Row>
              <Button 
                variant='light'
                onClick={() => navigate(-1)}
              >
                Go Back
              </Button>
            </Row>
          </>
        ) : (
          <Row>
            <Col md={8}>
              <ListGroup variant='flush'>
                {
                  cartItems.map(item => (
                    <ListGroup.Item key={item._id}>
                      <Row style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}>
                        <Col xs={4} md={2} style={{margin: '0 0 0.5rem 0'}}>
                          <Image src={item.image} alt={item.name} fluid rounded />
                        </Col>
                        <Col xs={7} md={5} style={{margin: '0 0 0.5rem 0'}}>
                          <Row>
                            <Link to={`/product/${item._id}`}>
                              {item.name}
                            </Link>
                          </Row>
                          <Row style={{fontWeight: 'bold'}}>
                            ${item.price}
                          </Row>
                        </Col>
                        <Col xs={6} md={3} style={{margin: '0 0 0.5rem 0'}}>
                          <Row style={{margin: 'auto'}}>
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
                        <Col xs={3} md={2} style={{
                          margin: '0 0 0.5rem 0',
                          textAlign: 'center'
                        }}>
                          <Button 
                            type='button'
                            size='sm'
                            variant='light'
                            onClick={
                              () => removeFromCartHandler(item._id)
                            }
                          >
                            <i className='fas fa-trash fa-2x'></i>
                          </Button>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))
                }
              </ListGroup>
            </Col>
            <Col md={4}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <h2 className='text-center'>Subtotal</h2>
                    <Row>
                      <Col>Number of items:</Col>
                      <Col style={{fontWeight: 'bold'}}>
                        {numberOfCartItems}
                      </Col>
                    </Row>
                    <Row>
                      <Col>Price:</Col>
                      <Col style={{fontWeight: 'bold'}}>{`
                        $${formatNumber(
                          cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)
                        )}
                      `}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Button
                      type='button' 
                      className='btn-block'
                      disabled={numberOfCartItems === 0}
                      onClick={checkoutHandler}
                    >
                      Proceed to Checkout
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        )
      }
    </Container>
  )
}

export default CartScreen
