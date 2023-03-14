import { OAuth2Client } from "google-auth-library";
import GUsers from "../../Modal/Google.js";
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const Google = {
    Query: {
        Google: async () => {
            const google = await GUsers.find()
            return google
        }
    },
    Mutation: {
        googleAuth: async (_, { idToken }) => {
            const clientId = process.env.GOOGLE_CLIENT_ID;
            const { payload } = await client.verifyIdToken({ idToken: idToken, audience: clientId });
            if (payload.email_verified) {
                const user = await GUsers.findOne({
                    email: payload.email
                });
                if (!user) {
                    const newUser = new GUsers({
                        name: payload.name,
                        email: payload.email,
                        avatar: payload.picture,
                        provider: payload.iss,
                        providerId: payload.sub
                    });
                    return newUser.save();
                } else {
                    return {
                        message: "Login Successfully true",
                        success: true,
                    }
                }
            }
            else {
                return {
                    message: "Login Unsuccessfully",
                    success: false,
                }
            }
        }
    }
}

export default Google
