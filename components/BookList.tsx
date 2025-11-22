"use client";

import BASE_URL from "@/BASE_URL";
import { Book } from "@/interfaces";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import BookCard from "./BookCard";

const BookList = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [lastId, setLastId] = useState<number>(0);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  // Keep latest books in a ref so IntersectionObserver is never stale
  const booksRef = useRef<Book[]>([]);
  booksRef.current = books;

  const fetchBooks = async () => {
    try {
      console.log("SENDING REQUEST WITH LAST ID:", lastId);

      const resp = await axios.get(`${BASE_URL}/books/list/${lastId}`);

      setBooks((prev) => [...prev, ...resp.data]);
    } catch (e) {
      console.log(e);
    }
  };

  // When lastId changes → fetch
  useEffect(() => {
    fetchBooks();
  }, [lastId]);

  // Create observer ONCE — but use the ref (not stale state)
  useEffect(() => {
    const node = bottomRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const latestBooks = booksRef.current;

          const nextId =
            latestBooks.length === 0
              ? 0
              : latestBooks[latestBooks.length - 1].id;

          setLastId(nextId);
        }
      },
      { threshold: 1 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="mt-20 mx-16">
      <div className="text-2xl">Popular Books</div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {books.length === 0 ? (
          <div>Fetching books...</div>
        ) : (
          books.map((book) => (
            <BookCard
              key={book.id}
              review_count={book.review_count}
              avg_review={book.avg_review}
              title={book.title}
              id={book.id}
              authors={book.authors}
              slug={book.slug}
            />
          ))
        )}
      </div>

      <div ref={bottomRef} className="h-10"></div>
    </div>
  );
};

export default BookList;
