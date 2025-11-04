"use client";

import { useContext } from "react";
import { authContext } from "../contexts/AuthContextWrapper";
import Navbar from "@/components/Navbar";
import BookList from "@/components/BookList";


const Home = () => {
  const auth = useContext(authContext);

  return (
    <div>
        <Navbar />
        <BookList />
    </div>
  );
};

export default Home;
