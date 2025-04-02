"use client"

import { useRouter } from 'next/navigation';

const loginPage = () => {
  
    const router = useRouter();

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const formData = new FormData(event.currentTarget);
        const username = formData.get("Username");
        const password = formData.get("Password");
    
        const request = await fetch("/api/auth/login/", {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({username, password})
        })
    
        if(request.ok){
            const data = await request.json();
            localStorage.setItem("TOKEN", data.message);
            localStorage.setItem("User", username);
            router.push("/music/");
        }else{
          const message = await request.json();
          console.log(message);
        }
      }
    
    return(
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Username" name="Username" required/>
            <input type="password" placeholder="Password" name="Password" required/>
            <button type="submit">Send</button>
      </form>
    );
}

export default loginPage;