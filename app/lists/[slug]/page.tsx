import BASE_URL from "@/BASE_URL";
import Navbar from "@/components/Navbar";
import { ListWithBooks } from "@/interfaces";
import axios from "axios";
import BookCard from "@/components/BookCard";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const ListBooksPage = async ({ params }: PageProps) => {
  const { slug } = await  params;
  console.log(slug)
  let list: ListWithBooks | null = null;
  let list_id = parseInt(slug)
  try {
    const resp = await axios.get<ListWithBooks>(`${BASE_URL}/lists/${list_id}`);
    list = resp.data;
  } catch (e) {
    console.error("Error fetching list:", e);
  }

  if (!list) {
    return (

        <div>
            <Navbar />
            <p className="mt-10 text-lg">Failed to load list...</p>

        </div>
    );
  }

  const books = list.books;

  return (
    <div>
      <Navbar />
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 px-8">
        {books.length === 0 ? (
          <div className="col-span-full text-center text-gray-400">
                The list has no books yet 
          </div>
        ) : (
          books.map((book) => (
            <BookCard
              title={book.title}
              id={book.id}
              authors={book.authors}
              slug={book.slug}
              key={book.id}
              avg_review={book.avg_review}
              review_count={book.review_count}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ListBooksPage;
