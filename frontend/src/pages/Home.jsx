import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Spinner from "../Components/Spinner";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/books")
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <div className="p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl my-8">Books List</h1>
          <Link to="/books/create">
            <button className="text-2xl hover:text-yellow-500 text-blue-400">
              Create Book
            </button>
          </Link>
        </div>
        {loading ? (
          <Spinner />
        ) : (
          <table className="w-full border-separate border-spacing-2">
            <thead>
              <tr>
                <th className="border border-slate-600 rounded-md w-3">No.</th>
                <th className="border border-slate-600 rounded-md">Title</th>
                <th className="border border-slate-600 rounded-md max-md:hidden">
                  Author
                </th>
                <th className="border border-slate-600 rounded-md max-md:hidden">
                  Publish Year
                </th>
                <th className="border border-slate-600 rounded-md">
                  Operations
                </th>
              </tr>
            </thead>
            <tbody>
              {books.map((book, index) => (
                <tr key={book._id} className="h-8">
                  <td className="border border-slate-700 rounded-md">
                    {index + 1}.
                  </td>
                  <td className="border border-slate-700 rounded-md">
                    {book.title}
                  </td>
                  <td className="border border-slate-700 rounded-md max-md:hidden">
                    {book.author}
                  </td>
                  <td className="border border-slate-700 rounded-md max-md:hidden">
                    {book.publishYear}
                  </td>
                  {/* <td className="border border-slate-700 rounded-md text-center"> */}
                  <div className="flex px-6 justify-between">
                    <Link to={`/books/details/${book._id}`}>
                      <button className="text-2xl hover:text-yellow-500 text-blue-400">
                        Book details
                      </button>
                    </Link>
                    <Link to={`/books/edit/${book._id}`}>
                      <button className="text-2xl text-blue-400 hover:text-green-500">
                        Edit Books
                      </button>
                    </Link>
                    <Link to={`/books/delete/${book._id}`}>
                      <button className="text-2xl text-blue-400 hover:text-red-600">
                        Delete Books
                      </button>
                    </Link>
                  </div>
                  {/* </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default Home;
