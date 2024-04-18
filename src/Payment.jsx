import React, { useEffect } from 'react'
import './payment.css'
import { useStateValue } from './StateProvider'
import CheckoutProduct from './CheckoutProduct'
import { Link, useNavigate } from 'react-router-dom'
import { useElements, useStripe, CardElement } from '@stripe/react-stripe-js'
import { useState } from 'react'
import CurrencyFormat from 'react-currency-format'
import { getBasketTotal } from './reducer'
import axios from './axios'


function Payment() {
    const [{ basket, user }, dispatch] = useStateValue()
    const navigate = useNavigate()
    const stripe = useStripe()
    const elements = useElements()
    const [succeeded, setSucceeded] = useState(false)
    const [processing, setProcessing] = useState('')
    const [error, setError] = useState(null)
    const [disabled, setDisables] = useState(true)
    const [clientSecret, setClientsecret] = useState(true)

    useEffect(() => {
    const getClientSecret = async () =>{
        const res = await axios({
            method: 'post',
            url: `/payments/create?total=${getBasketTotal(basket) * 100}`
        })
        setClientsecret(res.data.clientSecret)
    }
     getClientSecret()
    },[basket])

   console.log('the secret is : ', clientSecret)

    const handleSubmit = async (event) =>{
        event.preventDefault()
        setProcessing(true)
       
        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({ paymentIntent }) => {
            setSucceeded(true)
            setError(null)
            setProcessing(false)
            navigate('/orders')

        })
    }

    const handleChange = event =>{
        setDisables(event.empty)
        setError(event.error ? event.error.message : '')
    }

  return (
    <div className='payment'>
      <div className="payment_container">
        <h1>
            Checkout {<Link to='/checkout'>{basket?.length} items</Link>}
        </h1>
        <div className="payment_section">
            <div className="payment_title">
                <h3>Delivery Address</h3>
            </div>
            <div className="payment_address">
                <p>
                    {user?.email}
                </p>
                <p>Vit, College</p>
                <p>Pune, Maharastra</p>
            </div>
        </div>
        <div className="payment_section">
          <div className="payment_title">
            <h3>Review Items and Delivery</h3>
          </div>
          <div className="payment_items">
            {basket.map((item) => (
                <CheckoutProduct
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
                />
            ))}
          </div>
        </div>


        <div className="payment_section">
            <div className="payment_title">
                <h3>Payment Method</h3>
            </div>
            <div className="payment_details">
               <form onSubmit={handleSubmit}>
                <CardElement onChange={handleChange} />

                <div className="payment_priceContainer">
                    <CurrencyFormat
                    renderText={(value) => (
                        <>
                        <h3>Order Total : {value}</h3>
                        </>
                    )}
                    decimalScale={2}
                    value={getBasketTotal(basket)}

                    displayType={'text'}
                    thousandSeparator={true}
                    prefix={'Rs. '}
                    />
                    <button disabled={processing || disabled || succeeded}>
                        <span>{processing ? <p>Processing</p> : 'Buy Now'}</span>
                    </button>
                </div>
                {error && <div>{error}</div>}
               </form>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Payment