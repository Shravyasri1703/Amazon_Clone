import Checkout from "./Checkout"
import Header from "./Header"
import Home from "./Home"
import { BrowserRouter, Routes, Link, Route } from "react-router-dom"
import Login from "./Login"
import { useEffect } from "react"
import { auth } from "./firebase"
import { useStateValue } from "./StateProvider"
import Payment from "./Payment"
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

const promise = loadStripe('pk_live_51P64IsSIH6dvveag3iqgmkUStWrv1k5S7iHXziE4xQ0b6YV9hBftkWyCtTvMFffkYj3VfK77N2iQzdlixS0mNHnj00Fen9JLwJ')

function App() {
  const[{}, dispatch] = useStateValue()
   useEffect(() => {

   //this will only run once, when the app component loads  if array is kept blnack but if we put something into the array it would rerun if there are changes involved in the written component
    auth.onAuthStateChanged(authUser => {
      console.log('The User is >>>', authUser)

      if(authUser) {
          dispatch({
            type: 'SET_USER',
            user: authUser
          })
      }else{
           dispatch({
            type: 'SET_USER',
            user: null
           })
      }
    })
   }, [])
  return (
    <BrowserRouter>
   
     <Routes>
      <Route path='/login' element={<Login />}/>
      
      <Route path='/' element={<>
       <Header />
       <Home />
      </>} />
      
     <Route path='/checkout' element={<>
      <Header />
      <Checkout />
     </>} />

     <Route path='/payment' element={<>
      <Header />
      <Elements stripe={promise}>
      <Payment />
      </Elements>
     
     </>} />

    
     </Routes>
    </BrowserRouter>
  )
}

export default App
