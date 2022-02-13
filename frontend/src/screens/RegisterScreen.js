import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { register } from '../actions/userActions'

const RegisterScreen = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const redirect = location.search ? location.search.split('=')[1] : '/'

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const userRegister = useSelector(state => state.userRegister)
  const { loading, error, userInfo } = userRegister

  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
  }, [navigate, userInfo, redirect])

  // TODO: FIND A WAY TO CLEAR PREV VALIDATION ERRORS BEFORE POPULATING NEW VALIDATION ERRORS
  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      setMessage(null)
      dispatch(register(name, email, password))
    }
  }

  // TODO: CANNOT ACCESS CREATE ACCOUNT AFTER NEW USER REGISTERS, LOGS OUT, THEN TRIES TO CREATE ACCOUNT AGAIN
  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {
        loading ? (
          <Loader />    
        ) 
        : (
          <>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            <Form className='mb-4' onSubmit={submitHandler}>
            <Form.Group className='pb-3' controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control 
                  type='text' 
                  placeholder='Enter name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group className='pb-3' controlId='email'>
                <Form.Label>Email</Form.Label>
                <Form.Control 
                  type='email' 
                  placeholder='Enter email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group className='pb-3' controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control 
                  type='password' 
                  placeholder='Enter password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group className='pb-3' controlId='confirm-password'>
                <Form.Label>Confirm password</Form.Label>
                <Form.Control 
                  type='password' 
                  placeholder='Confirm password'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Button className='my-2 btn-block' type='submit' variant='primary'>
                Register
              </Button>
            </Form>
            <h2 className='text-center' style={{textTransform: 'none'}}>Already have an account?</h2>
            <Row className='py-2'>
              <Col>
                <Button className='btn-block' variant='success'>
                  <Link 
                    to={redirect ? `/login?redirect=${redirect}` : `/login`}
                    style={{textDecoration: 'none'}}
                  >
                    Login
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

export default RegisterScreen