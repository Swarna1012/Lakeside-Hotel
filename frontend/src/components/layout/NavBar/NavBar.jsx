import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import './NavBar.css'
import Logout from '../../auth/Logout/Logout'

const NavBar = () => {

    const [showAccount, setShowAccount] = useState(false);

    const handleAccount = () => {
        setShowAccount(!showAccount);
    }


  return (
    <div className='navbar-container'>
                <ul className='navbar-ul'>
                    <li>
                        <Link to={"/"}>
                            <span>LakeSide Hotel</span>
                        </Link>
                    </li>
                    <li>
                        <NavLink to={"/"}>
                            Browse All Rooms
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={"/admin"}>
                            Manage Rooms
                        </NavLink>
                    </li>

                    
                </ul>

                <ul className='navbar-ul navbar-right'>
                    <li>
                        <NavLink to={"/find-booking"}>
                            Find My Booking
                        </NavLink>
                    </li>

                    <li>
                        <a onClick={handleAccount}>
                            Account
                        </a>

                        { showAccount && (
                            <ul className='navbar-account'>
                                <Logout />
                                <li>
                                    <Link to={"/logout"}>
                                        Log out
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </li>
                
                    {/* <li>
                        <a></a>
                        <ul>
                            <li>
                                <NavLink to={"/login"}>
                                    Login
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={"/profile"}>
                                    Profile
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={"/logout"}>
                                    Logout
                                </NavLink>
                            </li>
                        </ul>
                    </li> */}
                </ul>
    </div>
  )
}

export default NavBar
