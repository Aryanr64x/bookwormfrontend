"use client";
import { Input } from "@/components/ui/input"
import { Button } from "./ui/button";
import { useContext, useRef } from "react";
import { authContext } from "@/app/contexts/AuthContextWrapper";
import axios from "axios";
import BASE_URL from "@/BASE_URL";
import { useRouter } from "next/navigation";

interface Props{
    toggleSignIn: ()=>void
}

const SignIn = ({ toggleSignIn }: Props)=>{
    const auth = useContext(authContext)
    const usernameEl = useRef<HTMLInputElement>(null)
    const passwordEl = useRef<HTMLInputElement>(null)
    const router = useRouter()
    
    const signin = async()=>{
        let username = usernameEl.current!.value
        let password = passwordEl.current!.value
        if (username != "" && password != ""){
            try{
                const response = await axios.post(BASE_URL + "/auth/signin", {username, password})
                console.log(response.data)
                auth?.signin(response.data.user, response.data.token)
                router.push('/home')
            }catch(e){
                console.log(e)
            }
            
        }   

    }
    
    return <div className="">
        <div className="text-center text-xl mb-2">
            Welcome Back
        </div>
        <div>
             <Input placeholder="Please enter your username" className="mb-2 w-100" ref = {usernameEl}/>
        </div>
       <div>
         <Input type="password" placeholder="Please enter your password" className="mb-2 w-100" ref = {passwordEl} />
       </div>
        <div className="flex justify-between">
              <Button className="mr-2 hover:cursor-pointer" onClick={signin}>SIGN IN </Button>

              <button className="text-sm hover:cursor-pointer" onClick={toggleSignIn}>Don't have an account?</button>
        </div>

    </div>  
}

export default SignIn;