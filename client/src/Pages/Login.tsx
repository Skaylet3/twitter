import React from 'react'
import LoginForm from '../components/LoginForm/LoginForm'
import "./Login.css"

const Login = () => {
  return (
    <div className="bg-[#1DA1F2] w-screen h-screen flex flex-row justify-center items-center" >
      <div className="w-[40%] h-[60%] Login " > 
        <LoginForm/>
      </div>
    </div>
  )
}

export default Login
