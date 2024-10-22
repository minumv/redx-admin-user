import { signOut } from '../redux/user/userSlice';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { fetchUsersFailure, fetchUsersStart, fetchUsersSuccess } from '../redux/admin/adminSlice';

const AdminHeader = () => {
  const { currentUser } = useSelector((state)=> state.user);
  const { users } = useSelector((state)=> state.admin);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = async(e) =>{
    try{
      await fetch('/api/auth/signout');
      dispatch(signOut());
      navigate('/adminsign')
    }
    catch(err){
      console.log(err);
      
    }
  }
  
  const searchHandle = async(query)=>{
    try{
      dispatch(fetchUsersStart())
      
      const res = await fetch( `/api/admin/search?query=${encodeURIComponent(query)}`)
      
      if(!res.ok){
        const errorData = await res.json();
        dispatch(fetchUsersFailure(errorData))
      }

      const data = await res.json();
      dispatch(fetchUsersSuccess(data))
      navigate('/users')
      
      
    }
    catch(err){

    }
  }
    return (
      <div className="bg-[url('https://img.freepik.com/free-vector/gradient-particle-wave-background_23-2150491602.jpg?t=st=1729401443~exp=1729405043~hmac=50d373c108fd441e5d8c1b9ed2b1f309da51e40c70a6cf5265fa18bc77881405&w=996')] bg-cover bg-centerw-screen h-screen">
        
     <div className='flex h-full p-8 gap-6'>
     <div  className="rounded-lg text-gray-800 bg-slate-100 p-4">
      <div className='flex flex-col  w-[150px]'>
        <img 
          src="https://static.vecteezy.com/system/resources/thumbnails/009/209/212/small/neon-glowing-profile-icon-3d-illustration-vector.jpg"
          className='rounded-full self-center w-24 h-24 object-cover mt-4' 
          alt="redx-admin-user" />
        <h2 className="text-l text-pink-950 mt-2 font-bold mb-9 text-center uppercase">redx-admin-user</h2>
        <nav>
          <ul>
            <li className='border-b pt-4 border-t border-gray-300 pb-4 mb-4  font-semibold'><i className="fas fa-tachometer-alt text-gray-400 me-2"></i><a href="/dashboard">Dashboard</a></li>            
            <li className='border-b border-gray-300 pb-4 mb-4 font-semibold'><i className="fas fa-users text-gray-400 me-2"></i><a href="/users">Users</a></li>
            <li className='border-b border-gray-300 pb-4 mb-4 font-semibold'><i class="fas fa-concierge-bell text-gray-400 me-2"></i><a href="/gotodummy">Services</a></li>
            <li className='border-b border-gray-300 pb-4 mb-4 font-semibold'><i class="fas fa-address-book text-gray-400 me-2"></i><a href="/gotodummy">Contact</a></li>    
            <li className='border-b border-gray-300 pb-4 mb-4 font-semibold'><i class="fas fa-map-marker-alt text-gray-400 me-2"></i><a href="/gotodummy">Map</a></li>    
            <li className='border-b border-gray-300 pb-4 mb-4 font-semibold'><i class="fas fa-cog text-gray-400 me-2"></i><a href="/gotodummy">Settings</a></li>    
          </ul>
        </nav>
      </div>
      </div>

      {/* Main content area */}
      <div className="w-full rounded bg-transparent">
        {/* Navbar */}
        <header className=" text-pink-950 bg-slate-100 p-4 rounded-lg flex justify-between">
            <div className="relative">
              <input
                type="text"
                className="border border-gray-300 rounded-lg outline-none p-2 pl-10"
                placeholder="Search"
                onChange={(e) => searchHandle(e.target.value)} 
              />
              <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            </div>
            <div className='flex items-center space-x-5 me-4'>
                <i className="fas fa-bell  text-green-700 cursor-pointer"></i>
                <i className="fas fa-envelope  text-blue-700 cursor-pointer"></i>
                <div className='flex gap-1'>
                  <img 
                    src={currentUser.profilepic}
                    alt="admin" 
                    className='rounded-full w-7 h-7 self-center object-cover cursor-pointer'  
                  />
                  <h6 className='cursor-pointer text-gray-500'>{currentUser.username}</h6>
                </div>
                <i 
                  className='fas fa-sign-out-alt text-red-700 cursor-pointer'
                  onClick={handleSignOut}
                ></i>
            </div>
        </header>

        
        <main className="p-4 mt-4 bg-slate-100 text-gray-600 h-[585px] rounded-lg">
          <Outlet /> 
        </main>
      </div>
     </div>
      </div>
    );
  };

export default AdminHeader