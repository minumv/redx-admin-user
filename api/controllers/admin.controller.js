import User from "../models/user.model.js"

export const getUserDetails = async ( req, res, next ) =>{
   try{
        const users = await User.find({isAdmin : false});
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
                        username : req.body.username,
                        email: req.body.email,                   
                        profilepic: req.body.profilepic,
                        mobile: req.body.mobile,
                        place: req.body.place
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
    const { name, place } = req.query;
    const condition = {};

    if( name ){
        condition.username = {$regex: name, $options: 'i'};
    }

    if( place ){
        condition.place = {$regex: place, $options: 'i'};
    }
    try{
        const searchUsers = await User.find(condition);

        if( searchUsers.length === 0){
            res.status(404).json({message:'No user found!'});
        }

        res.status(200).json(searchUsers)

    } catch(err){
        res.status(500).json({message:'Server error!', error:err});
    }
}