import User from "../models/user.model.js"

export const getUserDetails = async ( req, res, next ) =>{
   try{
        const users = await User.find({isAdmin : false});
        res.status(200).json(users);  
   } catch(err) {
        res.status(500).json({ message: err.message });
   }
}
export const getSelectedUser = async(req, res, next)=>{
    try{
        const users = await User.findById(req.params.id);
        res.status(200).json(users);  
   } catch(err) {
        res.status(500).json({ message: err.message });
   }
}
export const updateUserDetails = async ( req, res, next ) => {
    try{
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set:{
                        jobtitle: req.body.jobtitle,
                        
                }           
            },
            { new: true}
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not exist!' }); 
        }

        res.status(200).json(updatedUser)

    } catch(err){
        res.status(500).json({ message: 'Server error', err }); 
    }
}

export const blockUserDetails = async( req, res, next ) => {
    try {
        const blockedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set:{
                    isActive:false                        
                }           
            },
            { new: true}
        );
        
        if (!blockedUser) {
            return res.status(404).json({ message: 'User not exist!' }); 
        }

        res.status(200).json({ message: 'User deleted successfully' }); 

    } catch (error) {
        res.status(500).json({ message: 'Server error', error }); 
    }
}
export const unblockUserDetails = async( req, res, next ) => {
    try {
        const activeUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set:{
                    isActive:true                        
                }           
            },
            { new: true}
        );
        
        if (!activeUser) {
            return res.status(404).json({ message: 'User not exist!' }); 
        }

        res.status(200).json({ message: 'User deleted successfully' }); 

    } catch (error) {
        res.status(500).json({ message: 'Server error', error }); 
    }
}

export const deleteUserDetails = async( req, res, next ) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not exist!' }); 
        }

        res.status(200).json({ message: 'User deleted successfully' }); 

    } catch (error) {
        res.status(500).json({ message: 'Server error', error }); 
    }
}

export const searchUser = async( req, res, next ) => {
    const { query } = req.query;
    try {
      const users = await User.find({
        $or: [
          { username: { $regex: query, $options: "i" } },
          { jobtitle: { $regex: query, $options: "i" } },
        ],
      });

      if (users.length === 0) {
        return res.status(404).json({ message: "No users found" });
      }

      res.status(200).json(users);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error", err });
    }
    
}