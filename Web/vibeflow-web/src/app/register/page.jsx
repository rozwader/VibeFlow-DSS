"use client"

import { useRouter } from "next/navigation";

const registerPage = () => {

    const router = useRouter();

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const formData = new FormData(event.currentTarget);
        const username = formData.get("Username");
        const password = formData.get("Password");
        const email = formData.get("Email");
    
        const request = await fetch("/api/auth/register/", {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({username, password, email})
        })
    
        if(request.ok){
            router.push("/login");
        }else{
          const message = await request.json();
          console.log(message);
        }
      }
    
    return(
        <form onSubmit={handleSubmit}>
            <input type="email" placeholder="E-mail" name="Email" required/>
            <input type="text" placeholder="Username" name="Username" required/>
            <input type="password" placeholder="Password" name="Password" required/>
            <button type="submit">Send</button>
      </form>
    );
}

export default registerPage;