'use client'

import { Book } from "@/interfaces"
import axios from "axios"
import { Link, Star } from "lucide-react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation";

const BookCard = ({title, id, slug, authors, avg_review, review_count}:Book)=>{
    const router = useRouter()
    const [link, setLink] = useState<string | undefined>(undefined)
    useEffect(()=>{
            getLink()
    }, [])



    const getLink = async()=>{
        try{
            const resp = await axios.get("https://www.googleapis.com/books/v1/volumes?q="+title)
            // console.log('HERE IS THE RESPONSE')
            // console.log(resp.data)
            setLink(resp.data.items[0].volumeInfo.imageLinks.thumbnail)
        }catch(e){
            console.log(e)
        }
    }

    return <div onClick={()=>{
      router.push('/books/'+slug)
    }}
      className="w-48 flex   flex-col items-center bg-white/[var(--bg-opacity)] [--bg-opacity:10%]   hover:scale-105 transition-transform cursor-pointer">
          
          <img
            src={link}
            alt={title}
            className="w-full h-64 object-cover"
          />


          <h3 className="text-white text-lg font-semibold mt-3 text-center line-clamp-2">
            {title}
          </h3>

          
          <div className="flex items-center gap-1 mt-1 mb-2">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-gray-300 text-sm">{avg_review} ({review_count})</span>
          </div>
        </div>

    
}

export default BookCard



