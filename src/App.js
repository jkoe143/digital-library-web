import { useEffect, useRef, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import BookList from "./components/BookList";
import {
  getBooks,
  createBook,
  updatePhoto,
  updateBook as updateBookAPI,
} from "./api/BookService";
import { Routes, Route, Navigate } from "react-router-dom";
import BookDetail from "./components/BookDetails";
import { toastError, toastSuccess } from "./api/ToastService";
import { ToastContainer } from "react-toastify";

function App() {
  const modalRef = useRef();
  const fileRef = useRef();
  const [data, setData] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [file, setFile] = useState(undefined);
  const [values, setValues] = useState({
    id: "",
    title: "",
    author: "",
    publicationDate: "",
    description: "",
    libraryUrl: "",
    photoURL: "",
  });

  const getAllBooks = async (page = 0, size = 6) => {
    try {
      setCurrentPage(page);
      const { data } = await getBooks(page, size);
      setData(data);
    } catch (error) {
      console.log("API Error:", error);
      toastError(error.message);
    }
  };
  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleNewBook = async (event) => {
    event.preventDefault();
    try {
      const { data } = await createBook(values);
      if (file) {
        const formData = new FormData();
        formData.append("file", file, file.name);
        formData.append("id", data.id);
        await updatePhoto(formData);
      }
      toggleModal(false);
      setFile(undefined);
      fileRef.current.value = null;
      setValues({
        title: "",
        author: "",
        publicationDate: "",
        description: "",
        libraryUrl: "",
      });
      getAllBooks();
      toastSuccess("Book added successfully!");
    } catch (error) {
      console.log(error);
      toastError(error.message);
    }
  };

  const updateBook = async (book) => {
    try {
      await updateBookAPI(book);
      toastSuccess("Book updated successfully");
      getAllBooks(currentPage);
    } catch (error) {
      console.log(error);
      toastError(error.message);
    }
  };

  const updateImage = async (formData) => {
    try {
      await updatePhoto(formData);
    } catch (error) {
      console.log(error);
      toastError(error.message);
    }
  };

  const toggleModal = (show) =>
    show ? modalRef.current.showModal() : modalRef.current.close();

  useEffect(() => {
    getAllBooks();
  }, []);

  return (
    <>
      <Header toggleModal={toggleModal} nbOfBooks={data.totalElements} />
      <main className="main">
        <div className="container">
          <Routes>
            <Route path="/" element={<Navigate to={"/books"} />} />
            <Route
              path="/books"
              element={
                <BookList
                  data={data}
                  currentPage={currentPage}
                  getAllBooks={getAllBooks}
                />
              }
            />
            <Route
              path="/books/:id"
              element={
                <BookDetail
                  updateBook={updateBook}
                  updateImage={updateImage}
                  getAllBooks={getAllBooks}
                />
              }
            />
          </Routes>
        </div>
      </main>

      {/* Modal */}
      <dialog ref={modalRef} className="modal" id="modal">
        <div className="modal__header">
          <h3>New Book</h3>
          <i onClick={() => toggleModal(false)} className="bi bi-x-lg"></i>
        </div>
        <div className="divider"></div>
        <div className="modal__body">
          <form onSubmit={handleNewBook}>
            <div className="user-details">
              <div className="input-box">
                <span className="details">Title</span>
                <input
                  type="text"
                  value={values.title}
                  onChange={onChange}
                  name="title"
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">Author</span>
                <input
                  type="text"
                  value={values.author}
                  onChange={onChange}
                  name="author"
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">Publication Date</span>
                <input
                  type="text"
                  value={values.publicationDate}
                  onChange={onChange}
                  name="publicationDate"
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">Description</span>
                <textarea
                  value={values.description}
                  onChange={onChange}
                  name="description"
                  required
                  rows="5"
                />
              </div>
              <div className="input-box">
                <span className="details">Library URL (Auto-generated)</span>
                <input
                  type="url"
                  value={values.libraryUrl}
                  onChange={onChange}
                  name="libraryUrl"
                  placeholder="Will be auto-generated from title"
                  readOnly
                />
              </div>
              <div className="file-input">
                <span className="details">Book Cover Photo</span>
                <input
                  type="file"
                  onChange={(event) => setFile(event.target.files[0])}
                  ref={fileRef}
                  name="photo"
                  accept="image/*"
                />
              </div>
            </div>
            <div className="form_footer">
              <button
                onClick={() => toggleModal(false)}
                type="button"
                className="btn btn-danger"
              >
                Cancel
              </button>
              <button type="submit" className="btn">
                Save
              </button>
            </div>
          </form>
        </div>
      </dialog>
      <ToastContainer />
    </>
  );
}

export default App;
