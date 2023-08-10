import {sign} from "jsonwebtoken";
import { NextResponse } from "next/server";
import { serialize } from "cookie";


const MAX_AGE = 60 +60 +24 * 30;//days

export async function POST(request: Request) {
    const body = await request.json();// take the body from the request so this is how we get the body you await the request you call json function
   
    const {username,password } =  body; //extract the user name and password from the body

    if(username !== 'khaula' || password !== 'khaula@@'){
        return NextResponse.json(
            {
             message: "Unauthorized",
            },
            {
             status: 401,
            }
        );
    }

    const secret = process.env.JWT_SECRET || "";
    
    const token = sign({
        username,
    },secret,
    {
        expiresIn: MAX_AGE,

    }
    );

    const serialized = serialize("OurSiteJWT", token, {
        httpOnly:true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: MAX_AGE,
        path: "/*"
    });

    const response = {
        message: "Authenticated!",
    };

    return new Response(JSON.stringify(response), {
        status: 200,
        headers:{ "Set-Cookie" : serialized },
    });
    
}

