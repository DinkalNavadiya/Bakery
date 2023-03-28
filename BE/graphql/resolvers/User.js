import Users from "../../Modal/Users.js"
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import Stripe from 'stripe';
import Role from "../../Modal/Role.js";
import { ApolloError } from "apollo-server-errors";
import nodemailer from "nodemailer"
import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated } from "../../authentication/authorization.js";

const User = {
    Query: {
        User: async () => {
            const users = await Users.find({})
            return users
        },
        getUser:
            async (root, args) => {
                const users = await Users.findById(args.id)
                return users
            }
    },
    Mutation: {

        async registerUser(_, { registerInput: { name, email, password, phone_number, createdBy } }) {
            //see oldUser exists
            const stripe = new Stripe(process.env.STRIPE_S_KEY)

            let role = await Role.findOne({ RoleName: "user" });

            const oldUser = await Users.findOne({ email });
            if (oldUser) {
                throw new ApolloError('user already exit' + email + 'USER_ALREADY_EXISTS')
            }
            const customer = await stripe.customers.create({
                name: name,
                email: email,
                shipping: {
                    name: name,
                    address: {
                        line1: '510 Townsend St',
                        postal_code: '395004',
                        city: 'Surat',
                        state: 'GUJ',
                        country: 'IND',
                    },
                },
            })
            var transporter = nodemailer.createTransport({
                host: 'smtp.ethereal.email',
                port: 587,
                auth: {
                    user: 'arnulfo.mckenzie25@ethereal.email',
                    pass: 'RrZVK8raQY2v3BcHT3',
                    clientId: "108890979754-dmuhe4ldge6cabk135tfd2h7cj47fcf7.apps.googleusercontent.com",
                    clientSecret: "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",
                    refreshToken: "1//04LfGYUqgwbFyCgYIARAAGAQSNwF-L9IrLFU1nNyc2hBdhqEm9ccJRQw9gfWORxMUtBi_9wstnM88fb86fSsCfMozeenxIp8zQ-U",
                }
            });
            const uniqueString = Math.floor(Math.random() * 10000);


            var mailOptions = {
                from: 'arnulfo.mckenzie25@ethereal.email',
                to: email,
                subject: 'Sending Email using Node.js',
                html: `<h1>Email Confirmation</h1>
                <h2>Hello ${name}</h2>
                <p>Thank you for subscribing. <br/>
                Your Confirmation code is  ${uniqueString}</p>
                </div>`
            };

            const mailer = await transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
            const newUser = new Users({
                name: name,
                email: email.toLowerCase(),
                password: password,
                phone_number: phone_number,
                RoleId: role?._id,
                role: "user",
                createdBy: createdBy,
                Stripe_Id: customer.id,
                ver_code: uniqueString
            })
            // create out JWT
            const token = jwt.sign(
                { user_id: newUser._id, email },
                "UNSAFE_STRING", {
                expiresIn: "24h"
            }
            );
            newUser.token = token;
            const res = await newUser.save();
            return {
                id: res.id,
                ...res._doc,
                customer,
                mailer
            }
        },
        async loginUser(_, { loginInput: { email, password } }) {
            const user = await Users.findOne({ email })
            // console.log(user);
            if (!user) {
                throw new ApolloError('User Not Found', {
                    extensions: { code: 'Error', Error },
                });
            }
            const isValid = user && (await bcrypt.compare(password, user.password))
            if (!isValid) {
                throw new ApolloError('Incorrect password', {
                    extensions: { code: 'Error', Error },
                });
            }
            else {
                if (user && (await bcrypt.compare(password, user.password))) {
                    if (user) {
                        if (await bcrypt.compare(password, user.password)) {
                            const token = jwt.sign(
                                { user_id: user._id, email },
                                "UNSAFE_STRING", {
                                expiresIn: "2h"
                            }
                            );
                            user.token = token;
                            return {
                                id: user.id,
                                ...user._doc
                            }

                        }
                    }
                }
            }
            // })
        },
        deleteUser: async (root, args) => {
            await Users.findByIdAndDelete(args.id)
            return "User is deleted"
        },
        changePassword: async (_, { email, oldPassword, newPassword }, { me }) => {
            const user = await Users.findOne({ email })
            const isValid = user && (await bcrypt.compare(oldPassword, user.password))
            if (!isValid) {
                throw new ApolloError('Your old password does not match.', {
                    extensions: { code: 'Error', Error },
                });
            } else if (oldPassword === newPassword) {
                throw new ApolloError('Old password and new password can\'t be same.', {
                    extensions: { code: 'Error', Error },
                });
            } else {
                user.password = newPassword
                const updHash = await bcrypt.hash(user.password, 10);
                const updPass = {};
                updPass.password = updHash;
                const users = await Users.findOneAndUpdate({ email }, { $set: updPass }, { new: true })
                return users

            }
        }
    }
}

export default User