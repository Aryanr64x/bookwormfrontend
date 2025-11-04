'use client'
import SignIn from "@/components/SignIn"
import SignUp from "@/components/SignUp"
import Image from "next/image"
import { useState } from "react"

const Auth = ()=>{
    const [signIn, setSignIn] = useState(true)
    return <div className="flex flex-col md:flex-row h-screen justify-center items-center">
         <div>
                  <Image src={"/logo.png"} alt="Logo" width={200} height={200}/>
        </div>
        <div>
            
            {
                (signIn) ? (<SignIn toggleSignIn={()=>{setSignIn(false)}}/>) : (<SignUp toggleSignIn={()=>{setSignIn(true)}} />)
            }
        </div>

    </div>
}

export default Auth