import Data from "@/models/Data";
import { connect } from "mongoose";
import { NextResponse } from "next/server";

export const GET = async (request) => {
    await connect();

    try {
        const content = await Data.find()
        return NextResponse.json({
            message: 'here you do',
            data: content,
            success: true

        }, { status: 200 })

    } catch (error) {
        return NextResponse.json({
            error: error.message,
            message: 'something went wrong',
            success: false
        }, { status: 500 })
    }
}