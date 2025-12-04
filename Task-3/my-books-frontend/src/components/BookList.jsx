// src/components/BookList.js
import React, { useEffect, useState } from "react";
import api from "../api";

export default function BookList({ refreshFlag, onError }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const res = await api.get("/books"); // GET /api/books
      setBooks(res.data);
    } catch (err) {
      console.error(err);
      const message = err.response?.data?.message || "Failed to load books";
      onError?.(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshFlag]);

  return (
    <div className="booklist">
      <h2>Book List</h2>
      {loading ? (
        <p>Loading books...</p>
      ) : books.length === 0 ? (
        <p>No books found.</p>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Author</th>
                <th>Year</th>
              </tr>
            </thead>
            <tbody>
              {books.map((b, i) => (
                <tr key={b.id ?? b._id ?? i}>
                  <td>{i + 1}</td>
                  <td>{b.title}</td>
                  <td>{b.author}</td>
                  <td>{b.year ?? "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
