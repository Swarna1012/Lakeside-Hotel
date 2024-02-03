import React from 'react'
import { Link } from 'react-router-dom'

const Logout = () => {
  return (
    <div>
        <li>
            <Link to={"/login"}>
                Login
            </Link>
        </li>
        <li>
            <Link to={"/profile"}>
                Profile
            </Link>
        </li>
    </div>
  )
}

export default Logout
