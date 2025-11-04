'use client'

import { useState, useContext } from "react"
import axios from "axios"
import { List } from "@/interfaces"
import { Button } from "./ui/button"
import { authContext } from "@/app/contexts/AuthContextWrapper"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import BASE_URL from "@/BASE_URL"


interface ListItemProps {
  list: List
  book_id: number
}

const AddToListSingle = ({ list, book_id }: ListItemProps) => {
  const auth = useContext(authContext)
  const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null)

  const onAdd = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/lists/add-book`,
        {
          list_id: list.id,
          book_id: book_id,
        },
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      )

      setAlert({ type: "success", message: res.data.message || "Added successfully!" })
      setTimeout(() => setAlert(null), 2000)
    } catch (err: any) {
      const message = err.response?.data?.detail || "Failed to add book."
      setAlert({ type: "error", message })
      setTimeout(() => setAlert(null), 2000)
    }
  }

  return (
    <>
      <div
        key={list.id}
        className="flex items-center justify-between w-full px-4 py-2 mb-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition"
      >
        <span className="text-gray-200">{list.name}</span>
        <Button
          size="sm"
          className="bg-gray-700 text-gray-100 hover:bg-gray-600 hover:cursor-pointer"
          onClick={onAdd}
        >
          Add
        </Button>
      </div>

      {alert && (
        <div className="fixed bottom-4 right-4 z-50 w-64">
          <Alert
            className={`${
              alert.type === "success"
                ? "bg-green-700 text-white border-none"
                : "bg-red-700 text-white border-none"
            } shadow-lg`}
          >
          
            <AlertTitle>
              {alert.type === "success" ? "Success" : "Error"}
            </AlertTitle>
            <AlertDescription className="text-white">{alert.message}</AlertDescription>
          </Alert>
        </div>
      )}
    </>
  )
}

export default AddToListSingle




// TODO
// get all lists and create new list 
// in add to list show only lists where book is not there and remove it once addced

