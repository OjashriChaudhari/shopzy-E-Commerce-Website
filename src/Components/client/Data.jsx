import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/cartSlice';
import { Card,Button} from 'react-bootstrap';
import { AiFillStar, AiOutlineStar} from "react-icons/ai";
import { FaStarHalfAlt } from "react-icons/fa";

const Data = ({
    id,
    prodName,
    prodDescription,
    prodImage,
    prodRs,
    addToCartBtn,
    prodRating,
    prodStock,
   }) => {
    const dispatch = useDispatch();
    const {theme} = useSelector(state=> state.theme);

  return (
    
    <Card className={`product-card shadow-sm rounded-4 p-3 m-3 h-50 ${theme === 'dark' ? 'bg-white text-dark' : 'bg-light text-dark'}`} style={{transition: 'transform 0.3s', cursor: 'pointer' }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
    >
        <Card.Body className="text-center">
            <Card.Title className="mb-3 text-secondary"style={{fontSize:'19px'}}>
                {prodName.slice(0,40)}
            </Card.Title>

            <Card.Text className={`prodDescription ${theme === 'dark' ? 'text-dark' : ''}`} style={{
                fontSize: '14px'}}> 
                {prodDescription.slice(0 , 60)}...
            </Card.Text   >

            <Card.Img 
                variant="top" 
                src={prodImage} alt={prodName}
                style={{
                    height: '190px',
                    width: '180px',
                    marginTop: '10px',
                    padding: '0 10px 10px 10px',
                }} 
            />

            <Card.Text className='text-start mt-3 d-flex align-items-center gap-2'>
                <span className='text-warning d-flex align-items-center'>
                    {Array.from({ length:5 },(_, i)=>{
                    const full =Math.floor(prodRating);
                    const isHalf = prodRating - full >=0.5 && i === full;

                    if(i < full ) return <AiFillStar key={i} size={16}/>;
                    else if(isHalf) return <FaStarHalfAlt key={i} size={16}/>;
                    else return <AiOutlineStar key={i} size={16}/>;
                })}
                <span className='ms-1 fw-semibold text-dark'>{prodRating}</span>
                </span>

                <span className='text-muted' style={{fontSize:"14px"}}>
                    ({prodStock})
                </span>    
            </Card.Text>

            <div className='d-flex justify-content-between align-items-center mt-3'>
                <p className="text-success fw-bold mb-0" style={{fontSize:'16px'}}>
                    {prodRs}
                </p>

                <Button
                variant='outline-dark'
                size='sm'
                className="rounded-pill fw-semibold"
                style={{fontSize:'13px'}}
                onClick={()=>dispatch(addToCart({
                    id,
                    prodName, 
                    prodImage,
                    prodRs,
                    prodRating,
                    prodStock,
                }))}>
                    {addToCartBtn}
                </Button>
            </div>

            
        </Card.Body>
    </Card>
  )
}

export default Data;
