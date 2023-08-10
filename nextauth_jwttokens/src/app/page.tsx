"use client";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation"
// we use client side bcz this authentication depends on it bcz you cannot 
// actually get the cookie if you are doing server side.so we need cookie thats why we use cleint side

export default function Home(){
  const {push} = useRouter(); //redirecting
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payload = {
      username: event.currentTarget.username.value,// when we submit thr password it will take username and password from there and use it
      password: event.currentTarget.password.value,
    };

    try{
      const { data } = await axios.post("/api/auth/login" , payload);
      alert(JSON.stringify(data));
      //redirect the user to the dashboard
      push("/dashboard");
    } catch(e) {
      const error = e as AxiosError;
      alert(error.message);
    }
  };
  return(
    <main>
      <h1>Next.js authentication JWT verify http cookie only</h1>
      <form onSubmit = {handleSubmit} className="flex flex-col gap-4">
        <div>
         <label htmlFor="username">UserName:</label>
         <input
          type ="text"
          id="username"
          name="username"
          required
          className="border rounded border-black text-black"/>
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
          type ="password"
          id="password"
          name="password"
          required
          className="border rounded border-black text-black"/>
        </div>
      
        <button type="submit"
        className="p-2 bg-orange-600 text-black w-fit rounded">Submit</button>
      </form>
    </main>
  );
}