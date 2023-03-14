import mongoose from "mongoose";
const ObjectId = mongoose.Schema.Types.ObjectId;

const profileSchema = new mongoose.Schema({
  userId: { type: ObjectId },
  Image: String,
  name: {
    type: String,
    require: true,
    trim: true,
  },
  email: String,
  phone_number: String,
  token: { type: String },
  role: { type: String }
}, { timestamps: true })

const Profile = mongoose.model('Profile', profileSchema)

export default Profile