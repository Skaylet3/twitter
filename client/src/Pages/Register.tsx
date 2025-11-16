import React from 'react'
import RegisterForm from '../components/RegisterForm/RegisterForm'
import "./Register.css"

const Register = () => {

  return (
    <div className="bg-[#1DA1F2] w-screen h-screen flex flex-row justify-center items-center" >
      <div className="w-[40%] h-[60%] Registerr " > 
        <RegisterForm/>
      </div>
    </div>
  )
}

export default Register
