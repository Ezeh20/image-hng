import User from "@/models/User";
import connect from "@/utils/db";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcryptjs from "bcrypt"

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            id: 'credentials',
            name: 'Credentials',
            //authorize the user
            async authorize(credentials) {
                await connect();
                try {
                    const user = await User.findOne({ name: credentials.name })
                    console.log(user);
                    //if the user exists, check if the password is correct
                    // retun the user if true else throw an error
                    if (user) {
                        const isPasswordCorrect = await bcryptjs.compare(credentials.password, user.password)
                        if (isPasswordCorrect) {
                            return user;
                        } else {
                            throw new Error('invalid credentials')
                        }
                    } else {
                        throw new Error('user not found')
                    }
                } catch (error) {
                    throw new Error(error)
                }
            }
        })
    ],
    pages: {
        error: '/'
    }
})

export { handler as GET, handler as POST }