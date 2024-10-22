import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { clearSelectedUser, fetchUsersFailure, fetchUsersStart, fetchUsersSuccess, setUserCountSuccess } from '../redux/admin/adminSlice';

const Dashboard = () => {
  const { userCount } = useSelector((state)=> state.admin);
 
  const dispatch = useDispatch();
  useEffect(()=>{
    const fetchUsers = async()=>{
     dispatch(clearSelectedUser(null));
      try{
        dispatch(fetchUsersStart());
        const res = (await fetch('/api/admin/getusers'));
        const userslist = await res.json();

        if(!userslist){
          dispatch(fetchUsersFailure(userslist));      
          return;
        }

        const count = userslist.length;
        dispatch(setUserCountSuccess(count));
        dispatch(fetchUsersSuccess(userslist));

      } catch(err){
        dispatch(fetchUsersFailure(userslist));
      }
    } 
    fetchUsers();
  },[dispatch])
  return (   
    <div className='flex flex-col'>
      <h1 className='text-gray-600 text-xl font-semibold'>Dashboard</h1>
      <div className='flex space-x-36 ps-20 pt-10'>
          <div className='flex flex-col rounded-lg w-40'>
            <div className='flex bg-orange-300 text-center justify-around p-4 rounded items-center'>
              <i class="fas fa-users"></i>
              <div className='text-center'>
                <h3>Users</h3>            
                <h3>{userCount}</h3>            
              </div>
            </div>           
          </div>
          <div className='flex flex-col rounded-lg w-40'>
            <div className='flex bg-green-300 text-center justify-around p-4 rounded items-center'>
              <i className="fas fa-users"></i>
              <div className='text-center'>
                <h3>Sales</h3>            
                <h3>2.6358</h3>            
              </div>
            </div>           
          </div>
          <div className='flex flex-col rounded-lg w-40'>
            <div className='flex bg-pink-300 text-center justify-around p-4 rounded items-center'>
              <i className="fas fa-users"></i>
              <div className='text-center'>
                <h3>Profit</h3>            
                <h3>21.300</h3>            
              </div>
            </div>           
          </div>
          <div className='flex flex-col rounded-lg w-40'>
            <div className='flex bg-blue-300 text-center justify-around p-4 rounded items-center'>
              <i className="fas fa-users"></i>
              <div className='text-center'>
                <h3>Orders</h3>            
                <h3>68</h3>            
              </div>
            </div>           
          </div>
         
      </div>
      <div className='p-2 w-[1200px]'>
        <img
          src="https://www.spotfire.com/content/dam/spotfire/images/graphics/inforgraphics/line-chart.svg"
          alt="chart"
          className='self-center object-cover ms-10'
        />
      </div>
    
    </div>
  )
}

export default Dashboard