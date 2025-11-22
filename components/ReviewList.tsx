'use client'

import { authContext } from "@/app/contexts/AuthContextWrapper"
import BASE_URL from "@/BASE_URL"
import { Review, ReviewWithUser } from "@/interfaces"
import axios from "axios"
import { Star } from "lucide-react"
import { useContext, useEffect, useState } from "react"

interface ReviewListProps{
    book_id: number
}



const ReviewList = ({book_id}: ReviewListProps) =>{
    const [reviews, setReviews] = useState<ReviewWithUser[]>([])
    const auth = useContext(authContext)

    useEffect(()=>{
        getReviews()
    },[])

    const getReviews = async ()=>{
        try{
            const resp = await axios.get(`${BASE_URL}/reviews/${book_id}`, {headers: {Authorization: 'Bearer '+auth?.token}})
            setReviews(resp.data)
        }catch(e){
            console.error("Failed to fetch reviews:", e)
        }
    }

    return (
        <div className="mx-20 bg-black text-white rounded-lg p-6">
            <div className="text-xl font-medium mb-4">See what others think about this book</div>

            {reviews.length === 0 ? (
                <div className="text-sm text-gray-300">No reviews yet.</div>
            ) : (
                <ul className="space-y-4">
                    {reviews.map((review) => (
                        <li key={review.id ?? Math.random()} className="bg-neutral-900/50 p-4 rounded-md">
                            <div className="flex items-center justify-start">
                                 <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                <span className="text-sm font-semibold align-middle">{review.rating }</span>
                                <span className="ml-4 text-xs text-gray-300">by {review.user.username}</span>
                            </div>

                            {review.review_text && review.review_text.trim() !== "" && (
                                <p className="mt-2 text-sm text-gray-200">{review.review_text}</p>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default ReviewList
