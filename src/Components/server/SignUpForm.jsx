
import React, { useState } from 'react';
import { Form, Button, Container, ButtonGroup, Row,Col, InputGroup, ToastContainer, Toast} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate} from 'react-router-dom';
import { FaRegUser, FaMobileAlt, FaLock, FaCheckCircle, FaEye, FaEyeSlash} from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import axios from 'axios';



const SignUpForm = () => {
  const {theme} = useSelector(state=> state.theme)
  const [formData, setFormData] = useState(
    {
        username:'' , 
        mobileNo: '',
        email: '',
        password:'',
        
    });
  const [validated , setValidated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showPassword, setShowPassword] =useState(false);
  const [errors, setErrors] = useState({username:'', password:''});
  const location = useLocation();
  const navigate = useNavigate();

  const handleChange= (e)=>{
    setFormData({...formData, [e.target.name] : e.target.value});
    setErrors({...errors, [e.target.name]: ''}); // clear field error
  };

  const handleSubmit = async (e)=>{
    e.preventDefault();
    e.stopPropagation();
    
    if(e.currentTarget.checkValidity() === false || 
        !/^\S+@\S+\.\S+$/.test(formData.email) || !/^[6-9]\d{9}$/.test(formData.mobileNo) || formData.password.length < 6){
      setValidated(true);
      return;
    }

    try{
      //API call to backend
      console.log('SignUp data:', formData);
      const response = await axios.post('https://shopzy-e-commerce-website.onrender.com/api/auth/signup', formData)

      if(response.status === 201){
        console.log('Signup success:', response.data.msg);
        setShowAlert(true);
        setTimeout(()=>{
          navigate('/login')
        },1000);
      }
    }catch(error){
      const msg = error.response ?.data?.msg;

      if(msg === 'Username already registered'){
        setErrors((prev)=>({...prev, username: msg}))
      }
      if(msg === 'Email already registered'){
        setErrors(prev=>({...prev, email: msg}));
      }
      if(msg === 'Username and email already registered'){
        setErrors((prev)=>({...prev, username: msg, email:msg}));
      }
    }
    setValidated(false);
    setFormData({
      username: '',
      mobileNo: '',
      email: '',
      password: '',
    });
   
  };


  return (
    <div className={` min-vh-100 py-3 ${theme}`}>
    <Container className={` ${theme === 'dark' ? 'bg-white' : ''} border shadow-sm py-4 px-0 rounded-4`} style={{
      marginTop:'6rem', width: '25rem'
    }}>
    
    <ToastContainer position='top-center' className='p-3' style={{width:'19rem'}}>
        <Toast onClose={()=>setShowAlert(false)} show={showAlert} autohide delay={3000} bg='light'>
            <Toast.Body className={`${theme === 'dark' ? 'bg-white text-dark' : ''} d-flex align-items-center gap-2`}>
                <FaCheckCircle color='green' size={20}/>
                <span className='fw-semibold'>Registration Successful!</span>
            </Toast.Body>
        </Toast>
    </ToastContainer>

    <Row className='justify-content-center my-2'>
      <Col className='mx-4'>
        <div className='d-flex justify-content-center mb-5'>
          <ButtonGroup className='gap-3'>
            <Button variant={location.pathname === '/login' ? 'primary' : 'outline-primary'} as={Link} to="/login" className='transition-variant px-5'>Login</Button>
           
            <Button variant={location.pathname === '/signup' ? 'primary' : 'outline-primary'} as={Link} to='/signup' className='transition-variant px-5'>SignUp</Button>
          </ButtonGroup>
        </div>

        <Form noValidate validated={validated} onSubmit={handleSubmit}>

          {/* USERNAME */}
          <Form.Group className="mb-4" controlId="formText">
            <InputGroup>
            <InputGroup.Text className='text-muted'><FaRegUser/></InputGroup.Text>
            <Form.Control type="text" name='username' placeholder='Username' value={formData.username} onChange={handleChange} isInvalid={!!errors.username} required />

            <Form.Control.Feedback type='invalid'>
             {errors.username || 'please enter a username'} 
            </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          {/* MOBILE NUMBER */}
          <Form.Group className="mb-4"  controlId="formMobile">
            <InputGroup>
            <InputGroup.Text className='text-muted'><FaMobileAlt/></InputGroup.Text>
            <Form.Control type="text" name='mobileNo' placeholder="Mobile No." value={formData.mobileNo} onChange={handleChange} required 
            isInvalid={ validated && !/^[6-9]\d{9}$/.test(formData.mobileNo)}/>
            <Form.Control.Feedback type='invalid'>
              Please enter a valid 10-digit mobile number.
            </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          {/* EMAIL */}
          <Form.Group className="mb-4" controlId="formEmail">
            <InputGroup>
            <InputGroup.Text className='text-muted'><MdOutlineMail/></InputGroup.Text>
            <Form.Control type="text" name='email' placeholder="Enter email" value={formData.email} onChange={handleChange} required 
            isInvalid={
                !!errors.email || (validated && !/^\S+@\S+\.\S+$/.test(formData.email))
            }/>
            <Form.Control.Feedback type='invalid'>
             {errors.email || 'Pleaseenter a valid email address'}
            </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          {/* PASSWORD */}
          <Form.Group className="mb-3" controlId="formPassword">
            <InputGroup>
            <InputGroup.Text className='text-muted'><FaLock/></InputGroup.Text>
            <Form.Control type={showPassword ? 'text' : 'password'} name='password' placeholder="password" value={formData.password} onChange={handleChange} required 
            isInvalid={validated && formData.password.length < 6 }/>
            <Button variant='' onClick={()=> setShowPassword(!showPassword)} className='position-absolute end-0 fs-6 text-muted'>
              {showPassword ? <FaEyeSlash/> : <FaEye/>}
            </Button>
            <Form.Control.Feedback type='invalid'>
              Password must be at least 6 characters long
            </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
          
          <Button variant="primary" type="submit" className='py-2 px-5 w-100 rounded-3 fw-semibold fs-6'>
            SignUp
          </Button>  
        </Form>
      </Col>
      <Form.Text className='text-center mt-4'>
        Do you have an Account? <Link to='/login'>Login</Link>
      </Form.Text>
    </Row>
    </Container>
    </div>
  )
}

export default SignUpForm
