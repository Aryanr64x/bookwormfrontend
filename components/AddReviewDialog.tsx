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
import { StarOutlinedIcon } from '@/components/ui/icons/ant-design-star-outlined'
import AddToList from "./AddToList"
import { useContext, useRef, useState } from "react"
import { authContext } from "@/app/contexts/AuthContextWrapper"
import axios from "axios"
import BASE_URL from "@/BASE_URL"

interface AddToListDialogProps {
  book_id: number
}


const AddReviewsDialog = ({ book_id }: AddToListDialogProps) => {
  const auth = useContext(authContext)
  const [stars, setStars] = useState<boolean[]>([false, false, false, false, false])
  const review = useRef<HTMLTextAreaElement>(null)

  // null means we havn't rated
  const [rating, setRating] = useState<number | null>(null)


  const [hasRated, setHasRated] = useState<boolean>(false)
  const createReview = async() => {
    if (hasRated){
      const reviewText = review.current?.value
        try{
            const resp = await axios.post(BASE_URL+'/reviews/'+book_id, {
              rating: rating,
              review_text: reviewText
            }, {headers: {Authorization: 'Bearer '+auth?.token}})

            console.log(resp.data)

        }catch(e){  
          console.log(e)
        }
    }else{
      console.log("please provide a rating")
    }
  }

  const fill = (star: boolean)=>{
      if (star){
        return "fill-yellow-400"
      }

      return "fill-none"

  }


  const fillTillI = (i: number)=>{
      let newStars = [false, false, false, false, false]
      for(let j = 0; j <= i; j ++){
        newStars[j] = true
      }
      setStars(newStars)


  }

  return <Dialog>
    <DialogTrigger asChild>
      <Button className="mt-6 mr-6 text-white px-5 py-2 rounded-lg font-semibold transition-all duration-200 w-fit hover:cursor-pointer">
        + Review this book
      </Button>
    </DialogTrigger>

    <DialogContent
      className="bg-neutral-900 text-gray-100 border border-neutral-700 sm:max-w-md"
    >
      <DialogHeader>
        <DialogTitle className="text-gray-50">Say other what you think about this book!</DialogTitle>
        <DialogDescription className="text-gray-400 mt-4">

          {
            stars.map((star, i) => {
              return <div key={i} className="group inline-block cursor-pointer"
               onMouseEnter={()=>{fillTillI(i)}} 
               onMouseLeave={()=>{
                if (!hasRated){
                    setStars([false, false, false, false, false])}
                }
               }
               onClick={()=>{
                setRating(i+1)
                setHasRated(true)
              }}
               >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className={"w-8 h-8 stroke-yellow-400 transition-all duration-200 " + fill(star)}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >

                
                  <polygon points="12 2 15 8.5 22 9.3 17 14 18.5 21 12 17.8 5.5 21 7 14 2 9.3 9 8.5 12 2" />
                </svg>
              </div>
            })
          }


          <div className="mt-4">

            <textarea className="w-100" ref = {review} placeholder="Write a review"></textarea>

          </div>

        </DialogDescription>
      </DialogHeader>

      <div className="flex justify-end gap-2 mt-4">


        <DialogClose asChild>
          <Button onClick={createReview} className="mr-2 hover:cursor-pointer bg-amber-700 hover:bg-amber-600 rounded-none">
            Review
          </Button>
        </DialogClose>


      </div>
    </DialogContent>
  </Dialog>
}

export default AddReviewsDialog
