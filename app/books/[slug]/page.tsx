import BASE_URL from "@/BASE_URL"
import AddReviewsDialog from "@/components/AddReviewDialog"
import AddToListDialog from "@/components/AddToListDialog"
import Navbar from "@/components/Navbar"
import ReviewList from "@/components/ReviewList"
import { Button } from "@/components/ui/button"
import { Book } from "@/interfaces"
import { Dialog } from "@radix-ui/react-dialog"
import axios from "axios"

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function SingleBook({ params }: PageProps) {
  const { slug } = await params
  const resp = await axios.get(`${BASE_URL}/books/${slug}`)
  const book: Book = resp.data
  console.log(book)
  if (!book) {
    return (
      <div className="text-red-500 flex items-center justify-center min-h-screen">
        Book not found!
      </div>
    )
  }

  let image: string | null = null
  let rating: number | null = null

  try {
    const googleResp = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(book.title)}`
    )

    const volume = googleResp.data.items?.[0]?.volumeInfo
    image = volume?.imageLinks?.thumbnail ?? "/default-book.jpg"
    rating = book.avg_review
    


  } catch (err) {
    console.error("Google Books API error:", err)
    image = "/default-book.jpg"
  }

  return (
    <div>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-black px-6">
      <div className="max-w-5xl w-full flex flex-col md:flex-row items-center justify-center gap-12 text-white">
        {/* Left: Book Cover */}
        <img
          src={image || "/default-book.jpg"}
          alt={book.title}
          className="w-64 h-[28rem] object-cover rounded-2xl shadow-2xl"
        />

      
        <div className="flex flex-col justify-center text-left space-y-4 h-full md:h-[28rem]">
          <h1 className="text-3xl font-bold">{book.title}</h1>
          <p className="text-gray-400 text-lg">
            {book.authors?.map((a) => a.name).join(", ")}
          </p>

        
          {rating ? (
            <div className="flex items-center text-yellow-400">
              {Array.from({ length: Math.floor(rating) }).map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  className="w-5 h-5"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.286 3.97c.3.921-.755 1.688-1.54 1.118l-3.385-2.46a1 1 0 00-1.176 0l-3.385 2.46c-.785.57-1.84-.197-1.54-1.118l1.286-3.97a1 1 0 00-.364-1.118L2.045 9.397c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.97z" />
                </svg>
              ))}
              <span className="ml-2 text-gray-300 text-sm">{rating} ({book.review_count})</span>
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No rating available</p>
          )}

         <div className="flex">
          <AddReviewsDialog book_id={book.id}  />
          <AddToListDialog book_id={book.id}/>
         </div>
        </div>
      </div>
    </div>


          <ReviewList book_id = {book.id} />
          
    </div>
  )
}
