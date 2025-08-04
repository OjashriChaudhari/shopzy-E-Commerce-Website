
import React,  {useState } from 'react'
import { FaCheckCircle } from 'react-icons/fa';
import { FaAngleUp,FaAngleDown} from "react-icons/fa6";
import { MdDeleteForever } from "react-icons/md";
import { Container,Card, Button, Row, Col, Alert, ToastContainer, Toast} from 'react-bootstrap';
import { useSelector , useDispatch } from 'react-redux';
import { decreaseQuantity, increaseQuantity, removeItem, clearCart} from '../../redux/cartSlice';
import { Link } from 'react-router-dom';

const CartsPage = () => {
    const {theme} = useSelector(state=> state.theme)
    const {cartItems} = useSelector(state=> state.cart);
    const total = useSelector((state)=> state.cart.totalPrice);
    const dispatch = useDispatch();
    const[showAlert, setShowAlert] = useState(false);
    const[isOrderPlaced, setIsOrderPlaced] = useState(false);

    const handlePlaceOrder = ()=>{
      dispatch(clearCart()); 
      setShowAlert(true);  // show alert
      setIsOrderPlaced(true);
    };

  return (

  <div className={` min-vh-100 py-3 ${theme}`}>
      <h2 className='text-center  fw-bold' style={{paddingTop:'85px'}}>My Cart</h2>


    {/* Show Alert if order placed */}
    <ToastContainer position='top-center' className='p-3' style={{width:'19rem'}}>
        <Toast onClose={()=>setShowAlert(false)} show={showAlert} autohide delay={3000} bg='light'>
            <Toast.Body className={`${theme === 'dark' ? 'bg-white text-dark' : ''} d-flex align-items-center gap-2`}>
                <FaCheckCircle color='green' size={20}/>
                <span className='fw-semibold'>Order Placed!</span>
            </Toast.Body>
        </Toast>
    </ToastContainer>

    {isOrderPlaced && (
       <div className='text-center' style={{marginTop: '8rem'}}>
        <div className='mb-3'><p className={`${theme === 'dark' ? 'text-white' :'text-muted'} fw-semibold fs-5`}>Thank You for Shopping!</p></div>
        <Link to='/'>
        <Button variant='outline-success fw-semibold px-5 fs-5'>Shop Again</Button>
       </Link>
      </div>
    )}
     
    {/* Product Section: Only show if order not placed yet */}

    {!showAlert && !isOrderPlaced &&  cartItems.length > 0 && (
    <Container fluid className='px-3 ms-5 mb-5' style={{marginTop:'50px', width:'auto'}}>
      <Row className='g-4'>
       
        {cartItems.map((item)=>(
          <Row className='mb-3 mt-3' key={item.id}xs={1} md={1} lg={1}>
            <Card  className='p-3 shadow-sm' >

              <Row >
                <Col xs={3}>
                  <Card.Img
                  variant='top' 
                  src={item.prodImage} 
                  style={{height:'200px', objectFit:'contain',marginLeft:'0'}} 
                />
                </Col>
              
              <Col xs={7}>
                <Card.Body className='ms-3'>
                  <Card.Title>{item.prodName}</Card.Title>
                  <Card.Text className='fw-bold text-success mt-3'>{item.prodRs}</Card.Text>

                   <div className='d-flex align-items-center justify-content-between mt-3'>

                  <div className='position-relative  mb-2'>
                  <FaAngleUp className='position-absolute'
                  style={{left:'5.1rem',bottom:'1.7rem',cursor:'pointer'}}
                  onClick={()=>dispatch(increaseQuantity(item.id))}/>

                  <p className='border px-3 py-2 m-0'>Quantity: {item.quantity}</p>

                  <FaAngleDown className='position-absolute'
                  style={{left:'5.1rem', bottom:'0.1rem', cursor:'pointer'}}
                  onClick={()=>dispatch(decreaseQuantity(item.id))}/>
                  </div>
                  </div>

                  <Button variant='outline-danger' size='sm' className='mt-3'  onClick={()=>dispatch(removeItem(item.id))}>
                  <MdDeleteForever className='me-1 mb-1 fs-5'
                 />
                    Remove
                  </Button>
                </Card.Body>
              </Col>
              </Row>   
            </Card>
          </Row>
        ))}
    </Row>
    </Container>
    )}
    
     {/* Show 'Cart is empty!' only after alert dismissed */}

     
     {cartItems.length === 0 && !isOrderPlaced && (
      <div className='text-center' style={{marginTop: '8rem'}}>
        <div className='mb-3'>
          <p className={`${theme=== 'dark' ? 'text-white' : 'text-muted'} fw-semibold fs-5 `}>Your Cart is empty!</p>
          </div>
        <Link to='/'>
        <Button variant='outline-success' className={`${theme === 'dark' ? 'bg-success text-white' : ''} fw-semibold px-5 fs-5`} >Shop Now</Button>
       </Link>
      </div>
     )}

     

     {/* Place Order Button */}
    <Container fluid className={`${theme} fixed-bottom py-3 border-top`}>
      <Row className='align-items-center justify-content-between px-3'>
        <Col xs='auto'>
        <p className='text-secondary fw-semibold fs-5 mb-0 d-flex align-items-center'>Total Amount: &nbsp;<span className={`${theme === 'dark' ? 'text-white' : 'text-dark'}`}>Rs {Number(total).toFixed(2)}</span></p>
        </Col>

        <Col xs='auto'>
        <Button
        variant="warning"
        size="md"
        className="fw-bold px-4 fs-5 "
        onClick={handlePlaceOrder}
        disabled={cartItems.length === 0} // disables when cart is empty
      >
        Place Order
        </Button>
        </Col>
      </Row>
    </Container>
  </div>   
  );
}

export default CartsPage;
