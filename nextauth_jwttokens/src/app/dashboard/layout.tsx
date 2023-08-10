//this layout should send the request if we are authenticated 
//but if we are not it gonna redirect to the page the default one)
// this layout should protect all pages under the dashboard
"use client";
import {useState, useEffect} from 'react';
import axios, { AxiosError } from 'axios';
import {useRouter} from "next/navigation";

interface UserResponse{
    user: string | null;
    error: AxiosError | null;
}

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}){
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const router = useRouter();
    useEffect(() =>{ (async () => {
        const {user,error} = await getUser();
        if(error){
            router.push("/");
            return;
        }
        setIsSuccess(true);
    // if error  did not happen, if every thing is fine 
    })();
},[router]);

if (!isSuccess) {
    return <p>Loading...</p> // if we go to the dashboard this message appear so no one can see anything
}
    return (
        <main>
        <header>Navigation</header>
        {children}
    </main>
    );
}
async function getUser(): Promise<UserResponse>{
    try{
        const {data} = await axios.get("/api/auth/middleware");

        return {
            user: data,
            error: null,
        };
    } catch (e) {
        const error = e as AxiosError;

        return{
            user: null,
            error,
        };
    }
}
//now if we check user is authenticated or not so we create another route