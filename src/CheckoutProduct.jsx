import React from 'react'
import StarRateIcon from '@mui/icons-material/StarRate'
import './CheckProducts.css'
import { useStateValue } from './StateProvider'

function CheckoutProduct({ id, image, title, price, rating, hideButton }) {
   const [{ basket }, dispatch] = useStateValue()
  
  const removeFromBasket = () =>{
      dispatch({
        type: 'REMOVE_FROM_BASKET',
        id: id
      })
   }
   
 
    return (
    <div className='checkoutProduct'>
     <img src={image} className='checkoutp_image' /> 
    <div className='cproduct_info'>
           <p className='cp_title'>
            {title}
           </p>
           <p className='cp_price'>
            <small>$</small>
            <strong>{price}</strong>
           </p>
           <div className='cp_rating'>
           {Array(rating).fill().map((_, i) => (
            <p key={i}>
                <StarRateIcon />
            </p>
           ))}
           </div>
           {!hideButton && (
               <button onClick={removeFromBasket}>
               Remove from Cart
              </button>
           )}
          
    </div>

    </div>
  )
}

export default CheckoutProduct