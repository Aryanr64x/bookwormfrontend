'use client'

import BASE_URL from "@/BASE_URL"
import { Book } from "@/interfaces"
import axios from "axios"
import { useEffect, useState } from "react"
import BookCard from "./BookCard"

const BookList = ()=>{
    const [books, setBooks] = useState<Book[]>([])

    const fetchBooks = async ()=>{
        try{ 
            const resp = await axios.get(BASE_URL + '/books')
            setBooks(resp.data)
        }catch(e){
            console.log(e)
        }
    }


    useEffect(()=>{
         fetchBooks()
    }, [])


    return (
        <div className="mt-20 mx-16">
            <div className="text-2xl">
                Popular Books
            </div>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 space-y-8">
                {
                    (books.length == 0)
                      ? (<div>Fetching books .....</div>) :
                (<>
                    {
                        books.map(book=>{
                            return <BookCard title={book.title} id = {book.id} authors={book.authors} slug={book.slug} key={book.id}/>
                        })
                    }
                </>) 
                   

                }

            </div>
        </div>
    )
}

export default BookList