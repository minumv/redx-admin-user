import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';

export const Profile = () => {
  const {currentUser} = useSelector((state)=> state.user);
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [formData, setFormData] = useState({})
  const [imageError, setImageError] = useState(false);
  
  console.log(imagePercent)  

  useEffect(()=>{
    if(image){
      handleFileUpload(image);
    }
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


  return (
    <div className='max-w-lg mx-auto'>        
    <h1 className='text-center text-3xl font-semibold mt-20'>Profile</h1>
        <form className='flex flex-col gap-4'>
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

            />
            <input
                type="email"
                className='bg-slate-100 text-slate-800 rounded-lg p-3 hover:bg-slate-200'
                id="email"
                placeholder='Email'
                defaultValue={currentUser.email}
            />
            <input
                type="password"
                className='bg-slate-100 text-slate-800 rounded-lg p-3 hover:bg-slate-200'
                id='password'
                placeholder='Password'
            />
            <button
                type="button"
                className='p-2 bg-slate-600 text-white text-2xl rounded-lg hover:opacity-95 uppercase disabled:opac-80 cursor-pointer'
            >
                Update
            </button>
        </form>
    </div>
  )
}
