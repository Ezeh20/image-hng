import { NextResponse, NextRequest } from "next/server";
import connect from "@/utils/db";
import User from "@/models/User";
import bcrypt from "bcryptjs"

export const POST = async (request) => {
    const body = await request.json();
    const { email, password } = body
    await connect();
    const hashedPassword = await bcrypt.hash(password, 10)

    //check if email already exists
    const user = await User.findOne({ email })
    if (user) {
        return NextResponse.json({
            message: 'user already exists',
            success: false,
        }, { status: 401 })
    }

    const newUser = new User({
        email,
        password: hashedPassword
    })

    try {

        await newUser.save()
        return NextResponse.json({
            message: 'account created successfully',
            success: true,
        }, { status: 201 })
    } catch (error) {
        return new NextResponse('something went wrong', { status: 500 })
    }

}