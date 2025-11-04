'use client'

import { User } from "@/interfaces"
import React, { ReactNode, useEffect, useState } from "react"
interface ContextType{
    user: User | null
    token: string | null
    signin: (user: User, token: string) => void
    signout: () => void
}
export const authContext = React.createContext<ContextType | undefined>(undefined)

const AuthContextWrapper = ({children}:{children: ReactNode})=>{

    const [user, setUser] = useState<User | null>(null)
    const [token, setToken] = useState<string | null>(null)
    
    useEffect(()=>{
        let savedUser = localStorage.getItem("user")
        let savedToken = localStorage.getItem("token")
        if (savedToken && savedUser){
            setUser(JSON.parse(savedUser))
            setToken(savedToken)
        }
    }, [])

    const signin = (user: User, token: string) => {
       setUser(user)
       setToken(token)
       localStorage.setItem("user", JSON.stringify(user))
       localStorage.setItem("token", JSON.stringify(token))

    }

    const signout = ()=>{
        setUser(null)
        setToken(null)
        localStorage.removeItem("user")
        localStorage.removeItem("token")
    }



    return (
        <authContext.Provider value = {{user, token, signin, signout}}>
            {children}
        </ authContext.Provider >
    )
}

export default AuthContextWrapper