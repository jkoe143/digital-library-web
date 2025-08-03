import axios from "axios";

const API_URL = "http://localhost:8080/books";

export const getBooks = async (page = 0, size = 10) => {
  return await axios.get(`${API_URL}?page=${page}&size=${size}`);
};

export const getBook = async (id) => {
  return await axios.get(`${API_URL}/${id}`);
};

export const createBook = async (book) => {
  return await axios.post(API_URL, book);
};

export const updateBook = async (book) => {
  return await axios.put(`${API_URL}/${book.id}`, book);
};

export const updatePhoto = async (formData) => {
  return await axios.post(`${API_URL}/photo`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteBook = async (id) => {
  return await axios.delete(`${API_URL}/${id}`);
};
