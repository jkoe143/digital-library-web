import axios from "axios";

console.log("API_URL:", process.env.REACT_APP_API_URL);
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";
console.log("Using API_URL:", API_URL);

export const getBooks = async (page = 0, size = 10) => {
  return await axios.get(`${API_URL}/books?page=${page}&size=${size}`);
};

export const getBook = async (id) => {
  return await axios.get(`${API_URL}/books/${id}`);
};

export const createBook = async (book) => {
  return await axios.post(`${API_URL}/books`, book);
};

export const updateBook = async (book) => {
  return await axios.put(`${API_URL}/books/${book.id}`, book);
};

export const updatePhoto = async (formData) => {
  return await axios.post(`${API_URL}/books/photo`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteBook = async (id) => {
  return await axios.delete(`${API_URL}/books/${id}`);
};
