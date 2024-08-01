import React from 'react'
import { BsFillBellFill, BsSearch, BsJustify }
  from 'react-icons/bs'
  import emoj from './assets/emoj.png'

function Header({ OpenSidebar }) {
  return (
    <header className='header'>
      <div className="left-nav">
      <div className='menu-icon'>
        <BsJustify className='icon' onClick={OpenSidebar} />
      </div>
      <div className='header-left'>
        <h1>Hello </h1>
      </div>
      </div>
      <div className="navbar-right">
        <div className="search-container">
            <BsSearch className='icon'/>
            <input type="text" placeholder="Search" className='search-container '  />
        </div>
        <div className="user-info">
          <BsFillBellFill className='icon'/>
          <img src={emoj} alt="Profile" />
          <span>Profile</span>
        </div>
      </div>
    </header>
  )
}

export default Header