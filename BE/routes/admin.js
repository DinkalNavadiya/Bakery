import express from 'express';
import mongoose from "mongoose"
import Role from '../Modal/Role.js';
import Users from '../Modal/Users.js';
import Profile from "../Modal/Profiles.js";
const admin = express.Router()
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

try {
  mongoose.set('strictQuery', false);
  await mongoose.connect('mongodb://localhost:27017/bakery', options);
  console.log(`mongoDb connected mongodb://localhost:27017/bakery`);
  Role.findOne({ RoleName: "admin" }).exec(async (err, res) => {
    if (err) console.log("err", err);
    if (!res) {
      const roleData = Role({
        RoleName: "admin",
        isActive: true,
        permissions: []
      });
      await roleData.save();
      return true;
    } else return true
  });
  Role.findOne({ RoleName: "superAdmin" }).exec(async (err, res) => {
    if (err) console.log("err", err);
    if (!res) {
      const roleData = Role({
        RoleName: "superAdmin",
        isActive: true,
        permissions: []
      });
      await roleData.save();
      return true;
    } else return true
  });
  Role.findOne({ RoleName: "user" }).exec(async (err, res) => {
    if (err) console.log("err", err);
    if (!res) {
      const roleData = Role({
        RoleName: "user",
        isActive: true,
        permissions: []
      });
      await roleData.save();
      return true;
    } else return true
  });

  const isAdmin = await Users.findOne({
    email: "admin123@gmail.com",
    phone_number: "123-456-7890"
  })
  const isSuperAdmin = await Users.findOne({
    email: "superadmin123@gmail.com",
    phone_number: "123-456-7890"
  })

  if (!isAdmin) {
    let role = await Role.findOne({ RoleName: "admin" });
    Users.findOne({ email: "admin123@gmail.com" }).exec(async (err, res) => {
      if (err) console.log(err);
      else if (!res) {
        const data = Users({
          name: "Admin",
          email: "admin123@gmail.com",
          password: "admin123",
          phone_number: "123-456-7890",
          RoleId: role?._id,
          role: "admin"
        });
        await data.save();
      }
    });
    Profile.findOne({ email: "admin123@gmail.com" }).exec(async (err, res) => {
      if (err) console.log(err);
      else if (!res) {
        const data = Profile({
          name: "Admin",
          email: "admin123@gmail.com",
          phone_number: "123-456-7890",
          role: "admin"
        });

        await data.save();
      }
    });
  }
  if (!isSuperAdmin) {
    let role = await Role.findOne({ RoleName: "superAdmin" });
    Users.findOne({ email: "superadmin123@gmail.com" }).exec(async (err, res) => {
      if (err) console.log(err);
      else if (!res) {
        const data = Users({
          name: "SuperAdmin",
          email: "superadmin123@gmail.com",
          password: "123456",
          phone_number: "123-456-7890",
          RoleId: role?._id,
          role: "superAdmin"
        });

        await data.save();
      }
    });
    Profile.findOne({ email: "superadmin123@gmail.com" }).exec(async (err, res) => {
      if (err) console.log(err);
      else if (!res) {
        const data = Profile({
          name: "SuperAdmin",
          email: "superadmin123@gmail.com",
          phone_number: "123-456-7890",
          role: "superAdmin"
        });

        await data.save();
      }
    });
  };
} catch (err) {
  console.log("Error::", err);
}
export default admin