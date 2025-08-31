import React from 'react'
import { useState } from 'react'
import { Link } from "react-router-dom";
import "./LoginForm.css"

const LoginForm = () => {

  const [showLogin1, setShowLogin1] = useState(true);

  const [showPassword1, setShowPassword1] = useState(true);

  const [login, setLogin] = useState('');

  const [password, setPassword] = useState('');

  const loginHandler = async (login, password) => {
    try {
      const res = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          username: login,
          password: password,
          }),
      });

      const data = await res.json();
      console.log(data);
    } catch(err) {
      console.error("error: ", err.message);
    }
  }

  const napunkaLoginPunPun = (e) => {
      e.preventDefault();
      console.log(`
        ${login}
        ${password}
        `);
        loginHandler(login, password);
    };

  const showLoginFunc1 = () => {

    setShowLogin1(!showLogin1);

  }
  const showPasswordFunc1 = () => {

    setShowPassword1(!showPassword1);

  }

  return (
    <div className="w-[100%] h-[100%] bg-white shadow-2xl flex flex-col items-center rounded-2xl" >
      <form onSubmit={napunkaLoginPunPun} className="w-[48%] h-[100%] Kakashkaa " >
        <fieldset className="h-[100%] w-[100%] flex flex-col gap-4" >
          <div className="w-auto h-auto flex flex-col justify-center items-center mt-8 relative" >
            <Link to="/home" className="w-11 h-11 rounded-2xl absolute mb-9" ></Link>
            <img src="/src/assets/Logo.png" className="w-11 h-11" />
            <legend className="w-auto h-auto text-3xl text-[#1DA1F2] font-semibold flex justify-center items-center Headerr" >Create your account</legend>
          </div>
          
            <div className="w-[100%] h-[8%] bg-gray-200 relative border-b-2 border-gray-400" >
              <label for="login" className={`w-auto h-auto text-gray-400 absolute font-medium transition-all duration-200 ${!showLogin1 ? 'text-[10px]' : 'text-sm'} ${!showLogin1 ? 'mt-0' : 'mt-2 '} ${!showLogin1 ? 'ml-0' : 'ml-3'}`}  >Login</label>
                <input onChange={(e) => setLogin(e.target.value)} placeholder='Login' type="text" id="login" name="login" required autocomplete="off" onFocus={showLoginFunc1} onBlur={showLoginFunc1} className=" text-gray-600 placeholder-gray-200 font-normal text-base pl-2 w-full h-full focus:ring-2 focus:outline-none focus:ring-[#1DA1F2] caret-gray-600 " />
            </div>

            <div className="w-[100%] h-[8%] bg-gray-200 relative border-b-2 border-gray-400" >
              <label for="password" className={`w-auto h-auto text-gray-400 absolute font-medium transition-all duration-200 ${!showPassword1 ? 'text-[10px]' : 'text-sm'} ${!showPassword1 ? 'mt-0' : 'mt-2 '} ${!showPassword1 ? 'ml-0' : 'ml-3'}`}  >Password</label>
                <input onChange={(e) => setPassword(e.target.value)} placeholder='Password' type="password" id="password" name="password" required autocomplete="off" onFocus={showPasswordFunc1} onBlur={showPasswordFunc1} className=" text-gray-600 placeholder-gray-200 font-normal text-base pl-2 w-full h-full focus:ring-2 focus:outline-none focus:ring-[#1DA1F2] caret-gray-600 " />
            </div>

          <button type="submit" className=" w-[100%] h-[8%] bg-[#1DA1F2] rounded-lg text-base text-white font-semibold  " >
            Create account
          </button>
          
          <Link to="/Register" className="w-[100%] h-auto flex justify-center text-[#1DA1F2] font-medium Popkaa" >Have no Twitter account? · Sign in for Twitter</Link>

        </fieldset>
      </form>
    </div>
  )
}

export default LoginForm
