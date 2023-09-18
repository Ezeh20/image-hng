import User from "@/models/User";
import connect from "@/utils/db";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs"
import NextAuth from "next-auth/next";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            id: 'credentials',
            name: 'Credentials',
            //authorize the user
            async authorize(credentials) {
                await connect();
                const { email, password } = credentials
                try {
                    const user = await User.findOne({ email })
                    //if the user exists, check if the password is correct
                    // retun the user if true else throw an error
                    if (user) {
                        const isPasswordCorrect = await bcrypt.compare(password, user.password)
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
        error: '/login'
    }
})

export { handler as GET, handler as POST }