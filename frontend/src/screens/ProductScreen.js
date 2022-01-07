import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Container, Row, Col, Image, ListGroup, Card, Button, Form, InputGroup } from 'react-bootstrap'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listProductDetails } from '../actions/productActions'

const ProductScreen = () => {
  const [quantity, setQuantity] = useState(0)
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const productDetails = useSelector(state => state.productDetails)
  const { loading, error, product } = productDetails

  useEffect(() => {
    dispatch(listProductDetails(id))
  }, [dispatch])

  const quantityHandler = (operator, event) => {
    const { target: { value } } = event, { countInStock } = product
    let qty = quantity

    if (operator === 'input') {
      isNaN(value) || value === ' ' ? qty = 0 :
      value > countInStock ? qty = countInStock :
      qty = value
    }
    if (operator === 'increment' && quantity !== countInStock) {
      qty++
    }
    if (operator === 'decrement' && quantity !== 0) {
      qty--
    }

    setQuantity(qty)
  }

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${quantity}`)
  }

  return (
    <Container>
      <Link className='btn btn-light my-3' to='/'>Go Back</Link>
      {
        loading ? (
          <Loader />
        )
        : error ? (
          <Message variant='danger'>{error}</Message>
        )
        : (
          <Row>
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h2>{product.name}</h2>
                </ListGroup.Item>
                <ListGroup.Item>
                  <h3>${product.price}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                </ListGroup.Item>
                <ListGroup.Item>
                  {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>
                        Price: 
                      </Col>
                      <Col style={{ fontWeight: 'bold' }}>
                        ${product.price}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>
                        Status: 
                      </Col>
                      <Col style={{ fontWeight: 'bold' }}>
                        {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                </ListGroup>

                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row style={{ alignItems: 'center' }}>
                      <Col>Quantity:</Col>
                      <Col>
                        <Row>
                          <InputGroup size='sm'>
                            <InputGroup.Text 
                              id='quantity-decrement'
                              style={{ padding: '0 12px' }}
                              onClick={(e) => quantityHandler('decrement', e)}
                            >
                              <i className="fas fa-minus fa-sm"></i>
                            </InputGroup.Text>
                            <Form.Control
                              // type='number'
                              aria-label='quantity'
                              style={{ padding: '0 12px', textAlign: 'center' }}
                              value={quantity}
                              onChange={(e) => quantityHandler('input', e)}
                            >
                            </Form.Control>
                            <InputGroup.Text
                              id='quantity-increment'
                              style={{ padding: '0 12px' }}
                              onClick={(e) => quantityHandler('increment', e)}
                            >
                              <i className='fas fa-plus fa-sm'></i>
                            </InputGroup.Text>
                          </InputGroup>
                        </Row>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}
                <ListGroup.Item>
                  <Button 
                    className='btn-block' 
                    type='button' 
                    disabled={product.countInStock === 0}
                    onClick={addToCartHandler}
                  >
                    Add To Cart
                  </Button>
                </ListGroup.Item>
              </Card>
            </Col>
          </Row>
        )
      }
    </Container>
  )
}

export default ProductScreen