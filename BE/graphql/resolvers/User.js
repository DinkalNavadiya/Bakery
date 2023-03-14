import Users from "../../Modal/Users.js"
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import Stripe from 'stripe';
import Role from "../../Modal/Role.js";
import nodemailer from 'nodemailer';

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
                // recurring: { interval: 'month' }
            })
            const newUser = new Users({
                name: name,
                email: email.toLowerCase(),
                password: password,
                phone_number: phone_number,
                RoleId: role?._id,
                role: "user",
                createdBy: createdBy,
                Stripe_Id: customer.id
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
            var transporter = nodemailer.createTransport({
                host: 'smtp.ethereal.email',
                port: 587,
                auth: {
                    user: 'ara61@ethereal.email',
                    pass: '123456'
                }
            });

            var mailOptions = {
                from: 'dinkal@patel123.com',
                to: 'dinkal.scaleteam@gmail.com',
                subject: 'Sending Email using Node.js',
                text: 'That was easy!'
            };

            const mailer = await transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
            return {
                id: res.id,
                ...res._doc,
                customer,
                mailer
            }
        },
        async loginUser(_, { loginInput: { email, password } }) {
            const user = await Users.findOne({ email })
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
            } else {
                throw new ApolloError('Incorrect password', 'INCORRECT_PASSWORD');
            }
        },
        deleteUser: async (root, args) => {
            await Users.findByIdAndDelete(args.id)
            return "User is deleted"
        }
        
    }
}

export default User