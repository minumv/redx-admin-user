import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';


export const OAuth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleGoogleSignIn = async() =>{
        try{            
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
            const result = await signInWithPopup(auth, provider);
            console.log(result);   
            
            const res = await fetch('/api/auth/google',{
                method: 'POST',
                headers:{
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify({
                    name: result.user.displayName,
                    email: result.user.email,
                    photo: result.user.photoURL
                })
            })

            const data = await res.json();
            dispatch(signInSuccess(data));
            navigate('/');    

        } catch(err){
            console.log('Could not login with google',err);
        }
    }

  return (
    <button 
    type="button"
    onClick={handleGoogleSignIn}
    className="bg-red-800 mt-1 text-white p-3 rounded-lg capitalize hover:opacity-85"
>
    Sign in with Google
</button>
  )
}
