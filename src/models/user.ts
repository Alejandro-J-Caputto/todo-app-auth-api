import validator from 'validator'
import {Schema, model, mongo} from 'mongoose';


const UserSchema = new Schema({
  id: {
    type: mongo.ObjectID
  },
  name: {
    type: String,
    required: [true, 'The name is required'],
    trim: true
  },
  email: {
    type: String, 
    required: [true, 'Please provide a valid email'],
    unique: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please provide a valis password'],
    select: false
  },img: {
    type: String
  },
  role: {
    type: String,
    enum: ['USER_ROLE', 'ADMIN', 'EMPLOYEE'],
    default: 'USER_ROLE'
  },
  active: {
    type: Boolean,
    default: true,
    select: true
  },
  google: {
    type: Boolean,
    default: false
  }

})

const User = model('User', UserSchema);


export default User;