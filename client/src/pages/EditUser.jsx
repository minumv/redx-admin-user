import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { fetchOneFailure, fetchOneStart, fetchOneSuccess, updateDetailStart,updateDetailSuccess,updateDetailFailure,deleteDetailStart, deleteDetailFailure, deleteDetailSuccess} from '../redux/admin/adminSlice';

const EditUser = () => {
  const { id } = useParams();
  const { selectedUser, loading, error } = useSelector((state)=> state.admin);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [formData, setFormData] = useState({});

  const dispatch = useDispatch();
  console.log("form",formData);
  console.log("user",selectedUser);
  
  useEffect(()=>{
    
    const fetchUsers = async() => {
      try{
        
        dispatch(fetchOneStart());
        
        const res = await fetch(`/api/admin/getDetails/${id}`);
        
        
        if (!res.ok) {
          throw new Error('Failed to fetch user details');
        }
        const userList = await res.json();

        if(!userList || userList.length === 0){
          dispatch(fetchOneFailure(userList));
          return;
        }
        console.log("users",userList);
        
        dispatch(fetchOneSuccess(userList));

      } catch(err){          
        dispatch(fetchOneFailure(err));
      }
     
    }
    fetchUsers();
  },[id,dispatch]);

  const handleChange = async(e) =>{
    setFormData({...formData, [e.target.id]: e.target.value,})
  }

  const handleSubmit = async(e) =>{
    e.preventDefault();
    try{
        dispatch(updateDetailStart());
        const res = await fetch(`/api/admin/updateuser/${id}`,{
          method:'POST',
          headers:{
            'Content-Type' : 'application/json'
          },
          body: JSON.stringify(formData)
        })
        const data = await res.json();

        if(!data){
          dispatch(updateDetailFailure(data));
          return;
        }

        dispatch(updateDetailSuccess(data));        
        setUpdateSuccess(true);

    } catch(err){
      dispatch(updateDetailFailure(err));
    }
  }
  const handleBlock = async() =>{
  
    try{
      dispatch(updateDetailStart());
      const res = await fetch(`/api/admin/blockuser/${id}`,{
        method:'POST',
        headers:{
          'Content-Type' : 'application/json'
        },       
      })

      if (!res.ok) {
        const errorData = await res.json();
        dispatch(updateDetailFailure(errorData));
        return;
      }
  
      const data = await res.json();
      dispatch(updateDetailSuccess(data));        
      setUpdateSuccess(true);

  } catch(err){
    dispatch(updateDetailFailure(err));
  }
  } 

  const handleUnBlock = async() =>{
  
    try{
      dispatch(updateDetailStart());
      const res = await fetch(`/api/admin/unblockuser/${id}`,{
        method:'POST',
        headers:{
          'Content-Type' : 'application/json'
        },       
      })

      if (!res.ok) {
        const errorData = await res.json();
        dispatch(updateDetailFailure(errorData));
        return;
      }
  
      const data = await res.json();
      dispatch(updateDetailSuccess(data));        
      setUpdateSuccess(true);

  } catch(err){
    dispatch(updateDetailFailure(err));
  }
  } 


  const handleDelete = async(e) =>{
    try{
      dispatch(deleteDetailStart());
      const res = await fetch(`/api/admin/deleteuser/${id}`,{
        method:'POST',
        headers:{
          'Content-Type' : 'application/json'
        },       
      })

      if (!res.ok) {
        const errorData = await res.json();
        dispatch(deleteDetailFailure(errorData));
        return;
      }
  
      const data = await res.json();
      dispatch(deleteDetailSuccess(data));        
      setDeleteSuccess(true);

  } catch(err){
    dispatch(deleteDetailFailure(err));
  }
  }

  return (
    <div className=' flex justify-center'>
      { selectedUser ? ( 
        <div className='w-[400px] -mt-10 p-4'>
    <p className="text-red-700 mt-5">{error ? error.message || 'Something went wrong!' : ''}</p>
    <p className="text-green-700 mt-5">{updateSuccess ? 'Profile updated successfully..' : ''}</p>
    <p className="text-green-700 mt-5">{deleteSuccess ? 'Profile deleted successfully..' : ''}</p>
       <h1 className='text-center text-3xl font-semibold mt-20'>User Profile</h1>
        <form 
          onSubmit={handleSubmit}
          className='flex flex-col gap-4'
        >
            <img
                src={selectedUser.profilepic}
                className='rounded-full self-center w-24 h-24 object-cover mt-4'
            />
            
           
            <input 
                type="text"
                className='bg-slate-100 text-slate-800 rounded-lg p-3 hover:bg-slate-200'
                id="username"
                defaultValue={selectedUser.username}
                disabled
            />
            <input
                type="email"
                className='bg-slate-100 text-slate-800 rounded-lg p-3 hover:bg-slate-200'
                id="email"
                defaultValue={selectedUser.email}
                disabled
            />

            <input
                type="text"
                className='bg-slate-100 text-slate-800 rounded-lg p-3 hover:bg-slate-200'
                id='mobile' 
                defaultValue={selectedUser.mobile !== 0 ? selectedUser.mobile : 'Not added'} 
                disabled
            />
            <input
                type="text"
                className='bg-slate-100 text-slate-800 rounded-lg p-3 hover:bg-slate-200'
                id='jobtitle'
                placeholder={selectedUser.jobtitle === 'staff' ? 'Job Title' : undefined} 
                defaultValue={selectedUser.jobtitle !== 'staff' ? selectedUser.jobtitle : 'Not added'} 
                onChange={handleChange}
            />
           <div className='flex justify-around gap-1'>
           <button
                type="submit"
                className='p-2 w-1/3 bg-green-500 text-white text-xl rounded-lg hover:opacity-95 uppercase disabled:opac-80 cursor-pointer'
            >
                { loading ? 'Loading..' : 'update'}
            </button>
            {(selectedUser.isActive)?
               (
                <button
                type='button'
                className='p-2 w-1/3 bg-yellow-500 text-white text-xl rounded-lg hover:opacity-95 uppercase disabled:opac-80 cursor-pointer'
                onClick = {handleBlock}
              >
             block
              </button> 
               ):(
                <button
                type='button'
                className='p-2 w-1/3 bg-yellow-500 text-white text-xl rounded-lg hover:opacity-95 uppercase disabled:opac-80 cursor-pointer'
                onClick = {handleUnBlock}
              >
              unblock
              </button> 
               )}
             
            <button
              type='button'
                className='p-2 w-1/3 bg-slate-500 text-white text-xl rounded-lg hover:opacity-95 uppercase disabled:opac-80 cursor-pointer'
                onClick={handleDelete}
            >
                { loading ? 'Loading..' : 'delete'}
            </button>
           </div>
            

        </form>
        </div> 
      ):(
        <p> Loading...</p>
      )}
    
    </div>
  )
}

export default EditUser