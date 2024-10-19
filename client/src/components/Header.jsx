
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../redux/user/userSlice';

const Header = () => {
  const { currentUser } = useSelector((state)=> state.user);
  const dispatch = useDispatch();

  const handleSignout = async() =>{
    try{
      await fetch('/api/auth/signout');
      dispatch(signOut());
    } catch(err){
      console.log(err);      
    }
  }
  return (
    <div className="bg-slate-200">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3 ">
        <div>
          <h1 className="font-bold capitalize">redx-admin-user</h1>
        </div>
        <ul className="flex gap-3">
            <Link to="/">
                <li>Home</li>
            </Link>
             
            <Link to="/profile">
              {currentUser ? (
                 <fragment
                  className='flex gap-4'
                 >
                  <img 
                    src={currentUser.profilepic}
                    alt='profile'
                    className="h-7 w-7 rounded-full object-cover"
                  />
                  <button 
                    onClick={handleSignout}
                    className='text-red-500 capitalize'
                  >sign out</button>
                  </fragment>
              ):(
                <li>Sign in</li>
              )}
               
            </Link>             
                 
        </ul>
      </div>
    </div>
  );
}

export default Header