import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName:{
    type:String,
    require:true,
  },
  email:{
    type:String,
    require:true
  }
});

const User = mongoose.model('users', userSchema);

export default User;
