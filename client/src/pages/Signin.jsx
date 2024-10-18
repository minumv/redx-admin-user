import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { OAuth } from '../components/OAuth';

export const Signin = () => {
    const [formData, setFormData] = useState({ email: '',
      password: ''});
    const { loading, error }= useSelector((state)=> state.user)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
      if (error) {
        dispatch(signInFailure(false));  // Clear error on page load
      }     
    }, []);
    
    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value});
    }
    const handleSubmit = async(e) =>{
        e.preventDefault();

        console.log('Form submitted!'); 

        if (!formData.email || !formData.password) {
          alert('Please enter both email and password!');
          return;  // Do not proceed if fields are empty
        }

        try{
            dispatch(signInStart());
            const res = await fetch('/api/auth/signin',{
                method: 'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(formData)
            });
    
            const data = await res.json();
            console.log('response data',data); 
            
            // if (!data.access_token) {  // if token is not present, handle the error
            //   throw new Error('Token not provided!');
            // }

            if(data.success === false){
                dispatch(signInFailure(data))
                return
            }

           // const { user, access_token } = data;
          //  { ...user, access_token }
            dispatch(signInSuccess(data));

            //localStorage.setItem('access_token', data.access_token);

            navigate('/');

        } catch(err){
            console.error('Fetch error:', err);
            dispatch(signInFailure(err));
        }
    }
    return (
        <>
          <div className="p-3 max-w-lg mx-auto mt-20">
            <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
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
              <input
                type="password"
                className="bg-slate-100 p-3 rounded-lg"
                placeholder="Password"
                id="password"
                onChange={ handleChange}
              />         
              <button
                type='submit'
                disabled= {loading} 
                className="bg-slate-700 text-white p-3 rounded-lg capitalize hover:opacity-85"
              >
                { loading ? 'Loading..' : 'Sign In'}               
              </button>
    
              <div className="flex gap-2 mt-1 justify-center">
                <h6>Are you new to the app? </h6>
                <span className="text-blue-700 cursor-pointer">
                    <Link to="/signup">Sign Up</Link>
                </span>           
              </div>
              <div className="flex items-center">
                <div className="flex-grow border-t border-gray-300"></div>
                  <span className="px-3 text-gray-500">Or</span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>
    
              <OAuth />
                <p className="text-red-700 mt-5">{error ? error.message || 'Something went wrong!' : ''}</p>
            </form>
          </div>
        </>
      );
}
