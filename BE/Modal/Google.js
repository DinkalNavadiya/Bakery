import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    avatar: String,
    provider: String,
    providerId: String
});

const GUsers = mongoose.model('GUsers', userSchema)

export default GUsers;    