import User from "../models/user.model.js";

export const getUsers = async(req, res, next) =>{
    try{
        const users = await User.find();
        res.status(200).json({success: true, data: users})
    }
    catch(error){
        next(error);
    }
}

export const getUser = async(req, res, next) =>{
    try{
        const user = await User.findById(req.params.id).select('-password');

        if(!user){
            const error = new error('User not found');
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({success: true, data: user});
    }
    catch(error){
        next(error);
    }
}

export const updateUser = async(req, res) => {
    try{
        const {id} = req.params;
        const updates = req.body;

        const updatedUser = User.findByIdAndUpdate(id, updates, {
            new: true,
            runValidators: true
        })

        if(!updatedUser){
            return res.status(404).json({message: "User not found"});
        }

        res.status(200).json(updatedUser)
    }
    catch(error){
        res.status(400).json({message: "Error updating user", error: error.message});
    }
}

export const deleteUser = async(req, res) => {
    try{
        const {id} = req.params;
        const deletedUser = await User.findByIdAndDelete(id);

        if(!deletedUser){
            return res.status(404).json({message: "User not found"})
        }

        res.status(200).json({message: "User deleted successfully", user: deletedUser})
    }
    catch(error){
        res.status(500).json({message: "Error deleting user", error: error.message})
    }
}