import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearSelectedUser, fetchOneFailure, fetchOneSuccess, fetchUsersFailure, fetchUsersStart, fetchUsersSuccess } from "../redux/admin/adminSlice";

export const User = () => {
    const { users, loading, error } = useSelector( (state)=> state.admin);
    const dispatch = useDispatch();
    // const { currentUser } = useSelector( (state)=> state.user);    
    console.log(users);
    
    useEffect(()=>{
      const fetchUsers = async() => {
     dispatch(clearSelectedUser(null));

        try{
          dispatch(fetchUsersStart());
          const res = await fetch('/api/admin/getUsers');
          const userList = await res.json();

          if(!userList){
            dispatch(fetchUsersFailure(userList));
            return;
          }
          console.log("users",userList);
          
          dispatch(fetchUsersSuccess(userList));

        } catch(err){          
          dispatch(fetchUsersFailure(err));
        }
       
      }
      fetchUsers();
    },[dispatch])

  return (
    <div>
      <h1 className="text-gray-600 text-xl font-semibold">Users</h1>
      <div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-sm font-semibold tracking-wide text-left">
                  Name
                </th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left">
                  Title
                </th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left">
                  Status
                </th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left">
                  Mobile
                </th>
                <th className="p-3 text-sm font-semibold tracking-wide text-right"></th>
              </tr>
            </thead>
            <tbody>
              {
              Array.isArray(users) && users.length > 0 ? (
                users.map((user) => (
                <tr className="bg-white border-b">
                  <td className="p-3">
                    <div className="flex items-center">
                      <img
                        className="w-10 h-10 rounded-full mr-4"
                        src={user.profilepic}
                        alt="User image"
                      />
                      <div>
                        <h3 className="text-sm font-medium">{user.username}</h3>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-3 text-sm">
                    <div className="flex flex-col">
                      <span className="font-medium">{user.jobtitle}</span>
                    </div>
                  </td>
                  <td className="p-3 text-sm">
                   {user.isActive? (
                     <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full">
                      Active
                    </span>
                   ):(
                    <span className="px-2 py-1 font-semibold leading-tight text-red-700 bg-green-100 rounded-full">
                    Inactive
                    </span>
                   )}
                  </td>
                  <td className="p-3 text-sm">{user.mobile}</td>
                  <td className="p-3 text-right">
                    <a href={`/editpage/${user._id}`} className="text-indigo-600 hover:text-indigo-900">
                      Edit
                    </a>
                  </td>
                </tr>
                 ))
                ):(
                  <tr>
                  <td colSpan="5" className="text-center">
                    No users found.
                  </td>
                </tr>
                )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
