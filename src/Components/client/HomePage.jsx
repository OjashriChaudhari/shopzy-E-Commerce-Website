import React, {useEffect} from 'react'
import {Container, Row, Col} from 'react-bootstrap'
import Spinner from 'react-bootstrap/Spinner'
import Data from './Data'
import { useDispatch,useSelector } from 'react-redux'
import {fetchProducts} from '../../redux/productSlice';

const HomePage = () => {

  const dispatch = useDispatch();
  const {items,status,error} = useSelector(state=> state.products);
  const {theme} = useSelector(state=> state.theme);

  useEffect(()=>{
    dispatch(fetchProducts());
  },[dispatch]);

  if(status === 'loading'){
    return(
        <div className={`${theme}`}
        style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Spinner animation="border" role="status" size='50' className='text-success'></Spinner>
      <span style={{marginLeft: '10px', fontSize:'30px'}} className='text-success fw-semibold'>Loading...</span>
      
    </div>
    )
  }
  if(status === 'failed'){
    return (
    <div
    style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color:'red',
        fontSize:'18px',
        fontWeight:'semiBold'
      }} >Error: {error}</div>
    )
  }

  return (
  <Container fluid className={`px-3 ${theme}`} style={{marginTop:'90px'}}>
    <Row className='g-4'>
        {items.map(item=>(
            <Col key={item.id} lg={3} sm={6} xs={12}>
            <Data 
            id={item.id}
            prodName={item.title}
            prodDescription={item.description}
            prodImage={item.images[0]}
            prodRs={`Rs ${item.price}`}
            addToCartBtn= "ADD TO CART"
            prodRating = {item.rating}
            prodStock = {item.stock}
            />
            </Col>
            ))}
    </Row>
  </Container>
    
 )
}
    

export default HomePage
