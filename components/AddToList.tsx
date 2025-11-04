'use client'

import { authContext } from "@/app/contexts/AuthContextWrapper"
import BASE_URL from "@/BASE_URL"
import { List } from "@/interfaces"
import { useContext, useEffect, useState } from "react"
import AddToListSingle from "./AddToListSingle"
import axios from "axios"
interface AddToListProps{
    book_id: number
}
const AddToList = ({book_id}: AddToListProps) => {
    const [lists, setLists] = useState<List[]>([])
    const auth = useContext(authContext)
    useEffect(() => {
        getLists()
    }, [])

    const getLists = async () => {
        console.log(auth?.token)
        try {
            const res = await axios.get(`${BASE_URL}/lists`, {
                headers: {
                    Authorization: `Bearer ${auth?.token}`,
                },
            })
            setLists(res.data)
        } catch (error) {
            console.error("Error fetching lists:", error)
        }
    }
    return <div>
        <div className="bg-neutral-900 text-gray-100 p-4 rounded-lg">
            {lists.length === 0 ? (
                <div className="text-gray-400 text-sm">No lists found.</div>
            ) : (
                lists.map((list) => (
                    <AddToListSingle  key={list.id} list={list} book_id={book_id}/>
                ))
            )}
        </div>
    </div>
}

export default AddToList