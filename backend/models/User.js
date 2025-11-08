import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userSchema = new Schema ({
  name : {type : String , required : true},
  email : {type: String , required : true , unique : true},
  password : {type : String }, 
  avatar : {type : String , default: "https://api.dicebear.com/7.x/thumbs/svg?seed=newuser"},
  bio : {type : String , default : 'Default bio'},
  oauthProvider : {type : String , enum : ['google' , 'github' , 'credentials'] , default : credentials}, 
  authProviderId: {type: String,default: null},
}, { timestamps: true })


const User = model('users_collection',userSchema);
export default User;

