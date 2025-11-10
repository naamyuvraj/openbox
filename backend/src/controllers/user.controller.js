import User from '../models/user.model.js';


// ==============================
// Fetch User
// ==============================

export const getProfile = async(req,res) => {
    try {
        const userId = req.user.id;
        const user = await User.findOne({user_id : userId}).select('-password -_id -__v -googleId');
        if(!user){
            return res.status(404).json({message: "User not found"});
        }
        return res.status(200).json({user});
    }
    catch(err){
        return res.status(500).json({message: "Server error", error: err.message});
    }
}


// ==============================
// Update User Bio / Avatar
// ==============================

export const updateBioAvatar = async(req,res) => {
    try {
        const userId = req.user.id;
        const {bio, avatarUrl} = req.body;

        const user = await User.findOne({user_id : userId});
        if(!user){
            return res.status(404).json({message: "User not found"});
        }

        user.bio = bio || user.bio;
        user.avatarUrl = avatarUrl || user.avatarUrl;

        await user.save();

        return res.status(200).json({message: "Profile updated", user});
    } catch (error) {
        return res.status(500).json({message: "Server error", error: error.message});
    }
}