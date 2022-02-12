import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { login } from '../actions/userActions'

const LoginScreen = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const redirect = location.search ? location.search.split('=')[1] : '/'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const userLogin = useSelector(state => state.userLogin)
  const { loading, error, userInfo } = userLogin

  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
  }, [navigate, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))

  }

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {
        loading ? (
          <Loader />    
        ) 
        : (
          <>
            <Form className='mb-4' onSubmit={submitHandler}>
              <Form.Group className='pb-3' controlId='email'>
                <Form.Label>Email</Form.Label>
                <Form.Control 
                  type='email' 
                  placeholder='Enter email'
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group className='pb-3' controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control 
                  type='password' 
                  placeholder='Enter password'
                  onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>
              {error && <Message variant='danger'>{error}</Message>}
              <Button className='my-2 btn-block' type='submit' variant='primary'>
                Sign In
              </Button>
            </Form>
            <h2 className='text-center'>OR</h2>
            <Row className='py-2'>
              <Col>
                <Button className='btn-block' variant='success'>
                  <Link 
                    to={redirect ? `/register?redirect=${redirect}` : `/register`}
                    style={{textDecoration: 'none'}}
                  >
                    Create Account
                  </Link>
                </Button>
              </Col>
            </Row>
          </>
        )
      }
    </FormContainer>
  )
}

export default LoginScreen