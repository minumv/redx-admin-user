import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
// import { errorHandler } from '../../../api/utils/error';
import { updateUserFailure, updateUserStart, updateUserSuccess } from '../redux/user/userSlice';
// import { useNavigate } from 'react-router-dom';

export const Profile = () => {
  const {currentUser,loading, error} = useSelector((state)=> state.user);
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [formData, setFormData] = useState({})
  const [imageError, setImageError] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  
  // console.log(imagePercent)  

  useEffect(()=>{
    if(image){
      handleFileUpload(image);
    }
    dispatch(updateUserFailure(false));
  },[image]);

  const handleFileUpload = async(image) => {
    //console.log(image);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable( storageRef, image);
    uploadTask.on(
        'state_changed',
        (snapshot)=> {
            const progress = ( snapshot.bytesTransferred / snapshot.totalBytes ) * 100;
            console.log('Upload is ' + progress + '% done');
            setImagePercent(Math.round(progress));
        },
   
    (error) => {
        console.error('Error Code:', error.code);
        console.error('Error Message:', error.message);
        setImageError(true);
    },
    () => {
        getDownloadURL( uploadTask.snapshot.ref)
        .then((downloadURL) => {
            setFormData({...formData, profilepic: downloadURL});
        })
    });
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  console.log(formData);

  const handleSubmit = async (e) =>{
    e.preventDefault();

    try{
      dispatch(updateUserStart());
      // console.log('before fetch');
      // console.log('user',currentUser._id);
      
      const res = await fetch(`/api/user/update/${currentUser._id}`,{
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      // console.log('response', data);      

      if(data.success === false){
        dispatch(updateUserFailure(data));
        return;
      }

      // console.log('updated successfully');      

      dispatch(updateUserSuccess(data));
      // console.log('navigating');      
      setUpdateSuccess(true)
      

    } catch(err){
      
      console.log(err);
      dispatch(updateUserFailure(data));

    }
  }
  

  return (
    <div className='max-w-lg mx-auto'>        
    <h1 className='text-center text-3xl font-semibold mt-20'>Profile</h1>
        <form 
          onSubmit={handleSubmit}
          className='flex flex-col gap-4'
        >
            <input 
                type='file' 
                ref={fileRef} 
                hidden
                accept="image/.*"
                onChange={(e)=> setImage(e.target.files[0])}
            />
            <img
                src={formData.profilepic || currentUser.profilepic}
                className='rounded-full self-center w-24 h-24 object-cover mt-4'
                onClick={()=> fileRef.current.click()}
            />
            <p className='text-sm self-center font-semibold'>
                {imageError ? 
                ( 
                    <span className='text-red-700'>Check your file type or file size! Size must be less than 2MB.</span>
                ):
                (
                    imagePercent > 0 && imagePercent < 100 ? (
                        <span className='text-slate-700'>{`Uploading: ${imagePercent} % `}</span>
                    ) : imagePercent === 100 ? (
                        <span className='text-green-700'>Image Uploaded Successfully..</span>
                    ) : (
                        ''
                    )
                )}               
            </p>
            <input 
                type="text"
                className='bg-slate-100 text-slate-800 rounded-lg p-3 hover:bg-slate-200'
                id="username"
                placeholder='Username'
                defaultValue={currentUser.username}
                onChange={handleChange}
            />
            <input
                type="email"
                className='bg-slate-100 text-slate-800 rounded-lg p-3 hover:bg-slate-200'
                id="email"
                placeholder='Email'
                defaultValue={currentUser.email}
                onChange={handleChange}
            />
           
            <input
                type="password"
                className='bg-slate-100 text-slate-800 rounded-lg p-3 hover:bg-slate-200'
                id='password'
                placeholder='Password'
                onChange={handleChange}
            />
            <input
                type="text"
                className='bg-slate-100 text-slate-800 rounded-lg p-3 hover:bg-slate-200'
                id='mobile' 
                placeholder={currentUser.mobile === 0 ? 'Mobile' : undefined} 
                defaultValue={currentUser.mobile !== 0 ? currentUser.mobile : undefined} 
                onChange={handleChange}
            />
            <input
                type="text"
                className='bg-slate-100 text-slate-800 rounded-lg p-3 hover:bg-slate-200'
                id='jobtitle'
                placeholder={currentUser.jobtitle === 'staff' ? 'Job Title' : undefined} 
                defaultValue={currentUser.jobtitle !== 'staff' ? currentUser.jobtitle : undefined} 
                onChange={handleChange}
            />
            <button
                type="submit"
                className='p-2 bg-slate-600 text-white text-2xl rounded-lg hover:opacity-95 uppercase disabled:opac-80 cursor-pointer'
            >
                { loading ? 'Loading..' : 'update'}
            </button>
            <p className="text-red-700 mt-5">{error ? error.message || 'Something went wrong!' : ''}</p>
            <p className="text-green-700 mt-5">{updateSuccess ? 'Profile updated successfully..' : ''}</p>

        </form>
    </div>
  )
}
