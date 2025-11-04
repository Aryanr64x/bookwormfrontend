'use client'
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
import AddToList from "./AddToList"
interface AddToListDialogProps{
    book_id: number
}
const AddToListDialog = ({book_id}: AddToListDialogProps)=>{
    return    <Dialog>
      <DialogTrigger asChild>
          <Button className="mt-6 text-white px-5 py-2 rounded-lg font-semibold transition-all duration-200 w-fit hover:cursor-pointer">
       + Add to List
           </Button>
      </DialogTrigger>

      <DialogContent
        className="bg-neutral-900 text-gray-100 border border-neutral-700 sm:max-w-md"
      >
        <DialogHeader>
          <DialogTitle className="text-gray-50">Are you sure?</DialogTitle>
          <DialogDescription className="text-gray-400">
               <AddToList book_id={book_id}/>
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-end gap-2 mt-4">
          

          <DialogClose asChild>
            <Button
              className="bg-red-600 text-white hover:bg-red-700"
              onClick={() => console.log("Deleted!")}
            >
              Exit
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
}

export default AddToListDialog
