import React, { useState } from 'react'
import { Form, Button, Container, ButtonGroup, Row,Col, InputGroup, ToastContainer, Toast} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Link , useLocation, useNavigate } from 'react-router-dom';
import { FaRegUser,FaLock, FaCheckCircle, FaEye, FaEyeSlash} from "react-icons/fa";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { setUser } from '../../redux/authSlice';


const LoginForm = () => {
  const {theme} = useSelector(state=> state.theme)
  const [formData, setFormData] = useState({username:'' , password:''});
  const [errors, setErrors] = useState({username:'', password:''});
  const [validated , setValidated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showPassword, setShowPassword] =useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange= (e)=>{
    setFormData({...formData, [e.target.name] : e.target.value});
  };

  const handleSubmit = async (e)=>{
    e.preventDefault();
    e.stopPropagation();

    setErrors({username:'', password:''}); //clear previous errors

    if(e.currentTarget.checkValidity() === false || formData.password.length < 6 ){
      // e.preventDefault();
      setValidated(true);
      return;
    }
    
    try {
      const response= await axios.post ('https://shopzy-backend-o32f.onrender.com/api/auth/login', {        
        username: formData.username, 
        password: formData.password, 
      });

      if(response.status === 200){
        // console.log('Login Successful: ',response.data.msg);
        setShowAlert(true);
        setTimeout(()=>{
          navigate('/')
        },1000);
        dispatch(setUser(response.data.user)); //save user in redux
      }
    } catch (error) {
       const msg = error.response ?.data?.msg;

       //set field specific error
      if(msg === 'User does not exits'){
        setErrors((prev)=>({...prev, username: msg}));
      }
      if(msg === 'Invalid password'){
        setErrors((prev)=>({...prev, password: msg}));
      }
    }
    setValidated(false);
    setFormData({
      username: '',
      password: '',
    });
  };


  return (
    <div className={` min-vh-100 py-3 ${theme}`}>
    <Container className={` ${theme === 'dark' ? 'bg-white' : ''} border shadow-sm py-4 px-0 rounded-4`} style={{
      marginTop:'6rem', width: '25rem'
    }}>

    <ToastContainer position='top-center' className='p-3' style={{width:'15rem'}}>
      <Toast onClose={()=> setShowAlert(false)} show={showAlert} autohide delay={3000} bg='light'>
        <Toast.Body className={` ${theme === 'dark' ? 'bg-white text-dark' : ''} d-flex align-items-center gap-2`}>
          <FaCheckCircle color='green' size={20}/>
          <span className='fw-semibold'>Login Successful!</span>
        </Toast.Body>
      </Toast>
    </ToastContainer>

    <Row className='justify-content-center my-3'>
      <Col className='mx-4'>
        <div className='d-flex justify-content-center mb-5'>
          <ButtonGroup className='gap-3'>
            <Button variant={location.pathname === '/login' ? 'primary' : 'outline-primary'} as={Link} to="/login" className='transition-variant px-5'>Login</Button>
           
            <Button variant={location.pathname === '/signup' ? 'primary' : 'outline-primary'} as={Link} to='/signup' className=' transition-variantpx-5'>SignUp</Button>
          </ButtonGroup>
        </div>

        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group className="mb-4" controlId="formText">
            <InputGroup>
            <InputGroup.Text className='text-muted'><FaRegUser/></InputGroup.Text>
            <Form.Control type="text" name='username' placeholder="Username" value={formData.username} onChange={handleChange} isInvalid={!!errors.username} required />
            <Form.Control.Feedback type='invalid'>
             {errors.username || 'Please enter username'}
            </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-5" controlId="formPassword">
            <InputGroup>
            <InputGroup.Text className='text-muted'><FaLock/></InputGroup.Text>
            <Form.Control type={showPassword ? 'text': 'password'} name='password' placeholder="password" value={formData.password} onChange={handleChange} required 
            isInvalid={!!errors.password || validated && formData.password.length < 6}/>
            <Button variant='' onClick={()=>{setShowPassword(!showPassword)}} className='position-absolute end-0 fs-6 text-muted'>
              {showPassword ? <FaEyeSlash/> : <FaEye/>}
            </Button>
            <Form.Control.Feedback type='invalid'>
              {errors.password || 'Password must be at least 6 characters long'}
            </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
          
          <Button variant="primary" type="submit" className='py-2 px-5 w-100 rounded-3 fw-semibold fs-6'>
            Login
          </Button>  
        </Form>
      </Col>
      <Form.Text className='text-center mt-4'>
        Don't have Account? <Link to='/signup'>SignUP</Link>
      </Form.Text>
    </Row>
    </Container>
    </div>
  )
}

export default LoginForm
