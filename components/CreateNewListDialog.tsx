'use client'
'use client'

import { authContext } from "@/app/contexts/AuthContextWrapper"
import BASE_URL from "@/BASE_URL"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { List } from "@/interfaces"
import axios from "axios"
import { useContext, useState } from "react"


interface Props{
    onNewList: (list: List)=>void
}

const CreateNewListDialog = ({onNewList}:Props) => {
    const [name, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const auth = useContext(authContext)
    const handleCreate = async() => {
        console.log("Creating list with:", { name, description })
        if (name!="" && description!=""){
            try{
                const resp = await axios.post(BASE_URL+"/lists",{name: name, description: description}, {headers: {Authorization: 'Bearer '+auth?.token}})
                console.log("HERE IS THE RESPONSE DATA")
                console.log(resp.data)
                onNewList(resp.data)
            }catch(e){
                console.log(e)
            }
        }

    }


    return <Dialog>
        <DialogTrigger asChild>
            <Button className="mt-6 text-white px-5 py-2 rounded-lg font-semibold transition-all duration-200 w-fit hover:cursor-pointer">
                + Create List
            </Button>
        </DialogTrigger>

        <DialogContent className="bg-neutral-900 text-gray-100 border border-neutral-700 sm:max-w-md">
            <DialogHeader>
                <DialogTitle className="text-gray-50">Create New List</DialogTitle>
                <DialogDescription className="text-gray-400">
                    Add a title and description for your new list.
                </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 mt-4">
                <div className="flex flex-col space-y-1">
                    <Label htmlFor="title" className="text-gray-300">Title</Label>
                    <Input
                        id="title"
                        value={name}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter list name"
                        className="bg-neutral-800 border-neutral-700 text-white placeholder-gray-500"
                    />
                </div>

                <div className="flex flex-col space-y-1">
                    <Label htmlFor="description" className="text-gray-300">Description</Label>
                    <Input
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter list description"
                        className="bg-neutral-800 border-neutral-700 text-white placeholder-gray-500"
                    />
                </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
                <DialogClose asChild>
                    <Button
                        className="bg-red-600 text-white hover:bg-red-700"
                    >
                        Cancel
                    </Button>
                </DialogClose>

                <DialogClose asChild>
                    <Button
                        className="bg-blue-600 text-white hover:bg-blue-700"
                        onClick={handleCreate}
                    >
                        Create
                    </Button>
                </DialogClose>
            </div>
        </DialogContent>
    </Dialog>
}
export default CreateNewListDialog;