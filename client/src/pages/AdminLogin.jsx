import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { OAuth } from "../components/OAuth";
import { useDispatch, useSelector } from "react-redux";
import { signInFailure, signInStart, signInSuccess } from "../redux/user/userSlice";

export const AdminLogin = () => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({ email: '', password: '' });
  const { loading, error }= useSelector((state)=> state.user)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log(formData);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    let isValid = true;
    let newErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Invalid email format';
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 4) {
      newErrors.password = 'Password must be at least 6 characters long';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try{
       dispatch(signInStart());
      const res = await fetch('/api/auth/adminsign',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(formData)
      }) 

      console.log(formData);
      
      console.log('after fetch..');
       
      const data = await res.json();
      console.log("data",data);
      
      dispatch(signInSuccess(data));
      if(data.success === false){
        dispatch(signInFailure(data));
        return
      }
      dispatch(signInSuccess(data));
      navigate('/dashboard'); 
            
    } 
    catch(err){
      console.error('Fetch error:', err);
      dispatch(signInFailure());
    }
  }
    

  return (
    <>
      <div className="p-3 max-w-lg mx-auto mt-20">
        <h1 className="text-3xl text-center font-semibold my-7">Admin </h1>
        <form 
          className="flex flex-col gap-4"
          onSubmit={ handleSubmit }
        >
          
          <input
            type="email"
            className="bg-slate-100 p-3 rounded-lg"
            placeholder="Email"
            id="email"
            onChange={ handleChange}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          <input
            type="password"
            className="bg-slate-100 p-3 rounded-lg"
            placeholder="Password"
            id="password"
            onChange={ handleChange}
          />  
           {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}       
          <button
            disabled= {loading} 
            className="bg-slate-700 text-white p-3 rounded-lg capitalize hover:opacity-85"
          >           
             Sign In        
          </button>

          <div className="flex gap-2 mt-1 justify-center">
            <h6>Already a member? </h6>
            <span className="text-blue-700 cursor-pointer">
                <Link to="/signin">Sign In</Link>
            </span>           
          </div>
          
            <p className="text-red-700 mt-5">{error && 'Something went wrong!'}</p>
        </form>
      </div>
    </>
  );
}
