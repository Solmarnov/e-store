import { Container, Spinner } from 'react-bootstrap'

const Loader = () => {
  return (
    <Container style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      height: 'calc(80vh - 40px)'
    }}>
      <Spinner 
        animation='border'
        role='status'
        style={{
          width: '50px', 
          height: '50px', 
          margin: 'auto', 
          display: 'block'
        }}
      >
        <span className='sr-only'>Loading...</span>
      </Spinner>
    </Container>
  )
}

export default Loader
