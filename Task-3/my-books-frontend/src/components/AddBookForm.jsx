// src/components/AddBookForm.js
import React, { useState } from "react";
import api from "../api";

export default function AddBookForm({ onAdded, onError }) {
  const [form, setForm] = useState({ title: "", author: "", year: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const reset = () => setForm({ title: "", author: "", year: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.author.trim()) {
      onError?.("Title and author are required.");
      return;
    }

    const payload = {
      title: form.title.trim(),
      author: form.author.trim(),
      year: form.year ? Number(form.year) : undefined,
    };

    setSubmitting(true);
    try {
      const res = await api.post("/books", payload); // POST /api/books
      reset();
      onAdded?.(res.data);
    } catch (err) {
      console.error(err);
      const message = err.response?.data?.message || "Failed to add book";
      onError?.(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="add-form">
      <h2>Add New Book</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Book title"
          />
        </label>

        <label>
          Author
          <input
            name="author"
            value={form.author}
            onChange={handleChange}
            placeholder="Author name"
          />
        </label>

        <label>
          Year
          <input
            name="year"
            value={form.year}
            onChange={handleChange}
            placeholder="e.g. 2024"
            type="number"
          />
        </label>

        <div className="actions">
          <button type="submit" disabled={submitting}>
            {submitting ? "Adding..." : "Add Book"}
          </button>
          <button type="button" onClick={reset} className="secondary">
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
