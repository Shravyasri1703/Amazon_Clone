import React, { useState, useEffect } from 'react'
import './Login.css'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from './firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'




function Login() {
   
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const signIn = async e =>{
    e.preventDefault()
    try{
      const login = await signInWithEmailAndPassword(auth, email, password)
      .then(auth => {
        navigate('/')
      })
      .catch(error => alert(error.message))
        
      
    }
    catch(err){
      console.log(err)
    }


    
   }

   const register = async  (e) =>{
      try{
         await createUserWithEmailAndPassword(auth, email, password)
          console.log(auth)
          navigate('/')
          
      }
      catch(err){
        console.log(err)
      }
      
  }

  return (
    <div className='login'>
      <Link to='/'>
    <img className='logo_image' src="data:image/png;base64,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" />
    </Link>

    <div className='login_container'>
      <h1>Sign In</h1>
     <form>
       <h5>E-mail</h5>
       <input type='text' value={email} name='email' onChange={e => setEmail(e.target.value)} />
     
       <h5>Password</h5>
       <input type='password' value={password} name='password' onChange={e => setPassword(e.target.value)} />
       <button type='submit' onClick={signIn} className='login_signin'>Sign In</button>
     </form>
     <p>
      By signing-in you agree to Amazon's Conditions of Use & Sale.
      Please see our Privacy Notice , our Cookies Notice and our
      Intrest-Based Ads.
     </p>
     <button onClick={register}  className='login_register'>Create your Account</button>
    </div>
    </div>

    
  )
}

export default Login