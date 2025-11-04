'use client'

import { List } from "@/interfaces"
import { useContext, useEffect, useState } from "react"
import { authContext } from "../contexts/AuthContextWrapper"
import BASE_URL from "@/BASE_URL"
import axios from "axios"
import Navbar from "@/components/Navbar"
import { useRouter } from "next/navigation"
import CreateNewListDialog from "@/components/CreateNewListDialog"

const ListPage = ()=>{
    const [lists, setLists] = useState<List[]>([])
    const auth = useContext(authContext)
    const router = useRouter()
    useEffect(()=>{
        getLists()
    }, [])

    const getLists = async()=>{
        try{
            const resp = await axios.get(BASE_URL+'/lists', {
                headers:{
                    Authorization: 'Bearer '+auth?.token
                }
            })
            
            setLists(resp.data)
        }catch(e){  
            console.log(e)
        }
    }
    


    return (<div>
        <Navbar />
        
        <div className="px-12 mt-8">
            <div className="mb-12">
                <CreateNewListDialog onNewList={(list:List)=>{
                    console.log(list)
                    setLists([...lists, list])
                }} />
            </div>

            {
                (lists.length === 0) ? (<div >Loading your lists...</div>) : (<div className="bg-gray-800 p-6 rounded-2xl shadow-lg">
                        {
                            lists.map((list)=>{
                                return <div onClick={()=>{router.push("/lists/"+list.id)}} className="hover:cursor-pointer text-lg mb-4 font-medium px-6 py-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors" key = {list.id}> {list.name} </div>
                            })
                        }
                     </div>)
            }
        </div>
    </div>)
}   

export default ListPage