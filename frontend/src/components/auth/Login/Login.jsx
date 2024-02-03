import React from 'react'
import { useState } from 'react'
import { loginUser } from '../../utils/ApiFunctions';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const Login = () => {

    const [errorMessage, setErrorMessage] = useState("");
    const [login, setLogin] = useState({
        email: "",
        password: ""
    })
    const navigate = useNavigate()

    const handleInptChange = (e) => {
        setLogin({...login, [e.target.name]: e.target.value})
    }

    const handleLogin = async(e) => {
        e.preventDefault()
        const success = await loginUser(login)
        if(success){
            const token = success.token
            const decodedToken = jwtDecode(token)
            localStorage.setItem("token", token)
            localStorage.setItem("userId", decodedToken.sub)
            localStorage.setItem("userRole", decodedToken.role.join(","))
            navigate("/")
            window.location.reload()
        }
        else{
            setErrorMessage("Invalid login")
        }
        setTimeout(() => {
            setErrorMessage("")
        }, 3000)
    }

  return (
    <div>
      <section>
        <form onSubmit={handleLogin}>
            <div>
                <label htmlFor='email'>Email</label>
                <div>
                    <input id='email' name='email' type='email' value={login.email} onChange={handleInptChange}>
                    </input>
                </div>
            </div>
            <div>
                <label htmlFor='password'>Password</label>
                <div>
                    <input id='password' name='password' type='password' value={login.password} onChange={handleInptChange}>
                    </input>
                </div>
            </div>
            <button type='submit'>Submit</button>
        </form>
      </section>
    </div>
  )
}

export default Login
