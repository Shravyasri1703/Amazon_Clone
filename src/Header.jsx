import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import './Header.css'
import { Link } from 'react-router-dom';
import { useStateValue } from './StateProvider';
import { auth } from './firebase';
import { useNavigate } from 'react-router-dom';
function Header() {
  const nav = useNavigate()
   
  const [{ basket, user }, dispatch ] = useStateValue()
  const handleAuthentication = () =>{
    if(user) {
      auth.signOut()
    }
  }


  


  return (
    <div className='header'>
      <Link to={user && '/'}>
      <img src='http://pngimg.com/uploads/amazon/amazon_PNG11.png' className='header_logo'  />
      </Link>
       

        <div className='header_search'>
          <input className='header_searchInput' type='text' />
          <SearchIcon className='header_searchIcon'/>
        </div>
         <div className='header_nav'>
          <Link to={!user && '/Login'}>
             <div onClick={handleAuthentication} className='header__option'>
                <span className='header__optionLineone'>
               { user ? `Hello, ${user?.email}` : 'Hello Guest' }
                </span>

                <span className='header__optionLinetwo'>
                  {user ? 'Signout' : 'SignIn'}
                </span>
                </div>
                </Link>

             <div className='header__option'>
             <span className='header__optionLinethree'>
                Orders
                </span>

                <span className='header__optionLinetwo'>
              & Returns
                </span>
             </div>
             <div className='header__option'>
             <span className='header__optionLineone'>
               Your
                </span>

                <span className='header__optionLinetwo'>
              Prime
                </span>
             </div>
           <Link to='/checkout'>
            <div className='header__optionbasket'>
              
              <ShoppingBasketIcon />
             
              <span className='header__optionLinetwo header_basketCount'>
               {basket?.length}
              </span>
            </div>
            </Link>
         </div>

    </div>
  )
}

export default Header