import React from 'react'
import { useState } from 'react'
import { Link } from "react-router-dom";
import "./RegisterFomr.css"
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {

  const navigate = useNavigate();

  const navig = async () => {
    const token = await sessionStorage.getItem('token');

    if(token) {
      await navigate("/home", { replace: true });
    }
  };

  const registerFormSender = async (login, nickname, password, email) => {
    try {
    const res = await fetch('http://localhost:3000/api/auth/register', {
      method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nickname: nickname,
                username: login,
                password: password,
                email: email
            })
    })
    
    const data = await res.json();
    
    const token = data.token;

    sessionStorage.setItem("token", token);

    console.log("answer", data);
    } catch(err) {
      console.error("Error while register: ", err);
    }
  };

  const napunkaLoginPunPun = (e) => {
      try {
        e.preventDefault();
        console.log(`
          Login: ${login}
          Nickname: ${nickname}
          Password: ${password}
          Password confirm: ${passwordConfirm}
          Email: ${email}`);

          if(password !== passwordConfirm) {
            throw new Error("Passwords don't match");
          }

          registerFormSender(login, nickname, password, email);

          navig();
      } catch(err) {
        console.error("Error while sending: ", err);
      }

    };

  const [email, setEmail] = useState('');

  const [login, setLogin] = useState('');

  const [nickname, setNickname] = useState('');

  const [passwordConfirm, setPasswordConfirm] = useState('');

  const [password, setPassword] = useState('');

  const [showLogin, setShowLogin] = useState(true);

  const [showPassword, setShowPassword] = useState(true);

  const [showConfirmPassword, setShowConfirmPassword] = useState(true);

  const [showEmail, setShowEmail] = useState(true);

  const [showNickname, setShowNickname] = useState(true);

  const showLoginFunc = () => {

    setShowLogin(!showLogin);

  }
  const showNicknameFunc = () => {

    setShowNickname(!showNickname);

  }
  const showPasswordFunc = () => {

    setShowPassword(!showPassword);

  }
  const showConfirmPasswordFunc = () => {

    setShowConfirmPassword(!showConfirmPassword);

  }
  const showEmailFunc = () => {

    setShowEmail(!showEmail);

  }

  return (
    <div className="w-[100%] h-[100%] bg-white shadow-2xl flex flex-col items-center rounded-2xl" >
      <form onSubmit={napunkaLoginPunPun} className="w-[48%] h-[100%] Kakashkaa " >
        <fieldset className="h-[100%] w-[100%] flex flex-col gap-4" >
          <div className="w-auto h-auto flex flex-col justify-center items-center mt-8 relative" >
            <Link to="/home" className="w-11 h-11 rounded-2xl absolute mb-9" ></Link>
            <img src="/src/assets/Logo.png" className="w-11 h-11" />
            <legend className="w-auto h-auto text-[#1DA1F2] font-semibold flex justify-center items-center Headerr " >Create your account</legend>
          </div>
          
            <div className="w-[100%] h-[8%] bg-gray-200 relative border-b-2 border-gray-400" >
              <label for="login" className={`w-auto h-auto text-gray-400 absolute font-medium transition-all duration-200 ${!showLogin ? 'text-[10px]' : 'text-sm'} ${!showLogin ? 'mt-0' : 'mt-2 '} ${!showLogin ? 'ml-0' : 'ml-3'}`}  >Login</label>
                <input onChange={(e) => setLogin(e.target.value)} placeholder='Login' type="text" id="login" name="login" required autocomplete="off" onFocus={showLoginFunc} onBlur={showLoginFunc} className=" text-gray-600 placeholder-gray-200 font-normal text-base pl-2 w-full h-full focus:ring-2 focus:outline-none focus:ring-[#1DA1F2] caret-gray-600 " />
            </div>

            <div className="w-[100%] h-[8%] bg-gray-200 relative border-b-2 border-gray-400" >
              <label for="nickname" className={`w-auto h-auto text-gray-400 absolute font-medium transition-all duration-200 ${!showNickname ? 'text-[10px]' : 'text-sm'} ${!showNickname ? 'mt-0' : 'mt-2 '} ${!showNickname ? 'ml-0' : 'ml-3'}`}  >Nickname</label>
                <input onChange={(e) => setNickname(e.target.value)} placeholder='Nickname' type="text" id="nickname" name="nickname" required autocomplete="off" onFocus={showNicknameFunc} onBlur={showNicknameFunc} className=" text-gray-600 placeholder-gray-200 font-normal text-base pl-2 w-full h-full focus:ring-2 focus:outline-none focus:ring-[#1DA1F2] caret-gray-600 " />
            </div>

            <div className="w-[100%] h-[8%] bg-gray-200 relative border-b-2 border-gray-400" >
              <label for="password" className={`w-auto h-auto text-gray-400 absolute font-medium transition-all duration-200 ${!showPassword ? 'text-[10px]' : 'text-sm'} ${!showPassword ? 'mt-0' : 'mt-2 '} ${!showPassword ? 'ml-0' : 'ml-3'}`}  >Password</label>
                <input onChange={(e) => setPassword(e.target.value)} placeholder='Password' type="password" id="password" name="password" required autocomplete="off" onFocus={showPasswordFunc} onBlur={showPasswordFunc} className=" text-gray-600 placeholder-gray-200 font-normal text-base pl-2 w-full h-full focus:ring-2 focus:outline-none focus:ring-[#1DA1F2] caret-gray-600 " />
            </div>

            <div className="w-[100%] h-[8%] bg-gray-200 relative border-b-2 border-gray-400" >
              <label for="confirmPassword" className={`w-auto h-auto text-gray-400 absolute font-medium transition-all duration-200 ${!showConfirmPassword ? 'text-[10px]' : 'text-sm'} ${!showConfirmPassword ? 'mt-0' : 'mt-2 '} ${!showConfirmPassword ? 'ml-0' : 'ml-3'}`}  >Confirm password</label>
                <input onChange={(e) => setPasswordConfirm(e.target.value)} placeholder='Confirm password' type="password" id="confirmPassword" name="confirmPassword" required autocomplete="off" onFocus={showConfirmPasswordFunc} onBlur={showConfirmPasswordFunc} className=" text-gray-600 placeholder-gray-200 font-normal text-base pl-2 w-full h-full focus:ring-2 focus:outline-none focus:ring-[#1DA1F2] caret-gray-600 " />
            </div>

            <div className="w-[100%] h-[8%] bg-gray-200 relative border-b-2 border-gray-400" >
              <label for="email" className={`w-auto h-auto text-gray-400 absolute font-medium transition-all duration-200 ${!showEmail ? 'text-[10px]' : 'text-sm'} ${!showEmail ? 'mt-0' : 'mt-2 '} ${!showEmail ? 'ml-0' : 'ml-3'}`}  >Email</label>
                <input onChange={(e) => setEmail(e.target.value)} placeholder='email' type="email" id="email" name="email" required autocomplete="off" onFocus={showEmailFunc} onBlur={showEmailFunc} className=" text-gray-600 placeholder-gray-200 font-normal text-base pl-2 w-full h-full focus:ring-2 focus:outline-none focus:ring-[#1DA1F2] caret-gray-600 " />
            </div>

          <button type="submit" className=" w-[100%] h-[8%] bg-[#1DA1F2] rounded-lg text-base text-white font-semibold  " >
            Create account
          </button>
          
          <Link to="/Login" className="w-[100%] h-auto flex justify-center text-[#1DA1F2] font-medium Popkaa" >Have already an account? · Log in for Twitter</Link>

        </fieldset>
      </form>
    </div>
  )
}

export default RegisterForm
