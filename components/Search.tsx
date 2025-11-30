'use client'

import BASE_URL from "@/BASE_URL"
import { Book } from "@/interfaces"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useRef, useState } from "react"

const Search = () => {
    const searchBox = useRef<HTMLInputElement | null>(null)
    const [searchResults, setSearchResults] = useState<Book[]>([])
    const router = useRouter()
    const searchBooks = async () => {
        let val = searchBox.current!.value
        if (val !== "") {
            try {
                let resp = await axios.get(BASE_URL + '/books/search/titles', {params: {q: val}})
                console.log(resp.data)
                setSearchResults(resp.data)
            } catch (e) {
                console.log(e)
            }
        }else{
            setSearchResults([])
        }


    }
    return <div>
        <span className="relative left-9 top-1/2 -translate-y-1/2 text-gray-400">
            🔍
        </span>
        <input
            ref={searchBox}
            onChange={(e) => { searchBooks() }}
            type="text"
            placeholder="Search you favourite books"
            className="w-64 bg-gray-800 text-white placeholder-gray-400 pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
        />
        {
            (searchResults.length !== 0) ? (
            <div className="ml-6 w-64 absolute bg-black">
                {
                    searchResults.map((book)=>{
                        return <div onClick={()=>{
                            router.push('/books/'+book.slug)
                        }} className="hover:bg-gray-600 cursor-pointer"> {book.title} </div>
                    })
                }

            </div>):(<div></div>)
        }

    </div>
}

export default Search