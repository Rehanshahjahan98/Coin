import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import TransactionsDetail from './transactionsDetail';
import Affilliates from './affilliates';
import Content from './content';

const navLinks = [
  { url: '/about-us', name: 'MY ACCOUNT', id:"account" },
  { url: '/projects', name: 'AFILLIATES', id:"affilliates" },
  { url: '/services', name: 'TRANSACTIONS', id:"transaction" },
  { url: '/contact-us', name: 'STATS' },
];
const Menu = () => {
  const [menuStatus, setMenuStatus] = useState('open');
  const [style, setStyle] = useState('menu active');

  const [state, setState]= useState();

  const handleClick = () => {
    switch (menuStatus) {
      case 'open':
        setMenuStatus('close');
        setStyle('menu');
        break;
      case 'close':
        setMenuStatus('open');
        setStyle('menu active');
        break;
    }
  };

  const changeState = (id) =>{
    if(id=="account"){
      setState(<content/>)
    } else{
      setState("coming soon")
    }

  }

  return (
    <div className='mt-3'>
      <div className={style}>
        <ul>
      {/* <button className='d-md-none menu-btn' onClick={handleClick}>menu</button> */}
        
          {navLinks.map(({ url, name, id }) => (
            <li key={url}>
              <a href={url}>{name}</a>
              {/* <button onClick={()=>changeState(id)}>{name}</button> */}

            </li>
          ))}

          
        </ul>
       
      </div>
      <div className='menu-bottom'>
          <div className='w-75 m-auto'>
          <div className=''>
          
          <LogoutButton/>
          </div>
          <div>
          <NavLink to="/casino">
          <button type="button"  style={{borderColor:"transparent"}} className="bg-transparent text-white fs-5 btn btn-primary logout_btn">
            BACK TO CASINO
          </button>
          </NavLink>
          </div>
          </div>
          </div>
    </div>
  );
};

export default Menu;
