// have get request and we just check if the user is actually contain that token inside the cookie
import { verify } from "jsonwebtoken";
import { cookies} from "next/headers";
import { NextResponse } from "next/server";
export async function GET(){
    const cookieStore = cookies();
    
    const token = cookieStore.get("OurSiteJWT");

        if(!token) {
            return NextResponse.json(
                {
                 message: "Unauthorized",
                },
                {
                 status: 401,
                }
            );
        }
        const {value} = token;
        const secret = process.env.JWT_SECRET || "";
        try {
            verify(value, secret);

            const response = {
                user: "Super Top Secret User",
            };
            return new Response(JSON.stringify(response), {
                status: 200, 
            });
        } catch (e) {
            return NextResponse.json(
                {
                    message: "Something went Wrong",
                },
                {
                    status: 400,
                }
            );
            
        }
}

